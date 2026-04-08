import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import env from "~~/lib/env";
import createS3Client from "~~/server/utils/create-s3-client";
import { z } from "zod";

const MAX_CONTENT_LENGTH = 1024 * 1024 * 0.5;

const ImageSchema = z.object({
  contentLength: z.number().min(1).max(MAX_CONTENT_LENGTH),
  checksum: z.string(),
});

export default defineAuthenticatedEventHandler(async (event) => {
  const result = await readValidatedBody(event, ImageSchema.safeParse);

  if (!result.success) {
    return sendZodError(event, result.error);
  }

  const slug = getRouterParam(event, "slug") as string;
  const id = getRouterParam(event, "id") as string;

  await event.$fetch(`/api/locations/${slug}/${id}`);

  const client = createS3Client();

  const fileName = crypto.randomUUID();
  const key = `${event.context.user.id}/${id}/${fileName}.jpg`;

  const { url, fields } = await createPresignedPost(client, {
    Bucket: env.S3_BUCKET,
    Key: key,
    Expires: 120,
    Fields: {
      "x-amz-checksum-sha256": result.data.checksum,
    },
    Conditions: [
      ["content-length-range", result.data.contentLength, MAX_CONTENT_LENGTH],
      ["eq", "$x-amz-meta-user-id", event.context.user.id],
      ["eq", "$x-amz-meta-location-log-id", id],
    ],
  });

  fields["x-amz-meta-user-id"] = event.context.user.id;
  fields["x-amz-meta-location-log-id"] = id;

  return { url, fields, key };
});

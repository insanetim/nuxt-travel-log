import type { InsertLocationLog } from "./../schema";

import db from "..";
import { locationLog } from "./../schema";

export async function insertLocationLog(locationId: number, insertable: InsertLocationLog, userId: string) {
  const [inserted] = await db.insert(locationLog).values({
    ...insertable,
    locationId,
    userId,
  }).returning();

  return inserted;
}

<script lang="ts" setup>
const locationStore = useLocationStore();
const {
  currentLocationLog: locationLog,
} = storeToRefs(locationStore);

const image = ref<File | null>(null);
const previewUrl = ref<string | null>(null);

function selectImage(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    image.value = file;
    previewUrl.value = URL.createObjectURL(file);
  }
}

async function getChecksum(blob: Blob) {
  const arrayBuffer = await blob.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("sha-256", arrayBuffer);
  return btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
}

async function uploadImage() {
  if (!image.value || !previewUrl.value)
    return;

  const previewImage = new Image();
  previewImage.addEventListener("load", async () => {
    const width = Math.min(previewImage.width, 1000);
    const resized = await createImageBitmap(previewImage, {
      resizeWidth: width,
    });
    const canvas = new OffscreenCanvas(width, resized.height);
    canvas.getContext("bitmaprenderer")?.transferFromImageBitmap(resized);
    const blob = await canvas.convertToBlob({
      type: "image/jpeg",
      quality: 0.9,
    });

    const checksum = await getChecksum(blob);
    console.log(checksum);
  });
  previewImage.src = previewUrl.value;
}
</script>

<template>
  <div>
    <h2 class="mb-2">
      Manage "{{ locationLog?.name }}" Images
    </h2>
    <div class="flex gap-2 flex-col w-72">
      <div class="flex justify-center items-center bg-gray-500 h-28 w-full p-1">
        <p v-if="!previewUrl" class="text-center text-white">
          Select an image
        </p>
        <img
          v-else
          :src="previewUrl"
          class="w-full h-full object-cover"
          alt="upload preview"
        >
      </div>
      <input
        type="file"
        class="file-input"
        @change="selectImage"
      >
      <button
        class="btn btn-primary"
        :disabled="!image"
        @click="uploadImage"
      >
        Upload
      </button>
    </div>
  </div>
</template>

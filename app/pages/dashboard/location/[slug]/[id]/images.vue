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
      <button class="btn btn-primary" :disabled="!image">
        Upload
      </button>
    </div>
  </div>
</template>

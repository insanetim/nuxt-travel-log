<script lang="ts" setup>
const authStore = useAuthStore();

await authStore.init();
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppNavBar />
    <main class="flex flex-col flex-1">
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  label: string;
  icon: string;
  href: string;
  showLabel: boolean;
}>();

const route = useRoute();
</script>

<template>
  <div
    class="tooltip-right"
    :class="{ tooltip: !showLabel }"
    :data-tip="showLabel ? undefined : label"
  >
    <NuxtLink
      class="flex flex-nowrap gap-2 p-2 transition-all duration-300 hover:bg-base-300 hover:cursor-pointer"
      :class="{ 'bg-base-200': route.path === props.href, 'pl-5': !showLabel }"
      :to="props.href"
    >
      <Icon
        :name="props.icon"
        size="24"
        class="flex-none"
      />
      <Transition name="grow">
        <span v-if="props.showLabel" class="whitespace-nowrap">
          {{ props.label }}
        </span>
      </Transition>
    </NuxtLink>
  </div>
</template>

<style scoped>
.grow-enter-active {
  animation: grow 0.2s;
}
.grow-leave-active {
  animation: grow 0.2s reverse;
}
@keyframes grow {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>

<script lang="ts" setup>
const props = defineProps<{
  label: string;
  name: string;
  type?: "text" | "number" | "textarea";
  error?: string;
  disabled?: boolean;
}>();
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ props.label }}
    </legend>
    <Field
      :name="props.name"
      :type="props.type || 'text'"
      class="w-full"
      :class="{
        'input': props.type !== 'textarea',
        'textarea h-24': props.type === 'textarea',
        'input-error': props.error,
      }"
      :as="props.type === 'textarea' ? 'textarea' : 'input'"
      :disabled="props.disabled"
    />
    <p v-if="props.error" class="label text-error">
      {{ props.error }}
    </p>
  </fieldset>
</template>

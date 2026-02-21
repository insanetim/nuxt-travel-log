<script lang="ts" setup>
import { CENTER_USA } from "~~/lib/constants";
import { InsertLocationLog } from "~~/lib/db/schema";

const props = defineProps<{
  initialValues?: InsertLocationLog;
  onSubmit: (location: InsertLocationLog) => Promise<any>;
  onSubmitComplete: () => void;
  submitLabel: string;
  submitIcon: string;
}>();
</script>

<template>
  <LocationBaseForm
    v-slot="{ errors, loading }"
    :schema="InsertLocationLog"
    :initial-values="props.initialValues || {
      name: '',
      description: '',
      startedAt: Date.now() - 24 * 60 * 60 * 1000,
      endedAt: Date.now(),
      long: (CENTER_USA as [number, number])[0],
      lat: (CENTER_USA as [number, number])[1],
    }"
    :zoom="11"
    :on-submit
    :on-submit-complete
    :submit-label
    :submit-icon
  >
    <AppFormField
      name="name"
      label="Name"
      :error="errors.name"
      :disabled="loading"
    />
    <AppFormField
      name="description"
      label="Description"
      type="textarea"
      :error="errors.description"
      :disabled="loading"
    />
    <AppFormField
      name="startedAt"
      label="Started At"
      :error="errors.startedAt"
      :disabled="loading"
    />
    <AppFormField
      name="endedAt"
      label="Ended At"
      :error="errors.endedAt"
      :disabled="loading"
    />
  </LocationBaseForm>
</template>

<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { InsertLocation } from "~~/lib/db/schema";

const router = useRouter();

const { handleSubmit, errors, meta } = useForm({
  validationSchema: toTypedSchema(InsertLocation),
});

const onSubmit = handleSubmit((values) => {
  console.log(values);
});

onBeforeRouteLeave(() => {
  if (meta.value.dirty) {
    // eslint-disable-next-line no-alert
    return window.confirm("Are you sure you want to leave? All unsaved changes will be lost.");
  }
  return true;
});
</script>

<template>
  <div class="container max-w-md mx-auto mt-4">
    <div>
      <h1 class="text-lg">
        Add Location
      </h1>
      <p class="text-sm">
        A location is a place you have travelled or will travel to. It can be a city, country, state or point of interest. You can add specific times you visited this location after adding it.
      </p>
    </div>
    <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
      <AppFormField
        label="Name"
        name="name"
        :error="errors.name"
      />
      <AppFormField
        label="Description"
        name="description"
        type="textarea"
        :error="errors.description"
      />
      <AppFormField
        label="Latitude"
        name="lat"
        type="number"
        :error="errors.lat"
      />
      <AppFormField
        label="Longitude"
        name="long"
        type="number"
        :error="errors.long"
      />
      <div class="flex justify-end gap-2">
        <button
          type="button"
          class="btn btn-outline"
          @click="router.back()"
        >
          <Icon name="tabler:arrow-left" size="24" />
          Cancel
        </button>
        <button type="submit" class="btn btn-primary">
          Add
          <Icon name="tabler:circle-plus-filled" size="24" />
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import type { InsertLocationLog } from "~~/lib/db/schema";

const route = useRoute();
const { currentLocationLog: locationLog } = useLocationStore();
const { $csrfFetch } = useNuxtApp();

async function onSubmit(values: InsertLocationLog) {
  await $csrfFetch(`/api/locations/${route.params.slug}/${route.params.id}`, {
    method: "PUT",
    body: values,
  });
}

function onSubmitComplete() {
  navigateTo({
    name: "dashboard-location-slug-id",
    params: {
      slug: route.params.slug,
      id: route.params.id,
    },
  });
}
</script>

<template>
  <LocationLogForm
    v-if="locationLog"
    submit-label="Update Location Log"
    submit-icon="tabler:map-pin-up"
    :initial-values="locationLog"
    :on-submit
    :on-submit-complete
  />
</template>

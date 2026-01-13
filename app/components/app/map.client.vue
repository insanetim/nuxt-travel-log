<script lang="ts" setup>
import type { LngLatLike } from "maplibre-gl";

const style = "https://tiles.openfreemap.org/styles/liberty";
const center: LngLatLike = [-1.559482, 47.21322];
const zoom = 8;
</script>

<template>
  <MglMap
    :map-style="style"
    :center="center"
    :zoom="zoom"
  >
    <MglNavigationControl />
  </MglMap>
</template>

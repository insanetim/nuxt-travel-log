import type { SelectLocationWithLogs } from "~~/lib/db/schema";
import type { MapPoint } from "~~/lib/types";

import { CURRENT_LOCATION_PAGES, LOCATION_PAGES } from "~~/lib/constants";

export const useLocationStore = defineStore("useLocationStore", () => {
  const route = useRoute();
  const {
    data: locations,
    status: locationsStatus,
    refresh: refreshLocations,
  } = useFetch("/api/locations", {
    lazy: true,
  });

  const currentLocation = ref<SelectLocationWithLogs | null>(null);
  const currentLocationStatus = ref<"idle" | "pending" | "success" | "error">("idle");
  const currentLocationError = ref<any>(null);

  const refreshCurrentLocation = async () => {
    const route = useRoute();

    if (!route.params.slug) {
      currentLocation.value = null;
      currentLocationStatus.value = "idle";
      currentLocationError.value = null;
      return;
    }

    currentLocationStatus.value = "pending";
    currentLocationError.value = null;

    try {
      const data = await $fetch<SelectLocationWithLogs>(`/api/locations/${route.params.slug}`);
      currentLocation.value = data;
      currentLocationStatus.value = "success";
    }
    catch (error) {
      currentLocationError.value = error;
      currentLocationStatus.value = "error";
    }
  };

  const sidebarStore = useSidebarStore();
  const mapStore = useMapStore();

  effect(() => {
    if (locations.value && LOCATION_PAGES.has(route.name?.toString() || "")) {
      const mapPoints: MapPoint[] = [];
      const sidebarItems: SidebarItem[] = [];

      locations.value.forEach((location) => {
        const mapPoint = createMapPointFromLocation(location);
        sidebarItems.push({
          id: `location-${location.id}`,
          label: location.name,
          icon: "tabler:map-pin-filled",
          to: { name: "dashboard-location-slug", params: { slug: location.slug } },
          mapPoint,
        });
        mapPoints.push(mapPoint);
      });

      sidebarStore.sidebarItems = sidebarItems;
      mapStore.mapPoints = mapPoints;
    }
    else if (currentLocation.value && CURRENT_LOCATION_PAGES.has(route.name?.toString() || "")) {
      sidebarStore.sidebarItems = [];
      mapStore.mapPoints = [currentLocation.value];
    }
    sidebarStore.loading = locationsStatus.value === "pending";
  });

  return {
    locations,
    locationsStatus,
    refreshLocations,
    currentLocation,
    currentLocationStatus,
    currentLocationError,
    refreshCurrentLocation,
  };
});

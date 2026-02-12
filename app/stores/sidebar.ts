import type { MapPoint } from "~~/lib/types";
import type { RouteLocationRaw } from "vue-router";

export type SidebarItem = {
  id: string;
  label: string;
  icon: string;
  href?: string;
  to?: RouteLocationRaw;
  mapPoint?: MapPoint | null;
};

export const useSidebarStore = defineStore("useSidebarStore", () => {
  const loading = ref(false);
  const sidebarTopItems = ref<SidebarItem[]>([]);
  const sidebarItems = ref<SidebarItem[]>([]);

  return {
    loading,
    sidebarTopItems,
    sidebarItems,
  };
});

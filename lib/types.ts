type LatLongItem = {
  lat: number;
  long: number;
};

export type MapPoint = {
  id: number;
  label: string;
  description: string | null;
} & LatLongItem;

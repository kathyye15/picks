import { useMemo } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";

export default function Map() {
  const center = useMemo(
    () => ({ lat: 37.74330863129275, lng: -122.477352087827 }),
    []
  );
  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      <MarkerF position={center} />
    </GoogleMap>
  );
}

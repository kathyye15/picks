import Head from "next/head";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  if (!isLoaded) return <h1>loading........</h1>;
  return <Map />;
}

function Map() {
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

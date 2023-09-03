import React, { useCallback } from "react";
import { MarkerF } from "@react-google-maps/api";

export default function Nearby({ attractions, setEndPlaceID }) {
  return (
    <>
      {attractions.map((attraction) => (
        <MarkerF
          position={attraction.geometry.location}
          key={attraction.place_id}
          onClick={() => setEndPlaceID(attraction.place_id)}
        />
      ))}
    </>
  );
}

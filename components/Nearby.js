import React, { useCallback } from "react";
import { MarkerF } from "@react-google-maps/api";

export default function Nearby({ restaurants, setEndPlaceID }) {
  return (
    <>
      {restaurants.map((restaurant) => (
        <MarkerF
          position={restaurant.geometry.location}
          key={restaurant.place_id}
          onClick={() => setEndPlaceID(restaurant.place_id)}
        />
      ))}
    </>
  );
}

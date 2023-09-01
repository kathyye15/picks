import React from "react";
import { MarkerF } from "@react-google-maps/api";

export default function Nearby({ restaurants }) {
  return (
    <>
      {restaurants.map((restaurant) => (
        <MarkerF position={restaurant.geometry.location} />
      ))}
    </>
  );
}

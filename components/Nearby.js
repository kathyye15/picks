import React, { useContext } from "react";
import { MarkerF } from "@react-google-maps/api";
import { AppContext } from "../contexts/AppContext";

export default function Nearby() {
  const {
    nearbyAttractions,
    setUserSelectedAttraction,
    setInteracted,
  } = useContext(AppContext);
  return (
    <>
      {nearbyAttractions.map((attraction) => (
        <MarkerF
          position={attraction.geometry.location}
          key={attraction.place_id}
          onClick={() => {
            setUserSelectedAttraction(attraction);
            setInteracted(true);
          }}
        />
      ))}
    </>
  );
}

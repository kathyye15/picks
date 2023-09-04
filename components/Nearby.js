import React, { useContext } from "react";
import { MarkerF } from "@react-google-maps/api";
import { AppContext } from "../contexts/AppContext";

export default function Nearby() {
  const { attractions, setEndPlaceID } = useContext(AppContext);
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

import React, { useContext } from "react";
import { MarkerF } from "@react-google-maps/api";
import { AppContext } from "../../contexts/AppContext";

export default function Nearby() {
  const { nearbyPicks, setUserSelectedPickID } = useContext(AppContext);
  return (
    <>
      {nearbyPicks.map((pick) => (
        <MarkerF
          position={pick.geometry?.location}
          key={pick.place_id}
          onClick={() => {
            setUserSelectedPickID(pick.place_id);
          }}
        />
      ))}
    </>
  );
}

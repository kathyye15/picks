import React, { useContext } from "react";
import { MarkerF } from "@react-google-maps/api";
import { AppContext } from "../../contexts/AppContext";

export default function Searched() {
  const { searchedPlaces, setUserSelectedPickID } = useContext(AppContext);
  return (
    <>
      {searchedPlaces.map((pick) => (
        <MarkerF
          position={pick.geometry?.location}
          key={pick.place_id}
          onClick={() => {
            setUserSelectedPickID(pick.place_id);
          }}
          icon={{
            path: "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
            fillColor: "yellow",
            fillOpacity: 1,
            scale: 2,
            strokeColor: "gold",
            strokeWeight: 2,
          }}
        />
      ))}
    </>
  );
}

import React, { useContext } from "react";
import { MarkerF } from "@react-google-maps/api";
import { AppContext } from "../../contexts/AppContext";

export default function Nearby() {
  const { nearbyPicks, setUserSelectedPick } =
    useContext(AppContext);
  return (
    <>
      {nearbyPicks.map((pick) => (
        <MarkerF
          position={pick.geometry?.location}
          key={pick.place_id}
          onClick={async () => {
            const searchedPlaceDetailsResponse = await fetch(
              `api/googlePlaceDetails?placeID=${pick.place_id}`
            );
            const searchedPlaceDetails =
              await searchedPlaceDetailsResponse.json();
            setUserSelectedPick(searchedPlaceDetails.result);
          }}
        />
      ))}
    </>
  );
}

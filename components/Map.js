import React, { useCallback, useMemo, useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import {
  GoogleMap,
  MarkerF,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import PlacesAutocomplete from "./PlacesAutocomplete";
import Nearby from "./Nearby";

export default function Map() {
  const {
    searchedLocationCoordinates,
    nearbyPicks,
    directionsResponse,
    setDirectionsResponse,
    savedPicks,
  } = useContext(AppContext);

  const directionsServiceOptions = useMemo(() => {
    return {
      origin: { placeId: savedPicks?.[0]?.place_id },
      destination: { placeId: savedPicks?.at(-1)?.place_id },
      waypoints: savedPicks.slice(1, -1).map((pick) => ({
        stopover: true,
        location: {
          placeId: pick.place_id,
        },
      })),
      optimizeWaypoints: true,
      travelMode: "WALKING",
    };
  }, [savedPicks]);

  const directionsCallback = useCallback((result) => {
    setDirectionsResponse(result);
  }, []);

  const directionsResult = useMemo(() => {
    return {
      directions: directionsResponse,
    };
  }, [directionsResponse]);

  return (
    <>
      <div className="places-container">
        <span>change your picks location: </span>
        <PlacesAutocomplete />
      </div>
      <GoogleMap
        zoom={10}
        center={searchedLocationCoordinates}
        mapContainerClassName="map-container"
      >
        {searchedLocationCoordinates && (
          <MarkerF
            position={searchedLocationCoordinates}
            icon={{
              path: "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
              fillColor: "yellow",
              fillOpacity: 1,
              scale: 2,
              strokeColor: "gold",
              strokeWeight: 2,
            }}
          />
        )}
        {nearbyPicks && <Nearby />}
        {savedPicks.length > 1 && (
          <DirectionsService
            options={directionsServiceOptions}
            callback={directionsCallback}
          />
        )}
        {directionsResponse && (
          <DirectionsRenderer options={directionsResult} />
        )}
      </GoogleMap>
    </>
  );
}

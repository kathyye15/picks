import React, { useState, useCallback, useMemo } from "react";
import {
  GoogleMap,
  MarkerF,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import PlacesAutocomplete from "./PlacesAutocomplete";
import Nearby from "./Nearby";

export default function Map() {
  const [selected, setSelected] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [response, setResponse] = useState(null);
  const [startPlaceID, setStartPlaceID] = useState("");
  const [endPlaceID, setEndPlaceID] = useState("");

  const directionsServiceOptions = useMemo(() => {
    return {
      origin: { placeId: startPlaceID },
      destination: { placeId: endPlaceID },
      travelMode: "WALKING",
    };
  }, [startPlaceID, endPlaceID]);

  const directionsCallback = useCallback((result) => {
    setResponse(result);
  }, []);

  const directionsResult = useMemo(() => {
    return {
      directions: response,
    };
  }, [response]);

  return (
    <>
      <div className="places-container">
        <span>restaurants near </span>
        <PlacesAutocomplete
          setSelected={setSelected}
          setRestaurants={setRestaurants}
          setStartPlaceID={setStartPlaceID}
        />
      </div>
      <GoogleMap
        zoom={10}
        center={selected}
        mapContainerClassName="map-container"
      >
        {selected && (
          <MarkerF
            position={selected}
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
        {restaurants && (
          <Nearby restaurants={restaurants} setEndPlaceID={setEndPlaceID} />
        )}
        <DirectionsService
          options={directionsServiceOptions}
          callback={directionsCallback}
        />
        {response && <DirectionsRenderer options={directionsResult} />}
      </GoogleMap>
    </>
  );
}

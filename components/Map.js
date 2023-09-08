import React, { useCallback, useMemo, useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import PlacesAutocomplete from "./PlacesAutocomplete";
import Markers from "./Markers/Markers";
import { Flex, Box, HStack } from "@chakra-ui/react";

export default function Map() {
  const {
    searchedLocationCoordinates,
    directionsResponse,
    setDirectionsResponse,
    savedPicks,
    inExploreView,
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
    <Flex direction={"column"}>
      <Box>
        <HStack>
          <span>change your picks location: </span>
          <PlacesAutocomplete />
        </HStack>
      </Box>
      <Box flex="1">
        <GoogleMap
          zoom={10}
          center={searchedLocationCoordinates}
          mapContainerClassName="map-container"
        >
          {inExploreView && <Markers />}
          {!inExploreView && savedPicks.length > 1 && (
            <DirectionsService
              options={directionsServiceOptions}
              callback={directionsCallback}
            />
          )}
          {!inExploreView && directionsResponse && (
            <DirectionsRenderer options={directionsResult} />
          )}
        </GoogleMap>
      </Box>
    </Flex>
  );
}

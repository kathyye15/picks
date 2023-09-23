import React, { useCallback, useMemo, useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  OverlayViewF,
  OverlayView,
} from "@react-google-maps/api";
import PlacesAutocomplete from "./PlacesAutocomplete";
import Markers from "./Markers/Markers";
import { Flex, Box, Card, CardBody } from "@chakra-ui/react";

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
      <PlacesAutocomplete />
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
          {!inExploreView &&
            directionsResponse?.routes?.[0]?.legs?.length &&
            directionsResponse.routes[0].legs.map((leg, index) => (
              <OverlayViewF
                key={index}
                position={
                  leg.steps[Math.floor(leg.steps.length / 2)].start_location
                }
                mapPaneName={OverlayView.OVERLAY_LAYER}
              >
                <Card size="sm">
                  <CardBody>
                    <h1>{leg.distance.text}</h1>
                    <h1>{leg.duration.text}</h1>
                  </CardBody>
                </Card>
              </OverlayViewF>
            ))}
        </GoogleMap>
      </Box>
    </Flex>
  );
}

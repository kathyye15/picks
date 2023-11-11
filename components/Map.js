import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { GoogleMap } from "@react-google-maps/api";
import PlacesAutocomplete from "./PlacesAutocomplete";
import View from "./View/View";
import { Flex, Box } from "@chakra-ui/react";

export default function Map() {
  const { searchedLocationCoordinates } = useContext(AppContext);

  return (
    <Flex direction={"column"}>
      <PlacesAutocomplete />
      <Box flex="1">
        <GoogleMap
          zoom={10}
          center={searchedLocationCoordinates}
          mapContainerClassName="map-container"
        >
          <View />
        </GoogleMap>
      </Box>
    </Flex>
  );
}

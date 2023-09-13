import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import Link from "next/link";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { Input, List, ListItem, Box } from "@chakra-ui/react";

export default function PlacesAutocomplete() {
  const {
    setSearchedLocationCoordinates,
    setNearbyPicks,
    setSearchedCity,
    setUserSelectedPick,
    setSearchedPlaces,
    searchedPlaces,
    setUserSelectedPickID,
  } = useContext(AppContext);

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (placeID, address, terms) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSearchedLocationCoordinates({ lat, lng });
    setUserSelectedPickID(placeID);
    //TODO: add a test for city validity
    const city = terms.at(-3).value;
    setSearchedCity(city);
    const formattedCity = city.replace(/ /g, "+");
    const nearbyPlacesResponse = await fetch(
      `api/googlePlacesNearby?city=${formattedCity}`
    );
    const nearbyPlaces = await nearbyPlacesResponse.json();
    setNearbyPicks(nearbyPlaces.results);
    const searchedPlaceDetailsResponse = await fetch(
      `api/googlePlaceDetails?placeID=${placeID}`
    );
    const searchedPlaceDetails = await searchedPlaceDetailsResponse.json();
    setUserSelectedPick(searchedPlaceDetails.result);
    setSearchedPlaces([...searchedPlaces, searchedPlaceDetails.result]);
  };

  return (
    <Box position="relative" w="70%">
      <Input
        placeholder="type in location..."
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        isDisabled={!ready}
        border="1px solid"
        borderColor="gray.200"
        background="gray.50"
        borderRadius="full"
      />
      {status === "OK" && (
        <List
          position="absolute"
          top="100%"
          zIndex="1"
          backgroundColor="white"
          border="1px solid #ccc"
          borderRadius="0 0 4px 4px"
          boxShadow="'0 0 2px black'"
          maxH="200px"
          overflowY="auto"
          width="100%"
        >
          {data.map(({ place_id, description, terms }) => (
            <Link href="/picks" key={place_id}>
              <ListItem
                key={place_id}
                onClick={() => handleSelect(place_id, description, terms)}
              >
                {description}
              </ListItem>
            </Link>
          ))}
        </List>
      )}
    </Box>
  );
}

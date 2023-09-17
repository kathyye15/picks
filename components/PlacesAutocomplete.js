import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import NextLink from "next/link";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Input,
  List,
  ListItem,
  Box,
  Link,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

export default function PlacesAutocomplete() {
  const {
    setSearchedLocationCoordinates,
    setNearbyPicks,
    setSearchedCity,
    setUserSelectedPick,
    setSearchedPlaces,
    searchedPlaces,
    setUserSelectedPickID,
    setInExploreView,
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
    setInExploreView(true);
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
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="type in location..."
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          isDisabled={!ready}
          border="1px solid"
          borderColor="gray.200"
          background="gray.50"
          borderTopLeftRadius="20px"
          borderTopRightRadius="20px"
          borderBottomLeftRadius={data.length ? "0px" : "20px"}
          borderBottomRightRadius={data.length ? "0px" : "20px"}
        />
      </InputGroup>
      {status === "OK" && (
        <List
          position="absolute"
          top="100%"
          zIndex="1"
          backgroundColor="gray.50"
          borderWidth="1px"
          borderColor="gray.200"
          borderBottomRadius="4px"
          boxShadow="'0 0 2px black'"
          maxH="200px"
          overflowY="auto"
          width="100%"
        >
          {data.map(({ place_id, description, terms }) => (
            <NextLink href="/picks" key={place_id} passHref>
              <Link>
                <ListItem
                  key={place_id}
                  onClick={() => handleSelect(place_id, description, terms)}
                  _hover={{ background: "gray.200" }}
                >
                  {description}
                </ListItem>
              </Link>
            </NextLink>
          ))}
        </List>
      )}
    </Box>
  );
}

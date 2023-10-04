import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import NextLink from "next/link";
import { useRouter } from "next/router";
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
    selectedSearchbarPlaceIndex,
    setSelectedSearchbarPlaceIndex,
    setIsMapReady,
  } = useContext(AppContext);

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const router = useRouter();

  const handleSelect = async (placeID, address, terms) => {
    setValue(address, false);
    clearSuggestions();
    setInExploreView(true);
    setIsMapReady(true);
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

  const handleKeyDown = (e) => {
    if (!data.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIndex = (selectedSearchbarPlaceIndex + 1) % data.length;
      setSelectedSearchbarPlaceIndex(newIndex);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIndex =
        (selectedSearchbarPlaceIndex - 1 + data.length) % data.length;
      setSelectedSearchbarPlaceIndex(newIndex);
    } else if (e.key === "Enter" && selectedSearchbarPlaceIndex !== -1) {
      const selectedPlace = data[selectedSearchbarPlaceIndex];
      handleSelect(
        selectedPlace.place_id,
        selectedPlace.description,
        selectedPlace.terms
      );
      router.push("/picks");
    }
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
          onChange={(e) => {
            setValue(e.target.value);
            setSelectedSearchbarPlaceIndex(-1);
          }}
          onFocus={(e) => setValue(e.target.value)}
          isDisabled={!ready}
          border="1px solid"
          borderColor="gray.200"
          background="gray.50"
          borderTopLeftRadius="20px"
          borderTopRightRadius="20px"
          borderBottomLeftRadius={data.length ? "0px" : "20px"}
          borderBottomRightRadius={data.length ? "0px" : "20px"}
          onKeyDown={(e) => handleKeyDown(e)}
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
          width="100%"
        >
          {data.map(({ place_id, description, terms }, index) => (
            <Link as={NextLink} href="/picks" key={place_id} index={index}>
              <ListItem
                key={place_id}
                onClick={() => handleSelect(place_id, description, terms)}
                _hover={{ background: "gray.200" }}
                bg={
                  selectedSearchbarPlaceIndex === index
                    ? "gray.200"
                    : "transparent"
                }
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

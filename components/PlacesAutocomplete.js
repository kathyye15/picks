import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import Link from "next/link";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { OverlayTrigger, Popover, ListGroup } from "react-bootstrap";

export default function PlacesAutocomplete() {
  const {
    setSearchedLocationCoordinates,
    setNearbyPicks,
    setSearchedCity,
  } = useContext(AppContext);

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address, terms) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSearchedLocationCoordinates({ lat, lng });
    //TODO: add a test for city validity
    const city = terms.at(-3).value;
    setSearchedCity(city);
    const formattedCity = city.replace(/ /g, "+");
    const response = await fetch(`api/google?city=${formattedCity}`);
    const attractions = await response.json();
    setNearbyPicks(attractions.results);
  };

  const popover = (
    <Popover id="popover-search-results">
      <Popover.Body>
        <ListGroup>
          {data.map(({ place_id, description, terms }) => (
            <ListGroup.Item
              key={place_id}
              onClick={() => handleSelect(description, terms)}
            >
              <Link href="/picks">{description}</Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Popover.Body>
    </Popover>
  );

  return (
    <span id="searchbox">
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={popover}
        show={status === "OK" && value !== ""}
      >
        <input
          className="search-input"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          placeholder="search..."
        />
      </OverlayTrigger>
    </span>
  );
}

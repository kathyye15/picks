import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { OverlayTrigger, Popover, ListGroup } from "react-bootstrap";

export default function PlacesAutocomplete({
  setSelected,
  setRestaurants,
  setStartPlaceID,
}) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
    setStartPlaceID(results[0].place_id);
    //TODO: Create nearby results interface
    const response = await fetch(`api/google?lat=${lat}&lng=${lng}`);
    const restaurants = await response.json();
    setRestaurants(restaurants.results);
  };

  const popover = (
    <Popover id="popover-search-results">
      <Popover.Body>
        <ListGroup>
          {data.map(({ place_id, description }) => (
            <ListGroup.Item
              key={place_id}
              onClick={() => handleSelect(description)}
            >
              {description}
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
          placeholder="Search an address"
        />
      </OverlayTrigger>
    </span>
  );
}

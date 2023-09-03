import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { OverlayTrigger, Popover, ListGroup } from "react-bootstrap";

export default function PlacesAutocomplete({
  setSelected,
  setAttractions,
  setStartPlaceID,
}) {
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
    setSelected({ lat, lng });
    setStartPlaceID(results[0].place_id);
    //TODO: add a test for city validity
    const city = terms.at(-3).value.replace(/ /g, "+");
    const response = await fetch(`api/google?city=${city}`);
    const attractions = await response.json();
    setAttractions(attractions.results);
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

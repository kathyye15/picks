import React, { useState } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { OverlayTrigger, Popover, ListGroup } from "react-bootstrap";

export default function Map() {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} />
      </div>
      <GoogleMap
        zoom={10}
        center={selected}
        mapContainerClassName="map-container"
      >
        {selected && <MarkerF position={selected} />}
      </GoogleMap>
    </>
  );
}

function PlacesAutocomplete({ setSelected }) {
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
    <div id="searchbox">
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
    </div>
  );
}

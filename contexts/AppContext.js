import React, { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [searchedLocationCoordinates, setSearchedLocationCoordinates] =
    useState(null);
  const [searchedCity, setSearchedCity] = useState("");
  const [userSelectedAttraction, setUserSelectedAttraction] = useState({});
  const [nearbyAttractions, setNearbyAttractions] = useState([]);
  const [savedAttractions, setSavedAttractions] = useState([]);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [inExploreView, setInExploreView] = useState(true);
  const [interacted, setInteracted] = useState(false);
  return (
    <AppContext.Provider
      value={{
        searchedLocationCoordinates,
        setSearchedLocationCoordinates,
        searchedCity,
        setSearchedCity,
        userSelectedAttraction,
        setUserSelectedAttraction,
        nearbyAttractions,
        setNearbyAttractions,
        savedAttractions,
        setSavedAttractions,
        directionsResponse,
        setDirectionsResponse,
        inExploreView,
        setInExploreView,
        interacted,
        setInteracted,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

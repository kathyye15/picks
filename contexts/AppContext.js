import React, { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [searchedLocationCoordinates, setSearchedLocationCoordinates] =
    useState(null);
  const [searchedCity, setSearchedCity] = useState("");
  const [userSelectedPick, setUserSelectedPick] = useState({});
  const [nearbyPicks, setNearbyPicks] = useState([]);
  const [savedPicks, setSavedPicks] = useState([]);
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
        userSelectedPick,
        setUserSelectedPick,
        nearbyPicks,
        setNearbyPicks,
        savedPicks,
        setSavedPicks,
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

import React, { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [searchedPlaceID, setSearchedPlaceID] = useState("");
  const [searchedLocationCoordinates, setSearchedLocationCoordinates] =
    useState(null);
  const [searchedCity, setSearchedCity] = useState("");
  const [userSelectedPick, setUserSelectedPick] = useState({});
  const [nearbyPicks, setNearbyPicks] = useState([]);
  const [savedPicks, setSavedPicks] = useState([]);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [inExploreView, setInExploreView] = useState(true);
  return (
    <AppContext.Provider
      value={{
        searchedPlaceID,
        setSearchedPlaceID,
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

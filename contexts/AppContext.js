import React, { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [searchedPlaces, setSearchedPlaces] = useState([]);
  const [searchedLocationCoordinates, setSearchedLocationCoordinates] =
    useState(null);
  const [searchedCity, setSearchedCity] = useState("");
  const [userSelectedPick, setUserSelectedPick] = useState({});
  const [userSelectedPickID, setUserSelectedPickID] = useState("");
  const [nearbyPicks, setNearbyPicks] = useState([]);
  const [savedPicks, setSavedPicks] = useState([]);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [inExploreView, setInExploreView] = useState(true);
  const [selectedSearchbarPlaceIndex, setSelectedSearchbarPlaceIndex] =
    useState(-1);
  const [isMapReady, setIsMapReady] = useState(false);
  return (
    <AppContext.Provider
      value={{
        searchedPlaces,
        setSearchedPlaces,
        searchedLocationCoordinates,
        setSearchedLocationCoordinates,
        searchedCity,
        setSearchedCity,
        userSelectedPick,
        setUserSelectedPick,
        userSelectedPickID,
        setUserSelectedPickID,
        nearbyPicks,
        setNearbyPicks,
        savedPicks,
        setSavedPicks,
        directionsResponse,
        setDirectionsResponse,
        inExploreView,
        setInExploreView,
        selectedSearchbarPlaceIndex,
        setSelectedSearchbarPlaceIndex,
        isMapReady,
        setIsMapReady,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

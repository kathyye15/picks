import React, { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [selected, setSelected] = useState(null);
  const [userSelectedAttraction, setUserSelectedAttraction] = useState({});
  const [attractions, setAttractions] = useState([]);
  const [savedAttractions, setSavedAttractions] = useState([]);
  const [response, setResponse] = useState(null);
  const [startPlaceID, setStartPlaceID] = useState("");
  const [endPlaceID, setEndPlaceID] = useState("");
  const [inExplore, setInExplore] = useState(true);

  return (
    <AppContext.Provider
      value={{
        selected,
        setSelected,
        attractions,
        setAttractions,
        savedAttractions,
        setSavedAttractions,
        response,
        setResponse,
        startPlaceID,
        setStartPlaceID,
        endPlaceID,
        setEndPlaceID,
        inExplore,
        setInExplore,
        userSelectedAttraction,
        setUserSelectedAttraction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

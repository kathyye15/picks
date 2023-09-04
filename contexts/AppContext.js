import React, { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [selected, setSelected] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [response, setResponse] = useState(null);
  const [startPlaceID, setStartPlaceID] = useState("");
  const [endPlaceID, setEndPlaceID] = useState("");

  return (
    <AppContext.Provider
      value={{
        selected,
        setSelected,
        attractions,
        setAttractions,
        response,
        setResponse,
        startPlaceID,
        setStartPlaceID,
        endPlaceID,
        setEndPlaceID,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

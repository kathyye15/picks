import { useContext } from "react";
import { MarkerF } from "@react-google-maps/api";
import { AppContext } from "../../contexts/AppContext";

export default function SavedMarker() {
  const { savedPicks } = useContext(AppContext);
  return (
    <>
      {savedPicks?.map((pick) => (
        <MarkerF
          position={pick.geometry?.location}
          key={pick.place_id}
          onClick={() => {
            setUserSelectedPickID(pick.place_id);
          }}
        />
      ))} 
    </>
  );
}

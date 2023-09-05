import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

export default function Saved() {
  const { savedAttractions, inExplore, setInExplore } = useContext(AppContext);
  return (
    <>
      <h1>Day 1:</h1>
      <h2>Places to visit:</h2>
      <button
        onClick={() => {
          setInExplore(!inExplore);
        }}
      >
        toggle explore/saved view
      </button>
      <ul>
        {savedAttractions.map((attraction) => (
          <li key={attraction.place_id}>{attraction.name}</li>
        ))}
      </ul>
    </>
  );
}

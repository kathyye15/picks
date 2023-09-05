import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

export default function Saved() {
  const { savedAttractions, inExploreView, setInExploreView } = useContext(AppContext);
  return (
    <div className="saved-sidebar">
      <h1>Day 1:</h1>
      <h2>Places to visit:</h2>
      <button
        onClick={() => {
          setInExploreView(!inExploreView);
        }}
      >
        toggle explore/saved view
      </button>
      <ul>
        {savedAttractions.map((attraction) => (
          <li key={attraction.place_id}>{attraction.name}</li>
        ))}
      </ul>
    </div>
  );
}

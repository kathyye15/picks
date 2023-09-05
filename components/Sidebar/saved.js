import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

export default function Saved() {
  const { savedPicks, inExploreView, setInExploreView } =
    useContext(AppContext);
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
      <ol>
        {savedPicks.map((pick) => (
          <li key={pick.place_id}>{pick.name}</li>
        ))}
      </ol>
    </div>
  );
}

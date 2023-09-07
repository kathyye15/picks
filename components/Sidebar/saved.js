import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

export default function Saved() {
  const { savedPicks, setSavedPicks, inExploreView, setInExploreView } =
    useContext(AppContext);
  return (
    <div className="saved-sidebar">
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
          <li key={pick.place_id}>
            {pick.name}
            <button
              onClick={() => {
                setSavedPicks(
                  savedPicks.filter(
                    (savedPick) => savedPick.place_id !== pick.place_id
                  )
                );
              }}
            >
              remove pick
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

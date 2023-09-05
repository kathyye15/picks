import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

export default function Explore() {
  const {
    userSelectedPick,
    savedPicks,
    setSavedPicks,
    inExploreView,
    setInExploreView,
  } = useContext(AppContext);
  return (
    <div className="explore-sidebar">
      <div className="interacted">
        <h1>{userSelectedPick?.name}</h1>
        {userSelectedPick?.name ? (
          <img
            src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${userSelectedPick?.photos?.[0]?.photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
            alt="attraction photo"
          />
        ) : (
          <div>no image</div>
        )}

        <button
          onClick={() => {
            setSavedPicks([...new Set([...savedPicks, userSelectedPick])]);
          }}
        >
          save pick
        </button>
        <button
          onClick={() => {
            setInExploreView(!inExploreView);
          }}
        >
          toggle explore/saved view
        </button>

        <div>description: </div>
        <ul>
          <li>{`ratings & reviews: ${userSelectedPick?.rating} stars, ${userSelectedPick?.user_ratings_total} reviews`}</li>
          <li>price: </li>
          <li>{`address: ${userSelectedPick?.formatted_address}`}</li>
          <li>hours: </li>
          <li>parking info: </li>
        </ul>
      </div>
    </div>
  );
}

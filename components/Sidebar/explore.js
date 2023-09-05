import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

export default function Explore() {
  const {
    userSelectedAttraction,
    savedAttractions,
    setSavedAttractions,
    inExplore,
    setInExplore,
  } = useContext(AppContext);
  return (
    <>
      <h1>{userSelectedAttraction?.name}</h1>
      {userSelectedAttraction?.name ? (
        <img
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${userSelectedAttraction?.photos[0]?.photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
          alt="attraction photo"
        />
      ) : (
        <div>no image</div>
      )}

      <button
        onClick={() => {
          setSavedAttractions([
            ...new Set([...savedAttractions, userSelectedAttraction]),
          ]);
        }}
      >
        save pick
      </button>
      <button
        onClick={() => {
          setInExplore(!inExplore);
        }}
      >
        toggle explore/saved view
      </button>

      <div>description: </div>
      <ul>
        <li>{`ratings & reviews: ${userSelectedAttraction?.rating} stars, ${userSelectedAttraction?.user_ratings_total} reviews`}</li>
        <li>price: </li>
        <li>{`address: ${userSelectedAttraction?.formatted_address}`}</li>
        <li>hours: </li>
        <li>parking info: </li>
      </ul>
    </>
  );
}

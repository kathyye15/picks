import { useContext, useCallback, useMemo } from "react";
import { AppContext } from "../../contexts/AppContext";

export default function Explore() {
  const {
    userSelectedPick,
    savedPicks,
    setSavedPicks,
    inExploreView,
    setInExploreView,
  } = useContext(AppContext);

  const toggleSaveCallback = useCallback(() => {
    if (saveButtonText === "save pick") {
      setSavedPicks([...new Set([...savedPicks, userSelectedPick])]);
    } else {
      setSavedPicks(savedPicks.slice(0, savedPicks.length - 1));
    }
  }, [userSelectedPick, savedPicks]);

  const saveButtonText = useMemo(() => {
    return savedPicks?.find(
      (pick) => pick.place_id === userSelectedPick.place_id
    )
      ? "saved"
      : "save pick";
  }, [userSelectedPick, savedPicks]);

  return (
    <div className="explore-sidebar">
      <h1>{userSelectedPick?.name}</h1>
      {userSelectedPick?.name ? (
        <img
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${userSelectedPick?.photos?.[0]?.photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
          alt="attraction photo"
        />
      ) : (
        <div>no image</div>
      )}

      <button onClick={toggleSaveCallback}>{saveButtonText}</button>
      <button
        onClick={() => {
          setInExploreView(!inExploreView);
        }}
      >
        toggle explore/saved view
      </button>

      <ul>
        <li>{`Ratings & Reviews: ${userSelectedPick?.rating} stars, ${userSelectedPick?.user_ratings_total} reviews`}</li>
        <li>
          Price:{" "}
          {Number.isInteger(userSelectedPick?.price_level)
            ? userSelectedPick.price_level === 0
              ? "Free"
              : "$".repeat(userSelectedPick.price_level)
            : "Not available"}
        </li>
        <li>
          Address: {userSelectedPick?.formatted_address || "Not available"}
        </li>
        <li>
          Hours:
          {userSelectedPick?.current_opening_hours?.weekday_text?.length ? (
            <ul>
              {userSelectedPick.current_opening_hours.weekday_text.map(
                (daySchedule, index) => (
                  <li key={index}>{daySchedule}</li>
                )
              )}
            </ul>
          ) : (
            "Not available"
          )}
        </li>
        <li>
          Phone: {userSelectedPick?.formatted_phone_number || "Not available"}
        </li>
        <li>
          Website:
          {userSelectedPick?.website ? (
            <a
              href={userSelectedPick.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {userSelectedPick.website}
            </a>
          ) : (
            "Not available"
          )}
        </li>
      </ul>
    </div>
  );
}

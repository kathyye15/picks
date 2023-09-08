import useSWRImmutable from "swr/immutable";
import { useContext, useCallback, useMemo, useEffect } from "react";
import { AppContext } from "../../contexts/AppContext";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Image,
  ListItem,
  UnorderedList,
  Heading,
} from "@chakra-ui/react";

export default function Explore() {
  const {
    userSelectedPick,
    setUserSelectedPick,
    userSelectedPickID,
    savedPicks,
    setSavedPicks,
    inExploreView,
    setInExploreView,
  } = useContext(AppContext);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data: selectedPickDetails } = useSWRImmutable(
    `api/googlePlaceDetails?placeID=${userSelectedPickID}`,
    fetcher
  );

  useEffect(() => {
    if (selectedPickDetails) {
      setUserSelectedPick(selectedPickDetails.result);
    }
  }, [selectedPickDetails, setUserSelectedPick]);

  const toggleSaveCallback = useCallback(() => {
    if (saveButtonText === "save pick") {
      setSavedPicks([...new Set([...savedPicks, userSelectedPick])]);
    } else {
      setSavedPicks(
        savedPicks.filter((pick) => pick.place_id !== userSelectedPick.place_id)
      );
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
    <Card className="explore-sidebar">
      <CardBody>
        <CardHeader color="brand.navy">
          {" "}
          <Heading size="md">{userSelectedPick?.name}</Heading>
        </CardHeader>
        {userSelectedPick?.name ? (
          <Image
            src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${userSelectedPick?.photos?.[0]?.photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
            alt="attraction photo"
          />
        ) : (
          <div>no image</div>
        )}

        <Button
          colorScheme="blue"
          variant="outline"
          onClick={toggleSaveCallback}
        >
          {saveButtonText}
        </Button>
        <Button
          colorScheme="blue"
          variant="outline"
          onClick={() => {
            setInExploreView(!inExploreView);
          }}
        >
          toggle explore/saved view
        </Button>
        <UnorderedList>
          <ListItem>{`Ratings & Reviews: ${userSelectedPick?.rating} stars, ${userSelectedPick?.user_ratings_total} reviews`}</ListItem>
          <ListItem>
            Price:{" "}
            {Number.isInteger(userSelectedPick?.price_level)
              ? userSelectedPick.price_level === 0
                ? "Free"
                : "$".repeat(userSelectedPick.price_level)
              : "Not available"}
          </ListItem>
          <ListItem>
            Address: {userSelectedPick?.formatted_address || "Not available"}
          </ListItem>
          <ListItem>
            Hours:
            {userSelectedPick?.current_opening_hours?.weekday_text?.length ? (
              <UnorderedList>
                {userSelectedPick.current_opening_hours.weekday_text.map(
                  (daySchedule, index) => (
                    <ListItem key={index}>{daySchedule}</ListItem>
                  )
                )}
              </UnorderedList>
            ) : (
              "Not available"
            )}
          </ListItem>
          <ListItem>
            Phone: {userSelectedPick?.formatted_phone_number || "Not available"}
          </ListItem>
          <ListItem>
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
          </ListItem>
        </UnorderedList>
      </CardBody>
    </Card>
  );
}

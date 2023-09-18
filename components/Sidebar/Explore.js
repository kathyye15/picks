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
  Link,
  Text,
} from "@chakra-ui/react";
import { PhoneIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import Rating from "../../utils/Rating";

export default function Explore() {
  const {
    userSelectedPick,
    setUserSelectedPick,
    userSelectedPickID,
    savedPicks,
    setSavedPicks,
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
    <Card className="explore-sidebar" variant="filled">
      <CardBody>
        <CardHeader color="brand.navy">
          {" "}
          <Heading size="lg">{userSelectedPick?.name}</Heading>
        </CardHeader>
        {userSelectedPick?.name ? (
          <Image
            src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${userSelectedPick?.photos?.[0]?.photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
            alt={`photo of ${userSelectedPick?.name || "selected pick"}`}
            borderRadius="lg"
            w="100%"
            h="300px"
            objectFit="cover"
          />
        ) : (
          <div>no image</div>
        )}
        <Text>{userSelectedPick?.editorial_summary?.overview}</Text>
        <Button
          colorScheme="blue"
          variant={saveButtonText === "save pick" ? "outline" : "solid"}
          onClick={toggleSaveCallback}
        >
          {saveButtonText}
        </Button>
        <UnorderedList styleType="none">
          <ListItem>
            <Rating rating={userSelectedPick?.rating} />
            {` ${userSelectedPick?.user_ratings_total} reviews`}
          </ListItem>
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
              <UnorderedList styleType="none">
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
            <PhoneIcon />
            {" : "}
            {userSelectedPick?.formatted_phone_number || "Not available"}
          </ListItem>
          <ListItem>
            Website:{" "}
            {userSelectedPick?.website ? (
              <Link
                href={userSelectedPick.website}
                target="_blank"
                rel="noopener noreferrer"
                color="teal.500"
                isExternal
              >
                {userSelectedPick.website} <ExternalLinkIcon />
              </Link>
            ) : (
              "Not available"
            )}
          </ListItem>
        </UnorderedList>
      </CardBody>
    </Card>
  );
}

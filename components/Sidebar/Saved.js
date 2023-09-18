import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Heading,
  VStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

export default function Saved() {
  const { savedPicks, setSavedPicks } = useContext(AppContext);
  return (
    <>
      <Heading size="lg" color="brand.navy">
        Places to visit:
      </Heading>
      <VStack className="saved-sidebar">
        {savedPicks.map((pick, index) => (
          <Card
            key={pick.place_id}
            variant="filled"
            w="100%"
            h="248px"
            direction={{ base: "column", sm: "row" }}
            position="relative"
          >
            {" "}
            <Image
              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${pick?.photos?.[0]?.photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
              maxW={{ base: "100%", sm: "200px" }}
              objectFit="cover"
              alt={`photo of ${pick?.name || "saved pick"}`}
            />
            <CardBody>
              <CardHeader>
                <Heading size="md"> {`${index + 1}. ${pick.name}`}</Heading>
              </CardHeader>
              <Text>{pick?.editorial_summary?.overview}</Text>
              <Button
                position="absolute"
                top="0"
                right="0"
                colorScheme="blue"
                variant="ghost"
                onClick={() => {
                  setSavedPicks(
                    savedPicks.filter(
                      (savedPick) => savedPick.place_id !== pick.place_id
                    )
                  );
                }}
              >
                <DeleteIcon />
              </Button>
            </CardBody>
          </Card>
        ))}
      </VStack>
    </>
  );
}

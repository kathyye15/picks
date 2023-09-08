import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  ListItem,
  OrderedList,
  Heading,
} from "@chakra-ui/react";

export default function Saved() {
  const { savedPicks, setSavedPicks, inExploreView, setInExploreView } =
    useContext(AppContext);
  return (
    <Card className="saved-sidebar">
      <CardBody>
        <CardHeader color="brand.navy">
          <Heading size="md">Places to visit:</Heading>
        </CardHeader>
        <Button
          colorScheme="blue"
          variant="outline"
          onClick={() => {
            setInExploreView(!inExploreView);
          }}
        >
          toggle explore/saved view
        </Button>
        <OrderedList>
          {savedPicks.map((pick) => (
            <ListItem key={pick.place_id}>
              {pick.name}
              <Button
                colorScheme="blue"
                variant="outline"
                onClick={() => {
                  setSavedPicks(
                    savedPicks.filter(
                      (savedPick) => savedPick.place_id !== pick.place_id
                    )
                  );
                }}
              >
                remove pick
              </Button>
            </ListItem>
          ))}
        </OrderedList>
      </CardBody>
    </Card>
  );
}

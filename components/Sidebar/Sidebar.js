import { useContext } from "react";
import Explore from "./Explore";
import Saved from "./Saved";
import { AppContext } from "../../contexts/AppContext";
import { Heading } from "@chakra-ui/react";

export default function Sidebar() {
  const { inExploreView, searchedCity } = useContext(AppContext);
  return (
    <div className="sidebar">
      <Heading
        color="brand.navy"
        as="h1"
        p={8}
      >{`${searchedCity} Picks`}</Heading>
      {inExploreView ? <Explore /> : <Saved />}
    </div>
  );
}

import { useContext } from "react";
import Explore from "./Explore";
import Saved from "./Saved";
import { AppContext } from "../../contexts/AppContext";
import {
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

export default function Sidebar() {
  const { setInExploreView, searchedCity } = useContext(AppContext);
  return (
    <>
      <Heading
        color="brand.navy"
        as="h1"
        p={8}
      >{`${searchedCity} Picks`}</Heading>
      <Tabs
        className="sidebar"
        size="md"
        variant="enclosed"
        defaultIndex={0}
        isLazy
      >
        <TabList>
          <Tab
            onClick={(ev) => {
              console.log(ev.target.textContent);
              setInExploreView(ev.target.textContent === "Explore");
            }}
          >
            Explore
          </Tab>
          <Tab
            onClick={(ev) => {
              console.log(ev.target.textContent);
              setInExploreView(ev.target.textContent === "Explore");
            }}
          >
            Saved
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Explore />
          </TabPanel>
          <TabPanel>
            <Saved />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

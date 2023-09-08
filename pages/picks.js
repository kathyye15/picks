import Map from "../components/Map";
import Sidebar from "../components/Sidebar/Sidebar";
import { Flex, Box } from "@chakra-ui/react";

export default function Picks() {
  return (
    <Flex>
      <Box w="30%">
        <Sidebar />
      </Box>
      <Box w="70%">
        <Map />
      </Box>
    </Flex>
  );
}

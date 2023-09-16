import Map from "../components/Map";
import Sidebar from "../components/Sidebar/Sidebar";
import { Flex, Box, Center } from "@chakra-ui/react";

export default function Picks() {
  return (
    <Flex>
      <Box w="35%">
        <Center>
          <Sidebar />
        </Center>
      </Box>
      <Box w="65%">
        <Map />
      </Box>
    </Flex>
  );
}

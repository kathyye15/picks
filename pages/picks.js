import { useRouter } from "next/router";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import Map from "../components/Map";
import Sidebar from "../components/Sidebar/Sidebar";
import { Flex, Box } from "@chakra-ui/react";

export default function Picks() {
  const router = useRouter();
  const { isMapReady } = useContext(AppContext);

  try {
    if (isMapReady) {
      return (
        <Flex>
          <Box w="35%">
            <Sidebar />
          </Box>
          <Box w="65%">
            <Map />
          </Box>
        </Flex>
      );
    } else {
      router.push("/");
    }
  } catch (e) {
    console.error(e);
  }
}

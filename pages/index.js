import { useLoadScript } from "@react-google-maps/api";
import PlacesAutocomplete from "../components/PlacesAutocomplete";
import { Box, Img, Center } from "@chakra-ui/react";

const libraries = ["places"];
export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });
  if (!isLoaded) return <h1>loading........</h1>;
  return (
    <Box position="relative" width="100vw" height="100vh" overflow="hidden">
      <Img
        src="/png/landingPage5.png"
        alt="picks landing page"
        width="100%"
        height="100%"
        objectFit="cover"
        zIndex="-1"
      />
      <Center position="absolute" top="52%" right="67%">
        <Box width="580px">
          <PlacesAutocomplete />
        </Box>
      </Center>
    </Box>
  );
}

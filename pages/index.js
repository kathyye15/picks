import { useLoadScript } from "@react-google-maps/api";
import PlacesAutocomplete from "../components/PlacesAutocomplete";
import { Box, Img, Center, Text, Stack } from "@chakra-ui/react";

const libraries = ["places"];
export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });
  if (!isLoaded) return <h1>loading........</h1>;
  return (
    <Box position="relative" width="100%" height="92vh">
      <Img
        src="/png/landingPage6.png"
        alt="picks landing page"
        width="100%"
        height="100%"
        objectFit="cover"
        zIndex="-1"
      />
      <Stack position="absolute" top="28%" ml={20}>
        <Text fontSize="5xl" color="brand.navy">
          PICKS
        </Text>
        <Text fontSize="3xl" color="brand.navy">
          FROM YOUR FAVORITE PLACE
        </Text>
        <PlacesAutocomplete />
      </Stack>
    </Box>
  );
}

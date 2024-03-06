import { useLoadScript } from '@react-google-maps/api';
import PlacesAutocomplete from '../components/PlacesAutocomplete';
import { Box, Img, Text, Stack } from '@chakra-ui/react';
import { auth } from '../firebase-config';
import { connectAuthEmulator } from 'firebase/auth';

const libraries = ['places'];
export default function Home() {
  connectAuthEmulator(auth, 'http://localhost:9099');
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

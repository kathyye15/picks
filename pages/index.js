import { useLoadScript } from "@react-google-maps/api";
import PlacesAutocomplete from "../components/PlacesAutocomplete";

const libraries = ["places"];
export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });
  if (!isLoaded) return <h1>loading........</h1>;
  return (
    <>
      <div>Start your guide! Type in location or search by city:</div>
      <PlacesAutocomplete />
    </>
  );
}

//TODO: Find directions information between two points, render on map
//https://developers.google.com/maps/documentation/directions/overview
export default function directions(req, res) {
  fetch(
    `https://maps.googleapis.com/maps/api/directions/json?avoid=highways&destination=Montreal&mode=bicycling&origin=Toronto&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      res.status(200).json(data);
    });
}

export default function fetchPlaceDetails(req, res) {
  fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.query.placeID}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      res.status(200).json(data);
    });
}

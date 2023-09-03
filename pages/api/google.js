export default function handler(req, res) {
  fetch(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.query.city}+point+of+interest&language=en&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      res.status(200).json(data);
    });
}

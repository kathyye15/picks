export default function handler(req, res) {
  //TODO: Incorporate dynamic and default queries
  fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=cruise&location=${req.query.lat}%2C${req.query.lng}&radius=1500&type=restaurant&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      res.status(200).json(data);
    });
}

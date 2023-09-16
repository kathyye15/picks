import { StarIcon } from "@chakra-ui/icons";

export default function Rating({ rating }) {
  var roundedRating = [];
  if (rating) {
    roundedRating = new Array(Math.round(rating)).fill(null);
  }
  return (
    <>
      {roundedRating.map((_, index) => (
        <StarIcon key={index} />
      ))}
    </>
  );
}

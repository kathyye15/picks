import { useContext } from "react";
import Explore from "./Explore";
import Saved from "./Saved";
import { AppContext } from "../../contexts/AppContext";

export default function Sidebar() {
  const { inExploreView, searchedCity } = useContext(AppContext);
  return (
    <div className="sidebar">
      <h1>{`${searchedCity} Picks`}</h1>
      {inExploreView ? <Explore /> : <Saved />}
    </div>
  );
}

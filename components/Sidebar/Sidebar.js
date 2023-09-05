import { useContext } from "react";
import Explore from "./Explore";
import Saved from "./Saved";
import { AppContext } from "../../contexts/AppContext";

export default function Sidebar() {
  const { inExploreView, searchedCity, interacted } = useContext(AppContext);
  return (
    <div className="sidebar">
      <h1>{`${searchedCity} Picks`}</h1>
      {interacted ? (
        inExploreView ? (
          <Explore />
        ) : (
          <Saved />
        )
      ) : (
        <>
          <h2>Hello, welcome to the picks app!</h2>
          <div>
            Start exploring your picks by clicking on any marker on the map.
          </div>
        </>
      )}
    </div>
  );
}

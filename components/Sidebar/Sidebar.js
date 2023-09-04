import { useContext } from "react";
import Explore from "./explore";
import Saved from "./saved";
import { AppContext } from "../../contexts/AppContext";

export default function Sidebar() {
  const { inExplore } = useContext(AppContext);
  if (inExplore) return <Explore />;
  return <Saved />;
}

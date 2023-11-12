import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import ExploreView from "./ExploreView";
import SavedView from "./SavedView";

export default function View() {
  const { inExploreView } = useContext(AppContext);

  return inExploreView ? <ExploreView /> : <SavedView />;
}

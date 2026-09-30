import { useEffect } from "react";
import { useLocation } from "react-router";
import useGameQueryStore from "../../store";

function ScrollToTop() {
  const { pathname } = useLocation();
  const genreId = useGameQueryStore((s) => s.gameQuery.genreId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, genreId]);

  return null;
}

export default ScrollToTop;

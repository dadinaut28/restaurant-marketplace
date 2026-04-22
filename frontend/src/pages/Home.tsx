import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import type { contextType } from "../App";
import { Main } from "../components/Main";

export function Home() {
  const { onPageTransition } = useOutletContext<contextType>();

  useEffect(() => {
    onPageTransition();
  }, []);

  return (
    <div>
      <Main />
    </div>
  );
}

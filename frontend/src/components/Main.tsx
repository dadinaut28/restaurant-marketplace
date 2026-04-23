import { useNavigate, useOutletContext } from "react-router-dom";
import { Button } from "./ui/button";
import type { contextType } from "../App";

export function Main() {
  const { onLargeScreen } = useOutletContext<contextType>();
  const navigate = useNavigate();
  return (
    <div
      style={{ height: "calc(100vh - 56px)" }}
      className="w-full main-section pt-[10%] px-[10%]"
    >
      {onLargeScreen && (
        <p
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "20px",
          }}
          className="text-center text-sm text-white font-medium mb-7 bg-[] py-2 px-3 rounded-2xl border border-orange-500"
        >
          Platform vous permet de commander vos repas auprès de plusieurs
          restaurants, le tout au même endroit.
        </p>
      )}
      <h2 className="text-center mt-[20vh] text-2xl leading-8 md:leading-10 md:text-3xl lg:text-5xl lg:leading-14 text-gray-200 md:mt-0 font-semibold outline-orange-500">
        COMMANDEZ VOS <span className="text-orange-500">PLATS PRÉFÉRÉS</span>,
        OU QUE VOUS SOYEZ, EN QUELQUES CLICS.
      </h2>
      <div className="flex justify-center mt-8">
        <Button
          onClick={() => navigate("/restaurants")}
          className="text-lg text-black bg-orange-500 py-5 px-8 rounded-2xl"
        >
          <img
            className="w-8"
            src=".././icons/arrow_icon.svg"
            alt="Icone fleche"
          />
          Voir les restaurants
        </Button>
      </div>
    </div>
  );
}

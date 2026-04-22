import { Button } from "./ui/button";
import { Input } from "./ui/input";
import hamburger from "../assets/hamburger.svg";
import { useOutletContext } from "react-router-dom";
import type { RestaurantDashboardContext } from "../pages/RestaurantDashboard";

export function RestaurantDashboardOrderNavBar() {
  const { onLargeScreen, handleHamburgerClick } =
    useOutletContext<RestaurantDashboardContext>();
  return (
    <nav className="h-12 fixed top-0 px-5 border-l border-gray-200 flex gap-3 items-center bg-white w-full">
      {!onLargeScreen && (
        <Button onClick={handleHamburgerClick} className="bg-transparent">
          <img className="w-8 h-8" src={hamburger} alt="Icone hamburger" />
        </Button>
      )}
      <form className="flex gap-2.5">
        <Input
          name="criteria"
          className="w-60 md:w-xl "
          placeholder="ID, nom ou prénom du client"
        />
        <Button>Chercher</Button>
      </form>
    </nav>
  );
}

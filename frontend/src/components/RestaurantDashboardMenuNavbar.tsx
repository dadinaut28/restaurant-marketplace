import { Button } from "./ui/button";
import { Input } from "./ui/input";
import hamburger from "../assets/hamburger.svg";
import search from "../assets/gray-search.svg";
import { useOutletContext } from "react-router-dom";
import type { RestaurantDashboardContext } from "../pages/RestaurantDashboard";

interface Props {
  onLargeScreen: boolean;
}

export function RestaurantDashboardMenuNavbar({ onLargeScreen }: Props) {
  const { handleHamburgerClick } =
    useOutletContext<RestaurantDashboardContext>();
  return (
    <nav className="flex fixed top-0 items-center border-l border-gray-200 justify-between w-full px-5 h-12 bg-white ">
      {!onLargeScreen && (
        <Button onClick={handleHamburgerClick} className="bg-transparent">
          <img className="w-8" src={hamburger} alt="Icone hamburger" />
        </Button>
      )}

      <form className="flex gap-3 ">
        <Input name="criteria" placeholder="Rechercher un plat" />
        <Button className="flex justify-center items-center  bg-gray-100">
          <img className="h-4 w-4" src={search} alt="Icone recherche" />
        </Button>
      </form>
      {/* <Button>Profil</Button> */}
    </nav>
  );
}

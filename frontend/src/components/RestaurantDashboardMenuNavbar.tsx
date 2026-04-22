import { Button } from "./ui/button";
import { Input } from "./ui/input";
import hamburger from "../assets/hamburger.svg";
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
      <div className="flex gap-3">
        {!onLargeScreen && (
          <Button onClick={handleHamburgerClick} className="bg-transparent">
            <img className="w-8" src={hamburger} alt="Icone hamburger" />
          </Button>
        )}
        <form className="flex gap-3">
          <Input name="criteria" placeholder="Rechercher un plat" />
          <Button>Chercher</Button>
        </form>
      </div>
      <Button>Profil</Button>
    </nav>
  );
}

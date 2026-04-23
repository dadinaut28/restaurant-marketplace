import { Button } from "./ui/button";
import hamburger from "../assets/hamburger.svg";
import { useOutletContext } from "react-router-dom";
import type { RestaurantDashboardContext } from "../pages/RestaurantDashboard";

export function DashboardAnalyticsNavBar() {
  const { onLargeScreen, handleHamburgerClick } =
    useOutletContext<RestaurantDashboardContext>();
  return (
    <nav className="h-10 flex items-center px-5 border-b border-gray-50 bg-white">
      {!onLargeScreen && (
        <Button onClick={handleHamburgerClick} className="bg-transparent">
          <img className="w-8 h-8" src={hamburger} alt="Icone menu" />
        </Button>
      )}
    </nav>
  );
}

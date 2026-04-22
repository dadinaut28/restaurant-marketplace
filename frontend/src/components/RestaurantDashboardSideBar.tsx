import { Link, useLocation } from "react-router-dom";
import type { Restaurant } from "../types";

interface Props {
  onLargeScreen: boolean;
  hideSideBar: boolean;
  restaurant: Restaurant;
}

export function RestaurantDashboardSideBar({
  onLargeScreen,
  hideSideBar,
  restaurant,
}: Props) {
  const { pathname } = useLocation();

  return (
    <div
      className={`${!onLargeScreen && "fixed left-0 bottom-0 top-10 border border-gray-100 shadow-md"} ${hideSideBar && "-translate-x-full "} py-5 w-60 shadow bg-white`}
    >
      <div className="fixed w-60">
        <h2 className="px-8 title text-2xl font-medium">{restaurant?.name}</h2>
        <div className="mt-7 flex font-medium flex-col gap-5 text-gray-500">
          <Link
            className={`${pathname === "/restaurant-dashboard/menu" && "bg-orange-50 p-2 text-orange-500"} px-8 flex relative`}
            to="/restaurant-dashboard/menu"
          >
            {pathname === "/restaurant-dashboard/menu" && (
              <div className="w-1.5 rounded-r-sm absolute left-0 top-0 bottom-0 bg-orange-500"></div>
            )}
            Menu
          </Link>
          <Link
            className={`${pathname === "/restaurant-dashboard/orders" && "bg-orange-50 p-2 text-orange-500"} px-8 flex relative`}
            to="/restaurant-dashboard/orders"
          >
            {pathname === "/restaurant-dashboard/orders" && (
              <div className="w-1.5 rounded-r-sm absolute left-0 top-0 bottom-0 bg-orange-500"></div>
            )}
            Commandes
          </Link>
          <Link className="px-8" to="/restaurant-dashboard/orders">
            Clients
          </Link>
        </div>
      </div>
    </div>
  );
}

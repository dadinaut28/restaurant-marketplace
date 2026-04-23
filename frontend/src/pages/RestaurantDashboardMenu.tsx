import {
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";
import { DashboardMealCardsContainer } from "../components/DashboardMealCardsContainer";
import { RestaurantDashboardMenuNavbar } from "../components/RestaurantDashboardMenuNavbar";
import { Button } from "../components/ui/button";
import type { RestaurantDashboardContext } from "./RestaurantDashboard";

export function RestaurantDashboardMenu() {
  const [searchParams] = useSearchParams();
  const criteria = searchParams.get("criteria");

  const { onLargeScreen, restaurantMeals } =
    useOutletContext<RestaurantDashboardContext>();

  const resolvedMeals = criteria
    ? restaurantMeals.filter((meal) =>
        meal.name.toLowerCase().includes(criteria.toLowerCase()),
      )
    : restaurantMeals;
  const navigate = useNavigate();
  return (
    <div className="mt-15">
      <RestaurantDashboardMenuNavbar onLargeScreen={onLargeScreen} />
      <div className="px-5 pt-0.5">
        <div className="flex justify-between mt-4">
          <p className="title text-2xl font-medium">Menu</p>
          <div>
            <Button
              onClick={() => navigate("/restaurant-dashboard/new-meal")}
              className="bg-orange-500 px-5 rounded-2xl"
            >
              Nouveau plat
            </Button>
          </div>
        </div>
        <div className="flex">
          <DashboardMealCardsContainer meals={resolvedMeals} />
        </div>
      </div>
    </div>
  );
}

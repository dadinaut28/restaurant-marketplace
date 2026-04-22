import { useOutletContext } from "react-router-dom";
import { NewMealForm } from "../components/NewMealForm";
import type { RestaurantDashboardContext } from "./RestaurantDashboard";

export function NewMeal() {
  const { mealCategories } = useOutletContext<RestaurantDashboardContext>();
  return (
    <div className="p-5">
      <h1 className="mb-5 title font-medium text-3xl">
        Ajouter un nouveau plat
      </h1>
      <NewMealForm mealCategories={mealCategories} />
    </div>
  );
}

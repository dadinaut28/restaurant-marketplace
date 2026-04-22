import type { Meal } from "../types";
import { DashboardMealCard } from "./DashboardMealCard";

interface Props {
  meals: Meal[];
}

export function DashboardMealCardsContainer({ meals }: Props) {
  return (
    <div>
      {meals.length === 0 ? (
        <p className="text-center title mt-20 text-xl font-medium">
          Aucun plat pour l'instant
        </p>
      ) : (
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {meals.map((meal) => (
            <DashboardMealCard key={meal.id} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
}

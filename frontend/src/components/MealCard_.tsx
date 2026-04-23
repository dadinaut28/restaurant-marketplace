import type { Meal } from "../types";

interface Props {
  meal: Meal;
}

export function MealCard_({ meal }: Props) {
  return (
    <div className="border relative border-gray-200 shadow rounded-lg w-75  h-90">
      <div className="h-1/2 overflow-hidden rounded-t-lg">
        <img
          className="w-full h-full"
          src={meal.imageUrl}
          alt="Image d'un plat"
        />
      </div>
      <div className="px-1.5 ">
        <p className="font-medium">{meal?.name}</p>
        <p className="my-1.5 text-sm text-gray-500">{meal?.description}</p>
        <p className="text-gray-500 absolute left-2 bottom-4">
          {meal?.price} FCFA
        </p>
      </div>
    </div>
  );
}

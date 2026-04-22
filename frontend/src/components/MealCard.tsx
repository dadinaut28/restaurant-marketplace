import { useOutletContext } from "react-router-dom";
import type { Meal } from "../types";
import { Button } from "./ui/button";
import type { contextType } from "../App";
import { useState } from "react";

interface Props {
  meal: Meal;
}

export function MealCard({ meal }: Props) {
  const { addNewCartMeal } = useOutletContext<contextType>();
  const [showMealAddedToCartMessage, setShowMealAddedToCartMessage] =
    useState(false);

  const handleAddToCartButtonClick = () => {
    addNewCartMeal(meal);
    setShowMealAddedToCartMessage(true);
    setTimeout(() => setShowMealAddedToCartMessage(false), 1000);
  };

  return (
    <div className="relative h-90 w-75 rounded-lg border border-gray-100 shadow-md">
      {showMealAddedToCartMessage && (
        <span className="absolute top-2.5 right-3 bg-orange-50 border border-orange-500 text-orange-500 text-sm font-semibold rounded-xl px-4 py-1">
          Ajouté
        </span>
      )}
      <div className="overflow-hidden rounded-t-lg h-1/2">
        <img
          className="w-full h-full"
          src={meal.image_url}
          alt="Image d'illustation du plat"
        />
      </div>
      <div className="p-2 h-1/2">
        <p className="font-medium">{meal?.name}</p>
        <p className="my-1.5 text-sm text-gray-500">{meal?.description}</p>
        <div className="mt-8">
          <p className="text-gray-500 absolute left-2 bottom-4">
            {meal?.price} FCFA
          </p>
          <Button
            onClick={handleAddToCartButtonClick}
            className="bg-orange-500 absolute right-2 bottom-4"
          >
            Ajouter au panier
          </Button>
        </div>
      </div>
    </div>
  );
}

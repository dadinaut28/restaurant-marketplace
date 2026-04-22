import { useState } from "react";
import type { CartMeal } from "../types";
import { Button } from "./ui/button";
import { useOutletContext } from "react-router-dom";
import type { contextType } from "../App";

interface Props {
  cartMeal: CartMeal;
}

export function CartMealCard({ cartMeal }: Props) {
  const { increaseMealQuantity, decreaseMealQuantity, removeCartMeal } =
    useOutletContext<contextType>();
  const [mealQuantity, setMealQuantity] = useState(cartMeal?.quantity);
  const [cardIsHovered, setCartIsHovered] = useState(false);
  const [showCartMealDeletionMessageBox, setShowCartMealDeletionMessageBox] =
    useState(false);

  const handleIncreaseButtonClick = () => {
    increaseMealQuantity(cartMeal?.id);
    setMealQuantity((v) => v + 1);
  };

  const handleDecreaseButtonClick = () => {
    console.log("DECREASE");

    decreaseMealQuantity(cartMeal?.id);
    setMealQuantity((v) => {
      if (v > 0) {
        return v - 1;
      }
      return v;
    });
  };

  return (
    <div
      onMouseLeave={() => setCartIsHovered(false)}
      onMouseEnter={() => setCartIsHovered(true)}
      className="relative w-70 h-90 border border-gray-200 shadow rounded-lg overflow-hidden"
    >
      {showCartMealDeletionMessageBox && (
        <div className="w-70 fixed z-50 top-1/2 left-1/2 -translate-x-35 bg-gray-50 rounded-lg p-2.5 border border-gray-100 shadow">
          <p className="text-sm font-medium">
            Voulez vous vraiment retirer ce plat du panier ?
          </p>
          <div className="mt-2 flex gap-3">
            <Button
              onClick={() => {
                removeCartMeal(cartMeal.id);
                setShowCartMealDeletionMessageBox(false);
              }}
              className="bg-red-400"
            >
              Oui
            </Button>
            <Button
              onClick={() => setShowCartMealDeletionMessageBox(false)}
              className="bg-blue-400"
            >
              Non
            </Button>
          </div>
        </div>
      )}
      {cardIsHovered && (
        <Button
          onClick={() => setShowCartMealDeletionMessageBox(true)}
          className="absolute p-1 top-2 right-2.5 bg-gray-300 rounded-sm"
        >
          <img src=".././icons/trash.png" alt="Icone trash" />
        </Button>
      )}
      <div className="h-3/5">
        <img
          className="h-full w-full"
          src={cartMeal.image_url}
          alt="Image d'illustration d'un repas"
        />
      </div>
      <div className="py-1 px-2 h-2/5">
        <p className="my-2 text-sm font-medium">{cartMeal?.name}</p>
        <p className="text-sm text-gray-600">{cartMeal?.price} FCFA</p>
        <div className="flex justify-center my-2">
          <div className="flex items-center gap-2">
            <Button
              onClick={handleDecreaseButtonClick}
              className="bg-orange-500 rounded-full w-8"
            >
              -
            </Button>
            <span>{mealQuantity}</span>
            <Button
              onClick={handleIncreaseButtonClick}
              className="bg-orange-500 rounded-full w-8"
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

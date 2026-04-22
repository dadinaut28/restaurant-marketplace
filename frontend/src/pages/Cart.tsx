import { useOutletContext } from "react-router-dom";
import type { contextType } from "../App";
import { CartMealCard } from "../components/CartMealCard";

export function Cart() {
  const { cartMeals, cartTotalPrice } = useOutletContext<contextType>();

  return (
    <div className="py-1 px-5">
      <h1 className="title text-3xl text-center my-5">Mon Panier</h1>
      <p className="title mt-5">
        Prix total: <span>{cartTotalPrice} FCFA</span>
      </p>
      {cartMeals.length === 0 ? (
        <p className="text-center mt-10">
          Aucun plat dans le panier pour l'instant
        </p>
      ) : (
        <div className="mt-10 flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {cartMeals.map((cartMeal) => (
              <CartMealCard cartMeal={cartMeal} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

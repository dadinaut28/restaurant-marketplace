import { useLoaderData } from "react-router-dom";
import { RestaurantCard } from "../components/RestaurantCard";
import type { Restaurant } from "../types";

export function Restaurants() {
  const restaurants = useLoaderData();
  return (
    <div className="py-1 px-1 sm:px-5">
      <h1 className="text-center title mt-5 mb-8 text-3xl">
        Retrouvez les restaurants proches de chez vous
      </h1>
      <div className="flex justify-center">
        <div className="grid gap-x-5 py-2 gap-y-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {restaurants.map((restaurant: Restaurant) => (
            <RestaurantCard restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
}

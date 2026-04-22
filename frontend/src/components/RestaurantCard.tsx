import { useNavigate } from "react-router-dom";
import type { Restaurant } from "../types";

interface Props {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: Props) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/restaurants/${restaurant?.id}`)}
      className="w-75 h-80 border border-gray-300 shadow rounded-lg overflow-hidden cursor-pointer"
    >
      <div className="rounded-t-lg h-3/5">
        <img
          className="h-full w-full"
          src={restaurant?.mainImageUrl}
          alt="Image principale du restaurant"
        />
      </div>
      <div className="p-2 h-2/5">
        <p className="font-medium">{restaurant?.name}</p>
        <p className="flex gap-1.5 items-center my-2 text-sm text-gray-500">
          <img
            className="w-6 h-6"
            src=".././icons/time.png"
            alt="Icone heure"
          />
          <span>
            {restaurant?.openHour}H à {restaurant?.closeHour}H
          </span>
        </p>
        <p className="flex gap-1.5 items-center text-sm text-gray-500">
          <img
            className="w-6 h-6"
            src=".././icons/gps.png"
            alt="Icone localisation"
          />
          {restaurant?.location.name}
        </p>
      </div>
    </div>
  );
}

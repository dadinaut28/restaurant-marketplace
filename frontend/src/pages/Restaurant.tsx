import { useLoaderData } from "react-router-dom";
import type { Meal, Restaurant } from "../types";
import { MealCard } from "../components/MealCard.tsx";

export function Restaurant() {
  // const [restaurant, setRestaurant] = useState<Restaurant | undefined>();
  const { restaurant, restaurantMeals } = useLoaderData();
  console.log(restaurant, restaurantMeals);

  return (
    <div className="pt-1 px-2 sm:px-5">
      <h2 className="title text-center text-3xl font-medium my-3.5">
        {restaurant?.name.toUpperCase()}
      </h2>
      <div className="h-[70vh] overflow-hidden rounded-lg">
        <img
          className="object-cover object-center h-full w-full"
          src={restaurant?.mainImageUrl}
          alt="Image du restaurant"
        />
      </div>
      <p className="my-5">{restaurant?.description}</p>
      <p className="flex gap-2 my-2.5 items-center text-gray-600">
        <img
          className="w-8"
          src=".././icons/phone_icon.svg"
          alt="Icone téléphone"
        />
        {restaurant?.phoneNumber}
      </p>
      <p className="flex gap-2 my-2.5 items-center text-gray-600">
        <img
          className="w-8"
          src=".././icons/localization_icon.svg"
          alt="Icone téléphone"
        />
        {restaurant?.location.name}
      </p>
      <p className="flex gap-2 items-center text-gray-600 my-2.5">
        <img
          className="w-8"
          src=".././icons/mail_icon.svg"
          alt="Icone téléphone"
        />
        {restaurant?.email}
      </p>
      <h2 className="title mt-8 text-center text-3xl font-medium">
        NOTRE MENU
      </h2>
      <div className="flex justify-center">
        <div className="my-8 grid gap-x-5 gap-y-8 sm:gap-y-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {restaurantMeals.map((meal: Meal) => (
            <MealCard key={meal?.id} meal={meal} />
          ))}
        </div>
      </div>
    </div>
  );
}

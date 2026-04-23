import { redirect } from "react-router-dom";
import {
  getConnectedRestaurant,
  getMealCategories,
  getOneRestaurantsMeals,
} from "../queries";

export async function dashboardLoader() {
  try {
    const restaurant = await getConnectedRestaurant();
    if (!restaurant) {
      return redirect("/");
    }
    const restaurantMeals = await getOneRestaurantsMeals(restaurant.id);
    const mealCategories = await getMealCategories();

    return { restaurant, restaurantMeals, mealCategories };
  } catch (err) {
    console.log(err);
  }
}

import {
  getConnectedRestaurant,
  getMealCategories,
  getOneRestaurantsMeals,
} from "../queries";

export async function dashboardLoader() {
  try {
    const restaurant = await getConnectedRestaurant();
    const restaurantMeals = await getOneRestaurantsMeals(restaurant.id);
    const mealCategories = await getMealCategories();

    return { restaurant, restaurantMeals, mealCategories };
  } catch (err) {
    console.log(err);
  }
}

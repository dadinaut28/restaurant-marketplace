import { getMealCategories } from "../queries";

export async function newMealLoader() {
  try {
    const mealCategories = await getMealCategories();
    return { mealCategories };
  } catch (err) {
    console.log(err);
  }
}

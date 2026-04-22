import { Router } from "express";
import {
  getMealCategories,
  postMealCategory,
} from "../controllers/mealCategoriesController";

export const mealCategoriesRouter = Router();

mealCategoriesRouter.get("/", getMealCategories);
mealCategoriesRouter.post("/", postMealCategory);

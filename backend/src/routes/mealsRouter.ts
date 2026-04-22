import { Router } from "express";
import {
  deleteMeal,
  getMeal,
  getMeals,
  postMeal,
  putMeal,
} from "../controllers/mealsController";
import { checkToken } from "../middlewares/checkToken";
import upload from "../middlewares/upload";

export const mealsRouter = Router();

mealsRouter.get("/", getMeals);
mealsRouter.get("/:id", getMeal);
mealsRouter.put("/:id", checkToken, upload.single("meal-image"), putMeal);
mealsRouter.post("/", checkToken, upload.single("meal-image"), postMeal);
mealsRouter.delete("/:id", checkToken, deleteMeal);

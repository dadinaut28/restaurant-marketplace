import { Router } from "express";
import {
  getConnectedRestaurant,
  getRestaurant,
  getRestaurants,
} from "../controllers/restaurantsController";
import { checkToken } from "../middlewares/checkToken";

export const restaurantsRouter = Router();

restaurantsRouter.get("/", getRestaurants);
restaurantsRouter.get("/me", checkToken, getConnectedRestaurant);
restaurantsRouter.get("/:id", getRestaurant);

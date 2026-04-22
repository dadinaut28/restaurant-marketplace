import { Router } from "express";
import { getCities, postCity } from "../controllers/cityController";

export const cityRouter = Router();

cityRouter.post("/", postCity);
cityRouter.get("/", getCities);

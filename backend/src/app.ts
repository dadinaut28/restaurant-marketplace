import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { authRouter } from "./routes/authRouter.js";
import { mealsRouter } from "./routes/mealsRouter.js";
import { restaurantsRouter } from "./routes/restaurantsRouter.js";
import { mealCategoriesRouter } from "./routes/mealCategoriesRouter.js";
import { cityRouter } from "./routes/cityRouter.js";
import { verifyToken } from "./controllers/verifyToken.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: "https://restaurant-marketplace-two.vercel.app",
  }),
);

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/restaurants", restaurantsRouter);
app.use("/api/meals", mealsRouter);
app.use("/api/meal-categories", mealCategoriesRouter);
app.use("/api/city", cityRouter);
// app.use("/api/category", categoryRouter);
app.post("/api/verify-token", verifyToken);

app.use((req, res) => {
  res.status(404).json({
    message: "Not Found Error",
  });
});

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`Server is running on port ${PORT} !!`);
});

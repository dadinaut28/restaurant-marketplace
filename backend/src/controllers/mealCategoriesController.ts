import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export async function getMealCategories(req: Request, res: Response) {
  try {
    const mealCategories = await prisma.mealCategory.findMany();

    res.status(200).json({
      message: "Meal categories returned successfully !",
      mealCategories,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function postMealCategory(req: Request, res: Response) {
  try {
    const { name } = req.body;
    const newMealCategory = await prisma.mealCategory.create({
      data: {
        name,
      },
    });

    res.status(201).json({
      message: "New meal category created successfully !",
      newMealCategory,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

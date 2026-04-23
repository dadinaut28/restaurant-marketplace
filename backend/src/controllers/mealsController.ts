import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { uploadToCloudinary } from "../utils/cloudinaryUpload";

export async function getMeals(req: Request, res: Response) {
  try {
    const { restaurant_id } = req.query;
    // SEND MEALS BY RESTAURANT
    if (restaurant_id) {
      const meals = await prisma.meal.findMany({
        where: {
          restaurantId: Number(restaurant_id),
        },
      });

      return res.status(200).json({
        message: "Restaurant meals returned successfully !",
        meals,
      });
    }

    // SEND ALL MEALS
    const meals = await prisma.meal.findMany();
    res.status(200).json({
      message: "All meals returned successfully !",
      meals,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function getMeal(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const meal = await prisma.meal.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!meal) {
      return res.status(404).json({
        message: `Meal with id ${id} has not been found !`,
      });
    }

    res.status(200).json({
      message: "Meal returned successfully !",
      meal,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function postMeal(req: Request, res: Response) {
  try {
    const { name, description, price, categoryId } = req.body;
    let restaurantId;
    // Resto info inserted in req by checkToken
    if (req.restaurantInfo && typeof req.restaurantInfo !== "string") {
      restaurantId = req.restaurantInfo?.restaurantId;
    }

    if (!name || !description || !price || !categoryId || !req.file) {
      return res.status(400).json({
        message: "Bad request: verify entry and retry !",
      });
    }

    const imageUrl = await uploadToCloudinary(req?.file?.buffer);

    const meal = await prisma.meal.create({
      data: {
        name,
        description,
        price: Number(price),
        restaurantId: Number(restaurantId),
        categoryId: Number(categoryId),
        imageUrl,
      },
    });

    res.status(201).json({
      message: "New meal created successfully !",
      meal,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function putMeal(req: Request, res: Response) {
  try {
    const { newName, newDescription, newPrice, newCategoryId } = req.body;
    const { id } = req.params;

    let restaurantId;
    // Resto info inserted in req by checkToken
    if (req.restaurantInfo && typeof req.restaurantInfo !== "string") {
      restaurantId = req.restaurantInfo?.restaurantId;
    }

    const meal = await prisma.meal.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!meal) {
      return res.status(404).json({
        message: `Meal with id ${id} has not been found !`,
      });
    }

    // Case restaurant requesting update is not the meal owner
    if (meal.restaurantId !== restaurantId) {
      return res.status(403).json({
        message: `You are not authorized to update this meal !`,
      });
    }

    if (!req.file) {
      const updatedMeal = await prisma.meal.update({
        where: {
          id: Number(id),
        },
        data: {
          name: newName,
          description: newDescription,
          price: Number(newPrice),
          categoryId: Number(newCategoryId),
        },
      });

      return res.status(200).json({
        message: "Meal updated successfully !",
        updatedMeal,
      });
    }

    if (req?.file?.buffer) {
      const imageUrl = await uploadToCloudinary(req?.file?.buffer);

      const updatedMeal = await prisma.meal.update({
        where: {
          id: Number(id),
        },
        data: {
          name: newName,
          description: newDescription,
          price: Number(newPrice),
          categoryId: Number(newCategoryId),
          imageUrl,
        },
      });

      res.status(200).json({
        message: "Meal updated successfully !",
        updatedMeal,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function deleteMeal(req: Request, res: Response) {
  try {
    const { id } = req.params;

    let restaurantId;
    // Resto info inserted in req by checkToken
    if (req.restaurantInfo && typeof req.restaurantInfo !== "string") {
      restaurantId = req.restaurantInfo?.restaurantId;
    }

    const meal = await prisma.meal.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!meal) {
      return res.status(404).json({
        message: `Meal with id ${id} has not been found !`,
      });
    }
    // Case restaurant requesting deletion is not the meal owner
    if (meal.restaurantId !== restaurantId) {
      return res.status(403).json({
        message: `You are not authorized to update this meal !`,
      });
    }

    const deletedMeal = await prisma.meal.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      message: "Meal deleted successfully !",
      deletedMeal,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

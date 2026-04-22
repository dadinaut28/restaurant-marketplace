import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export async function getRestaurants(req: Request, res: Response) {
  try {
    const restaurants = await prisma.restaurant.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        location: true,
        phoneNumber: true,
      },
    });
    res.status(200).json({
      message: "Restaurants returned successfully !",
      restaurants,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function getRestaurant(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        description: true,
        location: true,
        phoneNumber: true,
      },
    });

    res.status(200).json({
      message: "Restaurant returned successfully !",
      restaurant,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function getConnectedRestaurant(req: Request, res: Response) {
  try {
    let restaurantId;
    // Resto info inserted in req by checkToken
    if (req.restaurantInfo && typeof req.restaurantInfo !== "string") {
      restaurantId = req.restaurantInfo?.restaurantId;
    }
    console.log("ID", restaurantId);

    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id: restaurantId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        location: true,
        phoneNumber: true,
      },
    });

    res.status(200).json({
      message: "Restaurant returned successfully !",
      restaurant,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

// id    Int     @id @default(autoincrement())
//   email String  @unique
//   name  String
//   password String
//   phoneNumber Int @default(00000)
//   description String
//   mainImageUrl String?
//   meals Meal[]
//   orders Order[]
//   location City? @relation(fields: [cityId], references: [id])
//   cityId  Int?
//   openHour  Int
//   closeHour Int
//   createdAt DateTime?   @default(now())
// updatedAt DateTime?   @updatedAt

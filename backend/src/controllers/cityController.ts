import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export async function postCity(req: Request, res: Response) {
  try {
    const { name } = req.body;
    const city = await prisma.city.create({
      data: {
        name,
      },
    });

    res.status(201).json({
      message: "New city added successfully !",
      city,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function getCities(req: Request, res: Response) {
  try {
    const cities = await prisma.city.findMany();

    res.status(200).json({
      message: "Messages returned successfully !",
      cities,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

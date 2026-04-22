import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import upload from "../middlewares/upload.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

// id    Int     @id @default(autoincrement())
//   email String  @unique
//   name  String
//   password String
//   description String
//   mainImageUrl String?
//   meals Meal[]
//   orders Order[]
//   location String
//   openHour  Int
//   closeHour Int
//   createdAt DateTime?   @default(now())
//   updatedAt DateTime?   @updatedAt

export const authRouter = Router();

authRouter.post(
  "/register",
  upload.single("restaurant-image"),
  async (req, res) => {
    let {
      name,
      description,
      email,
      password,
      locationId,
      openHour,
      closeHour,
      phoneNumber,
    } = req.body;

    if (
      !email ||
      !password ||
      !name ||
      !description ||
      !locationId ||
      !openHour ||
      !closeHour ||
      !req.file ||
      !phoneNumber
    ) {
      return res.status(400).json({
        message: "Bad Request Input: Entry missing",
      });
    }

    const mainImageUrl = await uploadToCloudinary(req.file?.buffer);

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.restaurant.create({
        data: {
          name,
          description,
          cityId: Number(locationId),
          openHour: Number(openHour),
          closeHour: Number(closeHour),
          email,
          password: hashedPassword,
          mainImageUrl,
          phoneNumber: Number(phoneNumber),
        },
      });

      res.status(201).json({
        message: "New restaurant created successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
);

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Bad request: Email or password missing",
      });
    }

    const restaurant = await prisma.restaurant.findUnique({
      where: {
        email,
      },
    });

    if (!restaurant) {
      return res.status(404).json({
        message: "Incorrect email!",
      });
    }

    const matchPassword = await bcrypt.compare(password, restaurant.password);

    if (!matchPassword) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    process.env.JWT_SECRET_KEY &&
      jwt.sign(
        { restaurantId: restaurant.id },
        process.env.JWT_SECRET_KEY,
        (err: Error | null, token: string | undefined) => {
          if (err)
            return res.status(500).json({ message: "Internal Server Error" });

          res.status(200).json({
            message: "User authenticated successfully !",
            token,
          });
        },
      );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

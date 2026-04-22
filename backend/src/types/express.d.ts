import { Request } from "express";
import jwt from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    restaurantInfo: jwt.JwtPayload | string | undefined;
  }
}

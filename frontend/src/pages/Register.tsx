import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useState } from "react";
import type { City } from "../types";

export interface RegisterContext {
  restaurantName: string;
  description: string;
  password: string;
  email: string;
  locationId: string;
  openHour: string;
  closeHour: string;
  phoneNumber: string;
  cities: City[];
  changeRestaurantName: (value: string) => void;
  changeEmail: (value: string) => void;
  changePassword: (value: string) => void;
  changeDescription: (value: string) => void;
  changeLocationId: (value: string) => void;
  changeOpenHour: (value: number) => void;
  changeCloseHour: (value: number) => void;
  changePhoneNumber: (value: string) => void;
}

export function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [locationId, setLocationId] = useState("");
  const [openHour, setOpenHour] = useState("");
  const [closeHour, setCloseHour] = useState("");

  const changeRestaurantName = (newValue: string) => {
    setRestaurantName(newValue);
  };

  const changeDescription = (newValue: string) => {
    setDescription(newValue);
  };

  const changeEmail = (newValue: string) => {
    setEmail(newValue);
  };

  const changePassword = (newValue: string) => {
    setPassword(newValue);
  };

  const changeLocationId = (newValue: string) => {
    setLocationId(newValue);
  };

  const changeOpenHour = (newValue: string) => {
    setOpenHour(newValue);
  };

  const changeCloseHour = (newValue: string) => {
    setCloseHour(newValue);
  };

  const changePhoneNumber = (newValue: string) => {
    setPhoneNumber(newValue);
  };

  const { cities } = useLoaderData();

  return (
    <div>
      <nav className="flex items-center h-14 border-b border-gray-100 px-5">
        <Button
          onClick={() => navigate("/")}
          className="text-2xl font-medium text-black bg-transparent"
        >
          Platform
        </Button>
      </nav>
      <h2 className="mt-16 title text-center text-3xl">
        Inscrivez votre restaurant
      </h2>
      <Outlet
        context={{
          restaurantName,
          description,
          email,
          password,
          locationId,
          openHour,
          closeHour,
          phoneNumber,
          changeRestaurantName,
          changeEmail,
          changePassword,
          changeDescription,
          changeLocationId,
          changeOpenHour,
          changeCloseHour,
          changePhoneNumber,
          cities,
        }}
      />
    </div>
  );
}

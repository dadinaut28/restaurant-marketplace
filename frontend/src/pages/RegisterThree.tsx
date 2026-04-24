import { useNavigate, useOutletContext } from "react-router-dom";
import { Button } from "../components/ui/button";
import type { RegisterContext } from "./Register";
import { useState, type SyntheticEvent } from "react";
import { registerRestaurant } from "../queries";

export function RegisterThree() {
  const navigate = useNavigate();
  const [restaurantImage, setRestaurantImage] = useState<File | undefined>();
  const [loading, setLoading] = useState(false);
  const [showBadInputMessage, setShowBadInputMessage] = useState(false);
  const [showServerErrorMessage, setShowServerErrorMessage] = useState(false);
  const [showRegisterSuccessMessage, setShowRegisterSuccessMessage] =
    useState(false);
  const {
    restaurantName,
    email,
    description,
    locationId,
    openHour,
    closeHour,
    password,
    phoneNumber,
  } = useOutletContext<RegisterContext>();

  const handleFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      if (
        !restaurantImage ||
        !restaurantName ||
        !email ||
        !description ||
        !locationId ||
        !openHour ||
        !closeHour ||
        !password ||
        !restaurantImage ||
        !phoneNumber
      )
        return;
      setLoading(true);

      const status = await registerRestaurant(
        email,
        password,
        restaurantName,
        description,
        locationId,
        openHour,
        closeHour,
        restaurantImage,
        phoneNumber,
      );

      if (status === 201) {
        setShowRegisterSuccessMessage(true);
        setTimeout(() => {
          setShowRegisterSuccessMessage(false);
          navigate("/login");
        }, 2000);
      } else if (status >= 400 && status < 500) {
        setShowBadInputMessage(true);
        setTimeout(() => setShowBadInputMessage(false), 2500);
      } else if (status === 500) {
        setShowServerErrorMessage(true);
        setTimeout(() => setShowServerErrorMessage(false), 2500);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const buttonDisabled =
    !restaurantImage ||
    !restaurantName ||
    !email ||
    !description ||
    !location ||
    !openHour ||
    !closeHour ||
    !password ||
    loading;

  return (
    <div className="flex justify-center">
      {showBadInputMessage && (
        <div className="fixed right-5 top-20 bg-red-100 border border-red-300 text-red-500 rounded-sm px-2.5 py-1 text-sm font-medium">
          <p>Vérifiez les entrées et réessayez.</p>
        </div>
      )}
      {showServerErrorMessage && (
        <div className="fixed right-5 top-20 bg-red-100 border border-red-300 text-red-500 rounded-sm px-2.5 py-1 text-sm font-medium">
          <p>Erreur interne: réessayez plus tard.</p>
        </div>
      )}
      {showBadInputMessage && (
        <div className="fixed right-5 top-20 bg-red-100 border border-red-300 text-red-500 rounded-sm px-2.5 py-1 text-sm font-medium">
          <p>Vérifiez les entrées et réessayez</p>
        </div>
      )}
      {showRegisterSuccessMessage && (
        <div className="fixed right-5 top-20 bg-blue-50 border border-blue-300 text-blue-500 rounded-sm px-2.5 py-1 text-sm font-medium">
          <p>Inscription réussie.</p>
        </div>
      )}
      <div>
        <div className="flex justify-center mt-5">
          <span className="flex items-center justify-center border border-gray-400 w-10 h-10 rounded-full text-gray-600 font-medium text-lg">
            3
          </span>
        </div>
        <form onSubmit={handleFormSubmit} className="mt-5">
          <input
            onChange={(e) => {
              console.log(e);
              if (e.target.files) {
                setRestaurantImage(e.target.files[0]);
              }
              console.log(
                restaurantName,
                email,
                description,
                location,
                openHour,
                closeHour,
                password,
                restaurantImage,
              );
            }}
            type="file"
          />{" "}
          <br />
          <Button disabled={buttonDisabled} className="mt-2.5 bg-orange-500">
            Terminer
          </Button>
        </form>
      </div>
    </div>
  );
}

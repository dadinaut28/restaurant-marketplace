import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import type { RegisterContext } from "./Register";

export function RegisterOne() {
  const navigate = useNavigate();
  const {
    restaurantName,
    email,
    password,
    phoneNumber,
    changeRestaurantName,
    changeEmail,
    changePassword,
    changePhoneNumber,
  } = useOutletContext<RegisterContext>();

  const buttonDisabled = !restaurantName || !email || !password;
  return (
    <div>
      <div className="flex justify-center mt-5">
        <span className="flex items-center justify-center border border-gray-400 w-10 h-10 rounded-full text-gray-600 font-medium text-lg">
          1
        </span>
      </div>
      <div className="flex justify-center mt-10">
        <form>
          <Input
            value={restaurantName}
            onChange={(e) => changeRestaurantName(e.target.value)}
            className="w-72 md:w-75 mb-5"
            placeholder="Nom du restaurant"
          />{" "}
          <br />
          <Input
            type="number"
            value={phoneNumber}
            onChange={(e) => changePhoneNumber(e.target.value)}
            className="w-72 md:w-75 mb-5"
            placeholder="Numéro de téléphone"
          />{" "}
          <br />
          <Input
            value={email}
            onChange={(e) => changeEmail(e.target.value)}
            className="w-72 md:w-75 mb-5"
            placeholder="Email"
          />{" "}
          <br />
          <Input
            value={password}
            onChange={(e) => changePassword(e.target.value)}
            type="password"
            className="w-72 md:w-75 mb-5"
            placeholder="Mot de passe"
          />{" "}
          <br />
          {/* disabled={buttonDisabled} */}
          <Button
            disabled={buttonDisabled}
            onClick={(e) => {
              e.preventDefault();
              navigate("/register/second-part");
            }}
            className="w-full bg-orange-500"
          >
            Continuer
          </Button>
          <p className="text-sm mt-5">
            Vous avez déjà un compte ?{" "}
            <Link className="text-blue-600" to="/login">
              Connectez-vous
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

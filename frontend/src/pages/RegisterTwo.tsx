import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { Input } from "../components/ui/input";
import type { RegisterContext } from "./Register";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { useEffect } from "react";

export function RegisterTwo() {
  const navigate = useNavigate();
  const {
    description,
    locationId,
    openHour,
    closeHour,
    changeDescription,
    changeLocationId,
    cities,
    changeOpenHour,
    changeCloseHour,
  } = useOutletContext<RegisterContext>();

  useEffect(
    () => changeLocationId(String(cities[0].id)),
    [changeLocationId, cities],
  );

  const buttonDisabled = !description || !locationId || !openHour || !closeHour;
  return (
    <div>
      <div className="flex justify-center mt-5">
        <span className="flex items-center justify-center border border-gray-400 w-10 h-10 rounded-full text-gray-600 font-medium text-lg">
          2
        </span>
      </div>
      <div className="flex justify-center mt-10">
        <form>
          <Textarea
            value={description}
            onChange={(e) => changeDescription(e.target.value)}
            className="w-72 md:w-75 "
            placeholder="Décrivez votre établissement"
          />{" "}
          <br />
          {/* <Input
            value={location}
            onChange={(e) => changeLocation(e.target.value)}
            className="w-72 md:w-75 mb-5"
            placeholder="Votre ville"
          />{" "} */}
          <span></span>
          <br />
          <select
            value={locationId}
            onChange={(e) => {
              changeLocationId(e.target.value);
              console.log(locationId, description, openHour, closeHour);
            }}
          >
            {cities.map((city) => (
              <option value={city.id}>{city.name}</option>
            ))}
          </select>
          <br />
          <Input
            value={openHour}
            onChange={(e) => changeOpenHour(Number(e.target.value))}
            type="number"
            className="w-72 md:w-75 mb-5"
            placeholder="Heure d'ouverture"
          />{" "}
          <br />
          <Input
            value={closeHour}
            onChange={(e) => changeCloseHour(Number(e.target.value))}
            type="number"
            className="w-72 md:w-75 mb-5"
            placeholder="Heure de fermeture"
          />{" "}
          <br />
          {/* disabled={buttonDisabled} */}
          <Button
            disabled={buttonDisabled}
            onClick={(e) => {
              e.preventDefault();
              navigate("/register/third-part");
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

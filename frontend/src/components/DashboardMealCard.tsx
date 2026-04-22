import { useEffect, useState, type SyntheticEvent } from "react";
import type { Meal } from "../types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { deleteOneMeal, updateOneMeal } from "../queries";
import { useOutletContext } from "react-router-dom";
import type { RestaurantDashboardContext } from "../pages/RestaurantDashboard";

interface Props {
  meal: Meal;
}

export function DashboardMealCard({ meal }: Props) {
  const [showMealUpdateForm, setShowMealUpdateForm] = useState(false);
  const [showMealDeletionConfirmationBox, setShowMealDeletionConfirmationBox] =
    useState(false);
  const [newMealName, setNewMealName] = useState(meal.name);
  const [newMealDescription, setNewMealDescription] = useState(
    meal.description,
  );
  const [newMealPrice, setNewMealPrice] = useState(meal.price);
  const [newMealCategoryId, setNewMealCategoryId] = useState(meal.categoryId);
  const [newMealImage, setNewMealImage] = useState<File | string>("");
  const [loading, setLoading] = useState(false);
  const [showMealUpdateSuccessMessage, setShowMealUpdateSuccessMessage] =
    useState(false);
  const [showServerErrorMessage, setShowServerErrorMessage] = useState(false);

  const { dashboarRevalidator, mealCategories } =
    useOutletContext<RestaurantDashboardContext>();

  const handleMealUpdateForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const status = await updateOneMeal(
        meal.id,
        newMealName,
        newMealDescription,
        newMealPrice,
        newMealCategoryId,
        newMealImage,
      );
      if (status === 200) {
        setShowMealUpdateForm(false);
        setShowMealUpdateSuccessMessage(true);
        setTimeout(() => setShowMealUpdateSuccessMessage(false), 2000);
        await dashboarRevalidator.revalidate();
      } else if (status === 500) {
        setShowServerErrorMessage(true);
        setTimeout(() => setShowServerErrorMessage(false));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleMealDeletion = async () => {
    try {
      const status = await deleteOneMeal(meal.id);
      if (status === 500) {
        setShowServerErrorMessage(true);
        setTimeout(() => setShowServerErrorMessage(false));
        await dashboarRevalidator.revalidate();
      } else if (status === 200) {
        setShowMealDeletionConfirmationBox(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setNewMealCategoryId(mealCategories[0].id);
  }, [mealCategories]);

  const updateButtonDisabled =
    !newMealName ||
    !newMealDescription ||
    newMealPrice === 0 ||
    !newMealCategoryId ||
    loading;
  return (
    <div className="w-70 h-80 bg-white my-5 border border-gray-200 shadow rounded-lg overflow-hidden">
      {showMealUpdateSuccessMessage && (
        <div className="fixed top-8 right-5 px-3 py-1 rounded-xl text-sm font-medium text-green-500 bg-green-50 border border-green-500">
          Le plat a bien été modifié
        </div>
      )}
      {showServerErrorMessage && (
        <div className="fixed top-8 right-5 px-3 py-1 rounded-xl text-sm font-medium text-red-500 bg-red-50 border border-red-500">
          Erreur interne: réessayez plus tard !
        </div>
      )}
      {showMealUpdateForm && (
        <form
          onSubmit={handleMealUpdateForm}
          className="fixed bg-white top-1/6 left-1/2 -translate-x-1/2 pt-14 pb-5 px-5 rounded-lg border border-gray-100 shadow  flex flex-col gap-6"
        >
          <Button
            onClick={() => setShowMealUpdateForm(false)}
            className="absolute top-2.5 p-1.5 right-3 bg-gray-200 rounded-full"
          >
            <img className="h-5 w-5" src=".././icons/close-icon.svg" alt="" />
          </Button>
          <Input
            value={newMealName}
            onChange={(e) => setNewMealName(e.target.value)}
            placeholder="Nom du plat"
          />
          <Textarea
            onChange={(e) => setNewMealDescription(e.target.value)}
            placeholder="Description"
            value={newMealDescription}
          />
          <Input
            type="number"
            value={newMealPrice}
            onChange={(e) => setNewMealPrice(Number(e.target.value))}
            placeholder="Cassoulet..."
          />
          <option value=""></option>
          <select
            onChange={(e) => setNewMealCategoryId(Number(e.target.value))}
          >
            {mealCategories.map((category) => (
              <option value={category.id}>{category.name}</option>
            ))}
          </select>
          <Input
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setNewMealImage(e.target.files[0]);
              }
            }}
            placeholder="Cassoulet..."
          />
          <Button disabled={updateButtonDisabled} className="bg-orange-500">
            Modifier
          </Button>
        </form>
      )}
      {showMealDeletionConfirmationBox && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 w-70 bg-gray-50 p-4 rounded-lg border border-gray-300 shadow text-sm">
          <p className="font-medium">
            Voulez vous vraiment retirer ce plat du menu ?
          </p>
          <div className="mt-3 flex gap-3">
            <Button
              onClick={handleMealDeletion}
              className="text-sm bg-red-300 text-black"
            >
              Oui, retirez
            </Button>
            <Button
              onClick={() => setShowMealDeletionConfirmationBox(false)}
              className="text-sm bg-blue-300 text-black"
            >
              Non, annulez
            </Button>
          </div>
        </div>
      )}
      <div className="h-2/3">
        <img
          className="h-full w-full"
          src={meal.image_url}
          alt="Image du plat"
        />
      </div>
      <div className="h-1/3 p-2">
        <p className="text-sm font-medium">{meal?.name}</p>
        <p className="text-sm text-gray-800 my-1">{meal?.price} FCFA</p>
        <div className="flex justify-center">
          <div className="flex gap-3 mt-1.5">
            <Button
              onClick={() => setShowMealUpdateForm(true)}
              className="w-30 py-1.5 flex items-center bg-gray-50"
            >
              <img className="w-5 h-5" src=".././icons/editing.png" alt="" />{" "}
              <p className="text-black">Modifier</p>
            </Button>
            <Button
              onClick={() => setShowMealDeletionConfirmationBox(true)}
              className="w-30 py-1.5 flex items-center bg-gray-50"
            >
              <img className="w-5 h-5" src=".././icons/trash.png" alt="" />{" "}
              <p className="text-black">Supprimer</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState, type SyntheticEvent } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import type { MealCategory } from "../types";
import { createNewMeal } from "../queries";

interface Props {
  mealCategories: MealCategory[];
}

export function NewMealForm({ mealCategories }: Props) {
  const [mealName, setMealName] = useState("");
  const [mealDescription, setMealDescription] = useState("");
  const [mealPrice, setMealPrice] = useState("");
  const [mealCategoryId, setMealCategoryId] = useState("");
  const [mealImage, setMealImage] = useState<File | string>("");
  const [showMealCreationSuccessMessage, setShowMealCreationSuccessMessage] =
    useState(false);
  const [showServerErrorMessage, setShowServerErrorMessage] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMealCategoryId(String(mealCategories[0].id));
  }, [mealCategories]);

  const handleFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const status = await createNewMeal(
        mealName,
        mealDescription,
        mealPrice,
        mealCategoryId,
        mealImage,
      );

      if (status === 201) {
        setMealName("");
        setMealDescription("");
        setMealPrice("");
        setShowMealCreationSuccessMessage(true);
        setTimeout(() => setShowMealCreationSuccessMessage(false), 2000);
      } else if (status === 500) {
        setShowServerErrorMessage(true);
        setTimeout(() => setShowServerErrorMessage(false));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const buttonDisabled =
    !mealName ||
    !mealDescription ||
    !mealPrice ||
    !mealCategoryId ||
    !mealImage ||
    loading;

  return (
    <form onSubmit={handleFormSubmit} className="max-w-2xl">
      {showMealCreationSuccessMessage && (
        <div className="fixed top-8 right-5 px-3 py-1 rounded-xl text-sm font-medium text-green-500 bg-green-50 border border-green-500">
          Nouveau plat ajouté avec succès
        </div>
      )}
      {showServerErrorMessage && (
        <div className="fixed top-8 right-5 px-3 py-1 rounded-xl text-sm font-medium text-red-500 bg-red-50 border border-red-500">
          Erreur interne: réessayez plus tard !
        </div>
      )}
      <label>
        <span className="text-sm font-medium mb-1">Nom du plat</span>
        <Input
          className="mb-5"
          placeholder="Attiékè"
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
        />
      </label>
      <label>
        <span className="text-sm font-medium mb-1">Description</span>
        <Textarea
          className="mb-5"
          placeholder="Un délicieux..."
          content={mealDescription}
          onChange={(e) => setMealDescription(e.target.value)}
        />
      </label>
      <label>
        <span className="text-sm font-medium mb-1">Prix</span>
        <Input
          className="mb-5"
          value={mealPrice}
          onChange={(e) => setMealPrice(e.target.value)}
          type="number"
        />
      </label>
      <label>
        <span className="text-sm font-medium mb-1">Catégorie</span>
        <br />
        <select
          onChange={(e) => setMealCategoryId(e.target.value)}
          className="mb-5 text-sm"
        >
          {mealCategories.map((category) => (
            <option value={category.id}>{category.name}</option>
          ))}
        </select>{" "}
        <br />
      </label>
      <label>
        <span className="text-sm font-medium mb-1">Image</span>
        <Input
          onChange={(e) => {
            if (e.target.files) setMealImage(e.target.files[0]);
          }}
          className="mb-5"
          type="file"
        />
      </label>
      <Button disabled={buttonDisabled} className="bg-orange-500">
        Ajouter
      </Button>
    </form>
  );
}

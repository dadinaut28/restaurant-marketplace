export const apiUrl = import.meta.env.VITE_API_URL;
// const TOKEN = localStorage.getItem("dadinaut_blogging_platform_auth_token");

export async function authenticateRestaurant(email: string, password: string) {
  try {
    const response = await fetch(`${apiUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const { token } = await response.json();
    return [response.status, token];
  } catch (err) {
    console.log(err);
  }
}

export async function registerRestaurant(
  email: string,
  password: string,
  name: string,
  description: string,
  locationId: string,
  openHour: string,
  closeHour: string,
  restaurantImage: File,
  phoneNumber: string,
) {
  const body = new FormData();

  body.append("email", email);
  body.append("name", name);
  body.append("password", password);
  body.append("description", description);
  body.append("locationId", locationId);
  body.append("openHour", openHour);
  body.append("closeHour", closeHour);
  body.append("restaurant-image", restaurantImage);
  body.append("phoneNumber", phoneNumber);

  const response = await fetch(`${apiUrl}/api/auth/register`, {
    method: "POST",
    body,
  });
  return response.status;
}

export async function getAllRestaurants() {
  try {
    const response = await fetch(`${apiUrl}/api/restaurants`);
    const data = await response.json();

    const { restaurants } = data;

    return restaurants;
  } catch (err) {
    console.log(err);
  }
}

export async function getOneRestaurant(restaurantId: number) {
  const response = await fetch(`${apiUrl}/api/restaurants/${restaurantId}`);
  const data = await response.json();

  return data.restaurant;
}

export async function getOneRestaurantsMeals(restaurantId: number) {
  try {
    const response = await fetch(
      `${apiUrl}/api/meals?restaurant_id=${restaurantId}`,
    );
    const data = await response.json();

    return data.meals;
  } catch (err) {
    console.log(err);
  }
}

export async function createNewMeal(
  name: string,
  description: string,
  price: string,
  categoryId: string,
  mealImage: File | string,
) {
  try {
    const body = new FormData();
    body.append("name", name);
    body.append("description", description);
    body.append("price", price);
    body.append("categoryId", categoryId);
    body.append("meal-image", mealImage);

    const response = await fetch(`${apiUrl}/api/meals`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("dadinaut_restaurant_platform_auth_token")}`,
      },
      body,
    });
    // const data = await response.json();

    return response.status;
  } catch (err) {
    console.log(err);
  }
}

export async function getConnectedRestaurant() {
  try {
    const response = await fetch(`${apiUrl}/api/restaurants/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("dadinaut_restaurant_platform_auth_token")}`,
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      return data.restaurant;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function deleteOneMeal(mealId: number) {
  try {
    const response = await fetch(`${apiUrl}/api/meals/${mealId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("dadinaut_restaurant_platform_auth_token")}`,
      },
    });

    return response.status;
  } catch (err) {
    console.log(err);
  }
}

export async function updateOneMeal(
  mealId: number,
  newName: string,
  newDescription: string,
  newPrice: number,
  newCategoryId: number,
  newMealImage: File | string,
) {
  const body = new FormData();
  body.append("newName", newName);
  body.append("newDescription", newDescription);
  body.append("newPrice", String(newPrice));
  body.append("newCategoryId", String(newCategoryId));
  body.append("meal-image", newMealImage);
  try {
    const response = await fetch(`${apiUrl}/api/meals/${mealId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("dadinaut_restaurant_platform_auth_token")}`,
      },
      body,
    });
    return response.status;
  } catch (err) {
    console.log(err);
  }
}

export async function getMealCategories() {
  try {
    const response = await fetch(`${apiUrl}/api/meal-categories`);

    const data = await response.json();
    return data.mealCategories;
  } catch (err) {
    console.log(err);
  }
}

export async function verifyToken(token: string) {
  const response = await fetch(`${apiUrl}/api/verify-token`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      token,
    }),
  });

  return response.status;
}

export async function getCities() {
  const response = await fetch(`${apiUrl}/api/city`);
  const data = await response.json();

  return data.cities;
}

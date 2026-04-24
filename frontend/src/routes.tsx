import { type RouteObject } from "react-router-dom";
import App from "./App";
import { Home } from "./pages/Home";
import { ErrorPage } from "./pages/ErrorPage";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Restaurants } from "./pages/Restaurants";
import { Restaurant } from "./pages/Restaurant";
// import { Cart } from "./pages/Cart";
import { RestaurantDashboard } from "./pages/RestaurantDashboard";
import { RestaurantDashboardMenu } from "./pages/RestaurantDashboardMenu";
// import { RestaurantDashboardOrders } from "./pages/RestaurantDashboardOrders";
// import { RestaurantDashboardAnalytics } from "./pages/RestaurantDashboardAnalytics";
import { NewMeal } from "./pages/NewMeal";
import { RegisterOne } from "./pages/RegisterOne";
import { RegisterTwo } from "./pages/RegisterTwo";
import { RegisterThree } from "./pages/RegisterThree";
import {
  getAllRestaurants,
  getOneRestaurant,
  getOneRestaurantsMeals,
} from "./queries";
import { RestaurantsFallback } from "./pages/RestaurantsFallback";
import { dashboardLoader } from "./loaders/dashboardLoader";
import { registerLoader } from "./loaders/registerLoader";
import { newMealLoader } from "./loaders/newMealLoader";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "restaurants",
        element: <Restaurants />,
        loader: async () => {
          const restaurants = await getAllRestaurants();
          return restaurants;
        },
        hydrateFallbackElement: <RestaurantsFallback />,
      },
      {
        path: "restaurants/:id",
        element: <Restaurant />,
        loader: async ({ params }) => {
          try {
            const { id } = params;
            const restaurant = await getOneRestaurant(Number(id));
            const restaurantMeals = await getOneRestaurantsMeals(Number(id));
            console.log("From meals: ", restaurantMeals);
            return { restaurant, restaurantMeals };
          } catch (err) {
            console.log(err);
          }
        },
        hydrateFallbackElement: <RestaurantsFallback />,
      },
      // {
      //   path: "cart",
      //   element: <Cart />,
      // },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
    loader: registerLoader,
    children: [
      {
        index: true,
        element: <RegisterOne />,
      },
      {
        path: "second-part",
        element: <RegisterTwo />,
      },
      {
        path: "third-part",
        element: <RegisterThree />,
      },
    ],
    hydrateFallbackElement: <RestaurantsFallback />,
  },
  {
    path: "/restaurant-dashboard",
    errorElement: <ErrorPage />,
    element: <RestaurantDashboard />,
    children: [
      {
        index: true,
        element: <RestaurantDashboardMenu />,
      },
      // {
      //   path: "orders",
      //   element: <RestaurantDashboardOrders />,
      // },
      {
        path: "new-meal",
        element: <NewMeal />,
        loader: newMealLoader,
      },
    ],
    loader: dashboardLoader,
    hydrateFallbackElement: <RestaurantsFallback />,
  },
];

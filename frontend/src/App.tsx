import { Outlet } from "react-router-dom";
import "./App.css";
import { NavBar } from "./components/NavBar";
import { useEffect, useRef, useState } from "react";
import type { CartMeal, Meal } from "./types";
// import type { User } from "./types";

export interface contextType {
  cartMeals: CartMeal[];
  addNewCartMeal: (meal: Meal) => void;
  removeCartMeal: (cartMealId: number) => void;
  increaseMealQuantity: (mealId: number) => void;
  decreaseMealQuantity: (mealId: number) => void;
  cartTotalPrice: number;
  hideSideBar: boolean;
  onLargeScreen: boolean;
  onPageTransition: () => void;
  onSmallScreen: boolean;
}

function App() {
  const appRef = useRef<null | HTMLDivElement>(null);
  const [hideSideBar, setHideSideBar] = useState(true);
  const [onLargeScreen, setOnLargeScreen] = useState(false);
  const [onSmallScreen] = useState(false);
  // When going from one page to another
  const onPageTransition = () => {
    setHideSideBar(true);
  };

  const [cartMeals, setCartMeals] = useState<CartMeal[] | []>([]);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  useEffect(() => {
    (() => {
      setCartTotalPrice(
        cartMeals.reduce((acc, meal) => meal.price * meal.quantity + acc, 0),
      );
    })();
  }, [cartMeals]);

  // const addNewCartMeal = (newMeal: Meal) => {
  //   // To figure out if the meal being added is already in cartMeals
  //   const findedMeal = cartMeals.find(
  //     (cartMeal) => cartMeal.id === newMeal?.id,
  //   );
  //   if (!findedMeal) {
  //     setCartMeals([...cartMeals, { ...newMeal, quantity: 1 }]);
  //   } else {
  //     setCartMeals(
  //       cartMeals.map((cartMeal) => {
  //         if (cartMeal.id === newMeal.id) {
  //           return { ...cartMeal, quantity: cartMeal.quantity + 1 };
  //         } else {
  //           return cartMeal;
  //         }
  //       }),
  //     );
  //   }
  // };

  const removeCartMeal = (cartMealId: number) => {
    setCartMeals(cartMeals.filter((cartMeal) => cartMeal.id !== cartMealId));
  };

  const increaseMealQuantity = (mealId: number) => {
    setCartMeals((prevCartMeals) => {
      return prevCartMeals.map((meal) => {
        if (meal.id === mealId) {
          return { ...meal, quantity: meal.quantity + 1 };
        } else {
          return meal;
        }
      });
    });
  };

  const decreaseMealQuantity = (mealId: number) => {
    setCartMeals((prevCartMeals) => {
      return prevCartMeals.map((meal) => {
        if (meal.id === mealId) {
          if (meal.quantity === 0) return meal;
          return { ...meal, quantity: meal.quantity - 1 };
        } else {
          return meal;
        }
      });
    });
  };

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      if (Number(entry.contentRect.width) >= 630) {
        setHideSideBar(true);
        setOnLargeScreen(true);
      } else if (entry.contentRect.width < 630) {
        if (onLargeScreen) setHideSideBar(true);
        setOnLargeScreen(false);
      }
    });
    if (appRef.current) {
      observer.observe(appRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onLargeScreen, hideSideBar]);

  const handleHamburgerClick = () => {
    setHideSideBar(false);
  };

  const closeSideBar = () => {
    setHideSideBar(true);
  };

  return (
    <div ref={appRef} className="w-full">
      <NavBar
        onLargeScreen={onLargeScreen}
        onHamburgerClick={handleHamburgerClick}
        onSideBarClose={closeSideBar}
        onSmallScreen={onSmallScreen}
        hideSideBar={hideSideBar}
      />
      <div className="mt-14">
        <Outlet
          context={{
            cartMeals,
            // addNewCartMeal,
            removeCartMeal,
            increaseMealQuantity,
            decreaseMealQuantity,
            cartTotalPrice,
            hideSideBar,
            onLargeScreen,
            onPageTransition,
            onSmallScreen,
          }}
        />
      </div>
    </div>
  );
}

export default App;

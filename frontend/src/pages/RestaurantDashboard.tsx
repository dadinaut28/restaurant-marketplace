import {
  Outlet,
  useLoaderData,
  useRevalidator,
  type RevalidationState,
} from "react-router-dom";
import { RestaurantDashboardSideBar } from "../components/RestaurantDashboardSideBar";
import { useEffect, useRef, useState } from "react";
import type { Meal, MealCategory } from "../types";

export interface RestaurantDashboardContext {
  onLargeScreen: boolean;
  hideSideBar: boolean;
  handleHamburgerClick: () => void;
  restaurantMeals: Meal[];
  mealCategories: MealCategory[];
  dashboarRevalidator: {
    revalidate: () => Promise<void>;
    state: RevalidationState;
  };
}

export function RestaurantDashboard() {
  const dashboardRef = useRef(null);

  const [onLargeScreen, setOnLargeScreen] = useState(false);
  const [hideSideBar, setHideSideBar] = useState(true);

  const { restaurant, restaurantMeals, mealCategories } = useLoaderData();
  const dashboardRevalidator = useRevalidator();

  const handleHamburgerClick = () => {
    setHideSideBar((v) => !v);
  };

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width > 900) {
        setHideSideBar(false);
        setOnLargeScreen(true);
      } else if (entry.contentRect.width < 900) {
        if (onLargeScreen) setHideSideBar(true);
        setOnLargeScreen(false);
      }
    });
    if (dashboardRef.current) observer.observe(dashboardRef.current);

    return () => observer.disconnect();
  }, [onLargeScreen]);

  return (
    <div ref={dashboardRef} className="flex bg-gray-50 min-h-screen">
      <RestaurantDashboardSideBar
        restaurant={restaurant}
        hideSideBar={hideSideBar}
        onLargeScreen={onLargeScreen}
      />
      <div
        style={{ width: `${onLargeScreen ? "calc(100% - 240px)" : "100%"}` }}
        className=""
      >
        <Outlet
          context={{
            onLargeScreen,
            hideSideBar,
            handleHamburgerClick,
            restaurantMeals,
            mealCategories,
            dashboardRevalidator,
          }}
        />
      </div>
    </div>
  );
}

import { Button } from "./ui/button";
// import { Input } from "./ui/input";
import hamburger from "../assets/hamburger.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface Props {
  onHamburgerClick: () => void;
  onLargeScreen: boolean;
  onSmallScreen: boolean;
  hideSideBar: boolean;
  onSideBarClose: () => void;
}

export function NavBar({
  onHamburgerClick,
  onLargeScreen,
  hideSideBar,
  onSideBarClose,
}: Props) {
  const navigate = useNavigate();

  useEffect(
    () => console.log(onLargeScreen, hideSideBar),
    [hideSideBar, onLargeScreen],
  );

  return (
    <nav className="h-14 fixed top-0 left-0 right-0 flex justify-between px-5 items-center z-40 border-b bg-white border-gray-100">
      <div className="flex gap-1 items-center">
        {!onLargeScreen && (
          <button onClick={onHamburgerClick} className="bg-transparent">
            <img className="w-10" src={hamburger} alt="Icone menu" />
          </button>
        )}
        {onLargeScreen && (
          <Button
            onClick={() => navigate("/")}
            className="text-black p-0 text-2xl font-medium bg-transparent"
          >
            <span className="title m-0">Platform</span>
          </Button>
        )}
      </div>
      {(onLargeScreen || (!onLargeScreen && !hideSideBar)) && (
        <div
          className={`${!onLargeScreen ? "fixed top-0 left-0 bottom-0 flex flex-col z-40 pt-25 px-5 gap-8 border border-gray-200 shadow bg-white" : "flex gap-12 text-lg font-medium text-gray-800"}`}
        >
          {!onLargeScreen && (
            <Button
              onClick={onSideBarClose}
              className="absolute w-10 h-10 top-3 right-5 bg-gray-400 rounded-full"
            >
              <img
                className="w-5 h-5"
                src=".././icons/close-icon.svg"
                alt="Icone close"
              />
            </Button>
          )}
          <Link
            className="hover:text-orange-500 transition-colors"
            to="/register"
          >
            Inscrivez votre restaurant
          </Link>
          <Link
            className="hover:text-orange-500 transition-colors"
            to="/restaurant-dashboard"
          >
            Tableau de bord
          </Link>
        </div>
      )}
      <Button
        className="bg-orange-500 px-5 rounded-2xl"
        onClick={() => navigate("/cart")}
      >
        Panier
      </Button>
    </nav>
  );
}

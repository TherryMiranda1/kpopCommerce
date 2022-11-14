import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTotalQTY, setOpenCart } from "../app/CartSlice.js";

import {
  HeartIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { AiOutlineShopping } from "react-icons/ai";
import { useRouter } from "next/router.js";
import { useStateContext } from "src/context/StateContext.js";
import { Cart } from "./index.js";

const Navbar = () => {
  const [navState, setNavState] = useState(false);
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const { push } = useRouter();

  const onNavScroll = () => {
    if (window.scrollY > 300) {
      setNavState(true);
    } else {
      setNavState(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", onNavScroll);

    return () => {
      window.removeEventListener("scroll", onNavScroll);
    };
  }, []);
  return (
    <>
      <header
        className={
          !navState
            ? "fixed left-0 h-[6vh] justify-center flex right-0 opacity-100 z-30 bg-gray-800"
            : "fixed top-0 left-0 right-0 h-[6vh] flex items-center  justify-center opacity-100 z-30 blur-effect-theme"
        }
      >
        <nav className="flex items-center justify-between nike-container">
          <div className="flex items-center">
            <img
              onClick={() => push("/")}
              src="https://res.cloudinary.com/dzkcloud/image/upload/v1668452577/theQuest/assets/9e89098b3d01981392542b86977825cc-removebg-preview_asp4nh.png"
              alt="logo/img"
              className={`w-14 h-auto cursor-pointer hover:w-16 l`}
            />
          </div>
          <ul className="flex items-center justify-center gap-2">
            <li className="grid items-center">
              <MagnifyingGlassIcon
                className={`icon-style ${
                  navState && "text-slate-900 transition-all duration-300"
                }`}
              />
            </li>
            <li className="grid items-center">
              <HeartIcon
                className={`icon-style ${
                  navState && "text-slate-900 transition-all duration-300"
                }`}
              />
            </li>
            <li className="mx-5 items-center font-bold">
              <button
                type="button"
                className={`icon-style ${
                  navState && "text-slate-900 transition-all duration-300"
                }`}
                onClick={() => setShowCart(!showCart)}
              >
                <ShoppingBagIcon />
                <span className="cart-item-qty">{totalQuantities}</span>
              </button>
            </li>
          </ul>
          {showCart && <Cart />}
        </nav>
      </header>
    </>
  );
};

export default Navbar;

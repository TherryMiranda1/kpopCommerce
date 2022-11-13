import React from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { StarIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";
import { setAddItemToCart, setOpenCart } from "../../app/CartSlice";

const Item = ({
  ifExists,
  id,
  color,
  shadow,
  descripcion,
  titulo,
  precio,
  images,
  img,
  btn,
  _id,
  rating,
  price,
}) => {
  //   console.log(id)
  const dispatch = useDispatch();
  const router =useRouter()

  const onAddToCart = () => {
    const item = { id, descripcion, titulo, images, img, color, shadow, price };

    dispatch(setAddItemToCart(item));
  };

  const onCartToggle = () => {
    dispatch(
      setOpenCart({
        cartState: true,
      })
    );
  };

  return (
    <>
      <div
        onClick={() => router.push(`/productos/${_id}`)}
        className={`relative bg-gradient-to-l  ${
          ifExists
            ? "from-gray-900 to-yellow-500 shadow-lg shadow-yellow-500 justify-items-start"
            : "from-slate-700 to-black shadow-lg shadow-black justify-items-center "
        } rounded-xl m-auto py-4 px-5 transition-all grid items-center duration-700 ease-in-out w-full hover:scale-105`}
      >
        <div
          className={`grid items-center ${
            ifExists ? "justify-items-start" : "justify-items-center"
          }`}
        >
          <h1 className="text-slate-200 text-xl lg:text-lg md:text-base font-medium filter drop-shadow">
            {titulo}
          </h1>
          <p className="text-slate-200 filter drop-shadow text-base md:text-sm font-normal">
            {descripcion}
          </p>

          <div className="flex items-center justify-between w-28 my-2">
            <div className="flex items-center bg-white/80  px-1 rounded blur-effect-theme">
              <h1 className="text-black text-sm font-medium">
                {parseInt(precio).toLocaleString("es-ES", {
                  style: "currency",
                  currency: "EUR",
                })}
              </h1>
            </div>
            <div className="flex items-center gap-1">
              <StarIcon className="icon-style w-5 h-5 md:w-4 md:h-4" />
              <h1 className="md:text-sm font-normal text-slate-100">
                {rating}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="bg-white/90 blur-effect-theme button-theme p-0.5 shadow shadow-sky-200"
              onClick={() => onAddToCart()}
            >
              <ShoppingBagIcon className="icon-style text-slate-900" />
            </button>
            <button
              type="button"
              className="bg-white/90 blur-effect-theme button-theme px-2 py-1 shadow shadow-sky-200 text-sm text-black"
              onClick={() => {
                onAddToCart();
                onCartToggle();
              }}
            >
              {btn}
            </button>
          </div>
        </div>
        <div
          className={`flex items-center ${
            ifExists ? "absolute top-5 right-1" : "justify-center"
          }`}
        >
          {img && (
            <img
              src={img}
              alt={`img/item-img/${id}`}
              className={`transitions-theme hover:-rotate-12 ${
                ifExists
                  ? "h-auto w-64 lg:w-56 md:w-48 -rotate-[35deg]"
                  : "h-36 w-64"
              }`}
            />
          )}
          {images && (
            <img
              src={images[0].url}
              alt={`img/item-img/${id}`}
              className={`transitions-theme hover:-rotate-12 ${
                ifExists
                  ? "h-auto w-64 lg:w-56 md:w-48 -rotate-[35deg]"
                  : "h-46"
              }`}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Item;

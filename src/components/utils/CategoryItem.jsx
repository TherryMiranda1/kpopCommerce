import React from "react";
import { useRouter } from "next/router";

const CategoryItem = ({
  ifExists,
  id,
  color,
  shadow,
  img,
  descripcion,
  titulo,
  images,
  btn,
  rating,
  price,
}) => {
  //   console.log(id)
  const { push } = useRouter();
  console.log(color);

  return (
    <>
      <div
        onClick={() => push(`/${titulo.toLowerCase()}`)}
        className={` gap-6 relative bg-gradient-to-l from-sky-600 to-indigo-600 shadow-lg cursor-pointer shadow-blue-500 flex flex-wrap items-center place-content-around rounded-xl py-4 px-5 transition-all duration-700 ease-in-out w-full hover:scale-105`}
      >
        <div className={`items-center justify-items-center`}>
          <h1 className="text-slate-200 text-2xl md:text-2xl font-bold filter drop-shadow">
            {titulo}
          </h1>
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
              className={`transitions-theme hover:-rotate-12 "h-auto w-36 lg:w-56 md:w-48 -rotate-[35deg]`}
            />
          )}
          {images && (
            <img
              src={images[0].url}
              alt={`img/item-img/${id}`}
              className={`transitions-theme hover:-rotate-12 ${
                ifExists
                  ? "h-auto w-64 lg:w-56 md:w-48 -rotate-[35deg]"
                  : "h-36 w-64"
              }`}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryItem;

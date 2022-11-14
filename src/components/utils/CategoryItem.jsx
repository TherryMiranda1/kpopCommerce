import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { gradientMaker } from "src/lib/helpers";

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
  const [gradient, setGradient] = useState(null);
  const { push } = useRouter();
  useEffect(() => {
    const color = gradientMaker(titulo.toLowerCase());
    setGradient(color);
  }, []);

  return (
    <>
      {gradient ? (
        <div
          onClick={() => push(`/${titulo.toLowerCase()}`)}
          className={`cursor-pointer gap-6 relative ${gradient} cursor-pointe flex flex-wrap items-center place-content-around rounded-xl py-4 px-5 transition-all duration-700 ease-in-out w-full hover:scale-105`}
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
      ) : null}
    </>
  );
};

export default CategoryItem;

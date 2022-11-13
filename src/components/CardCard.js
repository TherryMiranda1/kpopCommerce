import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineHome, AiOutlineMail, AiOutlineHeart } from "react-icons/ai";
import { BiShapeSquare } from "react-icons/bi";
import { FaBed } from "react-icons/fa";
const ImageSection = () => {
  return <></>;
};

export const CardCard = ({ card }) => {
  const [selectedImg, setSelectedImg] = useState(0);
  const router = useRouter();
  return (
    <section
      data-aos="flip-left"
      data-aos-duration="1500"
      onClick={() => router.push(`/productos/${card._id}`)}
      className="m-3 md:w-[80vw] w-[90vw] p-3 rounded-xl shadow-xl shadow-gray-400 cursor-pointer place-content-center md:flex"
    >
      <article className="flex place-content-center flex-1 md:w-1/2">
        {card.images[0] && (
          <section className="place-content-center flex flex-col gap-5">
            <img
              alt="image"
              className="rounded-xl h-72 w-96 object-cover m-auto"
              src={card.images[selectedImg].url}
            />
            <article className="flex place-content-center overflow-x-scroll">
              {card.images.map((img, i) => (
                <img
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImg(i);
                  }}
                  key={i}
                  className={`rounded-xl object-cover md:h-24 md:w-24 w-16 h-16  p-2 border ${
                    i == selectedImg ? "border-orange-500" : "border-none"
                  }`}
                  alt={card.title}
                  src={img?.url}
                />
              ))}
            </article>
          </section>
        )}
      </article>

      <article className="md:w-1/2 flex flex-col gap-6 m-5">
        <h2 className="text-3xl font-bold">
          {parseInt(card.precio).toLocaleString("es-ES", {
            style: "currency",
            currency: "EUR",
          })}
        </h2>
        <h3 className="text-3xl font-bold">{card.titulo}</h3>
        <h3>{card.accesibilidad}</h3>
        <section className="flex place-content-around gap-6 text-gray-600 font-bold">
          <article className="flex gap-2">
            <p>{card.tipo}</p>
          </article>
        </section>
        <p className="overflow-hidden truncate">{card.descripcion} </p>
        <section className="flex place-content-evenly">
          {" "}
          <a
            href="https://www.whatsapp.com/catalog/34655718171/?app_absent=0"
            className="bg-red-600 hover:bg-red-700 w-32 shadow-lg px-1 shadow-gray-400 text-white font-semibold rounded-xl h-12 gap-2 flex place-content-center items-center"
          >
            {" "}
            <AiOutlineMail size={24} /> Contactar
          </a>
          <button className="text-red-600 hover:text-red-700 w-32  font-semibold rounded-xl h-12 gap-2 flex place-content-center items-center">
            {" "}
            <AiOutlineHeart size={24} /> Favorito
          </button>
        </section>
      </article>
    </section>
  );
};

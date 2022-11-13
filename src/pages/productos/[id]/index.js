import Error from "next/error";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import apiUrl from "next-api-url";

import { AiOutlineShoppingCart, AiOutlineMail, AiOutlineHeart } from "react-icons/ai";
import { BiBookmarkMinus, BiShapeSquare } from "react-icons/bi";
import { FaBed } from "react-icons/fa";
import Hipotecas from "src/components/Inmuebles/Hipotecas";
import Head from "next/head";

export default function ItemDetail({ error, path }) {
  const [selectedImg, setSelectedImg] = useState(0);
  const [card, setCard] = useState(null);
  const [coords, setCoords] = useState(null);
  const { push, query } = useRouter();
  if (error && error.statusCode)
    return (
      <>
        <div style={{ height: "80vh" }}>
          <Error statusCode={error.statusCode} title={error.message} />
        </div>

        <button
          className="bg-green-400 m-2 p-1 px-2 rounded-md text-white font-bold"
          style={{ boxShadow: "1px 2px 3px gray" }}
          onClick={() => push("/")}
        >
          Go Home
        </button>
      </>
    );
  const getCard = async () => {
    const res = await fetch(`${path}/cards/${query.id}`);
    const parsedCard = await res.json();
    setCard(parsedCard);
  };
  console.log(card?.direccion?.split(",")[0]);
  useEffect(() => {
    getCard();
  }, []);
  useEffect(() => {
    setCoords({
      lat: parseFloat(card?.direccion?.split(",")[0]),
      lng: parseFloat(card?.direccion?.split(",")[1]),
    });
  }, [card]);

  return (
    <div className="pt-12">
      <Head>
        <title>{card?.titulo}</title>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
      </Head>
      {card && (
        <section className="m-3 p-3 rounded-xl shadow-xl shadow-gray-400 cursor-pointer place-content-center ">
          <article className="flex place-content-center flex-1 ">
            {card?.images[0] && (
              <section className="place-content-center flex flex-col gap-5">
                <img
                  alt="image"
                  className="rounded-xl lg:w-[35vw] md:w-[50vw] w-[70vw] h-[50vh] object-cover m-auto"
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
                      className={`rounded-xl object-cover  md:h-24 md:w-24 w-16 h-16 p-2 border ${
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

          <article className="flex flex-col gap-6 m-5">
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
            <p className="overflow-hidden text-2xl">{card.descripcion}</p>
            <section className="flex place-content-evenly">
              {" "}
              <button className="bg-sky-600 hover:bg-sky-700 w-32 text-white font-semibold rounded-xl h-12 gap-2 flex place-content-center items-center">
                {" "}
                <AiOutlineShoppingCart size={24} /> Comprar
              </button>
              <button className="text-sky-600 hover:text-sky-700 w-32  font-semibold rounded-xl h-12 gap-2 flex place-content-center items-center">
                <AiOutlineHeart size={24} /> Favorito
              </button>
            </section>
          </article>
        </section>
      )}
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const path = apiUrl(context);
  return {
    props: {
      path,
    },
  };
};

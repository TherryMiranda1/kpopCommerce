import Error from "next/error";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import apiUrl from "next-api-url";

import {
  AiOutlineShoppingCart,
  AiOutlineMail,
  AiOutlineHeart,
} from "react-icons/ai";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import Head from "next/head";
import { useStateContext } from "src/context/StateContext";

export default function ItemDetail({ error, path }) {
  const [selectedImg, setSelectedImg] = useState(0);
  const [product, setProduct] = useState(null);
  const [index, setIndex] = useState(0);
  const { push, query } = useRouter();

  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);

    setShowCart(true);
  };

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
    setProduct(parsedCard);
  };
  useEffect(() => {
    getCard();
  }, []);

  return (
    <div className="pt-12">
      <Head>
        <title>{product?.titulo}</title>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
      </Head>
      {product && (
        <section className="m-3 p-3 rounded-xl cursor-pointer place-content-center ">
          <article className="flex place-content-center flex-1 ">
            {product?.images[0] && (
              <section className="place-content-center shadow-xl shadow-gray-400 p-16 rounded-3xl flex flex-col gap-5">
                <img
                  alt="image"
                  className="rounded-xl lg:w-[35vw] md:w-[50vw] w-auto h-[50vh] object-contain m-auto"
                  src={product.images[selectedImg].url}
                />
                <article className="flex  place-content-center overflow-x-scroll">
                  {product.images.map((img, i) => (
                    <img
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImg(i);
                      }}
                      key={i}
                      className={`rounded-xl object-cover  md:h-24 md:w-24 w-16 h-16 p-2 border ${
                        i == selectedImg ? "border-orange-500" : "border-none"
                      }`}
                      alt={product.titulo}
                      src={img?.url}
                    />
                  ))}
                </article>
              </section>
            )}
          </article>

          <article className="flex flex-col gap-6 m-5">
            <h2 className="text-3xl font-bold">
              {parseInt(product.precio).toLocaleString("es-ES", {
                style: "currency",
                currency: "EUR",
              })}
            </h2>
            <section className="flex gap-6">
              <h3 className="text-3xl font-bold">{product.titulo}</h3>
              <p className="border text-gray-500 font-bold flex w-24 items-center border-gray-300 p-1 gap-5">
                <span className="minus" onClick={decQty}>
                  <AiOutlineMinus />
                </span>
                <span className="num">{qty}</span>
                <span className="plus" onClick={incQty}>
                  <AiOutlinePlus />
                </span>
              </p>
            </section>

            <section className="flex place-content-around gap-6 text-gray-600 font-bold">
              <article className="flex gap-2">
                <p>{product.tipo}</p>
              </article>
            </section>
            <p className="overflow-hidden text-2xl">{product.descripcion}</p>
            <section className="flex place-content-evenly">
              <button
                onClick={() => onAdd(product, qty)}
                className="bg-sky-600 hover:bg-sky-700 w-44 text-white font-semibold rounded-xl h-12 gap-2 flex place-content-center items-center"
              >
                <AiOutlineShoppingCart size={24} /> Añadir al Carrito
              </button>
              <button
                onClick={handleBuyNow}
                className="text-sky-600 hover:text-sky-700 w-38  font-semibold rounded-xl h-12 gap-2 flex place-content-center items-center"
              >
                <AiOutlineHeart size={24} /> Comprar Ahora
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

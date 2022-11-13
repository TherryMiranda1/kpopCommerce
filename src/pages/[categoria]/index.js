import Error from "next/error";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import apiUrl from "next-api-url";

import { AiOutlineHome, AiOutlineMail, AiOutlineHeart } from "react-icons/ai";
import { BiBookmarkMinus, BiShapeSquare } from "react-icons/bi";
import { FaBed } from "react-icons/fa";
import Hipotecas from "src/components/Inmuebles/Hipotecas";
import Head from "next/head";
import { CardCard } from "src/components/CardCard";
import Item from "src/components/utils/Item";

export default function ItemDetail({ error, path }) {
  const [selectedImg, setSelectedImg] = useState(0);
  const [cards, setCards] = useState(null);
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
  console.log(query.categoria);
  const getCards = async () => {
    const res = await fetch(`${path}/cards/`);
    const parsedCard = await res.json();
    const matchCards = parsedCard.filter(function (rcp) {
      return rcp.tipo.toLowerCase() === query.categoria;
    });
    if (matchCards.length > 0) {
      setCards(matchCards);
    } else{
      push('/')
    }
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    <div className="h-[100vh]">
      <Head>
        <title>{cards?.titulo}</title>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
      </Head>
      <div className="w-full  flex flex-col text-xl font-bold pt-14">
        {cards != null ? (
          <section>
            <h1 className="m-auto text-center first-letter:text-3xl">{query.categoria}</h1>
            <div
              className={`grid items-center justify-items-center gap-7 lg:gap-5 mt-7 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 m-10`}
            >
              {cards.map((item, i) => (
                <Item {...item} key={i} />
              ))}
            </div>
          </section>
        ) : (null
        )}
      </div>
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

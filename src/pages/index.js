import { getSession, useSession } from "next-auth/react";
import { CardCard } from "src/components/CardCard";
import { FlexContent, Hero, Sales, Stories, Categories } from "src/components";
import apiUrl from "next-api-url";
import {
  heroapi,
  popularsales,
  categories,
  topratesales,
  highlight,
  sneaker,
  story,
  footerAPI,
} from "src/plantillas/data.js";

import AOS from "aos";
import "aos/dist/aos.css";
import { useState, useEffect } from "react";
import Head from "next/head";
import { useCustom } from "src/context/CustomContext";

export default function HomePage({ cards, users, session, path }) {
  // if (cards.length === 0) return <NoContentComponent />;
  const [tops, setTops] = useState({
    banner: cards?.slice(0, 5),
    valueds: cards?.slice(0, 3),
  });

  const handleCalcTops = () => {
    const bannerFilter = cards?.sort(function () {
      return Math.random() - 0.5;
    });
    const topsFilter = cards?.filter(function (rcp) {
      return rcp.rating >= 4.5;
    });
    setTops({
      banner: bannerFilter.slice(0, 5),
      valueds: topsFilter.slice(0, 3),
    });
  };

  useEffect(() => {
    handleCalcTops()
    AOS.init();
  }, []);

  return (
    <article >
      <Head>
        <title>The Quest</title>
      </Head>
      <div className="text-md">
        <section >
          <main className="flex flex-col gap-16 flex-1 max-w-full mb-6">
            <Hero
              heroapi={tops.banner}
              sociallinks={heroapi.sociallinks}
              multiple
              gradient={"bg-gradient-to-l from-gray-900 to-yellow-500"}
              gradient2={
                "bg-gradient-to-l from-green-500 to-emerald-600 shadow-lg shadow-green-500"
              }
              gradient3={
                "bg-gradient-to-l from-blue-900 to-blue-500 shadow-lg shadow-blue-500"
              }
              gradient4={
                "bg-gradient-to-l from-red-400 to-rose-600 shadow-lg shadow-rose-500"
              }
            />
            <Sales endpoint={tops.valueds} ifExists gradient={"bg-gradient-to-br from-gray-900 to-yellow-500"} />
            <Categories endpoint={categories.items} />
            <FlexContent endpoint={highlight[0]} ifExists  />
            {/* <Sales endpoint={topratesales.items} /> */}
            <Sales endpoint={cards} gradient={"bg-gradient-to-br from-sky-900 to-indigo-500 shadow-lg shadow-blue-500"} />
            <FlexContent endpoint={highlight[1]} />
            <Stories story={story} />
          </main>
        </section>
      </div>
    </article>
  );
}

export const getServerSideProps = async (context) => {
  const res = await fetch(`${apiUrl(context)}/cards`);
  const cards = await res.json();
  const userRes = await fetch(`${apiUrl(context)}/users`);
  const users = await userRes.json();

  const path = apiUrl(context);

  const session = await getSession(context);

  return {
    props: {
      cards,
      users,
      session,
      path,
    },
  };
};

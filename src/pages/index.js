import { getSession, useSession } from "next-auth/react";
import { CardCard } from "src/components/CardCard";
import {
  FlexContent,
  Hero,
  Sales,
  Stories,
  Categories
} from "src/components";
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
  const [ready, setReady] = useState(false);
  // if (cards.length === 0) return <NoContentComponent />;
  const {setPath}= useCustom()

  const web = 0;
  console.log(path);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <article className="w-full">
      <Head>
        <title>Sport Commerce</title>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
      </Head>
      <div className="w-full text-md">
        <section>
          <main className="flex flex-col gap-16 relative">
            <Hero heroapi={heroapi} gradient={'bg-gradient-to-l from-gray-900 to-yellow-500'}/>
            <Sales endpoint={popularsales.items} ifExists />
            <Categories endpoint={categories.items} />
            <FlexContent endpoint={highlight} ifExists />
            <Sales endpoint={topratesales.items} />
            <Sales endpoint={cards} />
            <FlexContent endpoint={sneaker} />
            <Stories story={story} />
          </main>
          {/* <div className="flex flex-wrap place-content-center">
            {cards.map((card) => (
              <CardCard card={card} key={card._id} />
            ))}
          </div> */}
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

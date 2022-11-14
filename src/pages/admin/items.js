import React from "react";
import apiUrl from "next-api-url";
import { getSession } from "next-auth/react";
import { AdminEditCard } from "src/components/AdminEditCard";

function items({ cards, card, session, path }) {
  return (
    <div>
      <section>
        <h2 className="pt-20 text-2xl">Productos</h2>
        <div className="flex flex-wrap place-content-center">
          {cards.map((card) => (
            <AdminEditCard card={card} key={card._id} path={path} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default items;

export const getServerSideProps = async (context) => {
  const res = await fetch(`${apiUrl(context)}/cards`);
  const cards = await res.json();

  const session = await getSession(context);
  const path = apiUrl(context);
  console.log(path);
  return {
    props: {
      cards,
      session,
      path,
    },
  };
};

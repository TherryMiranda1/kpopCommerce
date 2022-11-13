import React from "react";
import { useCustom } from "../context/CustomContext";

import { getSession } from "next-auth/react";
import { CardCard } from "src/components/CardCard";
import apiUrl from "next-api-url";

function ServicesPage({ cards }) {
  const { productsValues } = useCustom();
  return (
    <div className="w-full text-xl font-bold pt-14">
      <div className="flex flex-wrap place-content-center">
        {cards.map((card) => (
          <CardCard card={card} key={card._id} />
        ))}
      </div>
    </div>
  );
}

export default ServicesPage;

export const getServerSideProps = async (context) => {
  const res = await fetch(`${apiUrl(context)}/cards`);
  const cards = await res.json();

  const session = await getSession(context);

  return {
    props: {
      cards,
      session,
    },
  };
};

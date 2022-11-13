import React from "react";

const BANKS = [
  {
    id: 1,
    image: "/assets/caixa.jpg",
    url: "https://www.caixabank.es/aplnr/hipotecas/simulador/index_es.html",
    title: "Caixa",
  },
  {
    id: 2,
    image: "/assets/santander.png",
    url: "https://online.bancosantander.es/landings/hipotecas/hipoteca-online/",
    title: "Santander",
  },
  {
    id: 3,
    image: "/assets/logo-bbva.jpg",
    url: "https://www.bbva.es/personas/productos/hipotecas/simulador-hipotecas.html",
    title: "BBVA",
  },
  {
    id: 4,
    image: "/assets/ing.jpg",
    url: "https://www.ing.es/landings/hipotecas/simula-hipoteca/",
    title: "Ing",
  },
];
function Hipotecas() {
  return (
    <div>
      <h2 className="font-bold text-3xl m-6 text-center">
        Calcula tu Hipoteca
      </h2>
      <article className="flex gap-6 place-content-center">
        {BANKS.map((bank) => (
          <a href={bank.url} key={bank.id}>
            <img
              className="w-24  h-16 p-1 hover:p-0 rounded-md shadow-2xl shadow-slate-600"
              alt={bank.title}
              src={bank.image}
            />
            <h3 className="font-bold text-center">{bank.title}</h3>
          </a>
        ))}
      </article>
    </div>
  );
}

export default Hipotecas;

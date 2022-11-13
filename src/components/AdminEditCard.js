import Router, { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineHome, AiOutlineMail, AiOutlineHeart } from "react-icons/ai";
import { BiShapeSquare } from "react-icons/bi";
import { FaBed, FaPen, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
const ImageSection = () => {
  return <></>;
};

const DeleteToast = ({ t, card, path }) => {
  const { push, query } = useRouter();

  const deleteCard = async () => {
    const { id } = query;
    console.log(card);
    try {
      const res = await fetch(
        `${path}/cards/${card._id}`,
        {
          method: "DELETE",
        }
      );
    } catch (error) {
      console.log(error);
    }
    console.log(id);
  };

  const handleDelete = () => {
    deleteCard();
    toast.dismiss(t.id);
    Router.reload(window.location.pathname);
  };
  return (
    <div
      className={`${
        t.visible ? "" : "animate-pulse"
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            {/* <img
          className="h-10 w-10 rounded-full"
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
          alt=""
        /> */}
          </div>
          <div className="ml-3 flex-1">
            <h2 className="font-bold">Seguro que quieres eliminar?</h2>
            <p className="text-sm font-medium text-gray-900">{card.titulo}</p>
            <p className="mt-1 text-sm text-gray-500">{card.description}</p>
          </div>
        </div>
      </div>
      <div className="border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-green-500 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Volver
        </button>
        <button
          onClick={() => handleDelete()}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export const AdminEditCard = ({ card, path }) => {
  const [selectedImg, setSelectedImg] = useState(0);
  const router = useRouter();
  return (
    <section
      onClick={() => router.push(`/inmuebles/${card._id}`)}
      className="md:w-[80vw] w-[90vw] p-3 rounded-xl shadow-xl shadow-gray-400 cursor-pointer place-content-center md:flex"
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
                  className={`rounded-xl object-cover h-24 w-24 p-2 border ${
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
        <section className="flex place-content-evenly">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toast.custom((t) => <DeleteToast t={t} card={card} path={path} />);
            }}
            className="text-red-600 hover:text-white hover:bg-red-600 w-32  font-semibold rounded-xl h-12 gap-2 flex place-content-center items-center"
          >
            <FaTrashAlt size={24} /> Eliminar
          </button>
          {/* <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/inmuebles/${card._id}/edit`);
            }}
            className="text-red-600 hover:text-white hover:bg-red-600 w-32  font-semibold rounded-xl h-12 gap-2 flex place-content-center items-center"
          >
            <FaPen size={24} /> Editar
          </button> */}
        </section>
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
            <AiOutlineHome size={28} />
            <p>{card.tipo}</p>
          </article>
          <article className="flex gap-2">
            <FaBed size={28} />
            <p>{card.habitaciones} hab</p>
          </article>
          <article className="flex gap-2">
            <BiShapeSquare size={28} />
            <p>{card.superficie} m²</p>
          </article>
        </section>
        <p className="overflow-hidden truncate">{card.descripcion} </p>
      </article>
    </section>
  );
};

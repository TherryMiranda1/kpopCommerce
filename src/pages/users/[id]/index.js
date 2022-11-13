import Error from "next/error";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-hot-toast";

const CustomToast = ({ t, user }) => {
  const { query, push } = useRouter();

  const deleteItem = async () => {
    const { id } = query;
    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
    console.log(id);
  };

  const handleDelete = () => {
    deleteItem();
    toast.dismiss(t.id);
    push("/");
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
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="mt-1 text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>
      <div className="border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Volver
        </button>
        <button
          onClick={() => handleDelete()}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default function ItemDetail({ user, error }) {
  const router = useRouter();
  if (error && error.statusCode)
    return (
      <>
        <div style={{ height: "80vh" }}>
          <Error statusCode={error.statusCode} title={error.message} />
        </div>

        <button
          className="bg-green-400 m-2 p-1 px-2 rounded-md text-white font-bold"
          style={{ boxShadow: "1px 2px 3px gray" }}
          onClick={() => router.push("/")}
        >
          Go Home
        </button>
      </>
    );

  return (
    <div className="pt-12">
      <article className=" rounded-lg p-4 max-w-md mx-auto text-center">
        <div className="max-w-xs m-auto">
          <h1 className="">{user.name}</h1>
          <h3 className="">{user.email}</h3>
        </div>
        <button
          className="bg-red-400 m-2 p-1 rounded-md text-white"
          style={{ boxShadow: "1px 2px 3px gray" }}
          onClick={() => toast.custom((t) => <CustomToast t={t} user={user} />)}
        >
          Eliminar
        </button>
      </article>
    </div>
  );
}

export const getServerSideProps = async ({ query: { id } }) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users/${id}`);

  if (res.status === 200) {
    const user = await res.json();
    return {
      props: {
        user,
      },
    };
  }

  return {
    props: {
      error: { statusCode: res.status, message: "Card not found" },
    },
  };
};

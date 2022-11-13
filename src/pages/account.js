import { getSession, signOut } from "next-auth/react";

function account({ session }) {
  return (
    <div className="p-12 flex flex-col gap-12">
      account
      <p>Hola, {session?.user?.name}</p>
      <button onClick={() => signOut()}>Cerrar Sesion</button>
    </div>
  );
}

export default account;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
  return {
    props: { session },
  };
};

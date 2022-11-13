import React from "react";
import { useSession, getSession, signIn, signOut } from "next-auth/react";

function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="p-12 flex gap-8">
        <p>Hola, {session.user.name}</p>
        <button onClick={() => signOut()}>Cerrar Sesion</button>
      </div>
    );
  } else {
    return (
      <div className="p-12 font-bold">
        <button onClick={() => signIn()}>Iniciar sesion</button>
      </div>
    );
  }
}

export default Login;

export const getServerSideProps = async (context) => {
    const session = await getSession(context);
  
    if (session) {
      return {
        redirect: {
          destination: "/admin/newItem",
        },
      };
    }
    return {
      props: { session },
    };
  };

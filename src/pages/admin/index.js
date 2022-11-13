import { getSession, signOut } from "next-auth/react";

function index() {
  return (
    <div className=''>index</div>
  )
}

export default index

export const getServerSideProps = async (context) => {
    const session = await getSession(context);
  
    if (!session) {
      return {
        redirect: {
          destination: "/login",
        },
      };
    }
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
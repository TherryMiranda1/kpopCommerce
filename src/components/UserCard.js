import { useRouter } from "next/router";

export const UserCard = ({ user }) => {
    const router = useRouter();
  
    return (
      <section
        className="m-3 p-3 rounded-xl shadow-2xl"
        style={{ boxShadow: "1px 2px 3px gray" }}
      >
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <div className="text-white font-bold">
          <button
            className="bg-blue-400 m-2 p-1 rounded-md "
            style={{ boxShadow: "1px 2px 3px gray" }}
            onClick={() => router.push(`/users/${user._id}`)}
          >
            View
          </button>
          <button
            className="bg-green-400 m-2 p-1 rounded-md"
            style={{ boxShadow: "1px 2px 3px gray" }}
            onClick={() => router.push(`/cards/${card._id}/edit`)}
          >
            Edit
          </button>
          <button
            className="bg-red-400 m-2 p-1 rounded-md"
            style={{ boxShadow: "1px 2px 3px gray" }}
          >
            Delete
          </button>
        </div>
      </section>
    );
  };
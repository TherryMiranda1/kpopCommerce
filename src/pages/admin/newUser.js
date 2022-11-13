import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const formValues = {
  title: "Nueva Usuario",
  update: "Editar Usuario",
  visible: true,
  image: "/assets/task.png",
  color: "#ffffff",
  textColor: "#000000",
  iconColor: "#000000",
  menuColor: "#ffffff",
  blur: true,
  placeholders: [
    { id: 1, title: "Name", name: "name", type: "text", required: true },
    {
      id: 2,
      title: "Email",
      name: "email",
      type: "text",
      required: true,
    },
    {
      id: 3,
      title: "Password",
      name: "password",
      type: "password",
      required: true,
    },
  ],
};
function newUser() {
  //State
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const { push, query } = useRouter();

  // Form Validate
  const validate = () => {
    const errors = {};

    if (!newUser.name) errors.name = "name is required";
    if (!newUser.email) errors.email = "email is required";
    if (!newUser.password) errors.password = "password is required";
    return errors;
  };

  const createUser = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const user = await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/${query.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCard),
      });
      const user = await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  // Submit Form Values
  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();
    if (Object.keys(errors).length) return setErrors(errors);

    if (query.id) {
      await updateUser();
    } else {
      await createUser();
    }

    await push("/");
  };

  // Set Input Changes on the state
  const handleChange = (e) =>
    setNewUser({ ...newUser, [e.target.name]: e.target.value });

  const getUser = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/${query.id}`);

    if (res.status === 200) {
      const user = await res.json();
      setNewUser(user);
    }
  };

  useEffect(() => {
    if (query.id) {
      getUser();
    }
  }, []);

  return (
    <div className="pt-12 m-6 font-bold text-md align-end">
      <article className=" rounded-lg p-4 max-w-md mx-auto ">
        <form className=" text-center " onSubmit={handleSubmit}>
          <h3 className="">
            {query.id ? formValues.update : formValues.title}
          </h3>
          <div className="max-w-xs m-auto my-6">
            {formValues?.placeholders?.map((item) => (
              <div key={item.id}>
                <label className="block font-light">{item.title}</label>
                <input
                  type={item.type}
                  placeholder={
                    errors[item.name] ? errors[item.name] : item.title
                  }
                  required={item.required}
                  name={item.name}
                  onChange={(e) => handleChange(e)}
                  className="p-1 focus:outline-none border rounded-xl border-gray-300 m-2"
                  value={newUser[item.name]}
                />
              </div>
            ))}
          </div>
          <button
            className="bg-blue-400 m-2 p-1 rounded-md text-white"
            style={{ boxShadow: "1px 2px 3px gray" }}
          >
            {query.id ? "Actualizar" : "Guardar"}
          </button>
        </form>
      </article>
    </div>
  );
}

export default newUser;

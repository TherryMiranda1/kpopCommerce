import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { AdminEditCard } from "src/components/AdminEditCard";
import DotLoader from "react-spinners/DotLoader";
import apiUrl from "next-api-url";

const formValues = {
  title: "Nuevo Producto",
  update: "Editar Producto",
  visible: true,
  image: "/assets/task.png",
  color: "#ffffff",
  textColor: "#000000",
  iconColor: "#000000",
  menuColor: "#ffffff",
  blur: true,
  placeholders: [
    { id: 1, title: "Titulo", name: "titulo", type: "text", required: true },
   
    {
      id: 4,
      title: "Precio",
      name: "precio",
      type: "text",
      required: true,
    },
    { id: 5, title: "Tipo", name: "tipo", type: "text", required: false },
    {
      id: 6,
      title: "Rating",
      name: "rating",
      type: "text",
      required: false,
    },
    {
      id: 7,
      title: "Existencia",
      name: "existencia",
      type: "text",
      required: false,
    }
  ],
};

const MAX_COUNT = 5;

function newItem({ cards, card, session, path }) {
  const { push, query } = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  //State
  const [newCard, setNewCard] = useState({
    titulo: "",
    description: "",
    type: "",
    files: [],
  });
  const [errors, setErrors] = useState({});
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);

  const handleUploadFiles = async (files) => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;
    const reader = new FileReader();
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === MAX_COUNT) setFileLimit(true);
        if (uploaded.length > MAX_COUNT) {
          alert(`You can only add a maximum of ${MAX_COUNT} files`);
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    });

    if (!limitExceeded) setUploadedFiles(uploaded);
    console.log(uploaded);
    setNewCard({ ...newCard, ["files"]: uploaded });
  };

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const errors = {};
      if (event.target.files[0].type.includes("image")) {
        const i = event.target.files[0];

        setNewCard({ ...newCard, ["image"]: i });
        setCreateObjectURL(URL.createObjectURL(i));
      }
      errors.image = "Debes seleccionar una imagen valida";
      return errors;
    }
  };

  // Create Card
  const createCard = async () => {
    try {
      const body = new FormData();
      body.append("upload_preset", "theQuest");
      let images = [];
      for (let i = 0; i < newCard.files.length; i++) {
        const item = newCard.files[i];
        body.append("file", item);
        const providerRes = await fetch(
          `https://api.cloudinary.com/v1_1/dzkcloud/image/upload`,
          {
            method: "POST",
            body,
          }
        );
        const card = await providerRes.json();
        images.push({ url: card.secure_url });
      }
      const savedCard = { ...newCard, ["files"]: images };
      console.log(savedCard);
      const serverRes = await fetch(`${path}/cards/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(savedCard),
      });
      const card = await serverRes.json();
      push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const updateCard = async () => {
    try {
      const body = new FormData();
      for (let key in newCard) {
        body.append(key, newCard[key]);
      }
      for (let i = 0; i < newCard.files.length; i++) {
        const item = newCard.files[i];
        body.append("images", item);
      }
      const res = await fetch(`${path}/cards/${query.id}`, {
        method: "PUT",
        headers: {},
        body,
      });
      const card = await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  // Submit Form Values
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // let errors = validate();
    // if (Object.keys(errors).length) return setErrors(errors);

    if (query.id) {
      await updateCard();
    } else {
      await createCard();
    }
    setLoading(false);
    await push("/");
  };

  // Set Input Changes on the state
  const handleChange = (e) =>
    setNewCard({ ...newCard, [e.target.name]: e.target.value });

  const getCard = async () => {
    const res = await fetch(`${path}/cards/${query.id}`);
    console.log(path);
    if (res.status === 200) {
      const card = await res.json();
      setNewCard(card);
    }
  };
  useEffect(() => {
    if (query.id) {
      getCard();
    }
  }, [query.id]);

  return (
    <div className="pt-12 font-bold text-md align-end">
      <article className=" rounded-lg p-4 max-w-md mx-auto ">
        <form className=" text-center " onSubmit={handleSubmit}>
          <h3 className="text-2xl">
            {query.id ? formValues.update : formValues.title}
          </h3>
          <div className="max-w-md m-auto my-6">
            {formValues?.placeholders?.map((item) => (
              <div
                className="flex place-content-start items-center gap-10"
                key={item.id}
              >
                <label className="block flex-1 font-light">{item.title}</label>
                <input
                  type={item.type}
                  placeholder={
                    errors[item.name] ? errors[item.name] : item.title
                  }
                  required={item.required}
                  name={item.name}
                  onChange={(e) => handleChange(e)}
                  className=" p-1 focus:outline-none border rounded-xl border-gray-300 m-2"
                  value={newCard[item.name]}
                />
              </div>
            ))}
          </div>
          <article className="flex gap-10">
            <label className="block font-light">Descripcion</label>
            <textarea
              className="p-1 focus:outline-none border rounded-xl border-gray-300 m-2"
              name="textarea"
              rows="5"
              value={newCard["descripcion"]}
              onChange={(e) =>
                setNewCard({ ...newCard, ["descripcion"]: e.target.value })
              }
            ></textarea>
          </article>

          <label className="block font-light">Imagenes</label>
          <div className="flex gap-8">
            <input
              id="fileUpload"
              type="file"
              multiple
              onChange={handleFileEvent}
              disabled={fileLimit}
            />

            <label className="hidden" htmlFor="fileUpload">
              <a className={`btn btn-primary ${!fileLimit ? "" : "disabled"} `}>
                Upload Files
              </a>
            </label>

            <div className="uploaded-files-list">
              {images &&
                images.map((item, i) => <img src={item.url} key={i} />)}
              {uploadedFiles.map((file, i) => (
                <div key={i}>{file.name}</div>
              ))}
            </div>
          </div>
          <section className="m-6">
            {loading ? (
              <DotLoader color="#0EA5E9" size={40} className="m-auto" />
            ) : (
              <button
                className="bg-sky-500 hover:bg-sky-700 m-2 p-1 px-2 rounded-md text-white"
                style={{ boxShadow: "1px 2px 3px gray" }}
              >
                {query.id ? "Actualizar" : "Guardar"}
              </button>
            )}
          </section>
        </form>
      </article>
      {cards && !query?.id && (
        <section>
          <h2 className="m-6 text-2xl">Productos</h2>
          <div className="flex flex-wrap place-content-center">
            {cards.map((card) => (
              <AdminEditCard card={card} key={card._id} path={path} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default newItem;

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

export const NoContentComponent = () => {
  return (
    <section
      className="m-3 p-3 rounded-xl shadow-2xl content-center"
      style={{ boxShadow: "1px 2px 3px gray" }}
    >
      <h3 className="font-bold text-lg text-center text-gray">
        Parece que aun no se ha publicado nada
      </h3>

      <img
        src="https://cdn-icons-png.flaticon.com/512/1437/1437185.png"
        alt="empty"
        className="m-auto w-2/3 h-2/3 p-10"
      />
    </section>
  );
};

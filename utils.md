{loading ? (
            <ScaleLoader color="red" />
          ) : (
            <button
              className="bg-red-500 hover:bg-red-600 m-2 p-1 rounded-md text-white cursor-pointer"
              style={{ boxShadow: "1px 2px 3px gray" }}
            >
              {query.id ? "Actualizar" : "Guardar"}
            </button>
          )}
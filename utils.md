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

           <div className="grid items-center gap-5 md:gap-3 absolute top-[33vh] lg:top-[27vh] left-[11%] xl:left-0 w-auto h-auto">
                  {/* {videos?.map((val, i) => (
                <Clips
                  key={i}
                  imgsrc={val.imgsrc}
                  clip={val.clip}
                />
              ))} */}
                </div>
                {/* <div className="grid items-center absolute top-[13vh] lg:top-[27vh] right-0 gap-3">
                  {sociallinks?.map((val, i) => (
                    <SocialLink key={i} icon={val.icon} />
                  ))}
                </div> */}
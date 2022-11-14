import React from "react";
import Clips from "./utils/Clips";
import SocialLink from "./utils/SocialLink";

const Hero = ({
  heroapi: { titulo, descripcion, btntext, img, images, sociallinks, videos },
  gradient,
}) => {
  return (
    <>
      <div className="h-auto w-full flex flex-col">
        <div
          className={`${gradient} clip-path h-[50vh]  md:h-[60vh] sm:h-[55vh] w-full absolute top-0 left-0 right-0 opacity-100 `}
        ></div>
        <div className="relative opacity-100 z-20 grid items-center justify-items-center nike-container">
          <div className="grid items-center justify-items-center mt-28 md:mt-24">
            <h1 className=" lg:text-5xl md:text-4xl text-3xl  font-extrabold filter drop-shadow-sm text-slate-200">
              {titulo}
            </h1>
            {/* <h1 className="text-6xl lg:text-5xl md:text-4xl sm:text-3xl xsm:text-2xl font-extrabold filter drop-shadow-sm text-slate-200">
              {descripcion}
            </h1> */}
            <button
              type="button"
              className="button-theme bg-slate-200  shadow-slate-200 rounded-xl my-5"
            >
              {btntext || "Comprar ahora"}
            </button>
            <div className="grid items-center gap-5 md:gap-3 absolute top-[33vh] lg:top-[27vh] left-[11%] xl:left-0 w-auto h-auto">
              {/* {videos?.map((val, i) => (
                <Clips
                  key={i}
                  imgsrc={val.imgsrc}
                  clip={val.clip}
                />
              ))} */}
            </div>
            <div className="grid items-center absolute top-[13vh] lg:top-[27vh] right-0 gap-3">
              {sociallinks?.map((val, i) => (
                <SocialLink key={i} icon={val.icon} />
              ))}
            </div>
          </div>
          <div className="flex items-center">
            {images?.length > 0 ? (
              <img
                src={images[0].url}
                alt={titulo}
                className="w-auto lg:h-[35vh] md:h-[31vh] sm:h-[21vh] h-[19vh] transitions-theme -rotate-[25deg] hover:rotate-0 cursor-pointer object-fill"
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;

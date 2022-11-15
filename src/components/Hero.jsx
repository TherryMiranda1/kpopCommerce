import React from "react";
import { useStateContext } from "src/context/StateContext";
import Clips from "./utils/Clips";
import SocialLink from "./utils/SocialLink";

const Hero = ({ heroapi, sociallinks, gradient }) => {
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
  const handleBuyNow = (product) => {
    onAdd(product, qty);

    setShowCart(true);
  };
  return (
    <div className="top_slider-container">
      <div
        className={`${gradient}  clip-path h-[50vh]  md:h-[60vh] sm:h-[55vh]  absolute top-0 left-0 right-0 opacity-100 `}
      ></div>
      <section className="top-slider">
        {heroapi.map((item, i) => (
          <article className="top-slider_slide" key={i}>
            <div
              
              className="  opacity-100  grid items-center justify-items-center nike-container"
            >
              <div className=" grid items-center justify-items-center pt-14">
                <h1 className=" lg:text-5xl md:text-4xl text-3xl  font-extrabold filter drop-shadow-sm text-slate-200">
                  {item?.titulo}
                </h1>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBuyNow(item);
                  }}
                  type="button"
                  className="button-theme bg-slate-200  shadow-slate-200 rounded-xl my-5"
                >
                  {item?.btntext || "Comprar ahora"}
                </button>
              </div>
              <div className="flex items-center">
                {item.images?.length > 0 ? (
                  <img
                    src={item?.images[0].url}
                    alt={item.titulo}
                    className=" lg:h-[35vh] md:h-[31vh] sm:h-[21vh] h-[19vh] transitions-theme -rotate-[25deg] hover:rotate-0 cursor-pointer object-fill"
                  />
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Hero;

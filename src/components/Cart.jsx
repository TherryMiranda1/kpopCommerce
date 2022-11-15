import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineCloseCircle,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";

import { useStateContext } from "../context/StateContext";
// import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";
import PaypalButton from "./cart/PaypalButton";

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
  } = useStateContext();
  console.log(cartItems);
  const handleCheckout = async () => {
    const stripe = await getStripe();

    console.log(cartItems);
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();
    console.log(data);

    toast.loading("Redirecting...");

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div
      data-aos="fade-left"
      data-aos-duration="1500"
      className="absolute rounded-l-2xl flex top-[6vh] h-[94vh] bg-white right-0 z-[30]  p-3  shadow-2xl shadow-slate-700"
      ref={cartRef}
    >
      <div className="text-base  flex flex-col place-items-center place-content-around ">
        <button
          type="button"
          className="absolute flex gap-2 text-slate-600 top-0 left-0 p-2"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineCloseCircle size={25} />

          <span className="heading">Tu Cesta </span>
          <span className="cart-num-items">({totalQuantities} productos)</span>
        </button>

        {cartItems.length < 1 && (
          <section className="flex flex-col items-center text-slate-600 m-3 ">
            <AiOutlineShopping size={150} />
            <h3>Tu cesta esta Vacia</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continua Comprando
              </button>
            </Link>
          </section>
        )}

        <div className="flex flex-col gap-3 mt-6 max-h-[40vh]  rounded-xl shadow-inner shadow-gray-400  p-4">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div
                className="flex p-6 rounded-xl overflow-y-scroll bg-gradient-to-l from-slate-700 to-black shadow-lg shadow-black justify-items-center "
                key={item._id}
              >
                <section className="flex flex-col text-white w-2/3 gap-3">
                  <h5>{item.titulo}</h5>
                  <h4>
                    {parseInt(item.precio).toLocaleString("es-ES", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </h4>
                  <p className="flex gap-4 border border-slate-400 w-20 items-center">
                    <span
                      className="minus"
                      onClick={() => toggleCartItemQuanitity(item._id, "dec")}
                    >
                      <AiOutlineMinus />
                    </span>
                    <span className="num">{item.quantity}</span>
                    <span
                      className="plus"
                      onClick={() => toggleCartItemQuanitity(item._id, "inc")}
                    >
                      <AiOutlinePlus />
                    </span>
                  </p>
                </section>
                <img src={item?.images[0]?.url} className="w-24 h-24" />
                <article className="relative">
                  <button
                    type="button"
                    className="absolute z-20 text-white -right-5 -top-5"
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline size={25} />
                  </button>
                </article>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="place-content-end overflow-scroll text-sm m-1  px-8  rounded-xl">
            <section>
              <div className="flex place-content-around ">
                <h3>Subtotal:</h3>
                <h3>
                  {parseInt(totalPrice * 0.93).toLocaleString("es-ES", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </h3>
              </div>
              <div className="flex place-content-around">
                <h3>I.G.I.C</h3>
                <h3>
                  {parseInt(totalPrice * 0.07).toLocaleString("es-ES", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </h3>
              </div>
              <div className="flex place-content-around font-bold">
                <h3>Total:</h3>
                <h3>
                  {parseInt(totalPrice).toLocaleString("es-ES", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </h3>
              </div>
            </section>

            <section className="paypal-btn mt-2  max-h-[40vh]  rounded-md  shadow-inner p-2 shadow-slate-400">
              <div className="stripe-btn mt-2">
                <button
                  type="button"
                  className=" flex text-white my-3 px-4 h-8 py-1 rounded-md  bg-gradient-to-l from-gray-700 to-black hover:to-slate-800 shadow-md shadow-black"
                  onClick={() => handleCheckout()}
                >
                  Pago Seguro con{" "}
                  <img
                    className="h-6"
                    alt="stripe"
                    src="https://res.cloudinary.com/dzkcloud/image/upload/v1668442997/theQuest/assets/2560px-Stripe_Logo__revised_2016.svg-removebg-preview_hpcmcm.png"
                  />
                </button>
              </div>
              <div>
                <PaypalButton cartItems={cartItems} totalAmount={totalPrice} />
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

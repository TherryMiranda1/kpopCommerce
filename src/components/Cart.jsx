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
      className="absolute flex top-[6vh] right-0 z-[30] h-[100vh] p-6 opacity-100 bg-white"
      ref={cartRef}
    >
      <div className="font-bold flex flex-col place-items-center place-content-around ">
        <button
          type="button"
          className="absolute text-slate-600 top-0 left-0 p-3"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineCloseCircle size={25} />

          <span className="heading">Tu Cesta </span>
          <span className="cart-num-items">({totalQuantities} productos)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="m-5">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="flex flex-col gap-3 mt-8 max-h-[50vh] overflow-y-scroll rounded-xl shadow-inner shadow-gray-400  p-4">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div
                className="flex p-6 rounded-xl bg-gradient-to-l from-slate-700 to-black shadow-lg shadow-black justify-items-center "
                key={item._id}
              >
                <div className="flex flex-col text-white w-2/3 gap-3">
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
                </div>
                <img src={item?.images[0]?.url} className="w-24 h-24" />
                <div className="relative">
                  <button
                    type="button"
                    className="absolute z-20 text-white -right-5 -top-5"
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline size={25} />
                  </button>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="place-content-end">
            <div className="flex place-content-around">
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
            <div className="flex place-content-around">
              <h3>Subtotal:</h3>
              <h3>
                {parseInt(totalPrice).toLocaleString("es-ES", {
                  style: "currency",
                  currency: "EUR",
                })}
              </h3>
            </div>
            <div className="btn-container">
              <button
                type="button"
                className=" flex text-white px-4 py-2 rounded-full mt-10 bg-gradient-to-l from-gray-700 to-black shadow-md shadow-black"
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

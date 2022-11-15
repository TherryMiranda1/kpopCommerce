import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function PaypalButton({ cartItems, totalAmount }) {
  console.log(cartItems);
  return (
    <PayPalScriptProvider
      options={{currency: "EUR", "client-id": process.env.NEXT_PUBLIC_PAYPAL_PUBLISHABLE_KEY }}
    >
      <PayPalButtons
      
        createOrder={async (data, actions) => {
          try {
            const res = await fetch("/api/payments/paypal", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ cartItems, totalAmount }),
            });
            const parsedRes = await res.json();
            console.log(parsedRes)
            return parsedRes.result.id;
          } catch (error) {
            console.log(error);
          }
        }}
        onCancel={(data) => console.log("compra cancelada")}
        onApprove={(data, actions) => {
          console.log(data);
          actions.order.capture();
        }}
        style={{ layout: "vertical" }}
      />
    </PayPalScriptProvider>
  );
}

export default PaypalButton;

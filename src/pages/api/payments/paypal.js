import paypal from "@paypal/checkout-server-sdk";

let clientId = process.env.NEXT_PUBLIC_PAYPAL_PUBLISHABLE_KEY;
let clientSecret = process.env.NEXT_PUBLIC_PAYPAL_SECRET_KEY;

let enviroment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(enviroment);

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body);
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "EUR",
            value: req.body.totalAmount,
          },
        },
      ],
    });
    const response = await client.execute(request);
    console.log(response);
    return res.status(200).json(response);
  }
}

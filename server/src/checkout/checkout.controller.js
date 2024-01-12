const { initStripe } = require("../stripe");
const stripe = initStripe();
const CLIENT_URL = "http://localhost:5173";

async function checkout(req, res) {
  try {
    // const lineItems = req.body.items.map((item) => {
    //   return {
    //     price: item.product,
    //     quantity: item.quantity,
    //   };
    // });
    // console.log("LINEITEMS", lineItems);
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "sek",
            product_data: {
              name: "Test",
              description: "Test",
            },
            unit_amount: "249900",
          },
          quantity: 2,
        },
      ],

      // req.body.items.map((item) => {
      //   return {
      //     price: item.product,
      //     quantity: item.quantity,
      //   };
      // }),
      mode: "payment",
      success_url: `${CLIENT_URL}/confirmation`,
      cancel_url: CLIENT_URL,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    res.status(400).json("Something went wrong...");
    console.log(error);
  }
}

module.exports = { checkout };

const { initStripe } = require("../stripe");
const stripe = initStripe();
const CLIENT_URL = "http://localhost:5173/";

async function checkout(req, res) {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "sek",
            product_data: {
              name: "Vicenza Test",
              description: "Test",
            },
            unit_amount: 2499,
          },
          quantity: 2,
        },
      ],
      mode: "payment",
      success_url: `${CLIENT_URL}/confirmation`,
      cancel_url: CLIENT_URL,
    });

    res.status(200).json({ url: session.url }, "it worked");
  } catch (error) {
    res.status(400).json("Something went wrong...");
  }
}

module.exports = { checkout };

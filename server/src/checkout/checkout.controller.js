const { initStripe } = require("../stripe");
const stripe = initStripe();
const CLIENT_URL = "http://localhost:5173";

async function checkout(req, res) {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: "price_1OWxorGv0exepu9wR1N3XhYc",
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

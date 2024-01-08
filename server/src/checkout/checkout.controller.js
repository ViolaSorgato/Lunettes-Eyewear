const { initStripe } = require("../stripe");
const stripe = initStripe();
const CLIENT_URL = "http://localhost:5173";

async function checkout(req, res) {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.items.map((item) => {
        return {
          price: item.product,
          quantity: item.quantity,
        };
      }),
      customer: req.session.id,
      mode: "payment",
      success_url: `${CLIENT_URL}/confirmation`,
      cancel_url: CLIENT_URL,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    res.status(400).json("Something went wrong...");
  }
}
module.exports = { checkout };

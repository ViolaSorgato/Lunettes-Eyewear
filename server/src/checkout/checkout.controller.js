// Importing the initStripe function from the stripe module
const { initStripe } = require("../stripe");

// Initializing the Stripe client
const stripe = initStripe();

// Client URL for redirecting after payment confirmation
const CLIENT_URL = "http://localhost:5173";

// Function to handle the checkout process
async function checkout(req, res) {
  // Mapping the received items to create line items for Stripe checkout
  const lineItems = req.body.items.map((item) => {
    return {
      price_data: {
        currency: "sek",
        unit_amount: item.price_data.unit_amount,
        product_data: {
          name: item.price_data.product_data,
        },
      },
      quantity: 1,
    };
  });

  try {
    // Creating a checkout session using the Stripe API
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      customer: req.session.id,
      mode: "payment",
      success_url: `${CLIENT_URL}/confirmation`,
      cancel_url: CLIENT_URL,
    });

    // Responding with the generated checkout URL
    res.status(200).json({ url: session.url });
  } catch (error) {
    res.status(400).json("Something went wrong...");
    console.log(error);
  }
}

module.exports = { checkout };

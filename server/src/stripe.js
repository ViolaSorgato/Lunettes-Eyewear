require("dotenv").config();

//Function that handles Stripe
const initStripe = () => {
  const Stripe = require("stripe");
  return Stripe(process.env.STRIPE_SECRET_KEY);
};

module.exports = { initStripe };

import Campaign from "../../components/Campaign/Campaign";
import Slider from "../../components/Slider/Slider";

function HomePage() {
  async function handlePayment() {
    try {
      const hardcodedProduct = {
        price_data: {
          currency: "sek",
          product_data: {
            name: "Test",
          },
          unit_amount: 2000, // Provide the amount in the smallest currency unit (e.g., cents for USD)
        },
        quantity: 2,
      };
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: [hardcodedProduct] }),
      });

      if (!response.ok) {
        console.log("RESPONSE", response);
        console.log("RESPONSE.JSON", response.json());
        return;
      }

      const { url } = await response.json();
      console.log("RESPONSE.JSON", response.json());
      window.location = url;
    } catch (error) {
      console.error("Error during payment:", error);
    }
  }

  return (
    <div>
      <Campaign />
      <Slider />
      <button onClick={handlePayment}>to checkout</button>
    </div>
  );
}

export default HomePage;

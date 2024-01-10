function HomePage() {
  async function handlePayment() {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(""),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
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
      <h1>HomePage</h1>
      <button onClick={handlePayment}>to checkout</button>
    </div>
  );
}

export default HomePage;

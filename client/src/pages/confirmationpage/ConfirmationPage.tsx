import { Box, CircularProgress, Container } from "@mui/material";
import { useEffect, useState } from "react";

const ConfirmationPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
          gap: "30px",
        }}
      >
        <br />
        <CircularProgress sx={{ color: "primary.dark" }} />
        <p>Your order is being processed.</p>
      </Box>
    );
  }

  return (
    <div>
      <Container
        style={{
          textAlign: "center",
          marginTop: "2rem",
          minWidth: "50%",
          padding: "3rem",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        <p className="title-list">Thank you! Your order is ready.</p>
        <p>You will soon receive a confirmation email.</p>
        <br />
      </Container>
    </div>
  );
};

export default ConfirmationPage;

import { useState, useContext } from "react";
import { UserContextType } from "../../context/user.context";
import { TextField, Button, Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, loggedInUser } = useContext(UserContextType);

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const user = {
      username,
      email,
      password,
    };

    setUsername("");
    setEmail("");
    setPassword("");

    await register(user);
  };

  return (
    <>
      {loggedInUser ? (
        <Box
          sx={{
            width: "85%",
            opacity: 0.8,
            display: "flex",
            alignItems: "center",
            margin: "auto",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <div className="imgContainer">
            {/* <div className="centered">Welcome {loggedInUser.username}!</div> */}
            <img src="" width={"85%"} />
            <div className="messageDiv">You are registered and logged in.</div>
          </div>
        </Box>
      ) : (
        <form onSubmit={handleRegister}>
          <Box
            sx={{
              width: ["95%", "80%", "50%"],
              height: 480,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 5,
              boxShadow: 3,
              borderRadius: 2,
              px: 4,
              py: 6,
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              style={{ marginTop: "10px" }}
            >
              Register
            </Typography>
            <TextField
              required
              color="secondary"
              id="username"
              fullWidth={true}
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <TextField
              required
              color="secondary"
              id="email"
              fullWidth={true}
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <TextField
              required
              color="secondary"
              id="password"
              fullWidth={true}
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              type="submit"
            >
              Register
            </Button>
            <br />
            <NavLink
              to="/login"
              className="nav-link"
              style={{ textDecoration: "none" }}
            >
              <p className="title-list">Already have an account? Login here.</p>
            </NavLink>
          </Box>
        </form>
      )}
    </>
  );
};

export default RegisterPage;

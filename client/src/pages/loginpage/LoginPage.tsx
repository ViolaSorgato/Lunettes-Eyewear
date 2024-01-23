import { TextField, Button, Box, Typography } from "@mui/material";
import "./LoginPage.css";
import { UserType, UserContextType } from "../../context/user.context";
import { useContext, useState } from "react";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { NavLink } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loggedInUser, isAdmin } = useContext(UserContextType);

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const user: UserType = {
      username,
      email,
      password,
    };

    setEmail("");
    setPassword("");
    setUsername("");

    isAdmin(user);
    await login(user);
  };

  return (
    <>
      {loggedInUser?.isAdmin == true ? (
        <Box
          sx={{
            width: "85%",
            opacity: 0.8,
            display: "flex",
            alignItems: "center",
            margin: "auto",
            marginTop: 10,
            marginBottom: 10,
            flexDirection: "column",
          }}
        >
          <div className="imgContainer">
            <div className="centered">Welcome {loggedInUser.username}!!</div>
            <img
              className="imgStyle"
              src="https://images.pexels.com/photos/3728085/pexels-photo-3728085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              width={"85%"}
            />
          </div>
          <div className="messageDiv">
            You are logged in as an administrator
          </div>
          <NavLink to="/admin">
            <Button variant="text" startIcon={<AdminPanelSettingsIcon />}>
              Go to AdminPanel
            </Button>
          </NavLink>
        </Box>
      ) : loggedInUser ? (
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
            <div className="centered">Welcome {loggedInUser.username}!!</div>
            <img src="" width={"85%"} />
            <div className="messageDiv">You are logged in as a member</div>
          </div>
        </Box>
      ) : (
        <form onSubmit={handleLogin}>
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
              Sign In
            </Typography>
            <TextField
              required
              color="secondary"
              id="standard-required"
              fullWidth={true}
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
            <br />
            <TextField
              required
              color="secondary"
              id="standard-required"
              fullWidth={true}
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />{" "}
            <br />
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              type="submit"
            >
              Sign In
            </Button>{" "}
            <br />
            <NavLink
              to="/register"
              className="nav-link"
              style={{ textDecoration: "none" }}
            >
              <p className="title-list">New User? Register here.</p>
            </NavLink>
          </Box>
        </form>
      )}
    </>
  );
};

export default LoginPage;

import { useState, useContext } from "react";
import { UserContextType } from "../../context/user.context";
import {
  TextField,
  Button,
  Typography,
  Snackbar,
  AlertTitle,
  Alert,
  Stack,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const { register, registeredUser, alert, setAlert, setRegisteredUser } =
    useContext(UserContextType);

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

    setOpen(true);
    await register(user);
  };

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert(null);
    setOpen(false);
  };

  return (
    <>
      {registeredUser ? (
        <Stack
          direction={{ sm: "column", md: "row" }}
          spacing={10}
          marginLeft="10%"
          width="80%"
          justifyContent={"space-between"}
        >
          <div className="register-message-container">
            <p className="register-message-title">
              Welcome to Lunettes Eyewear!
            </p>
            <p>
              Congratulations on becoming a part of our stylish eyewear
              community. Feel free to browse our collection and discover the
              eyewear that suits your lifestyle. If you have any questions or
              need assistance, our team is here to help.
            </p>
            <NavLink
              to="/login"
              className="nav-link"
              style={{ textDecoration: "none" }}
            >
              <p className="register-message-sub">Log in here.</p>
            </NavLink>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setRegisteredUser(null)}
            >
              <p className="register-message-sub">
                Register with a different account.
              </p>
            </div>
          </div>

          <div className="register-picture"></div>
        </Stack>
      ) : (
        <div className="register-container">
          <form className="register-form" onSubmit={handleRegister}>
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
              id="register-username"
              fullWidth={true}
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <TextField
              required
              color="secondary"
              id="register-email"
              fullWidth={true}
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <TextField
              required
              color="secondary"
              id="register-password"
              fullWidth={true}
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText="Password should be at least 6 characters long"
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
          </form>
        </div>
      )}

      {alert && (
        <Snackbar autoHideDuration={3000} open={open} onClose={handleClose}>
          <Alert
            elevation={6}
            variant="filled"
            severity={alert.type}
            onClose={handleClose}
            sx={{ width: "100%" }}
          >
            <AlertTitle>
              {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
            </AlertTitle>
            {alert.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default RegisterPage;

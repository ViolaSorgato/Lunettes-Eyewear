import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
};

export type UserType = {
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
};

interface AlertType {
  type: "success" | "info" | "warning" | "error";
  message: string;
}

interface UserContextType {
  registeredUser?: User | null;
  setRegisteredUser: Dispatch<SetStateAction<User | null>>;
  loggedInUser?: User | null;
  register: (user: UserType) => Promise<void>;
  login: (user: UserType) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: (user: UserType) => void;
  alert: AlertType | null;
  setAlert: Dispatch<SetStateAction<AlertType | null>>;
  userID: string | null;
}

type Props = {
  children: ReactNode;
};

export const UserContextType = createContext<UserContextType>({
  loggedInUser: null,
  registeredUser: null,
  register: async () => {},
  login: async () => {},
  logout: async () => {},
  isAdmin: () => {},
  alert: null,
  setAlert: () => {},
  setRegisteredUser: () => {},
  userID: null,
});

const UserProvider = ({ children }: Props) => {
  const [registeredUser, setRegisteredUser] = useState<User | null>(null);
  const [loggedInUser, setloggedInUser] = useState<User | null>(null);
  const [alert, setAlert] = useState<AlertType | null>(null);
  const [userID, setUserID] = useState<string | null>(null);

  useEffect(() => {
    const authorization = async () => {
      try {
        const response = await fetch("/api/users/authorize");
        const data = await response.json();
        if (response.status === 200 || response.status === 304) {
          setloggedInUser(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    authorization();
  }, []);

  // Check if user is an admin
  const isAdmin = (user: UserType) => {
    return user.isAdmin;
  };

  const register = async (user: UserType) => {
    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.status === 201) {
        const data = await response.json();
        setRegisteredUser(data);
        setAlert({
          type: "success",
          message: "Registration successful.",
        });
      } else if (response.status === 409) {
        setAlert({
          type: "error",
          message: "Email already registered. Please use a different email.",
        });
      } else {
        setAlert({
          type: "error",
          message: "Registration failed. Please check your credentials.",
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const login = async (user: UserType) => {
    if (user) {
      try {
        const response = await fetch("api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const data = await response.json();
        console.log("DATA", data);

        if (response.status === 200) {
          setloggedInUser(data);
          console.log("DATA._ID", data._id);
          setUserID(data._id);
          console.log("LOGGEDINUSER", loggedInUser);
          setRegisteredUser(null);
          setAlert({
            type: "success",
            message: "Login successful.",
          });
        } else {
          setAlert({
            type: "error",
            message: "Login failed. Please check your credentials.",
          });
        }
      } catch (err) {
        console.log(err);
        setAlert({
          type: "error",
          message: "Login failed. Please check your credentials.",
        });
      }
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 204) {
        setloggedInUser(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserContextType.Provider
      value={{
        register: register,
        loggedInUser,
        registeredUser,
        isAdmin: isAdmin,
        login: login,
        logout: logout,
        alert,
        setAlert,
        setRegisteredUser,
        userID,
      }}
    >
      {children}
    </UserContextType.Provider>
  );
};

export default UserProvider;

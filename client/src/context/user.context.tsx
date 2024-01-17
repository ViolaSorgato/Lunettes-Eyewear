import { ReactNode, createContext, useState, useEffect } from "react";

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin?: boolean;
};

export type UserType = {
  email: string;
  password: string;
  isAdmin?: boolean;
};

interface UserContextType {
  loggedInUser?: User | null;
  login: (user: UserType) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: (user: UserType) => void;
}

type Props = {
  children: ReactNode;
};

export const UserContextType = createContext<UserContextType>({
  loggedInUser: null,
  login: async () => {},
  logout: async () => {},
  isAdmin: () => {},
});

const UserProvider = ({ children }: Props) => {
  const [loggedInUser, setloggedInUser] = useState<User | null>(null);

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

  //Check if user is an admin
  const isAdmin = (user: UserType) => {
    if (user.isAdmin == false) {
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

        if (response.status === 200) {
          setloggedInUser(data);
        }
      } catch (err) {
        console.log(err);
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
      value={{ loggedInUser, isAdmin: isAdmin, login: login, logout: logout }}
    >
      {children}
    </UserContextType.Provider>
  );
};

export default UserProvider;

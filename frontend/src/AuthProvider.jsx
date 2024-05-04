import { createContext, useContext, useState } from "react";
import { USER_URL } from "./utils/constants";
import { isEmailValid } from "./utils/functions";
import { toastError, toastSuccess } from "./utils/toast";

const AuthContext = createContext(
  /** @type {{ currentUser: any; login: (email: string, password: string) => Promise<void>; }} */
  {
    currentUser: null,
    login: async (email, password) => {},
  },
);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  /**
   * @param {string} email
   * @param {string} password
   * @returns {Promise<void>}
   */
  async function login(email, password) {
    let userLoggedIn = false;

    if (!isEmailValid(email)) {
      return;
    }

    if (!email.trim() || !password.trim()) {
      return;
    }

    console.log(email, password);

    await fetch(USER_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          userLoggedIn = false;
          toastError(data.error);
          return;
        }

        toastSuccess("Otp sent to your email");
        userLoggedIn = true;
      });

    if (userLoggedIn) {
    }
  }

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
}

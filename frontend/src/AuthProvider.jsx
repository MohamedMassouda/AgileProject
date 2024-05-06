import { createContext, useContext, useEffect, useState } from "react";
import { OTP_VALIDATE_URL, USER_URL } from "./utils/constants";
import { isEmailValid } from "./utils/functions";
import { toastError, toastSuccess } from "./utils/toast";
import { deleteCookies, getCookies, saveCookies } from "./utils/cookies";

const AuthContext = createContext(
  /** @type {{ currentUser: any; login: (email: string, password: string) => Promise<void>; }} */
  {
    currentUser: {
      id: String,
      name: String,
      email: String,
      role: String,
      imageUrl: String,
      emailVerified: Boolean,
    },
    login: async (email, password) => {},
    signUp: async (name, email, password) => {},
    validateOtp: async (otp) => {},
  },
);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const token = getCookies();

      if (!token) {
        return;
      }

      const decoded = jwt.decode(token);

      if (decoded.exp * 1000 < Date.now()) {
        deleteCookies();
        return;
      }

      getUserFromCookies();
    }
  }, []);

  /**
   * @param {string} email
   * @param {string} password
   * @returns {Promise<void>}
   */
  async function login(email, password) {
    let userLoggedIn = false;

    if (!isEmailValid(email)) {
      toastError("Please enter a valid email");
      return;
    }

    if (!email.trim() || !password.trim()) {
      return;
    }

    console.log(email, password);

    try {
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

          toastSuccess(data.message);
          userLoggedIn = true;
        });
    } catch (error) {}
  }

  /**
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @returns {Promise<void>}
   */
  async function signUp(name, email, password) {
    if (!isEmailValid(email)) {
      toastError("Please enter a valid email");
      return;
    }

    if (!name.trim() || !email.trim() || !password.trim()) {
      return;
    }

    try {
      await fetch(USER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            toastError(data.error);
            return;
          }

          toastSuccess("Account created successfully");
          toastSuccess("Please check your email");
        });
    } catch (error) {}
  }

  async function validateOtp(otp) {
    await fetch(OTP_VALIDATE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toastError(data.error);
          return;
        }

        toastSuccess(data.message);
        saveCookies(data.token);
        getUserFromCookies();
      });
  }

  async function getUserFromCookies(token = getCookies()) {
    if (!getCookies()) {
      return;
    }

    try {
      const response = await fetch(USER_URL + "/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.ok) {
        const userData = await response.json();

        setCurrentUser(userData);
      } else {
        console.error("Failed to fetch user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, signUp, validateOtp }}>
      {children}
    </AuthContext.Provider>
  );
}

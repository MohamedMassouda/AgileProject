import React from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { OTP_VALIDATE_URL, USER_URL } from "./utils/constants";
import { isEmailValid } from "./utils/functions";
import { toastError, toastSuccess } from "./utils/toast";
import { deleteCookies, getCookies, saveCookies } from "./utils/cookies";
import axios from "axios";

const AuthContext = createContext({
  currentUser: null,
  login: async (email, password) => {},
  signUp: async (name, email, password) => {},
  validateOtp: async (otp) => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      if (localStorage.getItem("session") < Date.now() - 1000 * 60 * 60 * 24) {
        deleteCookies();
        return;
      }

      getUserFromCookies();
    }

    fetchUser();
  }, []);

  useEffect(() => {
    console.log("User", currentUser);
  }, [currentUser]);

  /**
   * @param {string} email
   * @param {string} password
   * @returns {Promise<void>}
   */
  async function login(email, password) {
    if (!isEmailValid(email)) {
      toastError("Please enter a valid email");
      return;
    }

    if (!email.trim() || !password.trim()) {
      return;
    }

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
            toastError(data.error);
            return;
          }

          toastSuccess(data.message);

          saveCookies(data.token);

          getUserFromCookies(data.token);
          localStorage.setItem("session", Date.now());
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
    if (!token) {
      return;
    }

    try {
      // const response = await fetch(USER_URL + "/me", {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: "Bearer " + token,
      //   },
      // });
      const response = await axios.get(USER_URL + "/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.status === 200) {
        const data = response.data;
        setCurrentUser(data);
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

import React from "react";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { OTP_VALIDATE_URL, USER_URL } from "./utils/constants";
import { getCookies, saveCookies } from "./utils/cookies";
import { isEmailValid } from "./utils/functions";
import { toastError, toastSuccess } from "./utils/toast";

export const supabase = createClient(
  "https://riilpymuwsigdasgmkvg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpaWxweW11d3NpZ2Rhc2dta3ZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQzMTE2NTIsImV4cCI6MjAyOTg4NzY1Mn0.f-bb4SXWxxRBFgfp7cxgY4AxD6LoUrjygzx07ZDDoHQ",
);

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
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
    // async function fetchUser() {
    //   if (localStorage.getItem("session") < Date.now() - 1000 * 60 * 60 * 24) {
    //     deleteCookies();
    //     return;
    //   }
    //
    //   getUserFromCookies();
    // }
    //
    // fetchUser();
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

      supabase.auth.signInWithPassword({ email, password });
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

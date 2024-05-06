import axios from "axios";
import { getCookies } from "./cookies";
/**
 * @param {string} email
 * @returns {boolean}
 */
export function isEmailValid(email) {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function fetchData(url) {
  return await axios.get(url, {
    headers: {
      Authorization: `Bearer ${getCookies()}`,
    },
  });
}

const TOKEN = "cookies";

/**
 * @returns {string}
 * */
export function getCookies() {
  return localStorage.getItem(TOKEN);
}

export function saveCookies(token) {
  localStorage.setItem(TOKEN, token);
  localStorage.setItem("session", Date.now());
}

export function deleteCookies() {
  localStorage.removeItem(TOKEN);
}

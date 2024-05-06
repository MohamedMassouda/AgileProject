const TOKEN = "cookies";

/**
 * @returns {string}
 * */
export function getCookies() {
  return localStorage.getItem(TOKEN);
}

export function saveCookies(token) {
  localStorage.setItem(TOKEN, token);
}

export function deleteCookies() {
  localStorage.removeItem(TOKEN);
}

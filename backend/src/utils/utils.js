/**
 * @param {string} email
 * @returns {boolean}
 */

export function isEmailValid(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}

/**
 * @returns {string}
 * */
export function getSecretToken() {
  return process.env.TOKEN_SECRET;
}

/**
 * @param {import("express").Request} req
 * */
export function getTokenFromHeader(req) {
  if (!req.headers.authorization) {
    return null;
  }
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  return token;
}

/**
 * @param {Error} error
 * @param {string} message
 * @returns {string}
 * */
export function debugError(error, message = "Internal server error") {
  if (process.env.NODE_ENV === "development") {
    return error.message;
  } else {
    return message;
  }
}

/**
 * @param {import("express").Request} req
 * @param {string[]} arg
 * @returns {string}
 * */
export function missingArgsFromReqBody(req, arg) {
  const missing = [];

  for (const a of arg) {
    if (!req.body[a]) {
      missing.push(a);
    }
  }

  return missing.join(", ");
}

/**
 * @param {string} str
 * @returns {string}
 * */
export function makeStringBetter(str) {
  return str
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
}

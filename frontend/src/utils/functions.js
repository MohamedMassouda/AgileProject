/**
 * @param {string} email
 * @returns {boolean}
 */
export function isEmailValid(email) {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

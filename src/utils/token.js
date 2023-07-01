export function setToken(tokenKey, token) {
  return localStorage.setItem(tokenKey, token);
}

export function getToken(token) {
  return localStorage.getItem(token);
}

export function removeToken(tokenKey) {
  return localStorage.removeItem(tokenKey);
}

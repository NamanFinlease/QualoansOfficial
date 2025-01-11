let token = null;

export const setToken = (newToken) => {
  token = newToken;
};

export const getToken = () => token;

export const clearToken = () => {
  token = null;
};
// let token = null;

// export const setToken = (newToken) => {
//   token = newToken;
// };

// export const getToken = () => token;

// export const clearToken = () => {
//   token = null;
// };

// import Cookies from "js-cookie"; // Use js-cookie for easier cookie handling

// let token = null; // Global variable for the token

// export const setToken = (newToken) => {
//   token = newToken;

//   // Store token in cookies
//   Cookies.set("jwt", newToken, {
//     expires: 1, // Expires in 1 day
//     path: "/", // Available across the whole app
//     secure: process.env.NODE_ENV === "production", // Only on HTTPS in production
//   });
// };

// export const getToken = () => {
//   // Check the global variable first, then the cookie as a fallback
//   console.log("global token ?? ", token);
//   console.log("cookie token ??<< ", Cookies.get("jwt"));
//   return token || Cookies.get("jwt");
// };

// export const clearToken = () => {
//   token = null;

//   // Remove token from cookies
//   Cookies.remove("jwt", { path: "/" });
// };


// import Cookies from "js-cookie"; // For cookie handling

// let token = null; // Global variable for the token

// export const setToken = (newToken) => {
//   token = newToken;

//   // Store token in cookies
//   Cookies.set("jwt", newToken, {
//     expires: 1, // Expires in 1 day
//     path: "/", // Available across the whole app
//     secure: process.env.NODE_ENV === "production", // Only on HTTPS in production
//   });
// };

// export const getToken = () => {
//   // Check the global variable first
//   if (!token) {
//     // If global variable is empty, check the cookie and update the global token
//     const cookieToken = Cookies.get("jwt");
//     console.log("jwt token from cookie", cookieToken);
//     if (cookieToken) {
//       token = cookieToken;
//     }
//   }

//   console.log("Global token:", token);
//   return token; // Return the token from global or cookie
// };

// export const clearToken = () => {
//   token = null;

//   // Remove token from cookies
//   Cookies.remove("jwt", { path: "/" });
// };


import Cookies from "js-cookie";

let token = null; // Global variable to hold the token

// Function to set the token globally and in cookies
export const setToken = (newToken) => {
  token = newToken;

  // Store token in cookies (if not already set by the API response)
  Cookies.set("jwt", newToken, {
    expires: 1, // Expires in 1 day
    path: "/", // Available across the whole app
    secure: process.env.NODE_ENV === "production", // HTTPS in production
  });
};

// Function to get the token from the global variable or cookies
export const getToken = () => {
  if (!token) {
    // If the global token is not set, retrieve it from cookies
    token = Cookies.get("jwt");
  }

  return token;
};

// Function to clear the token globally and from cookies
export const clearToken = () => {
  token = null;
  Cookies.remove("jwt", { path: "/" });
};

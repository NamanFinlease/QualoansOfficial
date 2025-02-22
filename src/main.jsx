// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
// import App from "./App.jsx";
// import "./index.css";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <Router>
//       {" "}
//       {/* Wrap your App in Router */}
//       <App />
//     </Router>
//   </StrictMode>
// );

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers"; // Import LocalizationProvider
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Import the date adapter
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        {/* Wrap your App in Router */}
        <App />
      </Router>
    </LocalizationProvider>
  </StrictMode>
);

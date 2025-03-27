import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { HelmetProvider } from "react-helmet-async"; // Import HelmetProvider
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      {" "}
      {/* Ensure HelmetProvider is added */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>
          <App />
        </Router>
      </LocalizationProvider>
    </HelmetProvider>
  </StrictMode>
);

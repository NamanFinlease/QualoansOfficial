import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  IconButton,
  AppBar,
  Toolbar,
  Box,
  Menu as MUI_Menu,
  MenuItem,
  Button,
} from "@mui/material";
import Menu from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import ApplyNowIcon from "@mui/icons-material/Assignment";
import CalculateIcon from "@mui/icons-material/Calculate";
import { keyframes } from "@mui/system";

import logo from "../assets/image/Artboard 1.webp"; // Adjust the path based on your structure
import Cookies from "js-cookie"; // Ensure this is installed and imported
import { BASE_URL } from "../baseURL";
import { useNavigate } from "react-router-dom";

const blinking = keyframes`
  0% { background-color: gray; color: white; }
  50% { background-color: #fc8403; color: black; }
  100% { background-color: black; color: white; }
`;

const Header = () => {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("isLogin") === "true";
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleApplyNowClick = async () => {
    if (isLogin) {
      navigate("/ourjourney");
    } else {
      navigate("/login-form");
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1100,
          paddingTop: "10px",
          backgroundColor: "rgba(249, 249, 249, 0.4)", // Adjust the opacity (0.7 for semi-transparent)
          border: "none",
          boxShadow: "none",
          backdropFilter: "blur(5px)", // Optional: Adds a blur effect for a frosted glass look
        }}
      >
        {/* <AppBar
        position="sticky"
        elevation={0}
        sx={{
          paddingTop: "10px",
          backgroundColor: "#f9f9f9",
          border: "none",
          boxShadow: "none",
        }}
      > */}
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "nowrap",
            minHeight: "80px",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            onClick={scrollToTop}
            style={{ display: "flex", alignItems: "center", zIndex: 10 }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                width: "50%",
                height: "50%",
                objectFit: "contain",
                zIndex: 10,
              }}
            />
          </Link>

          {/* Mobile Menu Button */}
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleMenu}
            sx={{
              display: { xs: "block", md: "none" },
              color: "#0b2747",
              padding: "8px",
            }}
          >
            <Menu />
          </IconButton>

          {/* Mobile Menu */}
          <MUI_Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiPaper-root": { zIndex: 900 },
            }}
          >
            <MenuItem onClick={handleClose}>
              <Link
                to="/"
                onClick={scrollToTop}
                style={{
                  color: "#0b2747",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <HomeIcon sx={{ mr: 1 }} /> Home
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                to="/about-us"
                onClick={scrollToTop}
                style={{
                  color: "#0b2747",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <InfoIcon sx={{ mr: 1 }} /> About Us
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                to="/contact-us"
                onClick={scrollToTop}
                style={{
                  color: "#0b2747",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ContactPageIcon sx={{ mr: 1 }} /> Contact Us
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                to="/repay-now"
                onClick={scrollToTop}
                style={{
                  color: "#0b2747",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ApplyNowIcon sx={{ mr: 1 }} /> Repay Now
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                to="/calculator"
                onClick={scrollToTop}
                style={{
                  color: "#0b2747",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CalculateIcon sx={{ mr: 1 }} /> Loan Calculator
              </Link>
            </MenuItem>
            <MenuItem onClick={handleApplyNowClick}>
              <Link
                to="/login-form"
                onClick={scrollToTop}
                style={{
                  color: "#0b2747",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ApplyNowIcon sx={{ mr: 1 }} />
                {isLogin ? "My Journey" : "Sign In"}
              </Link>
            </MenuItem>
          </MUI_Menu>

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
                flexGrow: 1, // To allow centering
              }}
            >
              <Link
                to="/"
                onClick={scrollToTop}
                style={{
                  color: "#0b2747",
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  padding: "8px",
                  fontWeight: "700",
                  fontFamily: "Roboto, sans-serif",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "orange")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#0b2747")}
              >
                <HomeIcon sx={{ mr: 1 }} /> Home
              </Link>

              <Link
                to="/about-us"
                onClick={scrollToTop}
                style={{
                  color: "#0b2747",
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  padding: "8px",
                  fontWeight: "700",
                  fontFamily: "Roboto, sans-serif",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "orange")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#0b2747")}
              >
                <InfoIcon sx={{ mr: 1 }} /> About Us
              </Link>

              <Link
                to="/contact-us"
                onClick={scrollToTop}
                style={{
                  color: "#0b2747",
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  padding: "8px",
                  fontWeight: "700",
                  fontFamily: "Roboto, sans-serif",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "orange")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#0b2747")}
              >
                <ContactPageIcon sx={{ mr: 1 }} /> Contact Us
              </Link>

              <Link
                to="/repay-now"
                onClick={scrollToTop}
                style={{
                  color: "#0b2747",
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  padding: "8px",
                  fontWeight: "700",
                  fontFamily: "Roboto, sans-serif",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "orange")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#0b2747")}
              >
                <ApplyNowIcon sx={{ mr: 1 }} /> Repay Now
              </Link>

              <Link
                to="/calculator"
                onClick={scrollToTop}
                style={{
                  color: "#0b2747",
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  padding: "8px",
                  fontWeight: "700",
                  fontFamily: "Roboto, sans-serif",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "orange")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#0b2747")}
              >
                <CalculateIcon sx={{ mr: 1 }} /> Loan Calculator
              </Link>
            </Box>

            {/* "Apply Now" Button */}
            <Button
              variant="contained"
              onClick={handleApplyNowClick} // API call on click
              sx={{
                backgroundImage:
                  "linear-gradient(270deg, rgba(0,255,255,0.2), rgba(102,0,255,0.1), #fff38739)",
                backgroundSize: "100% 100%", // Ensures the gradient covers the button
                backgroundRepeat: "no-repeat",
                color: "white",
                padding: "10px 20px",
                borderRadius: "50px",
                fontWeight: "bold",
                animation: `${blinking} 1.5s infinite`,
                fontFamily: "Roboto, sans-serif",
                textTransform: "none",
                "&:hover": {
                  backgroundImage: "linear-gradient(270deg, #fc8403, #ff5733)",
                  boxShadow:
                    "0 5px 10px rgba(0, 0, 0, 0.3), 0 0px 10px rgba(0, 0, 0, 0.3)",
                },
                "@media (max-width: 600px)": {
                  fontSize: "14px",
                  padding: "8px 12px",
                },
              }}
            >
              {isLogin ? "My Journey" : "Sign In"}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;

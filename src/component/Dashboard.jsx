import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Avatar,
  Divider,
} from "@mui/material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PolicyIcon from "@mui/icons-material/Policy";
import GavelIcon from "@mui/icons-material/Gavel";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../assets/image/White.webp";
import { BASE_URL } from "../baseURL";
import { getToken } from "../../tokenManager";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const MySwal = withReactContent(Swal);

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    profileImageUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/user/getProfileDetails`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setProfileData({
          name: data?.data?.personalDetails?.fullName || "User",
          profileImageUrl: data?.data?.profileImage || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/user/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensures the cookie is sent
      });

      if (response.status === 200) {
        localStorage.setItem("isLogin", "false");

        MySwal.fire({
          title: "Logged Out",
          text: "You have successfully logged out.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          navigate("/login-form"); // Redirect user to login page
        });
      } else {
        const errorData = await response.json();
        MySwal.fire(
          "Error",
          errorData.message || "Failed to log out. Please try again.",
          "error"
        );
      }
    } catch (error) {
      MySwal.fire(
        "Error",
        "An error occurred during logout. Please try again later.",
        "error"
      );
    }
  };
  const options = [
    { text: "Dashboard", icon: <DashboardIcon />, link: "/ourjourney" },
    { text: "Privacy Policy", icon: <PolicyIcon />, link: "/privacy-policy" },
    {
      text: "Terms & Conditions",
      icon: <GavelIcon />,
      link: "/terms-conditions",
    },
    { text: "User Preview", icon: <PersonIcon />, link: "/user-preview" },
    { text: "Logout", icon: <LogoutIcon />, action: handleLogout }, // Attach logout action here
  ];

  return (
    <Box
      sx={{
        display: "flex",
        overflow: "hidden",
        flexDirection: "column",
        backgroundColor: "#f9f9f9",
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          background: "linear-gradient(45deg, #4D4D4E, orange)",
          color: "#fff",
          boxShadow: "none",
          height: "64px",
          zIndex: 1201,
        }}
      >
        <Toolbar>
          <IconButton
            onClick={() => setSidebarOpen(!sidebarOpen)}
            sx={{ color: "white", marginRight: 2 }}
          >
            {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <img src={logo} alt="Logo" style={{ height: 40, marginRight: 16 }} />

          {/* Right-aligned content */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "auto",
              marginRight: { xs: 4, md: 0 },
            }}
          >
            {/* <Typography sx={{ marginRight: 2 }}>Hi!!</Typography> */}
            <Typography sx={{ marginRight: 2 }}>
              {loading ? "Loading..." : profileData.name}
            </Typography>
            <Avatar
              src={profileData.profileImageUrl}
              sx={{ width: 40, height: 40, borderRadius: "50%" }}
              alt="Profile"
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      {sidebarOpen && (
        <Box
          sx={{
            width: 240,
            height: "100vh",
            background: "linear-gradient(90deg, #4D4D4E, orange)", // Left to right gradient
            position: "fixed",
            top: "55px",
            left: 0,
            bottom: 0,
            zIndex: 1200,
            boxShadow: 3,
            color: "#fff",
          }}
        >
          <Divider />
          <List>
            {options.map((option, index) =>
              option.action ? (
                <ListItem
                  button
                  key={index}
                  onClick={() => {
                    option.action(); // Call the logout function
                    setSidebarOpen(false); // Optionally, close the sidebar after clicking logout
                  }}
                  sx={{ "&:hover": { backgroundColor: "#d6d6d6" } }}
                >
                  <ListItemIcon sx={{ color: "#fff" }}>
                    {option.icon}
                  </ListItemIcon>
                  <ListItemText primary={option.text} />
                </ListItem>
              ) : (
                <Link
                  key={index}
                  to={option.link}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem
                    button
                    sx={{
                      backgroundColor:
                        location.pathname === option.link
                          ? "#e0e0e0"
                          : "transparent",
                      "&:hover": { backgroundColor: "#d6d6d6" },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color:
                          location.pathname === option.link ? "#000" : "#fff",
                      }}
                    >
                      {option.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={option.text}
                      sx={{
                        color:
                          location.pathname === option.link ? "#000" : "#fff",
                      }}
                    />
                  </ListItem>
                </Link>
              )
            )}
          </List>
        </Box>
      )}

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, marginTop: "64px", padding: "20px" }}>
        {location.pathname === "/ourjourney" && (
          <Typography
            variant="h4"
            sx={{ color: "#4D4D4E", textAlign: "center" }}
          >
            Welcome to the Dashboard!
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;

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

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false  );
  const [profileData, setProfileData] = useState({ name: "", profileImageUrl: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const token = getToken()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // const token =
        // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2UzZmQxMDczYjMxNTQyNjU3YTI3ZSIsImlhdCI6MTczNjMyNzEyMiwiZXhwIjoxNzM4OTE5MTIyfQ.SDrVOSRa2_x5RC6JBRtdL_yzxkZQPn61dJHmLpI4oQI";
  
        const response = await fetch(`${BASE_URL}/api/user/getProfileDetails`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`, // Uncomment and provide the token if needed
          },
          credentials: "include", // This ensures cookies and other credentials are sent with the request
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

  const options = [
    { text: "Dashboard", icon: <DashboardIcon />, link: "/ourjourney" },
    { text: "Privacy Policy", icon: <PolicyIcon />, link: "/privacy-policy" },
    { text: "Terms & Conditions", icon: <GavelIcon />, link: "/terms-conditions" },
    { text: "User Preview", icon: <PersonIcon />, link: "/user-preview" },
    { text: "Logout", icon: <LogoutIcon />, link: "/logout" },
  ];

  return (
    <Box sx={{ display: "flex", overflow: "hidden", flexDirection: "column", backgroundColor: "#f9f9f9" }}>
      <AppBar position="fixed" sx={{  background: "linear-gradient(45deg, #4D4D4E, orange)",
 color: "#fff", boxShadow: "none", height: "64px", zIndex: 1201 }}>
       <Toolbar>
        <IconButton onClick={() => setSidebarOpen(!sidebarOpen)} sx={{ color: "white", marginRight: 2 }}>
          {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
        <img src={logo} alt="Logo" style={{ height: 40, marginRight: 16 }} />
        
        {/* Right-aligned content */}
        <Box sx={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
          <Typography sx={{ marginRight: 2 }}>Hi!!</Typography>
          <Typography variant="h6" sx={{ marginRight: 2 }}>
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
        <Box sx={{ width: 240, height: "100vh",            background: "linear-gradient(90deg, #4D4D4E, orange)", // Left to right gradient
           position: "fixed", top: "55px", left: 0, bottom: 0, zIndex: 1200, boxShadow: 3, color: "#fff" }}>
          <Divider />
          <List>
            {options.map((option, index) => (
              <Link key={index} to={option.link} style={{ textDecoration: "none", color: "inherit" }}>
                <ListItem
                  button
                  sx={{
                    backgroundColor: location.pathname === option.link ? "#e0e0e0" : "transparent",
                    "&:hover": { backgroundColor: "#d6d6d6" },
                  }}
                >
                  <ListItemIcon sx={{ color: location.pathname === option.link ? "#000" : "#fff" }}>{option.icon}</ListItemIcon>
                  <ListItemText primary={option.text} sx={{ color: location.pathname === option.link ? "#000" : "#fff" }} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      )}

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, marginTop: "64px", padding: "20px" }}>
        {location.pathname === "/ourjourney" && (
          <Typography variant="h4" sx={{ color: "#4D4D4E", textAlign: "center" }}>
            Welcome to the Dashboard!
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;

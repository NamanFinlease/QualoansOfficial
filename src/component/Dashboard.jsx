import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

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

const Dashboard = ({ profileImageUrl, name }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState("Dashboard");

  const options = [
    { text: "Dashboard", icon: <DashboardIcon />, link: "/ourjourney" },
    { text: "Privacy Policy", icon: <PolicyIcon />, link: "/privacy-policy" },
    { text: "Terms & Conditions", icon: <GavelIcon />, link: "/terms-conditions" },
    { text: "User Preview", icon: <PersonIcon />, link: "/user-preview" },
    { text: "Logout", icon: <LogoutIcon />, link: "/logout" },
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <Box sx={{ display: "flex", overflow: "hidden", flexDirection: "column", backgroundColor: '#f9f9f9' }}>
      {/* Navbar */}
      <AppBar position="fixed" sx={{ backgroundColor: "#4D4D4E", color: "#fff", boxShadow: "none", height: "64px", zIndex: 1201 }}>
        <Toolbar>
          <IconButton onClick={() => setSidebarOpen(!sidebarOpen)} sx={{ color: "white", marginRight: 2 }}>
            {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Dashboard</Typography>
          <Typography variant="h6" sx={{ marginRight: 2, flexGrow: 1 }}>{name}</Typography>
          <Typography>Hi!!</Typography>
          <Avatar src={profileImageUrl} sx={{ width: 40, height: 40, borderRadius: "50%", marginLeft: "auto" }} />
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      {sidebarOpen && (
        <Box sx={{ width: 240, height: "100vh", backgroundColor: "#4D4D4E", position: "fixed", top: "64px", left: 0, bottom: 0, zIndex: 1200, boxShadow: 3, color: "#fff" }}>
          <Divider />
          <List>
            {options.map((option, index) => (
              <Link key={index} to={option.link} style={{ textDecoration: "none", color: "inherit" }}>
                <ListItem button sx={{ "&:hover": { backgroundColor: "#e0e0e0" } }} onClick={() => handleOptionClick(option.text)}>
                  <ListItemIcon sx={{ color: "#fff" }}>{option.icon}</ListItemIcon>
                  <ListItemText primary={option.text} sx={{ color: "#fff" }} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;

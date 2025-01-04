import React from "react";
import { IconButton, Typography, Toolbar, AppBar, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Dashboard from "../component/Dashboard";

const Navbar = ({ sidebarOpen, setSidebarOpen, name, profileImageUrl }) => {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#4D4D4E",
          color: "#fff",
          boxShadow: "none",
          height: "64px",
          zIndex: 1201, // Ensure the navbar is above other content
        }}
      >
        <Toolbar>
          <IconButton
            onClick={() => setSidebarOpen(!sidebarOpen)}
            sx={{ color: "white", marginRight: 2 }}
          >
            {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Typography variant="h6" sx={{ marginRight: 2 }}>
            {name}
          </Typography>
          <Avatar src={profileImageUrl} alt="Profile" />
        </Toolbar>
      </AppBar>
      {/* Add some margin-top to avoid the Navbar overlaying content */}
      <div style={{ marginTop: "64px" }}>
        <Dashboard profileImageUrl={profileImageUrl} name={name} />
      </div>
    </>
  );
};

export default Navbar;

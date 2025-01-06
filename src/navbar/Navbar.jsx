import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Dashboard from "../component/Dashboard";  // Import the Dashboard Component

const Navbar = ({ profileImageUrl, name }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      {/* AppBar */}
      <AppBar position="fixed" sx={{ backgroundColor: "#4D4D4E", color: "#fff", boxShadow: "none", height: "64px", zIndex: 1201 }}>
        <Toolbar>
          <IconButton onClick={() => setSidebarOpen(!sidebarOpen)} sx={{ color: "white", marginRight: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Typography variant="h6" sx={{ marginRight: 2 }}>
            {name}
          </Typography>
          <Avatar src={profileImageUrl} sx={{ width: 40, height: 40, borderRadius: "50%" }} />
        </Toolbar>
      </AppBar>

      {/* Render Dashboard */}
      <Dashboard profileImageUrl={profileImageUrl} name={name} />
    </div>
  );
};

export default Navbar;

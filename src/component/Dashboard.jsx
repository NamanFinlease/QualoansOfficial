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
  Tooltip,
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
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import logo from "../assets/image/White.webp";
import { BASE_URL } from "../baseURL";
import { getToken } from "../../tokenManager";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";

const MySwal = withReactContent(Swal);

const Dashboard = () => {
  const { sidebarOpen, setSidebarOpen, sidebarExpanded, setSidebarExpanded } =
    useSidebar();
  const [profileData, setProfileData] = useState({
    name: "",
    profileImageUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const token = getToken();
  const navigate = useNavigate();

  // Calculate the sidebar width based on state
  const sidebarWidth = sidebarOpen ? (sidebarExpanded ? 240 : 70) : 0;

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
        credentials: "include",
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
          navigate("/login-form");
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
      link: "/terms-condition",
    },
    { text: "User Preview", icon: <PersonIcon />, link: "/user-preview" },
    { text: "Logout", icon: <LogoutIcon />, action: handleLogout },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        overflow: "hidden",
        flexDirection: "column",
        backgroundColor: "#f9f9f9",
        width: "30%",
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          background: "#1C1C1C",
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

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "auto",
              // marginRight: { xs: 4, md: 0 },
            }}
          >
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
            width: sidebarExpanded ? 240 : 70,
            height: "100vh",
            background: "#1C1C1C",
            position: "fixed",
            top: "60px",
            left: 0,
            bottom: 0,
            zIndex: 1200,
            boxShadow: 3,
            color: "#fff",
            transition: "width 0.3s ease",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <IconButton
            onClick={() => setSidebarExpanded(!sidebarExpanded)}
            sx={{
              color: "white",
              position: "absolute",
              right: -15,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "#1C1C1C",
              "&:hover": {
                backgroundColor: "#F26722",
              },
              width: 30,
              height: 30,
            }}
          >
            {sidebarExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>

          <Divider />
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {options.map((option, index) =>
              option.action ? (
                <Tooltip
                  key={index}
                  title={!sidebarExpanded ? option.text : ""}
                  placement="right"
                >
                  <ListItem
                    button
                    onClick={() => {
                      option.action();
                      setSidebarOpen(false);
                    }}
                    sx={{
                      padding: sidebarExpanded ? "8px 16px" : "8px",
                      justifyContent: sidebarExpanded ? "flex-start" : "center",
                      "&:hover": {
                        backgroundColor: "#d6d6d6",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: "#fff",
                        minWidth: sidebarExpanded ? 40 : "auto",
                        
                      }}
                    >
                      {option.icon}
                    </ListItemIcon>
                    {sidebarExpanded && <ListItemText primary={option.text} />}
                  </ListItem>
                </Tooltip>
              ) : (
                <Tooltip
                  key={index}
                  title={!sidebarExpanded ? option.text : ""}
                  placement="right"
                >
                  <Link
                    to={option.link}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItem
                      button
                      sx={{
                        padding: sidebarExpanded ? "8px 16px" : "10px",
                        justifyContent: sidebarExpanded
                          ? "flex-start"
                          : "center",
                        backgroundColor:
                          location.pathname === option.link
                            ? "#e0e0e0"
                            : "transparent",
                        "&:hover": { backgroundColor: "#d6d6d6" },
                        borderRadius: "22px",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color:
                            location.pathname === option.link ? "#000" : "#fff",
                          minWidth: sidebarExpanded ? 40 : "auto",
                        }}
                      >
                        {option.icon}
                      </ListItemIcon>
                      {sidebarExpanded && (
                        <ListItemText
                          primary={option.text}
                          sx={{
                            color:
                              location.pathname === option.link
                                ? "#000"
                                : "#fff",
                          }}
                        />
                      )}
                    </ListItem>
                  </Link>
                </Tooltip>
              )
            )}
          </List>
        </Box>
      )}

      {/* Main Content - Add paddingLeft based on sidebar state */}
      <Box
        sx={{
          flexGrow: 1,
          marginTop: "64px",
          paddingLeft: `${sidebarWidth}px`,
          transition: "padding-left 0.3s ease",
        }}
      >
        {/* {location.pathname === "/ourjourney" && (
          <Typography
            variant="h4"
            sx={{ color: "#1C1C1C", textAlign: "center" }}
          >
            Welcome to the Dashboard!
          </Typography>
        )} */}
      </Box>
    </Box>
  );
};

export default Dashboard;

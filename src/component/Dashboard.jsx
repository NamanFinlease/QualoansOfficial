import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  Typography,
  LinearProgress,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Button,
  Divider,
  Avatar,
 
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PolicyIcon from "@mui/icons-material/Policy";
import GavelIcon from "@mui/icons-material/Gavel";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import creditExecutiveImage from "../assets/image/Our-Mission.jpg"; // Update this path if needed

const Dashboard = ({ profileImageUrl, name }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState("Dashboard");
  const [isVideoPage, setIsVideoPage] = useState(false);

  const options = [
    { text: "Dashboard", icon: <DashboardIcon /> },
    { text: "Privacy Policy", icon: <PolicyIcon /> },
    { text: "Terms & Conditions", icon: <GavelIcon /> },
    { text: "User Preview", icon: <PersonIcon /> },
    { text: "Logout", icon: <LogoutIcon /> },
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleRedirectToVideo = () => {
    setIsVideoPage(true);
  };

  const handleBackButton = () => {
    setIsVideoPage(false);
  };

  return (
    <Box sx={{ display: "flex", overflow: "hidden", flexDirection: "column",          backgroundColor: '#f9f9f9',
    }}>
      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#4D4D4E",
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
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Typography variant="h6" sx={{ marginRight: 2, flexGrow: 1 }}>
            {name}
          </Typography>
          <Typography>Hi!!</Typography>
          <Avatar
            src={profileImageUrl}
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              marginLeft: "auto",
            }}
          />
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      {sidebarOpen && (
        <Box
          sx={{
            width: 240,
            height: "100vh",
            backgroundColor: "#4D4D4E",
            position: "fixed",
            top: "64px", // Start below the AppBar
            left: 0,
            bottom: 0,
            zIndex: 1200,
            boxShadow: 3,
            color: "#fff",
          }}
        >
          <Divider />
          <List>
            {options.map((option, index) => (
              <ListItem
                button
                key={index}
                sx={{ "&:hover": { backgroundColor: "#e0e0e0" } }}
                onClick={() => handleOptionClick(option.text)}
              >
                <ListItemIcon sx={{ color: "#fff" }}>{option.icon}</ListItemIcon>
                <ListItemText primary={option.text} sx={{ color: "#fff" }} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* Main Content */}

      <Box
        sx={{
          marginLeft: sidebarOpen ? "280px" : "20px",
          transition: "margin-left 0.3s ease",
          mt:10, 
          fontWeight:'800'

        }}
      >
        <Typography>Dive into Financial Freedom! Apply now for our instant personal loan - unlock a world of collateral-free ease, no credit score hassles, a seamless 100% online application process, and the simplicity of minimal documentation. Your journey to hassle-free finances starts here!.</Typography>
      </Box>
      <Box
        sx={{
          
          marginLeft: sidebarOpen ? "240px" : "0px",
          transition: "margin-left 0.3s ease",
          padding: 4,
          mt:2,
        }}
      >
        
        {selectedOption === "Dashboard" && !isVideoPage && (
          
<Box
  sx={{
    border: "5px solid #4D4D4E", // Add a border with color
    borderTop: "none", // Remove the top border
    borderRight: "none", // Remove the right border
    display: "flex",
    flexDirection: "row", // Align items horizontally
    justifyContent: "space-between", // Space between the boxes
    alignItems: "flex-start", // Align the top of the boxes
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    boxShadow: 3,
    padding: 2,
    margin: "auto",
    maxWidth: 1200, // Adjust the container width
  }}
>
  {/* Left Content Box */}
  <Box
    sx={{
    
      flexDirection: "column",
      alignItems: "flex-start", // Align content to the left
      backgroundColor: "#f5f5f5",
      borderRadius: 2,
      boxShadow: 3,
      padding: 2,
      maxWidth: 600,
      width: "100%", // Ensure proper sizing
    }}
  >
    <Box
      sx={{
        backgroundColor: "#fff",
        padding: 2,
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 450,
        textAlign: "center",
        width: "100%",
        marginBottom: 4,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Loan Application Progress
      </Typography>
      <LinearProgress variant="determinate" value={50} sx={{ marginBottom: 2 }} />
      <Typography variant="body2">Progress: 50% completed.</Typography>
    </Box>
    <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
    <Button
  variant="outlined"
  color="primary"
  sx={{
    width: "25%",
    borderRadius: "30px",
    fontWeight: "bold",
    textTransform: "none",
  }}
  component={Link}
  to="/registration" // Change to the actual route for registration
>
  Continue
</Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleRedirectToVideo}
        sx={{
          width: "25%",
          borderRadius: "30px",
          fontWeight: "bold",
          textTransform: "none",
        }}
      >
        Loan Journey
      </Button>
    </Box>
  </Box>

  {/* Right Image Box */}
  <Box
    sx={{
      marginLeft: 2, // Add some spacing between the boxes
      borderTopLeftRadius: 2, // Rounded corners
      borderBottomRightRadius: 2, // Rounded corners
      overflow: "hidden", // Ensure the image stays inside the box
      width: 400, // Set width for the image box
      height: "auto", // Allow the image to scale naturally
    }}
  >
   <img
      src={creditExecutiveImage}
      alt="Credit Executive"
      style={{
        width: "100%",
        borderRadius: "8px",
        objectFit: "cover",
      }}
    />
  </Box>
</Box>
        )}

        {isVideoPage && (
          <Box
            sx={{
              padding: 3,
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: 3,
              maxWidth: 600,
              textAlign: "center",
              width: "100%",
              marginBottom: 4,
            }}
          >
            <Typography variant="h6">Loan Journey Video</Typography>
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/your-video-id"
              title="Loan Journey Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={handleBackButton}
              sx={{
                marginTop: 2,
                borderRadius: "30px",
                fontWeight: "bold",
                padding: "12px",
                textTransform: "none",
              }}
            >
              Back to Dashboard
            </Button>
          </Box>
        )}

        {/* Credit Executive Section */}
        <Box
  sx={{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 3,
    backgroundColor: "#fff",
    borderRadius: 2,
    boxShadow: 3,
    marginTop: 4,
    width: "100%",
    borderTopLeft:'none',
    border: "5px solid #4D4D4E",  // Add a border with color
    borderTop: "none",  // Remove the top border
    borderRight: "none", // Remove the right border
    borderTopLeftRadius: "15px",  // Rounded top-left corner
    borderTopRightRadius: "15px",  // Rounded top-right corner
    borderBottomLeftRadius: "15px", // Rounded bottom-left corner
    borderBottomRightRadius: "15px", // Rounded bottom-right corner
  }}
>
  <Box sx={{ flex: 1, paddingRight: 2 }}>
    <Typography
      variant="h6"
      gutterBottom
      sx={{
        fontWeight: "bold", // Make the heading bold
        color: "#333", // Set the color of the heading to a dark shade
      }}
    >
      Credit Executive
    </Typography>
    <Typography
      variant="body1"
      sx={{
        mt:2,
        fontWeight:'bold',
        marginBottom: 1,
        fontStyle: "italic",  // Adding some style to the description
        color: "orange", // Lighter color for description
      }}
    >
      Stuck in application at any point? Feel free to call your credit executive.
    </Typography>
    <Typography variant="body2" sx={{ fontWeight: "bold", color: "#333",mt:2 }}>
      Name: John Doe
    </Typography>
    <Typography variant="body2" sx={{ color: "#333",mt:2 }}>
      Email: johndoe@example.com
    </Typography>
    <Typography variant="body2" sx={{ color: "#333",mt:2 }}>
      Mobile: +91 9876543210
    </Typography>

    {/* Call Us and Email Buttons */}
    <Box sx={{ marginTop: 2, display: "flex", gap: 2 ,mt:2}}>
      <Button
        variant="contained"
        color="primary"
        sx={{
          borderRadius: "30px",  // Round the corners of the button
          fontWeight: "bold",
          textTransform: "none",
          background: "linear-gradient(45deg, #00A5E5, #0077B6)", // Gradient color
          '&:hover': {
            background: "linear-gradient(45deg, #0077B6, #00A5E5)", // Reverse gradient on hover
          },
        }}
        onClick={() => window.location.href = "tel:+919876543210"}
      >
        Call Us
      </Button>
      <Button
        variant="outlined"
        color="primary"
        sx={{
          borderRadius: "30px",
          fontWeight: "bold",
          textTransform: "none",
          borderColor: "#00A5E5", // Set border color to match the primary color
          color: "#00A5E5", // Text color to match the primary color
          '&:hover': {
            borderColor: "#0077B6", // Darker border color on hover
            color: "#0077B6", // Darker text color on hover
          },
        }}
        onClick={() => window.location.href = "mailto:johndoe@example.com"}
      >
        Email Us
      </Button>
    </Box>
  </Box>
  <Box sx={{ flex: 1 }}>
    <img
      src={creditExecutiveImage}
      alt="Credit Executive"
      style={{
        width: "100%",
        borderRadius: "8px",
        objectFit: "cover",
      }}
    />
  </Box>
</Box>

</Box>
    </Box>


  );
};

export default Dashboard;
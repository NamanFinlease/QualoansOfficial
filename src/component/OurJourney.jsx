import React, { useState } from "react";
import { Box, Typography, Button, LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Correct import for navigate hook
import creditExecutiveImage from "../assets/image/image1.png"; // Add the actual image path
import Dashboard from "./Dashboard";

const OurJourney = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to control sidebar open/close
  const [selectedOption, setSelectedOption] = useState("Dashboard"); // Sample state for selected option
  const [isVideoPage, setIsVideoPage] = useState(false); // Sample state for video page
  const navigate = useNavigate(); // Hook for navigation

  // Handle video redirection
  const handleRedirectToVideo = () => {
    setIsVideoPage(true);
  };

  // Handle back button
  const handleBackButton = () => {
    setIsVideoPage(false);
  };

  const handleContinue = () => {
    navigate("/registration"); // Navigate to the registration page
  };

  // Toggle the sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const calculateProgress = () => {
    return 70; // You can replace this with the actual progress calculation logic
  };

  return (
    <div>
      <Dashboard />

      

      {/* Main Content Area */}
      <Box
        sx={{
          marginLeft: "200px" , // Dynamically adjust margin based on sidebar state
          transition: "margin-left 0.3s ease",
          padding: 2,
          mt: 2,
        }}
      >
        {selectedOption === "Dashboard" && !isVideoPage && (
          <Box
            sx={{
              border: "5px solid #4D4D4E",
              borderTop: "none",
              borderRight: "none",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              backgroundColor: "#f5f5f5",
              borderRadius: 5,
              boxShadow: 3,
              padding: 2,
              margin: "auto",
              maxWidth: 800,
              mt: 5,
            }}
          >
            {/* Left Content Box */}
            <Box
              sx={{
                flexDirection: "column",
                alignItems: "flex-start",
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                boxShadow: 3,
                padding: 2,
                maxWidth: 400,
                width: "100%",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#fff",
                  padding: 2,
                  borderRadius: 2,
                  boxShadow: 3,
                  maxWidth: 350,
                  textAlign: "center",
                  width: "100%",
                  marginBottom: 4,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Loan Application Progress
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={calculateProgress()} // Assuming calculateProgress() function is defined
                  sx={{
                    height: 30,
                    borderRadius: 5,
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#4D4D4E", // Custom progress bar color
                    },
                    marginBottom: 2,
                  }}
                />
                <Typography variant="body2">
                  Progress: {calculateProgress()}% completed.
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <Button
                  variant="contained"
                  sx={{
                    background:"#4D4D4E",
                    width: "25%",
                    borderRadius: "30px",
                    fontWeight: "bold",
                    textTransform: "none",
                  }}
                  onClick={handleContinue} // Use the handleContinue function here
                >
                  Continue
                </Button>
                <Button
                  variant="contained"
                  onClick={handleRedirectToVideo}
                  sx={{
                    background:"orange",
                    width: "45%",
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
                marginLeft: 2,
                borderTopLeftRadius: 2,
                borderBottomRightRadius: 2,
                overflow: "hidden",
                width: 250,
                height: "auto",
              }}
            >
              <img
                src={creditExecutiveImage}
                alt="Credit Executive"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Box>
        )}

        <Box
          sx={{
            marginLeft: "108px",
            transition: "margin-left 0.3s ease",
            mt: 5,
            fontWeight: "800",
            fontSize: { xs: "16px", sm: "18px", md: "20px" }, // Responsive font size
            lineHeight: 1.5,
            color: "text.primary",
            backgroundColor: "#f5f5f5", // Light background for contrast
            borderRadius: "10px",
            padding: { xs: "16px", sm: "30px" }, // Padding for content spacing
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
            maxWidth: "800px", // Reduced max-width
            width: "90%", // Reduced width to 90% for responsiveness
            mb: 5,
            textAlign: "center", // Center-align the text
            "& p": {
              margin: 0, // Remove default margin from <p> tag
            },
          }}
        >
          <Typography>
            Dive into Financial Freedom! Apply now for our instant personal loan - unlock a world of collateral-free ease, no credit score hassles, a seamless 100% online application process, and the simplicity of minimal documentation. Your journey to hassle-free finances starts here!
          </Typography>
        </Box>

        {/* Credit Executive Section - Positioned Below the Loan Application Progress Box */}
        <Box
          sx={{
            border: "5px solid #4D4D4E",
            borderTop: "none",
            borderRight: "none",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            backgroundColor: "#f5f5f5",
            borderRadius: 5,
            boxShadow: 3,
            padding: 2,
            margin: "auto",
            maxWidth: 810,
          }}
        >
          <Box sx={{ flex: 1, paddingRight: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Credit Executive
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 2,
                fontWeight: "bold",
                marginBottom: 1,
                fontStyle: "italic",
                color: "orange",
              }}
            >
              Stuck in application at any point? Feel free to call your credit executive.
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "bold", color: "#333", mt: 2 }}>
              Name: John Doe
            </Typography>
            <Typography variant="body2" sx={{ color: "#333", mt: 2 }}>
              Email: johndoe@example.com
            </Typography>
            <Typography variant="body2" sx={{ color: "#333", mt: 2 }}>
              Mobile: +91 9876543210
            </Typography>

            <Box sx={{ marginTop: 2, display: "flex", gap: 2, mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: "30px",
                  fontWeight: "bold",
                  textTransform: "none",
                  background: "linear-gradient(45deg, #00A5E5, #0077B6)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #0077B6, #00A5E5)",
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
                  borderColor: "#00A5E5",
                  color: "#00A5E5",
                  "&:hover": {
                    borderColor: "#0077B6",
                    color: "#0077B6",
                  },
                }}
                onClick={() => window.location.href = "mailto:johndoe@example.com"}
              >
                Email Us
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              marginLeft: 2,
              borderTopLeftRadius: 2,
              borderBottomRightRadius: 2,
              overflow: "hidden",
              width: 250,
              height: "auto",
            }}
          >
            <img
              src={creditExecutiveImage}
              alt="Credit Executive"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default OurJourney;

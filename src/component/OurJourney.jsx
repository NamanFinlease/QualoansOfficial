import React, { useEffect, useState } from "react";
import { Box, Typography, Button, LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import creditExecutiveImage from "../assets/image/1.gif";
import journeryprocess from "../assets/image/Untitled design (1).gif";
import Dashboard from "./Dashboard";
import axios from "axios";
import { BASE_URL } from "../baseURL";

const OurJourney = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Dashboard");
  const [isVideoPage, setIsVideoPage] = useState(false);
  const [isRegistration, setRegistration] = useState(true); // Track the current process

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/user/getDashboardDetails`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          setRegistration(response.data.isRegistration);
        }
      } catch (error) {
        console.error("Error fetching dashboard details:", error);
      }
    };

    fetchData();
  }, []);

  const handleRedirectToVideo = () => {
    setIsVideoPage(true);
  };

  const handleBackButton = () => {
    setIsVideoPage(false);
  };

  const handleContinue = () => {
    if (isRegistration) {
      navigate("/registration"); // Navigate to the registration page
    } else {
      navigate("/loan-application"); // Navigate to the loan application page
    }
  };

  return (
    <div>
      <Dashboard />

      <Box
        sx={{
          marginLeft: { xs: 0, sm: "200px" }, // Adjust margin for mobile
          transition: "margin-left 0.3s ease",
          padding: { xs: 1, sm: 2 },
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
              flexDirection: { xs: "column", sm: "row" }, // Stack columns on small screens
              justifyContent: "space-between",
              alignItems: "flex-start",
              background: "linear-gradient(45deg, #4D4D4E, orange)",
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
                flex: 1,
                alignItems: "flex-start",
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                boxShadow: 3,
                padding: 2,
                width: "100%",
                maxWidth: 400,
                mb: { xs: 3, sm: 0 }, // Margin-bottom on small screens
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
                  {isRegistration
                    ? "Complete your Registration"
                    : "Complete your Loan Application"}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    maxWidth: "200px",
                    borderRadius: "30px",
                    fontWeight: "bold",
                    textTransform: "none",
                    background: "linear-gradient(45deg, #00A5E5, orange)",
                    "&:hover": {
                      background: "orange",
                    },
                  }}
                  onClick={handleContinue}
                >
                  {isRegistration === "registration" ? "Continue" : "Apply"}
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    window.location.href =
                      "https://www.youtube.com/watch?v=a3ICNMQW7Ok&ab_channel=TimotiusJoso"; // Replace with your video URL
                  }}
                  // sx={{
                  //   width: "100%",
                  //   maxWidth: "200px",
                  //   borderRadius: "30px",
                  //   fontWeight: "bold",
                  //   textTransform: "none",
                  //   background: "linear-gradient(45deg, #00A5E5, orange)",
                  //   "&:hover": {
                  //     background: "orange",
                  //   },
                  // }}
                  sx={{
                    background: "#4D4D4E",
                    width: "100%",
                    maxWidth: "200px",
                    borderRadius: "30px",
                    fontWeight: "bold",
                    textTransform: "none",
                  }}
                >
                  Learn How to Apply
                </Button>
              </Box>
            </Box>

            {/* Right Image Box */}
            <Box
              sx={{
                marginLeft: { sm: 2, xs: 0 },
                borderTopLeftRadius: 2,
                borderBottomRightRadius: 2,
                overflow: "hidden",
                width: { xs: "100%", sm: 250 },
                height: "auto",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={journeryprocess}
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

        {/* Description Box */}
        <Box
          sx={{
            marginLeft: { xs: 0, md: "280px" },
            transition: "margin-left 0.3s ease",
            mt: 5,
            fontWeight: "800",
            fontSize: { xs: "16px", sm: "18px", md: "20px" },
            lineHeight: 1.5,
            color: "white",
            background: "linear-gradient(45deg, #4D4D4E, orange)",
            borderRadius: "10px",
            padding: { xs: "16px", sm: "30px" },
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            maxWidth: "800px",
            width: "90%",
            mb: 5,
            textAlign: "center",
          }}
        >
          <Typography>
            Experience a smarter way to borrow with our instant personal loans.
            No collateral, no credit score worries—just a seamless 100% online
            process with minimal documentation. Achieve your goals effortlessly
            and step into a world of financial ease today!
          </Typography>
        </Box>

        {/* Credit Executive Section */}
        <Box
          sx={{
            border: "5px solid #4D4D4E",
            borderTop: "none",
            borderRight: "none",
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, // Stack on small, side-by-side on medium+
            justifyContent: "space-between",
            alignItems: { xs: "center", md: "flex-start" },
            background: "linear-gradient(45deg, #4D4D4E, orange)",
            borderRadius: 5,
            boxShadow: 3,
            padding: 2,
            margin: "auto",
            maxWidth: 810,
            mt: 5,
            gap: { xs: 3, md: 2 }, // Space between content and image
          }}
        >
          {/* Text Content Box */}
          <Box
            sx={{
              flex: 1,
              paddingRight: { md: 2, xs: 0 }, // Adjust padding based on screen size
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: "white" }}
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
                color: "white",
              }}
            >
              Stuck in application at any point? Feel free to call your credit
              executive.
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "white", mt: 2 }}
            >
              Name: John Doe
            </Typography>
            <Typography variant="body2" sx={{ color: "white", mt: 2 }}>
              Email: johndoe@example.com
            </Typography>
            <Typography variant="body2" sx={{ color: "white", mt: 2 }}>
              Mobile: +91 9876543210
            </Typography>

            {/* Buttons */}
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
                gap: 2,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{
                  paddingX: 4,
                  borderRadius: "30px",
                  fontWeight: "bold",
                  textTransform: "none",
                  background: "linear-gradient(45deg, #00A5E5, orange)",
                  "&:hover": {
                    background: "orange",
                  },
                }}
                onClick={() => (window.location.href = "tel:+919876543210")}
              >
                Call Us
              </Button>
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  paddingX: 4,
                  borderRadius: "30px",
                  fontWeight: "bold",
                  textTransform: "none",
                  border: "2px solid #4D4D4E",
                  color: "white",
                }}
                onClick={() =>
                  (window.location.href = "mailto:johndoe@example.com")
                }
              >
                Email Us
              </Button>
            </Box>
          </Box>

          {/* Right Image Box */}
          <Box
            sx={{
              marginLeft: { md: 2, xs: 0 },
              borderTopLeftRadius: 2,
              borderBottomRightRadius: 2,
              overflow: "hidden",
              width: { xs: "100%", md: 250 },
              height: "auto",
              display: "flex",
              justifyContent: "center",
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

import React, { useEffect, useState } from "react";
import { Box, Typography, Button, LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import creditExecutiveImage from "../assets/image/1.gif";
import journeryprocess from "../assets/image/Untitled design (1).gif";
import Dashboard from "./Dashboard";
import axios from "axios";
import { BASE_URL } from "../baseURL";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SpeedIcon from "@mui/icons-material/Speed";
import SecurityIcon from "@mui/icons-material/Security";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { useSidebar } from "../context/SidebarContext";
import StepperComponent from "./StepperComponent";
import LoanTable from "./LoanTable";

const OurJourney = () => {
  const navigate = useNavigate();
  const { sidebarOpen, sidebarExpanded } = useSidebar();
  const [selectedOption, setSelectedOption] = useState("Dashboard");
  const [isVideoPage, setIsVideoPage] = useState(false);
  const [isRegistration, setRegistration] = useState(true); // Track the current process
  const [isLoanApplied, setLoanApplied] = useState(false);
  const [isLoanTable, setLoanTable] = useState(false);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getDashboardDetails`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setRegistration(response.data.isRegistration);
          setLoanApplied(response.data.isLoanApplied);
        }
      } catch (error) {
        console.error("Error fetching dashboard details:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/loanList`, {
        withCredentials: true,
      });
      console.log("response", response?.data?.loanList);
      //   if (!response.ok) {
      //     throw new Error("Failed to fetch loans");
      //   }
      //   const data = await response.json();

      //   console.log("data", data);
      // Sort loans in descending order based on date
      // const sortedLoans = response.data.loanList.sort(
      //   (a, b) => new Date(b.date) - new Date(a.date)
      // );
      setLoans(response.data.loanList);
    } catch (error) {
      console.error("Error fetching loans:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const features = [
    {
      title: "Quick Disbursement",
      description: "Get funds in your account within 30 minutes",
      icon: <SpeedIcon sx={{ fontSize: 40, color: "#F26722" }} />,
    },
    {
      title: "Competitive Rates",
      description: "Competitive interest rates",
      icon: <AccountBalanceIcon sx={{ fontSize: 40, color: "#F26722" }} />,
    },
    {
      title: "Zero Collateral",
      description: "No collateral deposit required",
      icon: <SecurityIcon sx={{ fontSize: 40, color: "#F26722" }} />,
    },
  ];

  console.log("loans our journey >> ", loans);

  return (
    <div>
      <Dashboard />
      <Box
        sx={{
          padding: { xs: 2, sm: 3 },
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
          width: `calc(100% - ${
            sidebarOpen ? (sidebarExpanded ? 240 : 70) : 0
          }px)`,
          marginLeft: `${sidebarOpen ? (sidebarExpanded ? 240 : 70) : 0}px`,
          transition: "width 0.3s ease, margin-left 0.3s ease",
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
            borderRadius: "20px",
            padding: { xs: 4, md: 6 },
            color: "white",
            textAlign: "center",
            mb: 4,
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "#F26722",
              zIndex: 0,
            }}
          />
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              Fast & Easy Personal Loans
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                color: "rgba(255,255,255,0.9)",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              Get instant approval with minimal documentation and competitive
              interest rates
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "center",
                gap: 2,
                marginTop: 2,
              }}
            >
              <Button
                variant="contained"
                size="medium"
                onClick={handleContinue}
                sx={{
                  backgroundColor: "#ffff",
                  color: "#000",
                  px: 4,
                  py: 1,
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "#8b8887",
                  },
                  // boxShadow: "0 4px 15px #8b8887",
                  borderRadius: "30px",
                  width: { xs: "100%", sm: "230px" },
                }}
              >
                {isRegistration ? "Registration" : "Loan Application"}
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  window.location.href =
                    "https://www.youtube.com/watch?v=a3ICNMQW7Ok&ab_channel=TimotiusJoso"; // Replace with your video URL
                }}
                sx={{
                  backgroundColor: "#fff",
                  color: "#000",
                  px: 4,
                  py: 1,
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "#8b8887",
                  },
                  // boxShadow: "0 4px 15px #8b8887",
                  borderRadius: "30px",
                }}
              >
                Learn How to Apply
              </Button>
              {loans.length > 0 && (
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate("/manage-repayments");
                  }}
                  sx={{
                    backgroundColor: "#fff",
                    color: "#000",
                    px: 4,
                    py: 1,
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "#8b8887",
                    },
                    // boxShadow: "0 4px 15px #8b8887",
                    borderRadius: "30px",
                  }}
                >
                  Manage Repayments
                </Button>
              )}
            </Box>
          </Box>
        </Box>

        {isLoanTable && <LoanTable loans={loans} loading={loading} />}

        {isLoanApplied && <StepperComponent />}

        {/* Features Grid - Updated with Material icons and better styling */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
            gap: 4,
            mb: 6,
          }}
        >
          {features.map((feature) => (
            <Box
              key={feature.title}
              sx={{
                backgroundColor: "white",
                borderRadius: "16px",
                padding: 4,
                textAlign: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
                },
              }}
            >
              <Box sx={{ mb: 3 }}>{feature.icon}</Box>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: "#1c1c1c",
                }}
              >
                {feature.title}
              </Typography>
              <Typography color="text.secondary">
                {feature.description}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Loan Process Steps */}
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: 4,
            mb: 4,
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          }}
        >
          <Typography
            variant="h5"
            sx={{ mb: 4, fontWeight: 600, textAlign: "center" }}
          >
            Simple 3-Step Process
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
              justifyContent: "center",
            }}
          >
            {[
              {
                step: 1,
                title: "Fill Application",
                desc: "Complete the online form",
              },
              {
                step: 2,
                title: "Quick Verification",
                desc: "Digital KYC process",
              },
              { step: 3, title: "Get Money", desc: "Direct bank transfer" },
            ].map((step) => (
              <Box
                key={step.step}
                sx={{
                  textAlign: "center",
                  position: "relative",
                  flex: 1,
                }}
              >
                <Typography
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "#F26722",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                    mb: 2,
                    fontSize: "1.2rem",
                    fontWeight: 600,
                  }}
                >
                  {step.step}
                </Typography>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {step.title}
                </Typography>
                <Typography color="text.secondary">{step.desc}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Credit Executive Card - Modernized */}
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: 4,
            paddingLeft: { xs: 4, md: 20 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 4,
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Need Assistance?
            </Typography>
            <Typography sx={{ mb: 3, color: "text.secondary" }}>
              Our credit executives are here to help you through the loan
              process
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                Email- credit@qualoan.com
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                Contact no - +917338437609
              </Typography>
              <Typography color="text.secondary">
                Available Mon-Sat, 9AM-6PM
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<span>📞</span>}
                onClick={() => (window.location.href = "tel:+917338437609")}
                sx={{
                  backgroundColor: "#F26722",
                  "&:hover": { backgroundColor: "#1C1C1C" },
                }}
              >
                Call Now
              </Button>
              <Button
                variant="outlined"
                startIcon={<span>✉️</span>}
                onClick={() =>
                  (window.location.href = "mailto:credit@qualoan.com")
                }
                sx={{
                  color: "#F26722",
                }}
              >
                Email
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              width: { xs: "100%", md: "600px" },
              height: "300px",
              overflow: "hidden",
              borderRadius: "12px",
            }}
          >
            <img
              src={creditExecutiveImage}
              alt="Credit Executive"
              style={{
                width: "100%",
                height: "100%",
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

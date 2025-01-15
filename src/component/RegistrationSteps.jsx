import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Typography, Button, useTheme } from "@mui/material";
import { BASE_URL } from "../baseURL";
import Dashboard from "./Dashboard";
import DashboardProgress from "./DashboardProgress";
import MobileVerification from "./registration/MobileVerification";
import PANValidation from "./registration/PanValidation";
import PersonalInfo from "./registration/PersonalInfo";
import AddressInfo from "./registration/AddressInfo";
import IncomeInfoForm from "./registration/IncomeInfoForm";
import SelfieVerification from "./registration/SelfieVerification";

const RegistrationSteps = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState({
    mobile: false,
    pan: false,
    personal: false,
    address: false,
    income: false,
    selfie: false,
  });

  const [registrationStatus, setRegistrationStatus] = useState("");

  const fetchDashboardDetails = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/user/getDashboardDetails`);
      const data = await response.json();
      if (data.success) {
        setRegistrationStatus(data.registrationStatus);
      }
    } catch (error) {
      console.error("Error fetching dashboard details:", error);
    }
  };

  const allStepsCompleted = Object.values(completedSteps).every(
    (step) => step === true
  );

  const handleStepCompletion = (step) => {
    setCompletedSteps((prevSteps) => ({
      ...prevSteps,
      [step]: true,
    }));
  };

  useEffect(() => {
    if (allStepsCompleted) {
      navigate("/loan-application");
    }
  }, [allStepsCompleted, navigate]);

  return (
    <>
      <Dashboard />
      <Box
        sx={{
          paddingTop: 20,
          marginLeft: sidebarOpen ? "360px" : "20px",
          padding: 4,
          maxWidth: sidebarOpen ? 1000 : 300,
          margin: "auto",
          textAlign: "center",
          border: "2px solid #ccc",
          borderRadius: 3,
          boxShadow: 4,
          background: "linear-gradient(135deg, #f0f4ff, #ffffff)",
          marginTop: "80px",
          "@media (max-width: 768px)": {
            marginLeft: "20px",
            padding: 2,
            maxWidth: "100%",
          },
        }}
      >
        {/* Steps UI and Completion Message */}
        {allStepsCompleted && (
          <Box
            sx={{
              padding: 4,
              textAlign: "center",
              backgroundColor: "#e6f9e9",
              borderRadius: 3,
              marginTop: 4,
              boxShadow: "0 4px 8px rgba(0, 128, 0, 0.4)",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 2 }}>
              Congratulations! You've completed all the steps.
            </Typography>
            <img
              src="congratulation-image-url.jpg"
              alt="Congratulations"
              style={{ maxWidth: "100%", height: "auto", marginBottom: 2 }}
            />
            <Button
              variant="contained"
              sx={{ backgroundColor: "#FF6600", color: "white" }}
              onClick={() => navigate("/loan-application")}
            >
              Continue to Next Page
            </Button>
          </Box>
        )}

        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Grid item xs={12} sm={6}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#4D4D4E",
                marginBottom: 2,
              }}
            >
              Complete Your Profile Registration
            </Typography>
          </Grid>
          <DashboardProgress registrationStatus={registrationStatus} />
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: 2,
            "@media (max-width: 600px)": {
              flexDirection: "column",
              alignItems: "center",
            },
          }}
        >
          <MobileVerification
            onComplete={() => handleStepCompletion("mobile")}
            disabled={completedSteps.mobile}
          />
          <PANValidation
            onComplete={() => handleStepCompletion("pan")}
            disabled={!completedSteps.mobile || completedSteps.pan}
          />
          <PersonalInfo
            onComplete={() => handleStepCompletion("personal")}
            disabled={!completedSteps.pan || completedSteps.personal}
          />
          <AddressInfo
            onComplete={() => handleStepCompletion("address")}
            disabled={!completedSteps.personal || completedSteps.address}
          />
          <IncomeInfoForm
            onComplete={() => handleStepCompletion("income")}
            disabled={!completedSteps.address || completedSteps.income}
          />
          <SelfieVerification
            onComplete={() => handleStepCompletion("selfie")}
            disabled={!completedSteps.income || completedSteps.selfie}
          />
        </Box>
      </Box>
    </>
  );
};

export default RegistrationSteps;

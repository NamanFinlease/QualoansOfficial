import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, LinearProgress } from "@mui/material";
import Dashboard from "./Dashboard";
import MobileVerification from "./registration/MobileVerification";
import PANValidation from "./registration/PanValidation";
import PersonalInfo from "./registration/PersonalInfo";
import AddressInfo from "./registration/AddressInfo";
import IncomeInfoForm from "./registration/IncomeInfoForm";
import SelfieVerification from "./registration/SelfieVerification";

const RegistrationSteps = () => {
  const navigate = useNavigate();
  const [completedSteps, setCompletedSteps] = useState({
    mobile: false,
    pan: false,
    personal: false,
    address: false,
    income: false,
    selfie: false,
  });

  const totalSteps = 6; // Total number of steps

  // Calculate progress as a percentage
  const calculateProgress = () => {
    const completedCount = Object.values(completedSteps).filter(
      (step) => step === true
    ).length;
    return (completedCount / totalSteps) * 100;
  };

  const progress = calculateProgress(); // Dynamically update progress

  // Mark a step as complete
  const handleStepCompletion = (step) => {
    setCompletedSteps((prevSteps) => ({
      ...prevSteps,
      [step]: true,
    }));
  };

  // Redirect to the next page on full completion
  useEffect(() => {
    if (progress === 100) {
      navigate("/loan-application");
    }
  }, [progress, navigate]);

  return (
    <>
      <Dashboard />
      <Box
        sx={{
          padding: 4,
          margin: "auto",
          textAlign: "center",
          border: "2px solid #ccc",
          borderRadius: 3,
          boxShadow: 4,
          background: "linear-gradient(135deg, #f0f4ff, #ffffff)",
          marginTop: "80px",
          maxWidth: "80%",
        }}
      >
        {/* Heading with Progress Bar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#4D4D4E",
            }}
          >
            Complete Your Profile Registration
          </Typography>
          <Box
            sx={{
              
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: "200px",
            }}
          >
            <Typography variant="body2" sx={{ marginBottom: 1 }}>
              {Math.round(progress)}% Completed
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                padding:2,
                width: "100%",
                height: 10,
                borderRadius: 5,
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#4D4D4E", // Customize bar color
                },
                backgroundColor: "#ddd",
              }}
            />
          </Box>
        </Box>

        {/* Steps Components */}
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
          {console.log('completedSteps.pan >>> ',completedSteps.pan)}
          {console.log('completedSteps.personal >>> ',completedSteps.personal)}
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

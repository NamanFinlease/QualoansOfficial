import React, { useEffect, useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { BASE_URL } from "../baseURL";

// Steps for the loan application process
const steps = [
  { key: "loanUnderProcess", label: "Application Under Process" },
  { key: "sanction", label: "Sanctioned" },
  { key: "disbursed", label: "Disbursed" },
];

const StepperComponent = () => {
  const [journeyData, setJourneyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchJourneyData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getJourney`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setJourneyData(response.data.journey);
        }
      } catch (error) {
        console.error("Error fetching journey data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJourneyData();
  }, []);

  // Use the default "PENDING" value if the fetched value is undefined
  const getStepStatus = (key) => {
    return journeyData?.[key] || "PENDING";
  };

  const getStepIcon = (step, index) => {
    const value = getStepStatus(step.key);

    if (value === "SUCCESS") {
      return <CheckCircleIcon sx={{ color: "green" }} />;
    } else if (value === "REJECTED") {
      return <CancelIcon sx={{ color: "red" }} />;
    } else {
      return (
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            backgroundColor: "#e0e0e0",
            color: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {index + 1}
        </Box>
      );
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!journeyData) {
    return (
      <Typography variant="h6" align="center" color="error">
        Failed to load journey data.
      </Typography>
    );
  }

  return (
    <Box sx={{ width: "100%", padding: "16px", marginBottom: "5rem" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ marginBottom: "3rem" }}
      >
        Loan Application Progress
      </Typography>
      <Stepper
        alternativeLabel={!isSmallScreen}
        orientation={isSmallScreen ? "vertical" : "horizontal"}
      >
        {steps.map((step, index) => (
          <Step key={step.key}>
            <StepLabel StepIconComponent={() => getStepIcon(step, index)}>
              {getStepStatus(step.key) === "REJECTED" ? "Rejected" : step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default StepperComponent;

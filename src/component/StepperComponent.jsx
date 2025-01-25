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
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

// Steps for the loan application process
const steps = [
  { key: "loanApplied", label: "Loan Applied", isCompleted: true },
  { key: "isScreeningCompleted", label: "Screening" },
  { key: "isSanctionCompleted", label: "Sanction" },
  { key: "isDisbursalCompleted", label: "Disbursal" },
  { key: "isRepayCompleted", label: "Repayment" },
  { key: "isLoanCompleted", label: "Loan Completed" },
];

const StepperComponent = () => {
  const [journeyData, setJourneyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const mockApiCall = async () => {
      setLoading(true);
      try {
        const mockResponse = {
          userId: "63efab12c89c930012345678",
          isScreeningCompleted: undefined,
          isSanctionCompleted: undefined,
          isDisbursalCompleted: undefined,
          isRepayCompleted: undefined,
          isLoanCompleted: undefined,
        };
        setJourneyData(mockResponse);
      } catch (error) {
        console.error("Error mocking journey data:", error);
      } finally {
        setLoading(false);
      }
    };

    mockApiCall();
  }, []);

  const getStepIcon = (step, index) => {
    const value = step.isAlwaysCompleted ? true : journeyData?.[step.key]; // Get the current step's status

    if (value === true || step.key === "loanApplied") {
      return <CheckCircleIcon sx={{ color: "green" }} />;
    } else if (value === false) {
      return <CancelIcon sx={{ color: "red" }} />;
    } else {
      return (
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            backgroundColor: step.key === "loanApplied" ? "green" : "#e0e0e0",
            color: step.key === "loanApplied" ? "#fff" : "#000",
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
      <Typography variant="h4" align="center" gutterBottom sx={{marginBottom: "3rem"}}>
        Loan Application Progress
      </Typography>
      <Stepper
        alternativeLabel={!isSmallScreen}
        orientation={isSmallScreen ? "vertical" : "horizontal"}
      >
        {steps.map((step, index) => (
          <Step key={step.key}>
            <StepLabel StepIconComponent={() => getStepIcon(step, index)}>
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default StepperComponent;

// Fetch data from the API
//   useEffect(() => {
//     const fetchJourneyData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8081/api/loanApplication/getJourney",
//           {
//             params: { userId: "USER_ID_HERE" }, // Replace with dynamic userId if needed
//             withCredentials: true,
//           }
//         );
//         setJourneyData(response.data);
//       } catch (error) {
//         console.error("Error fetching journey data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJourneyData();
//   }, []);

import React, { useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Employment from "./loan-application/Employment";
import BankStatement from "./loan-application/BankStatement";
import DocumentationStep from "./loan-application/DocumentationStep";
import DisbursalBankDetails from "./loan-application/DisbursalBankDetails";
import LoanCalculator from "./loan-application/CalculateLoan";
import Dashboard from "./Dashboard";

const LoanApplication = () => {
  const [steps, setSteps] = useState({
    loanCalculator: { completed: false, data: null },
    employmentInfo: { completed: false, data: null },
    bankStatement: { completed: false, data: null },
    fetchDocument: { completed: false, data: null },
    disbursalBankDetail: { completed: false, data: null },
  });

  const calculateProgress = () => {
    const completedSteps = Object.values(steps).filter(
      (step) => step.completed
    ).length;
    return (completedSteps / 5) * 100;
  };

  const handleStepCompletion = (stepName, isCompleted, data) => {
    setSteps((prevSteps) => ({
      ...prevSteps,
      [stepName]: { completed: isCompleted, data },
    }));
  };

  return (
    <>
      <Dashboard />
      <Box
        sx={{
          padding: 4,
          border: "2px solid #ddd",
          borderRadius: 3,
          maxWidth: 900,
          margin: "0 auto",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          background: "linear-gradient(to bottom, #ffffff, #f9f9f9)",
        }}
      >
        <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{ marginBottom: 4 }}
        >
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#4D4D4E" }}
            >
              Begin a Journey to Financial Empowerment
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Loan Application Progress
            </Typography>
            <LinearProgress
              variant="determinate"
              value={calculateProgress()}
              sx={{
                height: 30,
                borderRadius: 5,
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#007bff",
                },
              }}
            />
            <Typography variant="body2" sx={{ marginTop: 1, color: "#555" }}>
              {Math.round(calculateProgress())}% Complete
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <LoanCalculator
              onComplete={(data) =>
                handleStepCompletion("loanCalculator", true, data)
              }
              disabled={false} // Always enabled initially
              prefillData={steps.loanCalculator.data}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Employment
              onComplete={(data) =>
                handleStepCompletion("employmentInfo", true, data)
              }
              disabled={!steps.loanCalculator.completed} // Enable only after LoanCalculator is completed
              prefillData={steps.employmentInfo.data}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <BankStatement
              onComplete={(data) =>
                handleStepCompletion("bankStatement", true, data)
              }
              disabled={!steps.employmentInfo.completed}
              prefillData={steps.bankStatement.data}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DocumentationStep
              onComplete={(data) =>
                handleStepCompletion("fetchDocument", true, data)
              }
              disabled={!steps.bankStatement.completed} // Enable only after Employment is completed
              prefillData={steps.fetchDocument.data}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DisbursalBankDetails
              onComplete={(data) =>
                handleStepCompletion("disbursalBankDetail", true, data)
              }
              disabled={!steps.fetchDocument.completed} // Enable only after Employment is completed
              prefillData={steps.disbursalBankDetail.data}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LoanApplication;

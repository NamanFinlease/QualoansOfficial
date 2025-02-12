import React, { useState, useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Employment from "./loan-application/Employment";
import BankStatement from "./loan-application/BankStatement";
import DocumentationStep from "./loan-application/DocumentationStep";
import DisbursalBankDetails from "./loan-application/DisbursalBankDetails";
import LoanCalculator from "./loan-application/CalculateLoan";
import Dashboard from "./Dashboard";
import axios from "axios";
import { BASE_URL } from "../baseURL";
import { useSidebar } from "../context/SidebarContext";
import { s } from "framer-motion/client";

const LoanApplication = () => {
  const { sidebarOpen, sidebarExpanded } = useSidebar();

  const [steps, setSteps] = useState({
    loanCalculator: { completed: false, data: null },
    employmentInfo: { completed: false, data: null },
    bankStatement: { completed: false, data: null },
    fetchDocument: { completed: false, data: null },
    disbursalBankDetail: { completed: false, data: null },
  });
  const [loading, setLoading] = useState(true);
  const [isUploaded, setIsUploaded] = useState({
    isLoanCalculated: false,
    isEmploymentDetailsSaved: false,
    isBankStatementFetched: false,
    isDocumentUploaded: false,
    isDisbursalDetailsSaved: false,
  });

  // Fetch progress status from API
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/getDashboardDetails`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data); // Add this line to inspect the response

        if (response.data.success) {
          if (!response.data.isRegistration) {
            const {
              progressStatus,
              isDocumentUploaded,
              isEmploymentDetailsSaved,
            } = response.data;

            setIsUploaded({ isDocumentUploaded, isEmploymentDetailsSaved }); // Ensure you're using this correctly

            // Map progressStatus to step completion
            const updatedSteps = {
              loanCalculator: {
                completed: [
                  "CALCULATED",
                  "EMPLOYMENT_DETAILS_SAVED",
                  "BANK_STATEMENT_FETCHED",
                  "DOCUMENTS_SAVED",
                  "DISBURSAL_DETAILS_SAVED",
                  "COMPLETED",
                ].includes(progressStatus),
                data: null,
              },
              employmentInfo: {
                completed: [
                  "EMPLOYMENT_DETAILS_SAVED",
                  "BANK_STATEMENT_FETCHED",
                  "DOCUMENTS_SAVED",
                  "DISBURSAL_DETAILS_SAVED",
                  "COMPLETED",
                ].includes(progressStatus),
                data: null,
              },

              bankStatement: {
                completed: [
                  "BANK_STATEMENT_FETCHED",
                  "DOCUMENTS_SAVED",
                  "DISBURSAL_DETAILS_SAVED",
                  "COMPLETED",
                ].includes(progressStatus),
                data: null,
              },
              fetchDocument: {
                completed: [
                  "DOCUMENTS_SAVED",
                  "DISBURSAL_DETAILS_SAVED",
                  "COMPLETED",
                ].includes(progressStatus),
                data: null,
              },
              disbursalBankDetail: {
                completed: ["DISBURSAL_DETAILS_SAVED", "COMPLETED"].includes(
                  progressStatus
                ),
                data: null,
              },
            };

            setSteps(updatedSteps);
          }
        }
      } catch (error) {
        console.error("Error fetching progress status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  const calculateProgress = () => {
    const completedSteps = Object.values(steps).filter(
      (step) => step.completed
    ).length;
    return (completedSteps / 5) * 100;
  };
  const handleStepCompletion = (stepName, isCompleted, data) => {
    setSteps((prevSteps) => {
      const updatedSteps = {
        ...prevSteps,
        [stepName]: { completed: isCompleted, data },
      };
      return updatedSteps;
    });
  };

  // const handleStepCompletion = (stepName, isCompleted, data) => {
  //   setSteps((prevSteps) => ({
  //     ...prevSteps,
  //     [stepName]: { completed: isCompleted, data },
  //   }));
  // };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <Dashboard />
      <Box
        sx={{
          paddingX: 6,
          margin: "auto",
          textAlign: "center",
          marginTop: "80px",
          maxWidth: "100%",
          width: `calc(100% - ${
            sidebarOpen ? (sidebarExpanded ? 240 : 70) : 0
          }px)`,
          marginLeft: `${sidebarOpen ? (sidebarExpanded ? 240 : 90) : 0}px`,
          transition: "width 0.3s ease, margin-left 0.3s ease",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 2,
            width: "100%",
            "@media (minWidth: 600px)": {
              flexDirection: "row",
              justifyContent: "space-between",
            },
          }}
        >
          <span
            style={{
              fontWeight: "bold",
              fontSize: "1.35rem",
              color: "#333",
              width: "100%",
              textAlign: "left",
              fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
              "@media (minWidth: 600px)": {
                width: "50%",
              },
            }}
          >
            Begin a Journey to Financial Empowerment
          </span>
          <Box
            sx={{
              width: "100%",
              marginTop: 2,
              "@media (minWidth: 600px)": { marginTop: 0 },
            }}
          >
            <LinearProgress
              variant="determinate"
              value={calculateProgress()}
              sx={{
                height: 30,
                borderRadius: 5,
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#4caf50",
                },
              }}
            />
            <Typography variant="body2" sx={{ marginTop: 1, color: "#666" }}>
              {Math.round(calculateProgress())}% Complete
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            marginBottom: { xs: 5, md: 0 },
            marginTop: { xs: 0, md: 10 },
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "left",
            columnGap: "3rem",
            rowGap: "2rem",
            width: "100%",
          }}
        >
          <LoanCalculator
            onComplete={(data) =>
              handleStepCompletion("loanCalculator", true, data)
            }
            disabled={false} // Always enabled initially
            prefillData={steps.loanCalculator.data}
            isUploaded={isUploaded.isLoanCalculated}
          />

          <Employment
            onComplete={(data) =>
              handleStepCompletion("employmentInfo", true, data)
            }
            disabled={!steps.loanCalculator.completed}
            prefillData={steps.employmentInfo.data}
            isUploaded={isUploaded.isEmploymentDetailsSaved}
          />

          <BankStatement
            onComplete={(data) =>
              handleStepCompletion("bankStatement", true, data)
            }
            disabled={!steps.employmentInfo.completed}
            prefillData={steps.bankStatement.data}
            isUploaded={isUploaded.isBankStatementFetched}
          />

          <DocumentationStep
            onComplete={(data) =>
              handleStepCompletion("fetchDocument", true, data)
            }
            disabled={!steps.bankStatement.completed}
            prefillData={steps.fetchDocument.data}
            isUploaded={isUploaded.isDocumentUploaded}
          />

          <DisbursalBankDetails
            onComplete={(data) =>
              handleStepCompletion("disbursalBankDetail", true, data)
            }
            disabled={!steps.fetchDocument.completed}
            prefillData={steps.disbursalBankDetail.data}
            isUploaded={isUploaded.isDisbursalDetailsSaved}
          />
        </Box>
      </Box>
    </>
  );
};

export default LoanApplication;

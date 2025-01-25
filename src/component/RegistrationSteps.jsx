import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Typography, LinearProgress } from "@mui/material";
import Dashboard from "./Dashboard";
import MobileVerification from "./registration/MobileVerification";
import PANValidation from "./registration/PanValidation";
import PersonalInfo from "./registration/PersonalInfo";
import AddressInfo from "./registration/AddressInfo";
import IncomeInfoForm from "./registration/IncomeInfoForm";
import SelfieVerification from "./registration/SelfieVerification";
import axios from "axios";
import { BASE_URL } from "../baseURL";
import { useSidebar } from "../context/SidebarContext";

const RegistrationSteps = () => {
  const navigate = useNavigate();
  const { sidebarOpen, sidebarExpanded } = useSidebar();

  const totalSteps = 6; // Total steps in the registration process

  const [steps, setSteps] = useState(() => {
    const savedSteps = localStorage.getItem("registrationSteps");
    return savedSteps
      ? JSON.parse(savedSteps)
      : {
          mobileVerification: { completed: false, data: null },
          panVerification: { completed: false, data: null },
          personalInfo: { completed: false, data: null },
          addressInfo: { completed: false, data: null },
          incomeDetails: { completed: false, data: null },
          selfieVerification: { completed: false, data: null },
        };
  });

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/user/getDashboardDetails`,
          {
            withCredentials: true,
          }
        );

        console.log("response das>><<<< ", response);
        if (response.data.success) {
          if (response.data.isRegistration) {
            const { registrationStatus } = response.data;

            // Map registrationStatus to step completion
            const updatedSteps = {
              mobileVerification: {
                completed: [
                  "MOBILE_VERIFIED",
                  "PAN_VERIFIED",
                  "PERSONAL_DETAILS",
                  "CURRENT_RESIDENCE",
                  "INCOME_DETAILS",
                  "UPLOAD_PROFILE",
                  "COMPLETE_DETAILS",
                ].includes(registrationStatus),
                data: null,
              },
              panVerification: {
                completed: [
                  "PAN_VERIFIED",
                  "PERSONAL_DETAILS",
                  "CURRENT_RESIDENCE",
                  "INCOME_DETAILS",
                  "UPLOAD_PROFILE",
                  "COMPLETE_DETAILS",
                ].includes(registrationStatus),
                data: null,
              },
              personalInfo: {
                completed: [
                  "PERSONAL_DETAILS",
                  "CURRENT_RESIDENCE",
                  "INCOME_DETAILS",
                  "UPLOAD_PROFILE",
                  "COMPLETE_DETAILS",
                ].includes(registrationStatus),
                data: null,
              },
              addressInfo: {
                completed: [
                  "CURRENT_RESIDENCE",
                  "INCOME_DETAILS",
                  "UPLOAD_PROFILE",
                  "COMPLETE_DETAILS",
                ].includes(registrationStatus),
                data: null,
              },
              incomeDetails: {
                completed: [
                  "INCOME_DETAILS",
                  "UPLOAD_PROFILE",
                  "COMPLETE_DETAILS",
                ].includes(registrationStatus),
                data: null,
              },
              selfieVerification: {
                completed: ["UPLOAD_PROFILE", "COMPLETE_DETAILS"].includes(
                  registrationStatus
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
        // setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  useEffect(() => {
    localStorage.setItem("registrationSteps", JSON.stringify(steps));
  }, [steps]);

  const calculateProgress = () => {
    const completedCount = Object.values(steps).filter(
      (step) => step.completed
    ).length;
    return (completedCount / totalSteps) * 100;
  };

  const handleStepCompletion = (step, data) => {
    const updatedSteps = {
      ...steps,
      [step]: { completed: true, data },
    };
    setSteps(updatedSteps);
    localStorage.setItem("registrationSteps", JSON.stringify(updatedSteps));
  };

  useEffect(() => {
    if (calculateProgress() === 100) {
      navigate("/loan-application");
    }
  }, [steps, navigate]);

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
          marginLeft: `${sidebarOpen ? (sidebarExpanded ? 240 : 70) : 0}px`,
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
            "@media (min-width: 600px)": {
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
              marginLeft: "50px",
              fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
              textAlign: "left",
              "@media (min-width: 600px)": {
                width: "50%",
              },
            }}
          >
            Complete Your Profile Registration
          </span>
          <Box
            sx={{
              width: "100%",
              marginTop: 2,
              "@media (min-width: 600px)": { marginTop: 0 },
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
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            gap: 2,
            marginTop: { xs: 0, md: 10 },
            marginBottom: { xs: 5, md: 0 },
            width: "100%",
          }}
        >
          <MobileVerification
            onComplete={(data) =>
              handleStepCompletion("mobileVerification", data)
            }
            disabled={false}
            prefillData={steps.mobileVerification.data}
          />
          <PANValidation
            onComplete={(data) => handleStepCompletion("panVerification", data)}
            disabled={!steps.mobileVerification.completed}
            prefillData={steps.panVerification.data}
          />
          {console.log("steps", steps)}
          <PersonalInfo
            onComplete={(data) => handleStepCompletion("personalInfo", data)}
            disabled={!steps.panVerification.completed}
            prefillData={steps.personalInfo.data}
          />
          {console.log("steps", steps)}
          <AddressInfo
            onComplete={(data) => handleStepCompletion("addressInfo", data)}
            disabled={!steps.personalInfo.completed}
            prefillData={steps.addressInfo.data}
          />
          <IncomeInfoForm
            onComplete={(data) => handleStepCompletion("incomeDetails", data)}
            disabled={!steps.addressInfo.completed}
            prefillData={steps.incomeDetails.data}
          />
          <SelfieVerification
            onComplete={(data) =>
              handleStepCompletion("selfieVerification", data)
            }
            disabled={!steps.incomeDetails.completed}
            prefillData={steps.selfieVerification.data}
          />
        </Box>
      </Box>
    </>
  );
};

export default RegistrationSteps;

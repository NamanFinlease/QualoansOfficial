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

const RegistrationSteps = () => {
  const navigate = useNavigate();
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
    console.log("step", step);
    console.log("data", data);
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
              Complete Your Profile Registration
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <LinearProgress
              variant="determinate"
              value={calculateProgress()}
              sx={{
                height: 30,
                borderRadius: 5,
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "green",
                },
              }}
            />
            <Typography variant="body2" sx={{ marginTop: 1, color: "#555" }}>
              {Math.round(calculateProgress())}% Complete
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
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

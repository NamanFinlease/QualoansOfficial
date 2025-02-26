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
import UserDetails from "./registration/UserDetails";

const RegistrationSteps = () => {
  const navigate = useNavigate();
  const [isFormFilled, setIsFormFilled] = useState(false);

  const { sidebarOpen, sidebarExpanded } = useSidebar();
  const [isVerified, setIsVerified] = useState({
    isMobileVerified: false,
    isFormFilled: false,
    isPanVerified: false,
    isPersonalInfoVerified: false,
    isAddressVerified: false,
    isIncomeInfoVerified: false,
    isSelfieVerified: false,
  });
  const totalSteps = 6; // Total steps in the registration process
  // const [isUploaded, setIsUploaded] = useState(false);

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

  // Separate state for userDetails
  const [userDetails, setUserDetails] = useState(() => {
    const savedUserDetails = localStorage.getItem("userDetails");
    return savedUserDetails ? JSON.parse(savedUserDetails) : { data: {} };
  });

  useEffect(() => {
    localStorage.setItem("registrationSteps", JSON.stringify(steps));
  }, [steps]);

  useEffect(() => {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  }, [userDetails]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getDashboardDetails`, {
          withCredentials: true,
        });

        console.log("response regg >> ??", response);

        if (response.data.success) {
          setIsVerified((prevState) => ({
            ...prevState,
            isMobileVerified: response.data.isMobileVerify,
            isFormFilled: response.data.isFormFilled,
            isPanVerified: response.data.isPanVerify,
            isPersonalInfoVerified: response.data.isPersonalDetails,
            isAddressVerified: response.data.isCurrentResidence,
            isIncomeInfoVerified: response.data.isIncomeDetails,
            isSelfieVerified: response.data.selfieVerification,
          }));
          setIsFormFilled(response.data.isFormFilled || false);
        }
      } catch (error) {
        console.error("Error fetching progress status:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchProgress();
  }, [
    isVerified.isMobileVerified,
    isVerified.isFormFilled,
    isVerified.isPanVerified,
    isVerified.isPersonalInfoVerified,
    isVerified.isAddressVerified,
    isVerified.isIncomeInfoVerified,
  ]);

  useEffect(() => {
    localStorage.setItem("registrationSteps", JSON.stringify(steps));
  }, [steps]);

  const calculateProgress = () => {
    const completedCount = Object.values(steps).filter(
      (step) => step.completed
    ).length;
    return (completedCount / totalSteps) * 100;
  };

  // const handleStepCompletion = (step, data) => {
  //   const updatedSteps = {
  //     ...steps,
  //     [step]: { completed: true, data },
  //   };
  //   setSteps(updatedSteps);
  //   localStorage.setItem("registrationSteps", JSON.stringify(updatedSteps));
  // };
  const handleStepCompletion = (step, data) => {
    setSteps((prevSteps) => {
      const updatedSteps = {
        ...prevSteps,
        [step]: { completed: true, data },
      };
      localStorage.setItem("registrationSteps", JSON.stringify(updatedSteps));
      return updatedSteps;
    });
  };

  useEffect(() => {
    localStorage.setItem("registrationSteps", JSON.stringify(steps));
  }, [steps]);

  useEffect(() => {
    if (calculateProgress() === 100) {
      navigate("/loan-application");
    }
  }, [steps, navigate]);

  // useEffect(() => {
  //   if (isFormFilled) {
  //     navigate("/detailsForm");
  //   } else if (calculateProgress() === 100) {
  //     navigate("/loan-application");
  //   }
  // }, [isFormFilled, isVerified, steps, navigate]);

  console.log("isVerified", isVerified);

  return (
    <>
      <Dashboard />(
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
        {/* Registration Progress and Steps */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            padding: 2,
            width: "100%",
          }}
        >
          <span
            style={{
              fontWeight: 800,
              fontSize: "1.40rem",
              color: "#333",
              paddingLeft: "20px",
              width: "100%",
              textAlign: "left",
              fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
              marginBottom: "16px",
            }}
          >
            Complete Your Profile Registration
          </span>
          <Box
            sx={{
              width: "80%",
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

        {/* Registration Steps */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            gap: 2,
            marginTop: { xs: 0, md: 2 },
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
            isVerified={isVerified.isMobileVerified}
          />
          {!isFormFilled && (
            <UserDetails
              onComplete={setUserDetails}
              disabled={!isVerified.isMobileVerified}
              isVerified={isVerified.isPanVerified}
              isMobileVerified={isVerified.isMobileVerified}
            />
          )}
          {/* <PANValidation
            onComplete={(data) => handleStepCompletion("panVerification", data)}
            disabled={
              !isVerified.isFormFilled || !steps.isMobileVerified?.completed
            }
            prefillData={steps.panVerification.data}
            isVerified={isVerified.isPanVerified}
          /> */}

          <PANValidation
            onComplete={(data) => handleStepCompletion("panVerification", data)}
            disabled={
              !steps.mobileVerification.completed && !isVerified.isFormFilled
            }
            prefillData={steps.panVerification.data}
            isVerified={isVerified.isPanVerified}
          />
          <PersonalInfo
            onComplete={(data) => handleStepCompletion("personalInfo", data)}
            disabled={!steps.panVerification.completed}
            prefillData={steps.personalInfo.data}
            isVerified={isVerified.isPersonalInfoVerified}
          />
          <AddressInfo
            onComplete={(data) => handleStepCompletion("addressInfo", data)}
            disabled={!steps.personalInfo.completed}
            prefillData={steps.addressInfo.data}
            isVerified={isVerified.isAddressVerified}
          />
          <IncomeInfoForm
            onComplete={(data) => handleStepCompletion("incomeDetails", data)}
            disabled={!steps.addressInfo.completed}
            prefillData={steps.incomeDetails.data}
            isVerified={isVerified.isIncomeInfoVerified}
          />
          <SelfieVerification
            onComplete={(data) =>
              handleStepCompletion("selfieVerification", data)
            }
            disabled={!steps.incomeDetails.completed}
            prefillData={steps.selfieVerification.data}
            isVerified={isVerified.isSelfieVerified}
          />
        </Box>
      </Box>
      )
    </>
  );
};

export default RegistrationSteps;

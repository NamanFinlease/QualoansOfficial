import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Typography, LinearProgress } from "@mui/material";
import Dashboard from "../Dashboard";
import PANValidation from "./PanValidation";
import PersonalInfo from "./PersonalInfo";
import AddressInfo from "./AddressInfo";
import IncomeInfoForm from "./IncomeInfoForm";
import SelfieVerification from "./SelfieVerification";
import axios from "axios";
import { BASE_URL } from "../../baseURL";
import { useSidebar } from "../../context/SidebarContext";
import AadhaarVerification from "./AadhaarVerification";

const RegistrationSteps = () => {
  const navigate = useNavigate();
  const { sidebarOpen, sidebarExpanded } = useSidebar();
  const [profileData, setProfileData] = useState(null);
  const [isVerified, setIsVerified] = useState({
    // isMobileVerified: false,
    isPanVerified: false,
    isAaddharVerified: false,
    isPersonalInfoVerified: false,
    isAddressVerified: false,
    isIncomeInfoVerified: false,
    isSelfieVerified: false,
  });

  const totalSteps = 6; // Total steps in the registration process

  const [steps, setSteps] = useState({
    // mobileVerification: { completed: false, data: null },
    panVerification: { completed: false, data: null },
    aadhaarVerification: { completed: false, data: null },
    personalInfo: { completed: false, data: null },
    addressInfo: { completed: false, data: null },
    incomeDetails: { completed: false, data: null },
    selfieVerification: { completed: false, data: null },
  });

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getDashboardDetails`, {
          withCredentials: true,
        });

        if (response.data.success) {
          setIsVerified((prevState) => ({
            ...prevState,
            // isMobileVerified: response.data.isMobileVerify,
            isPanVerified: response.data.isPanVerify,
            isAaddharVerified: response.data.isAadharVerify,
            isPersonalInfoVerified: response.data.isPersonalDetails,
            isAddressVerified: response.data.isCurrentResidence,
            isIncomeInfoVerified: response.data.isIncomeDetails,
            isSelfieVerified: response.data.selfieVerification,
          }));

          // Update steps based on the fetched data
          setSteps((prevSteps) => ({
            ...prevSteps,
            // mobileVerification: {
            //   completed: response.data.isMobileVerify,
            //   data: null,
            // },
            panVerification: {
              completed: response.data.isPanVerify,
              data: null,
            },
            aadhaarVerification: {
              completed: response.data.isAadharVerify,
              data: null,
            },
            personalInfo: {
              completed: response.data.isPersonalDetails,
              data: null,
            },
            addressInfo: {
              completed: response.data.isCurrentResidence,
              data: null,
            },
            incomeDetails: {
              completed: response.data.isIncomeDetails,
              data: null,
            },
            selfieVerification: {
              completed: response.data.selfieVerification,
              data: null,
            },
          }));
        }
      } catch (error) {
        console.error("Error fetching progress status:", error);
      }
    };

    fetchProgress();
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getProfileDetails`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setProfileData(response.data);
        }
      } catch (error) {
        console.error("Error fetching progress status:", error);
      }
    };

    fetchProfileData();
  }, []);

  const calculateProgress = () => {
    const completedCount = Object.values(steps).filter(
      (step) => step.completed
    ).length;
    return (completedCount / totalSteps) * 100;
  };

  // const handleStepCompletion = (step, data) => {
  //   setSteps((prevSteps) => ({
  //     ...prevSteps,
  //     [step]: { completed: true, data },
  //   }));

  //   if (step === "panVerification") {
  //     setIsVerified((prevState) => ({
  //       ...prevState,
  //       isPanVerified: true,
  //     }));
  //   }
  // };
  const handleStepCompletion = (step, data) => {
    setSteps((prevSteps) => ({
      ...prevSteps,
      [step]: { completed: true, data },
    }));

    // if (step === "aadhaarVerification") {
    //   setIsVerified((prevState) => ({
    //     ...prevState,
    //     isAaddharVerified: true,
    //   }));
    // }
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
                  backgroundColor: "#2E86C1",
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
          <PANValidation
            onComplete={(data) => handleStepCompletion("panVerification", data)}
            disabled={false}
            prefillData={steps.panVerification.data}
            isVerified={isVerified.isPanVerified}
            profileData={profileData}
          />
          {console.log(steps.panVerification.data)}

          {/* <AadhaarVerification
            onComplete={(data) =>
              handleStepCompletion("mobileVerification", data)
            }
            disabled={!steps.panVerification.completed}
            prefillData={steps.mobileVerification.data}
            isVerified={isVerified.isMobileVerified}
            profileData={profileData}
          /> */}

          <AadhaarVerification
            onComplete={(data) =>
              handleStepCompletion("aadharVerification", data)
            }
            disabled={!steps.panVerification.completed}
            prefillData={steps.aadhaarVerification.data}
            isVerified={isVerified.isAaddharVerified}
            profileData={profileData}
          />
          {console.log(isVerified.isAaddharVerified)}

          <PersonalInfo
            onComplete={(data) => handleStepCompletion("personalInfo", data)}
            disabled={!steps.aadhaarVerification.completed}
            prefillData={steps.personalInfo.data}
            isVerified={isVerified.isPersonalInfoVerified}
            // profileData={profileData}
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
    </>
  );
};

export default RegistrationSteps;

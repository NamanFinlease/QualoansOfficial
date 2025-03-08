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
  
  const [isVerified, setIsVerified] = useState({
    isMobileVerified: false,
    isPanVerified: false,
    isPersonalInfoVerified: false,
    isAddressVerified: false,
    isIncomeInfoVerified: false,
    isSelfieVerified: false,
  });

  const totalSteps = 6; // Total steps in the registration process

  const [steps, setSteps] = useState({
    mobileVerification: { completed: false, data: null },
    panVerification: { completed: false, data: null },
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
            isMobileVerified: response.data.isMobileVerify,
            isPanVerified: response.data.isPanVerify,
            isPersonalInfoVerified: response.data.isPersonalDetails,
            isAddressVerified: response.data.isCurrentResidence,
            isIncomeInfoVerified: response.data.isIncomeDetails,
            isSelfieVerified: response.data.selfieVerification,
          }));

          // Update steps based on the fetched data
          setSteps((prevSteps) => ({
            ...prevSteps,
            mobileVerification: { completed: response.data.isMobileVerify, data: null },
            panVerification: { completed: response.data.isPanVerify, data: null },
            personalInfo: { completed: response.data.isPersonalDetails, data: null },
            addressInfo: { completed: response.data.isCurrentResidence, data: null },
            incomeDetails: { completed: response.data.isIncomeDetails, data: null },
            selfieVerification: { completed: response.data.selfieVerification, data: null },
          }));
        }
      } catch (error) {
        console.error("Error fetching progress status:", error);
      }
    };

    fetchProgress();
  }, []);

  const calculateProgress = () => {
    const completedCount = Object.values(steps).filter(
      (step) => step.completed
    ).length;
    return (completedCount / totalSteps) * 100;
  };

  const handleStepCompletion = (step, data) => {
    setSteps((prevSteps) => ({
      ...prevSteps,
      [step]: { completed: true, data },
    }));

    if (step === "mobileVerification") {
      setIsVerified((prevState) => ({
        ...prevState,
        isMobileVerified: true,
      }));
    }
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
            onComplete={(data) => handleStepCompletion("mobileVerification", data)}
            disabled={false}
            prefillData={steps.mobileVerification.data}
            isVerified={isVerified.isMobileVerified}
          />
          <PANValidation
            onComplete={(data) => handleStepCompletion("panVerification", data)}
            disabled={!isVerified.isMobileVerified}
            prefillData={steps.panVerification.data}
            isVerified={isVerified.isPanVerified}
          />
          {console.log(steps.panVerification.data)}
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
            onComplete={(data) => handleStepCompletion("selfieVerification", data)}
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


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Grid, Box, Typography, LinearProgress } from "@mui/material";
// import Dashboard from "./Dashboard";
// import MobileVerification from "./registration/MobileVerification";
// import PANValidation from "./registration/PanValidation";
// import PersonalInfo from "./registration/PersonalInfo";
// import AddressInfo from "./registration/AddressInfo";
// import IncomeInfoForm from "./registration/IncomeInfoForm";
// import SelfieVerification from "./registration/SelfieVerification";
// import axios from "axios";
// import { BASE_URL } from "../baseURL";
// import { useSidebar } from "../context/SidebarContext";

// const RegistrationSteps = () => {
//   const navigate = useNavigate();

//   const { sidebarOpen, sidebarExpanded } = useSidebar();
//   const [isVerified, setIsVerified] = useState({
//     isMobileVerified: false,
//     isPanVerified: false,
//     isPersonalInfoVerified: false,
//     isAddressVerified: false,
//     isIncomeInfoVerified: false,
//     isSelfieVerified: false,
//   });
//   const totalSteps = 6; // Total steps in the registration process

//   const [steps, setSteps] = useState(() => {
//     const savedSteps = localStorage.getItem("registrationSteps");
//     return savedSteps
//       ? JSON.parse(savedSteps)
//       : {
//           mobileVerification: { completed: false, data: null },
//           panVerification: { completed: false, data: null },
//           personalInfo: { completed: false, data: null },
//           addressInfo: { completed: false, data: null },
//           incomeDetails: { completed: false, data: null },
//           selfieVerification: { completed: false, data: null },
//         };
//   });

//   useEffect(() => {
//     localStorage.setItem("registrationSteps", JSON.stringify(steps));
//   }, [steps]);

//   useEffect(() => {
//     const fetchProgress = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/getDashboardDetails`, {
//           withCredentials: true,
//         });

//         console.log("response regg >> ??", response);

//         if (response.data.success) {
//           setIsVerified((prevState) => ({
//             ...prevState,
//             isMobileVerified: response.data.isMobileVerify,
//             isFormFilled: response.data.isFormFilled,
//             isPanVerified: response.data.isPanVerify,
//             isPersonalInfoVerified: response.data.isPersonalDetails,
//             isAddressVerified: response.data.isCurrentResidence,
//             isIncomeInfoVerified: response.data.isIncomeDetails,
//             isSelfieVerified: response.data.selfieVerification,
//           }));
//         }
//       } catch (error) {
//         console.error("Error fetching progress status:", error);
//       } finally {
//         // setLoading(false);
//       }
//     };

//     fetchProgress();
//   }, [
//     isVerified.isMobileVerified,
//     isVerified.isPanVerified,
//     isVerified.isPersonalInfoVerified,
//     isVerified.isAddressVerified,
//     isVerified.isIncomeInfoVerified,
//   ]);

//   useEffect(() => {
//     localStorage.setItem("registrationSteps", JSON.stringify(steps));
//   }, [steps]);

//   const calculateProgress = () => {
//     const completedCount = Object.values(steps).filter(
//       (step) => step.completed
//     ).length;
//     return (completedCount / totalSteps) * 100;
//   };

//   const handleStepCompletion = (step, data) => {
//     setSteps((prevSteps) => {
//       const updatedSteps = {
//         ...prevSteps,
//         [step]: { completed: true, data },
//       };
//       localStorage.setItem("registrationSteps", JSON.stringify(updatedSteps));
//       return updatedSteps;
//     });
//     if (step === "mobileVerification") {
//       setIsVerified((prevState) => ({
//         ...prevState,
//         isMobileVerified: true, // Set mobile verified to true
//       }));
//     }
//   };

//   useEffect(() => {
//     localStorage.setItem("registrationSteps", JSON.stringify(steps));
//   }, [steps]);

//   useEffect(() => {
//     if (calculateProgress() === 100) {
//       navigate("/loan-application");
//     }
//   }, [steps, navigate]);

//   console.log("isVerified", isVerified);

//   return (
//     <>
//       <Dashboard />(
//       <Box
//         sx={{
//           paddingX: 6,
//           margin: "auto",
//           textAlign: "center",
//           marginTop: "80px",
//           maxWidth: "100%",
//           width: `calc(100% - ${
//             sidebarOpen ? (sidebarExpanded ? 240 : 70) : 0
//           }px)`,
//           marginLeft: `${sidebarOpen ? (sidebarExpanded ? 240 : 70) : 0}px`,
//           transition: "width 0.3s ease, margin-left 0.3s ease",
//         }}
//       >
//         {/* Registration Progress and Steps */}
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", md: "row" },
//             alignItems: "center",
//             padding: 2,
//             width: "100%",
//           }}
//         >
//           <span
//             style={{
//               fontWeight: 800,
//               fontSize: "1.40rem",
//               color: "#333",
//               paddingLeft: "20px",
//               width: "100%",
//               textAlign: "left",
//               fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
//               marginBottom: "16px",
//             }}
//           >
//             Complete Your Profile Registration
//           </span>
//           <Box
//             sx={{
//               width: "80%",
//             }}
//           >
//             <LinearProgress
//               variant="determinate"
//               value={calculateProgress()}
//               sx={{
//                 height: 30,
//                 borderRadius: 5,
//                 "& .MuiLinearProgress-bar": {
//                   backgroundColor: "#4caf50",
//                 },
//               }}
//             />
//             <Typography variant="body2" sx={{ marginTop: 1, color: "#666" }}>
//               {Math.round(calculateProgress())}% Complete
//             </Typography>
//           </Box>
//         </Box>

//         {/* Registration Steps */}
//         <Box
//           sx={{
//             display: "flex",
//             flexWrap: "wrap",
//             justifyContent: "space-around",
//             gap: 2,
//             marginTop: { xs: 0, md: 2 },
//             marginBottom: { xs: 5, md: 0 },
//             width: "100%",
//           }}
//         >
//           <MobileVerification
//             onComplete={(data) =>handleStepCompletion("mobileVerification", data)}
//             disabled={false}
//             prefillData={steps.mobileVerification.data}
//             isVerified={isVerified.isMobileVerified}
//           />
//           <PANValidation
//             onComplete={(data) => handleStepCompletion("panVerification", data)}
//             disabled={!isVerified.isMobileVerified}
//             prefillData={steps.panVerification.data}
//             isVerified={isVerified.isPanVerified}
//           />
//           <PersonalInfo
//             onComplete={(data) => handleStepCompletion("personalInfo", data)}
//             disabled={!steps.panVerification.completed}
//             prefillData={steps.personalInfo.data}
//             isVerified={isVerified.isPersonalInfoVerified}
//           />
//           <AddressInfo
//             onComplete={(data) => handleStepCompletion("addressInfo", data)}
//             disabled={!steps.personalInfo.completed}
//             prefillData={steps.addressInfo.data}
//             isVerified={isVerified.isAddressVerified}
//           />
//           <IncomeInfoForm
//             onComplete={(data) => handleStepCompletion("incomeDetails", data)}
//             disabled={!steps.addressInfo.completed}
//             prefillData={steps.incomeDetails.data}
//             isVerified={isVerified.isIncomeInfoVerified}
//           />
//           <SelfieVerification
//             onComplete={(data) =>
//               handleStepCompletion("selfieVerification", data)
//             }
//             disabled={!steps.incomeDetails.completed}
//             prefillData={steps.selfieVerification.data}
//             isVerified={isVerified.isSelfieVerified}
//           />
//         </Box>
//       </Box>
//       )
//     </>
//   );
// };

// export default RegistrationSteps;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Grid, Box, Typography, LinearProgress } from "@mui/material";
// import Dashboard from "./Dashboard";
// import MobileVerification from "./registration/MobileVerification";
// import PANValidation from "./registration/PanValidation";
// import PersonalInfo from "./registration/PersonalInfo";
// import AddressInfo from "./registration/AddressInfo";
// import IncomeInfoForm from "./registration/IncomeInfoForm";
// import SelfieVerification from "./registration/SelfieVerification";
// import axios from "axios";
// import { BASE_URL } from "../baseURL";
// import { useSidebar } from "../context/SidebarContext";

// const RegistrationSteps = () => {
//   const navigate = useNavigate();
//   const { sidebarOpen, sidebarExpanded } = useSidebar();
//   const [isVerified, setIsVerified] = useState({
//     isMobileVerified: false,
//     isPanVerified: false,
//     isPersonalInfoVerified: false,
//     isAddressVerified: false,
//     isIncomeInfoVerified: false,
//     isSelfieVerified: false,
//   });
//   const totalSteps = 6; // Total steps in the registration process
//   // const [isUploaded, setIsUploaded] = useState(false);

//   const [steps, setSteps] = useState(() => {
//     const savedSteps = localStorage.getItem("registrationSteps");
//     console.log(savedSteps)
//     return savedSteps
//       ? JSON.parse(savedSteps)
//       : {
//           mobileVerification: { completed: false, data: null },
//           panVerification: { completed: false, data: null },
//           personalInfo: { completed: false, data: null },
//           addressInfo: { completed: false, data: null },
//           incomeDetails: { completed: false, data: null },
//           selfieVerification: { completed: false, data: null },
//         };
//   });

//   useEffect(() => {
//     const fetchProgress = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/getDashboardDetails`, {
//           withCredentials: true,
//         });

//         console.log("response regg >> ??", response);

//         if (response.data.success) {
//           // if (response.data.isRegistration) {
//           //   const { registrationStatus, isMobileVerify } = response.data;
//           //   // setIsVerified({ isMobileVerified: isMobileVerify });
//           //   // Map registrationStatus to step completion
//           //   const updatedSteps = {
//           //     mobileVerification: {
//           //       completed: [
//           //         "MOBILE_VERIFIED",
//           //         "PAN_VERIFIED",
//           //         "PERSONAL_DETAILS",
//           //         "CURRENT_RESIDENCE",
//           //         "INCOME_DETAILS",
//           //         "UPLOAD_PROFILE",
//           //         "COMPLETE_DETAILS",
//           //       ].includes(registrationStatus),
//           //       data: null,
//           //     },
//           //     panVerification: {
//           //       completed: [
//           //         "PAN_VERIFIED",
//           //         "PERSONAL_DETAILS",
//           //         "CURRENT_RESIDENCE",
//           //         "INCOME_DETAILS",
//           //         "UPLOAD_PROFILE",
//           //         "COMPLETE_DETAILS",
//           //       ].includes(registrationStatus),
//           //       data: null,
//           //     },
//           //     personalInfo: {
//           //       completed: [
//           //         "PERSONAL_DETAILS",
//           //         "CURRENT_RESIDENCE",
//           //         "INCOME_DETAILS",
//           //         "UPLOAD_PROFILE",
//           //         "COMPLETE_DETAILS",
//           //       ].includes(registrationStatus),
//           //       data: null,
//           //     },
//           //     addressInfo: {
//           //       completed: [
//           //         "CURRENT_RESIDENCE",
//           //         "INCOME_DETAILS",
//           //         "UPLOAD_PROFILE",
//           //         "COMPLETE_DETAILS",
//           //       ].includes(registrationStatus),
//           //       data: null,
//           //     },
//           //     incomeDetails: {
//           //       completed: [
//           //         "INCOME_DETAILS",
//           //         "UPLOAD_PROFILE",
//           //         "COMPLETE_DETAILS",
//           //       ].includes(registrationStatus),
//           //       data: null,
//           //     },
//           //     selfieVerification: {
//           //       completed: ["UPLOAD_PROFILE", "COMPLETE_DETAILS"].includes(
//           //         registrationStatus
//           //       ),
//           //       data: null,
//           //     },
//           //   };

//           //   setSteps(updatedSteps);
//           // }

//           // setIsVerified(
//           //   (prevState = {
//           //     ...prevState,
//           //     isMobileVerified: response.data.isMobileVerify,
//           //     isPanVerified: response.data.isPanVerify,
//           //     isPersonalInfoVerified: response.data.isPersonalDetails,
//           //     isAddressVerified: response.data.isCurrentResidence,
//           //     isIncomeInfoVerified: response.data.isIncomeDetails,
//           //   })
//           // );

//           setIsVerified((prevState) => ({
//             ...prevState,
//             isMobileVerified: response.data.isMobileVerify,
//             isPanVerified: response.data.isPanVerify,
//             isPersonalInfoVerified: response.data.isPersonalDetails,
//             isAddressVerified: response.data.isCurrentResidence,
//             isIncomeInfoVerified: response.data.isIncomeDetails,
//           }));
//         }
//       } catch (error) {
//         console.error("Error fetching progress status:", error);
//       } finally {
//         // setLoading(false);
//       }
//     };

//     fetchProgress();
//   }, [
//     isVerified.isMobileVerified,
//     isVerified.isPanVerified,
//     isVerified.isPersonalInfoVerified,
//     isVerified.isAddressVerified,
//     isVerified.isIncomeInfoVerified,
//   ]);

//   useEffect(() => {
//     localStorage.setItem("registrationSteps", JSON.stringify(steps));
//   }, [steps]);

//   const calculateProgress = () => {
//     const completedCount = Object.values(steps).filter(
//       (step) => step.completed
//     ).length;
//     return (completedCount / totalSteps) * 100;
//   };

//   const handleStepCompletion = (step, data) => {
//     const updatedSteps = {
//       ...steps,
//       [step]: { completed: true, data },
//     };
//     setSteps(updatedSteps);
//     localStorage.setItem("registrationSteps", JSON.stringify(updatedSteps));
//   };

//   useEffect(() => {
//     if (calculateProgress() === 100) {
//       navigate("/loan-application");
//     }
//   }, [steps, navigate]);

//   console.log("isVerified", isVerified);

//   return (
//     <>
//       <Dashboard />
//       <Box
//         sx={{
//           paddingX: 6,
//           margin: "auto",
//           textAlign: "center",
//           marginTop: "80px",
//           maxWidth: "100%",
//           width: `calc(100% - ${
//             sidebarOpen ? (sidebarExpanded ? 240 : 70) : 0
//           }px)`,
//           marginLeft: `${sidebarOpen ? (sidebarExpanded ? 240 : 70) : 0}px`,
//           transition: "width 0.3s ease, margin-left 0.3s ease",
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", md: "row" }, // Column layout by default (for mobile)
//             alignItems: "center",
//             padding: 2,
//             width: "100%",
//             "@media (minWidth: 600px)": {
//               flexDirection: "row", // Row layout for larger screens
//               justifyContent: "space-between", // Spread out the elements
//             },
//           }}
//         >
//           <span
//             style={{
//               fontWeight: 800,
//               fontSize: "1.40rem",
//               color: "#333",
//               paddingLeft: "20px",
//               width: "100%",
//               textAlign: "left",
//               fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
//               marginBottom: "16px", // Add margin to separate text from progress bar in column layout
//               "@media (minWidth: 600px)": {
//                 width: "60%", // Text takes 60% of the width on larger screens
//                 marginBottom: "0", // Remove margin on larger screens
//               },
//             }}
//           >
//             Complete Your Profile Registration
//           </span>
//           <Box
//             sx={{
//               width: "80%",
//               "@media (minWidth: 600px)": {
//                 width: "40%", // Progress bar takes 40% width on larger screens
//                 marginTop: 0, // No top margin on larger screens
//               },
//             }}
//           >
//             <LinearProgress
//               variant="determinate"
//               value={calculateProgress()}
//               sx={{
//                 height: 30,
//                 borderRadius: 5,
//                 "& .MuiLinearProgress-bar": {
//                   backgroundColor: "#4caf50",
//                 },
//               }}
//             />
//             <Typography variant="body2" sx={{ marginTop: 1, color: "#666" }}>
//               {Math.round(calculateProgress())}% Complete
//             </Typography>
//           </Box>
//         </Box>

//         <Box
//           sx={{
//             display: "flex",
//             flexWrap: "wrap",
//             justifyContent: "space-around",
//             gap: 2,
//             marginTop: { xs: 0, md: 2 },
//             marginBottom: { xs: 5, md: 0 },
//             width: "100%",
//           }}
//         >
//           <MobileVerification
//             onComplete={(data) =>
//               handleStepCompletion("mobileVerification", data)
//             }
//             disabled={false}
//             prefillData={steps.mobileVerification.data}
//             isVerified={isVerified.isMobileVerified}
//           />
//           <PANValidation
//             onComplete={(data) => handleStepCompletion("panVerification", data)}
//             disabled={!steps.mobileVerification.completed}
//             prefillData={steps.panVerification.data}
//             isVerified={isVerified.isPanVerified}
//           />
//           <PersonalInfo
//             onComplete={(data) => handleStepCompletion("personalInfo", data)}
//             disabled={!steps.panVerification.completed}
//             prefillData={steps.personalInfo.data}
//             isVerified={isVerified.isPersonalInfoVerified}
//           />
//           <AddressInfo
//             onComplete={(data) => handleStepCompletion("addressInfo", data)}
//             disabled={!steps.personalInfo.completed}
//             prefillData={steps.addressInfo.data}
//             isVerified={isVerified.isAddressVerified}
//           />
//           <IncomeInfoForm
//             onComplete={(data) => handleStepCompletion("incomeDetails", data)}
//             disabled={!steps.addressInfo.completed}
//             prefillData={steps.incomeDetails.data}
//             isVerified={isVerified.isIncomeInfoVerified}
//           />
//           <SelfieVerification
//             onComplete={(data) =>
//               handleStepCompletion("selfieVerification", data)
//             }
//             disabled={!steps.incomeDetails.completed}
//             prefillData={steps.selfieVerification.data}
//             isVerified={isVerified.isSelfieVerified}
//           />
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default RegistrationSteps;

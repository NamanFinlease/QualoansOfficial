import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/PhoneIphone";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Swal from "sweetalert2";
import { BASE_URL } from "../../baseURL";

const InputField = ({ label, value, onChange, placeholder }) => (
  <TextField
    fullWidth
    variant="outlined"
    label={label}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    sx={{
      input: { color: "black" },
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "black" },
        "&:hover fieldset": { borderColor: "#ffcc00" },
      },
    }}
  />
);

const MobileVerification = ({
  onComplete,
  disabled,
  prefillData,
  isVerified,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState("mobile");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [formValues, setFormValues] = useState({
    fathersName: "",
    pan: "",
  });

  const sendOTP = async (mobileNumber, fathersName, pan) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${BASE_URL}/mobile/get-otp/${mobileNumber}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ fathersName, PAN: pan }), // Pass father's name and PAN
        }
      );
      const data = await response.json();
      if (data.success) {
        setCurrentStep("otp");
      } else {
        throw new Error("Failed to send OTP.");
      }
    } catch (error) {
      alert("Error", error.message, "error");
      console.error("Error sending OTP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (mobileNumber, otpCode) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/mobile/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: mobileNumber, otp: otpCode }),
      });
      const data = await response.json();
      if (data.success) {
        Swal.fire(
          "Verified",
          "Mobile number verified successfully!",
          "success"
        );
        setIsOtpVerified(true);
        onComplete({ mobile: mobileNumber, verified: true });
        setOpenDialog(false);
      } else {
        throw new Error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      alert("Invalid OTP. Please Enter Valid OTP", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = () => {
    setOtp("");
    if (mobile) {
      sendOTP(mobile, formValues.fathersName, formValues.pan);
    } else {
      Swal.fire(
        "Error",
        "Please enter a mobile number to resend OTP.",
        "warning"
      );
    }
  };

  const handleModalClick = async () => {
    setOpenDialog(true);
    setIsLoading(true);
    // Fetch dashboard details and set mobile number if available
    // ... (existing code)
  };

  const StepBox = ({
    icon,
    title,
    description,
    onClick,
    disabled,
    completed,
  }) => (
    <Box
      onClick={!disabled ? onClick : null}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 2,
        borderColor: disabled ? "#1c1c1c" : "#F26722",
        borderRadius: 3,
        margin: 1,
        width: "25%",
        minWidth: 200,
        cursor: disabled ? "not-allowed" : "pointer",
        textAlign: "left",
        background: disabled ? "#d9d9d9" : "#F26722",
        color: !disabled ? "white" : "#1c1c1c",
        "@media (max-width: 600px)": {
          width: "80%",
          margin: "auto",
        },
      }}
    >
      <IconButton
        sx={{
          color: disabled ? "grey" : "white",
          ml: 1,
        }}
      >
        {completed || isVerified ? (
          <CheckCircleIcon sx={{ color: "green" }} />
        ) : (
          icon
        )}
      </IconButton>
      <Box sx={{ ml: 2, flexGrow: 1 }}>
        <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
        <Typography variant="body2">{description}</Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <StepBox
        icon={<PhoneIcon />}
        title="Mobile Verification"
        description="Verify your mobile number"
        onClick={handleModalClick}
        disabled={disabled}
        completed={isOtpVerified}
      />

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: {
            padding: 3,
            borderRadius: 3,
            background: "white",
            boxShadow: 3,
          },
        }}
      >
        <DialogTitle sx={{ color: "#1c1c1c", textAlign: "left" }}>
          <Typography variant="h6">Enter Mobile Number and Details</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: "#1c1c1c", margin: 2 }}>
            Enter Your Father's Name
          </Typography>
          <InputField
            label="Father's Name"
            name="fathersName"
            value={formValues.fathersName}
            onChange={(e) => {
              setFormValues((prev) => ({
                ...prev,
                fathersName: e.target.value.trim(),
              }));
            }}
            placeholder="Enter your father's name"
            required
          />

          <Typography variant="body2" sx={{ color: "#1c1c1c", margin: 2 }}>
            Enter Your PAN
          </Typography>
          <InputField
            label="PAN"
            name="pan"
            value={formValues.pan}
            onChange={(e) => {
              const panValue = e.target.value.toUpperCase();
              setFormValues((prev) => ({
                ...prev,
                pan: panValue,
              }));
            }}
            placeholder="Enter your PAN"
            error={
              formValues.pan !== "" &&
              !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formValues.pan)
            }
            helperText={
              formValues.pan !== "" &&
              !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formValues.pan)
                ? "Invalid PAN format (e.g., ABCDE1234F)"
                : ""
            }
          />

          <Typography variant="body2" sx={{ color: "#1c1c1c", margin: 2 }}>
            {currentStep === "mobile"
              ? "Please enter your mobile number to receive an OTP."
              : "Please enter the OTP sent to your mobile number."}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <InputField
              label={currentStep === "mobile" ? "Mobile Number" : "OTP"}
              value={currentStep === "mobile" ? mobile : otp}
              onChange={(e) =>
                currentStep === "mobile"
                  ? setMobile(e.target.value.trim())
                  : setOtp(e.target.value.trim())
              }
              disabled={isLoading || isOtpVerified}
              placeholder={
                currentStep === "mobile"
                  ? "Enter your mobile number"
                  : "Enter OTP"
              }
              sx={{ flexGrow: 1 }} // Allow the input to grow
            />
            {currentStep === "mobile" && (
              <Button
                variant="contained"
                onClick={() => {
                  const mobileRegex = /^[6-9]\d{9}$/;
                  if (mobileRegex.test(mobile)) {
                    sendOTP(mobile, formValues.fathersName, formValues.pan); // Pass father's name and PAN
                  } else {
                    alert(
                      "Invalid Input",
                      "Enter a valid 10-digit number.",
                      "warning"
                    );
                  }
                }}
                sx={{
                  marginLeft: 1,
                  backgroundColor: "#F26722",
                  color: "white",
                }}
              >
                Send OTP
              </Button>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <>
            {currentStep === "otp" && !isOtpVerified && (
              <Button
                variant="outlined"
                onClick={resendOTP}
                sx={{ color: "#1c1c1c", borderColor: "#1c1c1c" }}
              >
                Resend OTP
              </Button>
            )}
            {currentStep === "otp" && (
              <Button
                variant="contained"
                onClick={() => {
                  if (otp.length === 6) {
                    verifyOTP(mobile, otp);
                  } else {
                    alert(
                      "Invalid Input",
                      "Enter a valid 6-digit OTP.",
                      "warning"
                    );
                  }
                }}
                sx={{ backgroundColor: "#F26722", color: "white" }}
              >
                Verify OTP
              </Button>
            )}
          </>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MobileVerification;

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   TextField,
//   Typography,
// } from "@mui/material";
// import PhoneIcon from "@mui/icons-material/PhoneIphone";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../baseURL";
// import axios from "axios";
// const InputField = ({ label, value, onChange, placeholder }) => (
//   <TextField
//     fullWidth
//     variant="outlined"
//     label={label}
//     value={value}
//     onChange={onChange}
//     placeholder={placeholder}
//     sx={{
//       input: { color: "black" },
//       "& .MuiOutlinedInput-root": {
//         "& fieldset": { borderColor: "black" },
//         "&:hover fieldset": { borderColor: "#ffcc00" },
//       },
//     }}
//   />
// );

// const MobileVerification = ({
//   onComplete,
//   disabled,
//   prefillData,
//   isVerified,
// }) => {
//   const [openDialog, setOpenDialog] = useState(false);
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentStep, setCurrentStep] = useState("mobile");
//   const [isOtpVerified, setIsOtpVerified] = useState(false);
//   const [isMobileVerified, setIsMobileVerified] = useState(false);
//   // const [formValues, setFormValues] = useState({
//   //   mobile: null,
//   // });
//   // useEffect(() => {
//   //   if (prefillData && prefillData.mobile && prefillData.verified) {
//   //     setMobile(prefillData.mobile);
//   //     setIsOtpVerified(true);
//   //   }
//   // }, [prefillData]);

//   // useEffect(async () => {
//   //   // const fetchProfileDetails = async () => {
//   //   // try {
//   //   if (isVerified) {
//   //     const response = await axios.get(
//   //       `${BASE_URL}/getProfileDetails`,
//   //       { withCredentials: true }
//   //     );
//   //     console.log("mobbbb sdfsdfsd>>><<<<<", response.data.documents);
//   //     // setFormValues({ mobile });
//   //   }
//   //   // } catch (error) {
//   //   //   console.error("Error fetching profile details:", error);
//   //   // }
//   //   // };
//   //   // fetchProfileDetails();
//   // }, []);

//   const sendOTP = async (mobileNumber) => {
//     try {
//       setIsLoading(true);
//       const response = await fetch(
//         `${BASE_URL}/mobile/get-otp/${mobileNumber}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//         }
//       );
//       const data = await response.json();
//       if (data.success) {
//         setCurrentStep("otp");
//       } else {
//         throw new Error("Failed to send OTP.");
//       }
//     } catch (error) {
//       alert("Error", error.message, "error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const verifyOTP = async (mobileNumber, otpCode) => {
//     try {
//       setIsLoading(true);

//       const response = await fetch(`${BASE_URL}/mobile/verify-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ mobile: mobileNumber, otp: otpCode }),
//       });
//       const data = await response.json();
//       if (data.success) {
//         Swal.fire(
//           "Verified",
//           "Mobile number verified successfully!",
//           "success"
//         );
//         setIsOtpVerified(true);
//         onComplete({ mobile: mobileNumber, verified: true });
//         setOpenDialog(false);
//       } else {
//         throw new Error("Invalid OTP. Please try again.");
//       }
//     } catch (error) {
//       alert("Error", error.message, "error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const resendOTP = () => {
//     setOtp("");
//     if (mobile) {
//       sendOTP(mobile);
//     } else {
//       Swal.fire(
//         "Error",
//         "Please enter a mobile number to resend OTP.",
//         "warning"
//       );
//     }
//   };

//   const handleModalClick = async () => {
//     setOpenDialog(true);
//     setIsLoading(true);

//     try {
//       // Fetch dashboard details
//       const getDashboardDetailsResponse = await axios.get(
//         `${BASE_URL}/getDashboardDetails`,
//         {
//           withCredentials: true,
//         }
//       );

//       if (getDashboardDetailsResponse.status === 200) {
//         const { isMobileVerify } = getDashboardDetailsResponse.data;
//         setIsMobileVerified(isMobileVerify);

//         if (isMobileVerify) {
//           // Fetch profile details if mobile is verified
//           const getProfileDetailsResponse = await axios.get(
//             `${BASE_URL}/getProfileDetails`,
//             { withCredentials: true }
//           );

//           // Update mobile number if available in response
//           const mobileNumber = getProfileDetailsResponse?.data?.data?.mobile;
//           if (mobileNumber) {
//             setMobile(mobileNumber);
//             console.log("Mobile set: ", mobileNumber);
//           } else {
//             console.error("Mobile number is not available in profile data.");
//           }
//         } else {
//           console.log(
//             "Mobile is not verified. Skipping profile details fetch."
//           );
//         }
//       } else {
//         console.error("Failed to fetch dashboard details.");
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const StepBox = ({
//     icon,
//     title,
//     description,
//     onClick,
//     disabled,
//     completed,
//   }) => (
//     <Box
//       onClick={!disabled ? onClick : null}
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "flex-start",
//         justifyContent: "center",
//         padding: 2,
//         borderColor:
//           // completed ? "green" :
//           disabled ? "#1c1c1c" : "#F26722",
//         borderRadius: 3,
//         margin: 1,
//         width: "25%",
//         minWidth: 200,
//         cursor: disabled ? "not-allowed" : "pointer",
//         textAlign: "left",
//         background:
//           //  completed
//           //   ? "linear-gradient(45deg, #28a745, #218838)" // Green gradient when step is complete
//           //   :
//           disabled ? "#d9d9d9" : "#F26722",
//         color:
//           //  completed ||
//           !disabled ? "white" : "#1c1c1c",
//         "@media (max-width: 600px)": {
//           width: "80%",
//           margin: "auto",
//         },
//       }}
//     >
//       <IconButton
//         sx={{
//           color:
//             // completed ? "white" :
//             disabled ? "grey" : "white",
//           ml: 1,
//         }}
//       >
//         {completed || isVerified ? (
//           <CheckCircleIcon sx={{ color: "green" }} />
//         ) : (
//           icon
//         )}
//       </IconButton>
//       <Box sx={{ ml: 2, flexGrow: 1 }}>
//         <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
//         <Typography variant="body2">{description}</Typography>
//       </Box>
//     </Box>
//   );

//   return (
//     <>
//       <StepBox
//         icon={<PhoneIcon />}
//         title="Mobile Verification"
//         description="Verify your mobile number"
//         onClick={handleModalClick}
//         disabled={disabled}
//         completed={isOtpVerified}
//       />

//       <Dialog
//         open={openDialog}
//         onClose={() => setOpenDialog(false)}
//         PaperProps={{
//           sx: {
//             padding: 3,
//             borderRadius: 3,
//             background: "white",
//             boxShadow: 3,
//           },
//         }}
//       >
//         <DialogTitle sx={{ color: "#1c1c1c", textAlign: "left" }}>
//           {currentStep === "mobile"
//             ? "Enter Mobile Number"
//             : `Enter OTP for ${mobile}`}
//         </DialogTitle>
//         <DialogContent>
//           <Typography
//             variant="body2"
//             sx={{ color: "#1c1c1c", marginBottom: 2 }}
//           >
//             {currentStep === "mobile"
//               ? "Please enter your mobile number to receive an OTP."
//               : "Please enter the OTP sent to your mobile number."}
//           </Typography>
//           <InputField
//             label={currentStep === "mobile" ? "Mobile Number" : "OTP"}
//             value={currentStep === "mobile" ? mobile : otp}
//             onChange={(e) =>
//               currentStep === "mobile"
//                 ? setMobile(e.target.value.trim())
//                 : setOtp(e.target.value.trim())
//             }
//             disabled={isLoading || isOtpVerified}
//             placeholder={
//               currentStep === "mobile"
//                 ? "Enter your mobile number"
//                 : "Enter OTP"
//             }
//           />
//         </DialogContent>
//         <DialogActions>
//           {isLoading ? (
//             <CircularProgress size={24} />
//           ) : (
//             <>
//               <Button
//                 variant="contained"
//                 onClick={() => {
//                   if (currentStep === "mobile") {
//                     const mobileRegex = /^[6-9]\d{9}$/;
//                     if (mobileRegex.test(mobile)) {
//                       sendOTP(mobile);
//                     } else {
//                       alert(
//                         "Invalid Input",
//                         "Enter a valid 10-digit number.",
//                         "warning"
//                       );
//                     }
//                   } else if (currentStep === "otp") {
//                     if (otp.length === 6) {
//                       verifyOTP(mobile, otp);
//                     } else {
//                       alert(
//                         "Invalid Input",
//                         "Enter a valid 6-digit OTP.",
//                         "warning"
//                       );
//                     }
//                   }
//                 }}
//                 sx={{ backgroundColor: "#F26722", color: "white" }}
//               >
//                 {currentStep === "mobile" ? "Send OTP" : "Verify OTP"}
//               </Button>

//               {currentStep === "otp" && !isOtpVerified && (
//                 <Button
//                   variant="outlined"
//                   onClick={resendOTP}
//                   sx={{ color: "#1c1c1c", borderColor: "#1c1c1c" }}
//                 >
//                   Resend OTP
//                 </Button>
//               )}
//             </>
//           )}
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default MobileVerification;

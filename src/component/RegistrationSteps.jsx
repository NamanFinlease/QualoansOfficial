import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  Grid,
  Box,
  Typography,
  LinearProgress,
  IconButton,
  Modal,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import axios from "axios";

import { getToken } from "../../tokenManager";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PhoneIcon from "@mui/icons-material/Phone";
import { address } from "framer-motion/client";
import { BASE_URL } from "../baseURL";
import Dashboard from "./Dashboard";
import DashboardProgress from "./DashboardProgress";

const MySwal = withReactContent(Swal);

const RegistrationSteps = () => {
  const token = getToken();
  const theme = useTheme();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState({
    pan: false,
    personal: false,
    address: false,
    income: false,
    selfie: false,
    mobile: false,
  });

  const [openModal, setOpenModal] = useState(false);
  const [formValues, setFormValues] = useState({ pan: "", mobile: "" });
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState("");
 
 
  // const fetchDashboardDetails = async () => {
  //   try {
  //     const response = await fetch(
  //       `${BASE_URL}/api/user/getDashboardDetails`
  //     );
  //     const data = await response.json();
  //     if (data.success) {
  //       setRegistrationStatus(data.registrationStatus);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching dashboard details:", error);
  //   }
  // };

  // fetchDashboardDetails();

  
  const handleCompleteStep = (step) => {
    if (step === "pan") {
      setOpenModal(true);
    } else if (!completedSteps[step]) {
      // Mark the step as completed
      setCompletedSteps((prev) => ({ ...prev, [step]: true }));

      // Update the progress
      const completedCount =
        Object.values(completedSteps).filter(Boolean).length;
      setProgress((completedCount + 1) * (100 / 6)); // Update progress percentage
    }
    if (step === "personal") {
      showPersonalInfoForm(); // Trigger the personal info modal
    }
    if (step === "mobile") {
      handleMobileVerification(); // Open mobile verification when clicked
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setFormValues({ pan: "", mobile: "" });
    setError("");
  };

  const handleSubmitPan = async () => {
    
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzZiYTg5N2EyOGYwMWE2YjM1MjdjYyIsImlhdCI6MTczNjI1Mjc4MSwiZXhwIjoxNzM4ODQ0NzgxfQ.BC5jt4Whb5S8jBQwDr0gPYV3SjtPuUw6QDjzTDz02h0";
    const panFormat = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panFormat.test(formValues.pan)) {
      setError("Invalid PAN card format.");
      return;
    }

    setIsFetching(true);
    setError("");

    try {
      const response = await fetch(
        `${BASE_URL}/api/verify/verifyPAN/${formValues.pan}`,
        {
          method: "POST",
          credentials: "include",
        });

        console.log("response>>>>",response);

        if (response.status !== 200) {
            throw new Error("Failed to fetch profile details.");
        }

       

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   console.error("API Error:", errorData);
      //   setError(errorData.message || "Error validating PAN.");
      //   return;
      // }

      // Await the resolved JSON data
      const data = await response.json();
      
      // Properly handle resolved `data`
      if (data || data.pan || data.pan.length >= 1) {
        setCompletedSteps((prev) => ({ ...prev, pan: true }));
        setProgress((prev) => (prev === 100 ? 100 : prev + 16.67)); // 16.67% per step
        handleCloseModal();
      } else {
        setError("PAN data is incomplete or invalid.");
      }
    } catch (err) {
      console.error("Request Error:", err);
      setError("Error validating PAN. Please try again.");
    } finally {
      setIsFetching(false);
    }
  };

  const handlePanChange = (event) => {
    const pan = event.target.value.toUpperCase();
    setFormValues({ pan });
  };

  const showPersonalInfoForm = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/user/getProfileDetails`, {
            withCredentials: true,
        });

        if (response.status !== 200) {
            throw new Error("Failed to fetch profile details.");
        }

        const { success, data } = response.data;

        if (success && data?.personalDetails) {
            const personalDetails = data.personalDetails;
            const formattedDob = personalDetails?.dob?.split("-").reverse().join("-");

            const result = await MySwal.fire({
                title: "Share Your Details",
                html: `
                    <form id="personal-info-form" style="overflow: hidden; margin-top: 20px; overflow-y: auto;">
                        <input type="text" id="fullName" class="swal2-input" placeholder="Full Name" 
                            value="${personalDetails?.fullName || ""}" required 
                            style="width: 90%; margin: 10px 0 10px 0; padding: 10px; border-radius: 8px; 
                            border: 1px solid white; background-color: #4D4D4E; color: white;" readonly/>
                        
                        <input type="email" id="email" class="swal2-input" placeholder="Enter Your Email ID" required 
                            style="width: 90%; margin: 10px 0 10px 0; padding: 10px; border-radius: 8px; 
                            border: 1px solid white; background-color: #4D4D4E; color: white;"/>
                        
                        <input type="text" id="dob" class="swal2-input" value="${formattedDob || ""}" required 
                            style="width: 90%; margin: 10px 0 10px 0; padding: 10px; border-radius: 8px; 
                            border: 1px solid white; background-color: #4D4D4E; color: white;" readonly/>
                        
                        <select id="gender" class="swal2-input" required 
                            style="width: 90%; margin: 10px 0 10px 0; padding: 10px; border-radius: 8px; 
                            border: 1px solid white; background-color: #4D4D4E; color: white;" disabled>
                            <option value="" disabled ${!personalDetails?.gender ? "selected" : ""}>Gender</option>
                            <option value="M" ${personalDetails?.gender === "M" ? "selected" : ""}>Male</option>
                            <option value="F" ${personalDetails?.gender === "F" ? "selected" : ""}>Female</option>
                            <option value="O" ${personalDetails?.gender === "O" ? "selected" : ""}>Other</option>
                        </select>
                        
                        <select id="maritalStatus" class="swal2-input" required 
                            style="width: 90%; margin: 10px 0 10px 0; padding: 10px; border-radius: 8px; 
                            border: 1px solid white; background-color: #4D4D4E; color: white;">
                            <option value="" disabled ${!personalDetails?.maritalStatus ? "selected" : ""}>Select Marital Status</option>
                            <option value="Single" ${personalDetails?.maritalStatus === "Single" ? "selected" : ""}>Single</option>
                            <option value="Married" ${personalDetails?.maritalStatus === "Married" ? "selected" : ""}>Married</option>
                            <option value="Divorced" ${personalDetails?.maritalStatus === "Divorced" ? "selected" : ""}>Divorced</option>
                        </select>
                        
                        <input type="text" id="spouseName" class="swal2-input" placeholder="Spouse Name" 
                            style="display: none; width: 90%; margin: 10px 0; padding: 10px; 
                            border-radius: 8px; border: 1px solid white; background-color: #4D4D4E; color: white;"/>
                    </form>
                `,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: "Submit",
                cancelButtonText: "Cancel",
                background: "#4D4D4E",
                color: "white",
                confirmButtonColor: "#FF5733",
                cancelButtonColor: "#FF6347",
                didOpen: () => {
                    const maritalStatusSelect = document.getElementById("maritalStatus");
                    const spouseNameInput = document.getElementById("spouseName");

                    maritalStatusSelect.addEventListener("change", (event) => {
                        spouseNameInput.style.display = event.target.value === "Married" ? "block" : "none";
                    });
                },
                preConfirm: () => {
                    const email = Swal.getPopup().querySelector("#email").value;
                    const maritalStatus = Swal.getPopup().querySelector("#maritalStatus").value;
                    const spouseName = Swal.getPopup().querySelector("#spouseName").value;

                    if (!email.includes("@")) {
                        Swal.showValidationMessage("Please enter a valid email address.");
                        return;
                    }

                    return { email, maritalStatus, spouseName: maritalStatus === "Married" ? spouseName : null };
                },
            });

            if (result.isConfirmed) {
                const updatedDetails = {
                    fullName: personalDetails?.fullName,
                    gender: personalDetails?.gender,
                    dob: personalDetails?.dob,
                    personalEmail: result.value.email,
                    maritalStatus: result.value.maritalStatus,
                    spouseName: result.value.spouseName,
                };

                await fetch(`${BASE_URL}/api/user/personalInfo`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedDetails),
                });

                Swal.fire("Success", "Details updated successfully!", "success");
            }
        }
    } catch (error) {
        console.error("Error:", error);
        Swal.fire("Error", "Unable to fetch or update your details.", "error");
    }
    
};



  const showAddressInfoForm = () => {
    MySwal.fire({
      title: "Current Resident Address",
      html: `
        <form id="address-info-form" style="max-height: none; overflow: hidden;">
          <input type="text" id="address" class="swal2-input" placeholder="Address" required style="width: 90%;" />
          <input type="text" id="landmark" class="swal2-input" placeholder="Landmark" style="width: 90%;" />
          <input type="text" id="pincode" class="swal2-input" placeholder="Pincode" style="width: 90%;" />
          <input type="text" id="city" class="swal2-input" placeholder="City" required style="width: 90%;" />
          <input type="text" id="state" class="swal2-input" placeholder="State" required style="width: 90%;" />
        </form>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
      // Customizing the button and background colors
      background: "#4D4D4E", // Dark background for the modal
      color: "white", // Text color
      confirmButtonColor: "#FFA500", // Orange color for the submit button
      cancelButtonColor: "#FF6347", // Red color for the cancel button
      preConfirm: () => {
        const address = Swal.getPopup().querySelector("#address").value;
        const landmark = Swal.getPopup().querySelector("#landmark").value;
        const pincode = Swal.getPopup().querySelector("#pincode").value;
        const city = Swal.getPopup().querySelector("#city").value;
        const state = Swal.getPopup().querySelector("#state").value;

        // Validation
        if (!address || !landmark || !pincode || !city || !state) {
          Swal.showValidationMessage("Please fill out all fields.");
          return false;
        }

        // Return the form data
        return { address, landmark, pincode, city, state };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { address, landmark, pincode, city, state } = result.value;

        setFormValues((prev) => ({
          ...prev,
          address,
          landmark,
          pincode,
          city,
          state,
        }));

        setCompletedSteps((prev) => ({ ...prev, address: true }));
        setProgress((prev) => (prev === 100 ? 100 : prev + 20));

        // Example API call on form submission
        const apiData = { address, landmark, pincode, city, state };

        // API call (replace with your actual API call)
        fetch(`${BASE_URL}/api/user/currentResidence`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiData),
          credentials:"include"
        })
          .then((response) => response.json())
          .then((data) => {
            // Proceed to next step
          })
          .catch((error) => {
            console.error("Error submitting address data:", error);
            Swal.fire(
              "Error",
              "There was an error submitting your address details. Please try again.",
              "error"
            );
          });
      }
    });
  };

  const showIncomeInfoForm = () => {
    MySwal.fire({
      title: "<h2 style='color: #FFA500;'>Income Information</h2>",
      html: `
        <form 
          id="income-info-form" 
          style="
            max-height: none; 
            overflow: hidden; 
            padding: 20px; 
            background-color: #2C2F33; 
            border-radius: 12px; 
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); 
            width: 100%; 
            max-width: 450px; 
            margin: auto; 
            color: #FFFFFF;
          "
        >
          <label 
            for="employeeType" 
            style="font-size: 16px; font-weight: bold; margin-bottom: 8px; display: block;"
          >
            Select Employee Type
          </label>
          <select 
            id="employeeType" 
            class="swal2-input" 
            required 
            style="
              width: 90%; 
              padding: 10px; 
              font-size: 16px; 
              border-radius: 8px; 
              border: 1px solid #555; 
              margin-bottom: 20px; 
              background-color: #4D4D4E; 
              color: white;
            "
          >
            <option value="" disabled selected style="color: white;">Select</option>
            <option value="salary">Salaried</option>
            <option value="self-employed">Self-Employed</option>
          </select>
  
          <input 
            type="number" 
            id="netIncome" 
            class="swal2-input" 
            placeholder="Net Monthly Income" 
            required 
            style="
              width: 90%; 
              padding: 10px; 
              font-size: 16px; 
              border-radius: 8px; 
              border: 1px solid #555; 
              margin-bottom: 20px; 
              background-color: #3B3E44; 
              color: white;
            " 
          />
  
          <input 
            type="number" 
            id="loanAmount" 
            class="swal2-input" 
            placeholder="Loan Amount" 
            required 
            style="
              width: 90%; 
              padding: 10px; 
              font-size: 16px; 
              border-radius: 8px; 
              border: 1px solid #555; 
              margin-bottom: 20px; 
              background-color: #3B3E44; 
              color: white;
            " 
          />
  
          <input 
            type="date" 
            id="nextSalaryDate" 
            class="swal2-input" 
            required 
            style="
              width: 90%; 
              padding: 10px; 
              font-size: 16px; 
              border-radius: 8px; 
              border: 1px solid #555; 
              margin-bottom: 20px; 
              background-color: #3B3E44; 
              color: white;
            " 
          />
  
          <label 
            style="
              font-size: 16px; 
              font-weight: bold; 
              margin-bottom: 12px; 
              display: block; 
              text-align: center;
            "
          >
            Mode of Income Received
          </label>
          <div style="display: flex; gap: 20px; margin-bottom: 20px; justify-content: center; align-items: center;">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
              <input type="radio" id="modeBank" name="incomeMode" value="bank" required />
              <label for="modeBank" style="font-size: 14px; color: white;">Bank</label>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
              <input type="radio" id="modeCheck" name="incomeMode" value="check" />
              <label for="modeCheck" style="font-size: 14px; color: white;">Check</label>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
              <input type="radio" id="modeCash" name="incomeMode" value="cash" />
              <label for="modeCash" style="font-size: 14px; color: white;">Cash</label>
            </div>
          </div>
        </form>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Submit",
      confirmButtonColor: "#FFA500",
      preConfirm: () => {
        const employeeType = Swal.getPopup().querySelector("#employeeType").value;
        const netIncome = Swal.getPopup().querySelector("#netIncome").value;
        const loanAmount = Swal.getPopup().querySelector("#loanAmount").value;
        const nextSalaryDate = Swal.getPopup().querySelector("#nextSalaryDate").value;
        const incomeMode = Swal.getPopup().querySelector('input[name="incomeMode"]:checked')?.value;
  
        if (!employeeType || !netIncome || !loanAmount || !nextSalaryDate || !incomeMode) {
          Swal.showValidationMessage("Please fill out all fields.");
          return false;
        }
  
        return {
          employeeType,
          netIncome,
          loanAmount,
          nextSalaryDate,
          incomeMode,
        };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { employeeType, netIncome, loanAmount, nextSalaryDate, incomeMode } = result.value;
        try {
          const response = await axios.patch(
            "http://localhost:8081/api/user/addIncomeDetails",
            { employeeType, netIncome, loanAmount, nextSalaryDate, incomeMode },
            { headers: { "Content-Type": "application/json" }, withCredentials: true }
          );
        console.log("response",response);
        
          if (response.status===200) {
            Swal.fire("Success", "Income details added successfully!", "success");
          } else {
            throw new Error(response?.data?.message || "Failed to add income details.");
          }
        } catch (error) {
          Swal.fire("Error", error.message || "An error occurred while adding income details.", "error");
        }
        
      }
    });
  };
  
  const allStepsCompleted = Object.values(completedSteps).every(
    (step) => step === true
  );

  const [selfie, setSelfie] = useState(null);
  
  // Function to handle selfie upload
  const handleSelfieCapture = () => {
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.accept = "image/*";
    inputFile.capture = "environment";
  
    inputFile.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setSelfie(file);
        uploadSelfieToBackend(file); // Trigger upload after capturing
      }
    };
  
    inputFile.click();
  };
  
  // Upload selfie to backend
  const uploadSelfieToBackend = async (fileData) => {
    const formData = new FormData();
    formData.append("profilePicture", fileData); // Ensure backend key matches
  
    try {
      setIsFetching(true);
      const response = await axios.patch(
        "http://localhost:8081/api/user/uploadProfile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true, // Maintain user session
        }
      );
  console.log(response);
  
      setIsFetching(false);
  
      if (response.status===200) {
        Swal.fire("Success", "Selfie uploaded successfully!", "success");
      } else {
        Swal.fire("Error", response.data.message, "error");
      }
    } catch (error) {
      setIsFetching(false);
      console.error("Upload Error:", error);
      Swal.fire("Error", "An error occurred while uploading the selfie.", "error");
    }
  };
  
  const handleMobileVerification = () => {
    MySwal.fire({
      title: "Enter Mobile Number",
      input: "text",
      inputPlaceholder: "Enter your mobile number",
      inputAttributes: {
        style: `
          width: 90%; 
          padding: 10px; 
          font-size: 16px; 
          border-radius: 4px; 
          border: 1px solid #ccc; 
          background-color: #4D4D4E; 
          color: white; 
          margin: 20px auto; 
          text-align: center;
        `,
      },
      background: "#4D4D4E",
      color: "white",
      confirmButtonColor: "#FFA500",
      showCancelButton: true,
      cancelButtonColor: "#FF6347",
      confirmButtonText: "Send OTP",
      cancelButtonText: "Cancel",
      preConfirm: (mobile) => {
        const mobileRegex = /^[6-9]\d{9}$/;
        if (!mobile || !mobileRegex.test(mobile)) {
          Swal.showValidationMessage(
            "Please enter a valid 10-digit mobile number."
          );
          return false;
        }

        return mobile; // Return the mobile number for the next step
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const mobile = result.value;

        // const token =
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzZiYTg5N2EyOGYwMWE2YjM1MjdjYyIsImlhdCI6MTczNjI1Mjc4MSwiZXhwIjoxNzM4ODQ0NzgxfQ.BC5jt4Whb5S8jBQwDr0gPYV3SjtPuUw6QDjzTDz02h0";

        // Send OTP API Call
        fetch(`${BASE_URL}/api/verify/mobile/get-otp/${mobile}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",

          },
          credentials:'include'
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              // Show OTP input box
              Swal.fire({
                title: `Enter OTP sent to ${mobile}`,
                input: "text",
                inputPlaceholder: "Enter the OTP",
                inputAttributes: {
                  style: `
                    width: 90%; 
                    padding: 10px; 
                    font-size: 16px; 
                    border-radius: 4px; 
                    border: 1px solid #ccc; 
                    background-color: #4D4D4E; 
                    color: white; 
                    margin: 20px auto; 
                    text-align: center;
                  `,
                },
                background: "#4D4D4E",
                color: "white",
                confirmButtonColor: "#32CD32", // Green for verify
                showCancelButton: true,
                cancelButtonColor: "#FFA500", // Orange for resend OTP
                confirmButtonText: "Verify OTP",
                cancelButtonText: "Resend OTP",
                preConfirm: (otp) => {
                  if (!otp || otp.length !== 6) {
                    Swal.showValidationMessage(
                      "Please enter a valid 6-digit OTP."
                    );
                    return false;
                  }
                  return otp; // Return OTP for verification
                },
              }).then((otpResult) => {
                if (otpResult.isConfirmed) {
                  const otp = otpResult.value;

                  // Verify OTP API Call
                  fetch(`${BASE_URL}/api/verify/mobile/verify-otp`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ mobile, otp }),
                  })
                    .then((response) => response.json())
                    .then((verifyData) => {
                      if (verifyData.success) {
                        Swal.fire(
                          "Success",
                          "Mobile number verified successfully.",
                          "success"
                        );
                        // Update state and progress
                        setFormValues((prev) => ({ ...prev, mobile }));
                        setCompletedSteps((prev) => ({
                          ...prev,
                          mobile: true,
                        }));
                        setProgress((prev) =>
                          prev === 100 ? 100 : prev + 16.67
                        );
                      } else {
                        Swal.fire(
                          "Error",
                          "Invalid OTP. Please try again.",
                          "error"
                        );
                      }
                    })
                    .catch((error) => {
                      console.error("Error verifying OTP:", error);
                      Swal.fire(
                        "Error",
                        "Failed to verify OTP. Please try again.",
                        "error"
                      );
                    });
                } else if (otpResult.dismiss === Swal.DismissReason.cancel) {
                  // Resend OTP logic
                  fetch(`${BASE_URL}/api/verify/mobile/get-otp/${mobile}`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ mobile }),
                  })
                    .then((response) => response.json())
                    .then((resendData) => {
                      if (resendData.success) {
                        Swal.fire(
                          "Resent",
                          "OTP has been resent to your mobile number.",
                          "info"
                        );
                      } else {
                        Swal.fire(
                          "Error",
                          "Failed to resend OTP. Please try again.",
                          "error"
                        );
                      }
                    })
                    .catch((error) => {
                      console.error("Error resending OTP:", error);
                      Swal.fire(
                        "Error",
                        "Failed to resend OTP. Please try again.",
                        "error"
                      );
                    });
                }
              });
            } else {
              Swal.fire(
                "Error",
                "Failed to send OTP. Please try again.",
                "error"
              );
            }
          })
          .catch((error) => {
            console.error("Error sending OTP:", error);
            Swal.fire(
              "Error",
              "Failed to send OTP. Please try again.",
              "error"
            );
          });
      }
    });
  };

  const renderStepBox = (icon, title, description, stepKey, onClick) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start", // Align items to the left
        justifyContent: "center",
        padding: 2,
        border: "2px solid",
        borderColor: completedSteps[stepKey] ? "green" : "#ccc",
        borderRadius: 3,
        margin: 1,
        width: "30%", // Adjust width for larger screens
        minWidth: 200,
        cursor: "pointer",
        textAlign: "left", // Left align text
        color: "white",
        background: "linear-gradient(45deg, #4D4D4E, orange)",
        boxShadow: completedSteps[stepKey]
          ? "0 4px 8px rgba(0, 128, 0, 0.4)"
          : "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: completedSteps[stepKey] ? "#d4f7db" : "#ffcc00",
          transform: "scale(1.05)",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
        },
        "@media (max-width: 600px)": {
          // For mobile responsiveness
          width: "80%", // Make the step box larger on smaller screens
          margin: "auto", // Center the boxes
        },
      }}
      onClick={onClick}
    >
      {/* Icon with white color, changes to green tick if step completed */}
      <IconButton
        sx={{
          color: completedSteps[stepKey] ? "green" : "white", // White by default, green when completed
          marginBottom: 1,
        }}
      >
        {completedSteps[stepKey] ? (
          <CheckCircleIcon sx={{ color: "green" }} /> // Green check when step is complete
        ) : (
          icon
        )}
      </IconButton>

      {/* Title below the icon with white color */}
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, marginBottom: 1, color: "white" }}
        gutterBottom
      >
        {title}
      </Typography>

      {/* Description text */}
      <Typography variant="body2" sx={{ color: "white" }}>
        {description}
      </Typography>
    </Box>
  );

  return (
    <>
      <Dashboard />

      <Box
        sx={{
          paddingTop: 20,
          marginLeft: sidebarOpen ? "360px" : "20px", // Adjust margin dynamically based on sidebar state
          padding: 4,
          maxWidth: sidebarOpen ? 1000 : 300, // Adjust max width dynamically based on sidebar state
          margin: "auto",
          textAlign: "center",
          border: "2px solid #ccc",
          borderRadius: 3,
          boxShadow: 4,
          background: "linear-gradient(135deg, #f0f4ff, #ffffff)",
          marginTop: "80px", // Increased value to move the box further down
          "@media (max-width: 768px)": {
            // For tablets and mobile devices
            marginLeft: "20px",
            padding: 2,
            maxWidth: "100%", // Full width on smaller devices
          },
        }}
      >



      {/* Steps UI and Completion Message */}
      {allStepsCompleted && (
        <Box
          sx={{
            padding: 4,
            textAlign: "center",
            backgroundColor: "#e6f9e9",
            borderRadius: 3,
            marginTop: 4,
            boxShadow: "0 4px 8px rgba(0, 128, 0, 0.4)",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 2 }}>
            Congratulations! You've completed all the steps.
          </Typography>
          <img
            src="congratulation-image-url.jpg"
            alt="Congratulations"
            style={{ maxWidth: "100%", height: "auto", marginBottom: 2 }}
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: "#FF6600", color: "white" }}
            onClick={() => navigate("/loan-application")}
          >
            Continue to Next Page
          </Button>
        </Box>
      )}
 
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{
            flexDirection: { xs: "column", sm: "row" }, // Stack vertically on smaller screens
          }}
        >
          <Grid item xs={12} sm={6}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#4D4D4E",
                marginBottom: 2,
              }}
            >
              Complete Your Profile Registration
            </Typography>
          </Grid>
          <DashboardProgress registrationStatus={registrationStatus} />
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: 2, // Adding gap between boxes
            "@media (max-width: 600px)": {
              // Stack step boxes on small screens
              flexDirection: "column",
              alignItems: "center",
            },
          }}
        >
          {renderStepBox(
            <PhoneIcon />,
            "Mobile Verification",
            "Verify your mobile number",
            "mobile",
            () => handleCompleteStep("mobile")
          )}
          {renderStepBox(
            <CreditCardIcon />,
            "PAN Validation",
            "Enter your PAN number to proceed",
            "pan",
            () => handleCompleteStep("pan")
          )}
          {renderStepBox(
            <PersonIcon />,
            "Personal Info",
            "Provide your personal information",
            "personal",
            () => handleCompleteStep("personal")
          )}
          {renderStepBox(
            <LocationOnIcon />,
            "Address Info",
            "Complete your address details",
            "address",
            () => showAddressInfoForm("address")
          )}
          {renderStepBox(
            <AccountBalanceWalletIcon />,
            "Income Info",
            "Enter your income information",
            "income",
            () => showIncomeInfoForm("income")
          )}
           {renderStepBox(
        <CameraAltIcon />,
        "Selfie Verification",
        "Upload your selfie",
        "selfie",
        handleSelfieCapture // Directly passing function
      )}
      
        </Box>

        {allStepsCompleted && (
          <Box
            sx={{
              padding: 4,
              textAlign: "center",
              backgroundColor: "#e6f9e9",
              borderRadius: 3,
              marginTop: 4,
              boxShadow: "0 4px 8px rgba(0, 128, 0, 0.4)",
              "@media (max-width: 600px)": {
                padding: 2,
              },
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 2 }}>
              Congratulations! You've completed all the steps.
            </Typography>
            <img
              src="congratulation-image-url.jpg"
              alt="Congratulations"
              style={{
                maxWidth: "100%",
                height: "auto",
                marginBottom: 2,
              }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "white",
              }}
              onClick={() => navigate("/next-page")}
            >
              Continue to Next Page
            </Button>
          </Box>
        )}

        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: 4,
              boxShadow: 24,
              padding: 3,
              maxWidth: 400,
              margin: "auto",
              marginTop: "20%",
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Enter your PAN Number
            </Typography>
            <TextField
              label="PAN Number"
              variant="outlined"
              fullWidth
              value={formValues.pan}
              onChange={handlePanChange}
              sx={{ marginBottom: 2 }}
            />
            {error && (
              <Typography
                variant="body2"
                color="error"
                sx={{ marginBottom: 2 }}
              >
                {error}
              </Typography>
            )}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmitPan}
                disabled={isFetching}
              >
                {isFetching ? "Validating..." : "Submit"}
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default RegistrationSteps;

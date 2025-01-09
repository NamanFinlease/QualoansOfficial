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
import axios from "axios"; // Import axios

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
  const theme = useTheme();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState({
    mobile: false,

    pan: false,
    personal: false,
    address: false,
    income: false,
    selfie: false,
  });

  const [openModal, setOpenModal] = useState(false);
  const [formValues, setFormValues] = useState({ pan: "", mobile: "" });
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState("");

  useEffect(() => {
    const fetchDashboardDetails = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/user/getDashboardDetails`
        );
        const data = await response.json();
        if (data.success) {
          setRegistrationStatus(data.registrationStatus);
        }
      } catch (error) {
        console.error("Error fetching dashboard details:", error);
      }
    };

    fetchDashboardDetails();
  }, []);

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
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzZiYTg5N2EyOGYwMWE2YjM1MjdjYyIsImlhdCI6MTczNjI1Mjc4MSwiZXhwIjoxNzM4ODQ0NzgxfQ.BC5jt4Whb5S8jBQwDr0gPYV3SjtPuUw6QDjzTDz02h0";
    const panFormat = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panFormat.test(formValues.pan)) {
      setError("Invalid PAN card format.");
      return;
    }

    setIsFetching(true);
    setError("");

    try {
      console.log("PAN:", formValues.pan);

      const response = await fetch(
        `${BASE_URL}/api/verify/verifyPAN/${formValues.pan}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ pan: formValues.pan }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        setError(errorData.message || "Error validating PAN.");
        return;
      }

      // Await the resolved JSON data
      const data = await response.json();

      console.log("Resolved Data:", data);

      // Properly handle resolved `data`
      if (data || data.pan || data.pan.length >= 1) {
        console.log("Data passed the condition:", data);
        setCompletedSteps((prev) => ({ ...prev, pan: true }));
        setProgress((prev) => (prev === 100 ? 100 : prev + 16.67)); // 16.67% per step
        handleCloseModal();
      } else {
        console.log("data <<<>>>", data);

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

  const showPersonalInfoForm = () => {
    MySwal.fire({
      title: "Share Your Details",
      html: `
  <form id="personal-info-form" style="max-height: 400px; overflow: hidden; margin-top: 20px;">
    <input type="text" id="fullName" class="swal2-input" placeholder="Full Name" required style="width: 90%; margin: 10px 0 10px 0; padding: 10px; border-radius: 8px; border: 1px solid white; background-color: #4D4D4E; color: white;"/>
    <input type="email" id="email" class="swal2-input" placeholder="Email ID" required style="width: 90%; margin: 10px 0 10px 0; padding: 10px; border-radius: 8px; border: 1px solid white; background-color: #4D4D4E; color: white;"/>
    <input type="date" id="dob" class="swal2-input" required style="width: 90%; margin: 10px 0 10px 0; padding: 10px; border-radius: 8px; border: 1px solid white; background-color: #4D4D4E; color: white;"/>
    <select id="gender" class="swal2-input" required style="width: 90%; margin: 10px 0 10px 0; padding: 10px; border-radius: 8px; border: 1px solid white; background-color: #4D4D4E; color: white;">
      <option value="" disabled selected>Gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </select>
    <select id="maritalStatus" class="swal2-input" required style="width: 90%; margin: 10px 0 10px 0; padding: 10px; border-radius: 8px; border: 1px solid white; background-color: #4D4D4E; color: white;">
      <option value="" disabled selected>Marital Status</option>
      <option value="single">Single</option>
      <option value="married">Married</option>
      <option value="divorced">Divorced</option>
    </select>
    <input type="text" id="spouseName" class="swal2-input" placeholder="Spouse's Name" style="width: 90%; margin: 10px 0 10px 0; padding: 10px; border-radius: 8px; border: 1px solid white; background-color: #4D4D4E; color: white; display: none;" />
  </form>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
      background: "#4D4D4E", // Set the background color for the popup
      color: "white", // Set the text color to white for readability
      confirmButtonColor: "#FF5733", // Orange color for submit button
      cancelButtonColor: "#FF6347", // Tomato color for cancel button
      confirmButtonText: `<span style="color: white;">Submit</span>`,
      cancelButtonText: `<span style="color: white;">Cancel</span>`,
      preConfirm: () => {
        const fullName = Swal.getPopup().querySelector("#fullName").value;
        const email = Swal.getPopup().querySelector("#email").value;
        const dob = Swal.getPopup().querySelector("#dob").value;
        const gender = Swal.getPopup().querySelector("#gender").value;
        const maritalStatus =
          Swal.getPopup().querySelector("#maritalStatus").value;
        const spouseName = Swal.getPopup().querySelector("#spouseName").value;

        // Validation
        if (!fullName || !email || !dob || !gender || !maritalStatus) {
          Swal.showValidationMessage("Please fill out all fields.");
          return false;
        }

        // Name validation (letters only)
        if (!/^[a-zA-Z\s]+$/.test(fullName)) {
          Swal.showValidationMessage(
            "Please enter a valid name with letters only."
          );
          return false;
        }

        // DOB validation: Age between 18 and 60
        const today = new Date();
        const birthDate = new Date(dob);
        const age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (
          age < 18 ||
          age > 60 ||
          (age === 18 && m < 0) ||
          (age === 60 && m > 0)
        ) {
          Swal.showValidationMessage("Age must be between 18 and 60.");
          return false;
        }

        // Email validation (proper format)
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
          Swal.showValidationMessage("Please enter a valid email.");
          return false;
        }

        // If married, spouse name is required
        if (maritalStatus === "married" && !spouseName) {
          Swal.showValidationMessage("Please enter your spouse's name.");
          return false;
        }

        // Return the form data
        return { fullName, email, dob, gender, maritalStatus, spouseName };
      },
      didOpen: () => {
        const maritalStatusSelect =
          Swal.getPopup().querySelector("#maritalStatus");
        const spouseNameField = Swal.getPopup().querySelector("#spouseName");

        // Show spouse name field if marital status is "married"
        maritalStatusSelect.addEventListener("change", () => {
          if (maritalStatusSelect.value === "married") {
            spouseNameField.style.display = "block";
          } else {
            spouseNameField.style.display = "none";
          }
        });

        // Adjust the popup size and prevent overflow
        Swal.getPopup().style.overflow = "hidden";
        Swal.getPopup().style.maxHeight = "100%"; // Make sure the height is constrained to fit content
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setCompletedSteps((prev) => ({ ...prev, personal: true }));
        setProgress((prev) => (prev === 100 ? 100 : prev + 20));

        // Example API call on form submission
        const apiData = {
          fullName: result.value.fullName,
          email: result.value.email,
          dob: result.value.dob,
          gender: result.value.gender,
          maritalStatus: result.value.maritalStatus,
          spouseName: result.value.spouseName || "",
        };

        // API call (replace with your actual API call)
        fetch(`${BASE_URL}/api/verify/mobile/get-otp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("API Response: ", data);
            handleMobileVerification(); // Proceed to next step
          })
          .catch((error) => {
            console.error("Error submitting data:", error);
            Swal.fire(
              "Error",
              "There was an error submitting your details. Please try again.",
              "error"
            );
          });
      }
    });
  };

  const showAddressInfoForm = () => {
    MySwal.fire({
      title: "Current Resident Address",
      html: `
      <form id="address-info-form" style="max-height: none; overflow: hidden; width: 80%; margin: 0 auto;">
        <input type="text" id="address" class="swal2-input" placeholder="Address" required style="width: 100%; padding: 5px; height: 30px; border: 1px solid #FFA500; border-radius: 5px;" />
        <input type="text" id="landmark" class="swal2-input" placeholder="Landmark" style="width: 100%; padding: 5px; height: 30px; border: 1px solid #FFA500; border-radius: 5px;" />
        <input type="text" id="pincode" class="swal2-input" placeholder="Pincode" style="width: 100%; padding: 5px; height: 30px; border: 1px solid #FFA500; border-radius: 5px;" />
        <input type="text" id="city" class="swal2-input" placeholder="City" required style="width: 100%; padding: 5px; height: 30px; border: 1px solid #FFA500; border-radius: 5px;" />
        <input type="text" id="state" class="swal2-input" placeholder="State" required style="width: 100%; padding: 5px; height: 30px; border: 1px solid #FFA500; border-radius: 5px;" />
        <select id="residenceType" class="swal2-input" required style="width: 100%; padding: 8px; height: 35px; background-color: #4D4D4E; color: white; border: 1px solid #FFA500; border-radius: 5px; font-size: 16px; font-weight: bold;">
          <option value="" disabled selected>Select Residence Type</option>
          <option value="OWNED" style="background-color: #4D4D4E;">OWNED</option>
          <option value="RENTED" style="background-color: #4D4D4E;">RENTED</option>
          <option value="PARENTAL" style="background-color: #4D4D4E;">PARENTAL</option>
          <option value="COMPANY PROVIDED" style="background-color: #4D4D4E;">COMPANY PROVIDED</option>
          <option value="OTHERS" style="background-color: #4D4D4E;">OTHERS</option>
        </select>
      </form>`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
      background: "#4D4D4E",
      color: "white",
      confirmButtonColor: "#FFA500",
      cancelButtonColor: "gray",
      preConfirm: () => {
        const address = Swal.getPopup().querySelector("#address").value;
        const landmark = Swal.getPopup().querySelector("#landmark").value;
        const pincode = Swal.getPopup().querySelector("#pincode").value;
        const city = Swal.getPopup().querySelector("#city").value;
        const state = Swal.getPopup().querySelector("#state").value;
        const residenceType = Swal.getPopup().querySelector("#residenceType").value;
  
        // Validation
        if (!address || !landmark || !pincode || !city || !state || !residenceType) {
          Swal.showValidationMessage("Please fill out all fields.");
          return false;
        }
  
        return { address, landmark, pincode, city, state, residenceType };
      },
      customClass: {
        popup: 'custom-popup',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { address, landmark, pincode, city, state, residenceType } = result.value;
  
        setFormValues((prev) => ({
          ...prev,
          address,
          landmark,
          pincode,
          city,
          state,
          residenceType,
        }));
  
        setCompletedSteps((prev) => ({ ...prev, address: true }));
        setProgress((prev) => (prev === 100 ? 100 : prev + 16.67));
  
        // Example API call on form submission
        const apiData = {
          address,
          landmark,
          pincode,
          city,
          state,
          residenceType,
        };
  
        // Ensure BASE_URL and token are defined
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2UzZmQxMDczYjMxNTQyNjU3YTI3ZSIsImlhdCI6MTczNjMyNzEyMiwiZXhwIjoxNzM4OTE5MTIyfQ.SDrVOSRa2_x5RC6JBRtdL_yzxkZQPn61dJHmLpI4oQI";  // Make sure to get this from the session or state
  
        if (!token) {
          Swal.fire("Error", "Authorization token is missing.", "error");
          return;
        }

        // API call with the new endpoint
        fetch(`${BASE_URL}/api/user/currentResidence`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          
          body: JSON.stringify({
            address,
            landmark,
            pincode,
            state,
            city,
            residenceType
          }),
          
        } )
          .then((response) => response.json())
          .then((data) => {

            
            if (data && data) {
              console.log("API Response: ", data);
              // Proceed to next step or show success message
              Swal.fire("Success", "Your address has been updated successfully!", "success");
            } else {
              Swal.fire("Error", "There was an error submitting your address details. Please try again.", "error");
            }
          })
          .catch((error) => {
            console.error("Error submitting address data:", error);
            Swal.fire("Error", "There was an error submitting your address details. Please try again.", "error");
          });
      }
    });
  };
  
  

  const showIncomeInfoForm = () => {
    MySwal.fire({
      title: "<h2 style='color: #FFA500;'>Income Information</h2>", // Orange title
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
          style="
            width: 90%; 
            padding: 10px; 
            font-size: 16px; 
            border-radius: 8px; 
            border: 1px solid #555; 
            margin-bottom: 20px; 
            background-color: #3B3E44; 
            color: #A9A9A9; /* Placeholder effect */
          " 
          placeholder="Next Salary Date" 
          onfocus="this.style.color='white'" 
          onblur="if(!this.value) this.style.color='#A9A9A9';"
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
          <div 
            style="
              display: flex; 
              gap: 20px; 
              margin-bottom: 20px; 
              justify-content: center; 
              align-items: center;
            "
          >
            <div 
              style="display: flex; flex-direction: column; align-items: center; gap: 4px;"
            >
              <input 
                type="radio" 
                id="modeBank" 
                name="incomeMode" 
                value="bank" 
                required 
                style="margin-right: 8px;" 
              />
              <label 
                for="modeBank" 
                style="font-size: 14px; color: white;"
              >
                Bank
              </label>
            </div>
            <div 
              style="display: flex; flex-direction: column; align-items: center; gap: 4px;"
            >
              <input 
                type="radio" 
                id="modeCheck" 
                name="incomeMode" 
                value="check" 
                style="margin-right: 8px;" 
              />
              <label 
                for="modeCheck" 
                style="font-size: 14px; color: white;"
              >
                Check
              </label>
            </div>
            <div 
              style="display: flex; flex-direction: column; align-items: center; gap: 4px;"
            >
              <input 
                type="radio" 
                id="modeCash" 
                name="incomeMode" 
                value="cash" 
                style="margin-right: 8px;" 
              />
              <label 
                for="modeCash" 
                style="font-size: 14px; color: white;"
              >
                Cash
              </label>
            </div>
          </div>
        </form>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Submit",
      confirmButtonColor: "#FFA500", // Orange button
      preConfirm: () => {
        const employementType =
          Swal.getPopup().querySelector("#employeeType").value;
        const monthlyIncome = Swal.getPopup().querySelector("#netIncome").value;
        const obligations = Swal.getPopup().querySelector("#loanAmount").value;
        const nextSalaryDate =
          Swal.getPopup().querySelector("#nextSalaryDate").value;
        const incomeMode = Swal.getPopup().querySelector(
          'input[name="incomeMode"]:checked'
        )?.value;

        if (
          !employementType ||
          !monthlyIncome ||
          !obligations ||
          !nextSalaryDate ||
          !incomeMode
        ) {
          Swal.showValidationMessage("Please fill out all fields.");
          return false;
        }
        return {
          employementType,
          monthlyIncome,
          obligations,
          nextSalaryDate,
          incomeMode,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const {
          employementType,
          monthlyIncome,
          obligations,
          nextSalaryDate,
          incomeMode,
        } = result.value;
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2UzZmQxMDczYjMxNTQyNjU3YTI3ZSIsImlhdCI6MTczNjMyNzEyMiwiZXhwIjoxNzM4OTE5MTIyfQ.SDrVOSRa2_x5RC6JBRtdL_yzxkZQPn61dJHmLpI4oQI";
        // Make the PATCH API call
        fetch(`${BASE_URL}/api/user/addIncomeDetails`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            employementType,
            monthlyIncome,
            obligations,
            nextSalaryDate,
            incomeMode,
          }),
        })
          .then((response) => {
            console.log(response);

            if (!response.ok) {
              throw new Error("Failed to submit income details.");
            }
            return response.json();
          })
          .then((data) => {
            // Handle successful response
            MySwal.fire({
              icon: "success",
              title: "Success",
              text: "Income details added successfully!",
            });
            setCompletedSteps((prev) => ({ ...prev, income: true }));
            setProgress((prev) => (prev === 100 ? 100 : prev + 16.67));
          })

          .catch((error) => {
            // Handle error response
            MySwal.fire({
              icon: "error",
              title: "Error",
              text: error.message,
            });
          });
      }
    });
  };

  const allStepsCompleted = Object.values(completedSteps).every(
    (step) => step === true
  );
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2UzZmQxMDczYjMxNTQyNjU3YTI3ZSIsImlhdCI6MTczNjMyNzEyMiwiZXhwIjoxNzM4OTE5MTIyfQ.SDrVOSRa2_x5RC6JBRtdL_yzxkZQPn61dJHmLpI4oQI"; // Use a dynamic token if needed

  const [profileImage, setProfileImage] = useState(null);

  // Function to handle the selfie upload
  const handleSelfieCapture = () => {
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.accept = "image/*";
    inputFile.capture = "camera";

    inputFile.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setProfileImage(file);
        handleSelfieUpload(file);
      }
    };

    inputFile.click();
  };

  // Handle selfie upload to the backend
  const handleSelfieUpload = (fileData) => {
    if (fileData) {
      uploadSelfieToBackend(fileData);
    }
  };

  // Function to upload the selfie to the backend
  const uploadSelfieToBackend = async (fileData) => {
    const formData = new FormData();
    formData.append("profilePicture", fileData);

    try {
      setIsFetching(true);
      const response = await axios.patch(
        `${BASE_URL}/api/user/uploadProfile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);

      setIsFetching(false);

      if (response.data) {
        Swal.fire(
          "Success",
          response.data.message || "Profile picture uploaded successfully!",
          "success"
        );

        // Update completed steps and progress
        setCompletedSteps((prev) => ({ ...prev, selfie: true }));
        setProgress((prev) => (prev === 100 ? 100 : prev + 16.67));
      } else {
        Swal.fire(
          "Error",
          response.data.message || "An error occurred!",
          "error"
        );
      }
    } catch (error) {
      setIsFetching(false);
      console.error("Error uploading profile picture:", error);
      Swal.fire(
        "Error",
        "An error occurred while uploading the profile picture.",
        "error"
      );
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

        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzZiYTg5N2EyOGYwMWE2YjM1MjdjYyIsImlhdCI6MTczNjI1Mjc4MSwiZXhwIjoxNzM4ODQ0NzgxfQ.BC5jt4Whb5S8jBQwDr0gPYV3SjtPuUw6QDjzTDz02h0";

        // Send OTP API Call
        fetch(`${BASE_URL}/api/verify/mobile/get-otp/${mobile}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
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
                  fetch("http://localhost:8081/api/verify/mobile/verify-otp", {
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
                  fetch(
                    `http://localhost:8081/api/verify/mobile/get-otp/${mobile}`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ mobile }),
                    }
                  )
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
        backgroundColor: "#4D4D4E",
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
          {/* <Grid item xs={12} sm={6}>
    <Typography variant="body1" sx={{ marginBottom: 3, fontStyle: "italic", color: "#555" }}>
        Your progress: {Math.floor(progress)}% completed.
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          marginBottom: 4,
          height: 20,
          borderRadius: 5,
          backgroundColor: "#e0e0e0",
          "& .MuiLinearProgress-bar": {
            background: "linear-gradient(90deg, #00aaff, #0077cc)",
          },
        }}
      />
    </Grid> */}
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
            () => handleSelfieCapture()
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

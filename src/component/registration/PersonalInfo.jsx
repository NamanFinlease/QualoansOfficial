import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { Person, DateRange, Email, Accessibility } from "@mui/icons-material"; // Icons for title
import axios from "axios";
import { BASE_URL } from "../../baseURL";
import Swal from "sweetalert2";

const PersonalInfo = ({ onComplete, disabled }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [personalDetails, setPersonalDetails] = useState(null);
  const [formValues, setFormValues] = useState({
    fullName: "",
    gender: "",
    personalEmail: "",
    maritalStatus: "",
    spouseName: "",
    dob: "", // Initial value for dob, but it will be fetched from backend
  });

  const [error, setError] = useState("");

  // StepBox Component for consistent UI
  const StepBox = ({ icon, title, description, onComplete }) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 2,
        border: "2px solid",
        borderRadius: 3,
        margin: 1,
        width: "30%",
        minWidth: 200,
        cursor: "pointer",
        textAlign: "left",
        background: "linear-gradient(45deg, #4D4D4E, orange)",
        color: "white",
        "@media (max-width: 600px)": {
          width: "80%",
          margin: "auto",
        },
      }}
    >
      <IconButton sx={{ color: "white", ml: 1 }}>{icon}</IconButton>
      <Box sx={{ ml: 2, flexGrow: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "white" }}>
          {description}
        </Typography>
      </Box>
      <Button
        variant="contained"
        onClick={onComplete}
        sx={{
          ml: 2,
          background: "linear-gradient(45deg, #4D4D4E, orange)",
          color: "white",
          "&:hover": { backgroundColor: "#ffcc00" },
        }}
        disabled={disabled}

      >
        Start
      </Button>
    </Box>
  );

  // Handle the step completion
  const handleCompleteStep = async (step) => {
    if (step === "personal" && !disabled) {
      await showPersonalInfoForm();
    }
  };

  // Fetch personal details and open the modal
  const showPersonalInfoForm = async () => {
    setIsFetching(true);

    
    try {
      const response = await axios.get(
        `${BASE_URL}/api/user/getProfileDetails`,
        {
          withCredentials: true,
        }
      );
      

      if (response.status !== 200) {
        throw new Error("Failed to fetch profile details.");
      }

      const { success, data } = response.data;
      if (success && data?.personalDetails) {
        setPersonalDetails(data.personalDetails);
        setFormValues({
          fullName: data.personalDetails.fullName || "",
          gender: data.personalDetails.gender || "",
          personalEmail: data.personalDetails.personalEmail || "",
          maritalStatus: data.personalDetails.maritalStatus || "",
          spouseName: data.personalDetails.spouseName || "",
          dob: data.personalDetails.dob || "", // Populate dob from the backend
        });
        setOpenModal(true); // Open modal once details are loaded
      } else {
        setError("Unable to retrieve personal details.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error fetching personal details.");
    } finally {
      setIsFetching(false);
    }
  };

  // Handle form changes
  const handleFormChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setError(""); // Clear error on field change
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validate the email using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formValues.personalEmail)) {
      setError("Please enter a valid email address.");
      return;
    }
  
    // Validate marital status based on enum values
    const allowedMaritalStatuses = ["MARRIED", "SINGLE", "DIVORCED"];
    if (!allowedMaritalStatuses.includes(formValues.maritalStatus)) {
      setError("Invalid marital status.");
      return;
    }
  
    // Prepare updatedDetails object
    const updatedDetails = {
      fullName: formValues.fullName,
      gender: formValues.gender,
      dob: formValues.dob,  // Send dob as part of the updated details
      personalEmail: formValues.personalEmail, // Use personalEmail from the form state
      maritalStatus: formValues.maritalStatus,
      spouseName: formValues.maritalStatus === "MARRIED" ? formValues.spouseName : null,
    };
  
    console.log("Updated Details:", updatedDetails);  // Log the updated details to ensure correctness
  
    setIsFetching(true);
  
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/user/personalInfo`, // API endpoint for updating personal info
        updatedDetails,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Include cookies for authentication if needed
        }
      );
  
  
      if (response.status === 200) {
        Swal.fire("Success", "Details updated successfully!", "success");  // Corrected Swal usage
        setOpenModal(false); // Close modal on success
        onComplete(); // Notify parent component when step is completed
      } else {
        setError("Failed to update details.");
      }
      
    } catch (error) {
      console.error("Error updating details:", error.response || error.message);
      setError("Failed to update personal details.");
      Swal.fire("Error", "Unable to fetch or update your details.", "error");
    } finally {
      setIsFetching(false);
    }
  };
  
  
  return (
    <>
      <StepBox
        icon={<Person />}
        title="Personal Information"
        description="Please update your personal details."
        onComplete={() => handleCompleteStep("personal")}
      />

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 4,
            boxShadow: 24,
            padding: 3,
            maxWidth: 400,
            margin: "auto",
            marginTop: "1%",
            marginBottom:"20%"
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Share Your Details
          </Typography>

          {/* Full Name - Disabled */}
          <TextField
            label="Full Name"
            value={formValues.fullName}
            fullWidth
            disabled
            sx={{ marginBottom: 2 }}
          />

          {/* Email */}
          <TextField
            label="Email"
            value={formValues.personalEmail}
            onChange={(e) => handleFormChange("personalEmail", e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
            error={!!error && !formValues.personalEmail.includes("@")}
            helperText={!!error && !formValues.personalEmail.includes("@") ? error : ""}
          />

          {/* Date of Birth - Read-Only */}
          <TextField
            label="Date of Birth"
            value={formValues.dob}
            fullWidth
            disabled
            sx={{ marginBottom: 2 }}
          />

          {/* Gender */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Gender</InputLabel>
            <Select
              value={formValues.gender}
              onChange={(e) => handleFormChange("gender", e.target.value)}
            >
              <MenuItem value="M">Male</MenuItem>
              <MenuItem value="F">Female</MenuItem>
            </Select>
          </FormControl>

          {/* Marital Status */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Marital Status</InputLabel>
            <Select
              value={formValues.maritalStatus}
              onChange={(e) =>
                handleFormChange("maritalStatus", e.target.value)
              }
            >
              <MenuItem value="SINGLE">Single</MenuItem>
              <MenuItem value="MARRIED">Married</MenuItem>
              <MenuItem value="DIVORCED">Divorced</MenuItem>
            </Select>
          </FormControl>

          {/* Spouse Name - Visible only if Married */}
          {formValues.maritalStatus === "Married" && (
            <TextField
              label="Spouse Name"
              value={formValues.spouseName}
              onChange={(e) => handleFormChange("spouseName", e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
          )}

          {/* Actions */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isFetching}
            >
              {isFetching ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default PersonalInfo;

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
import { Person, CheckCircle } from "@mui/icons-material"; // Green tick icon
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
    dob: "",
  });
  const [stepCompleted, setStepCompleted] = useState(false); // Track step completion
  const [error, setError] = useState("");

  // StepBox Component
  
  const StepBox = ({ icon, title, description, disabled, completed }) => (
    <Box
      onClick={!disabled && !completed ? () => handleCompleteStep("personal") : null}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 2,
        borderRadius: 3,
        margin: 1,
        width: "30%",
        minWidth: 200,
        cursor: disabled || completed ? "not-allowed" : "pointer",
        textAlign: "left",
        background: completed
          ? "linear-gradient(45deg, #28a745, #218838)" // Green gradient when step is complete
          : disabled
          ? "lightgrey"
          : "linear-gradient(45deg, #4D4D4E, orange)",
        color: completed || !disabled ? "white" : "darkgrey",
        "@media (max-width: 600px)": {
          width: "80%",
          margin: "auto",
        },
      }}
    >
      <IconButton
        sx={{
          color: completed ? "white" : disabled ? "grey" : "white",
          ml: 1,
        }}
      >
        {completed ? <CheckCircle /> : icon}
      </IconButton>
  
      <Box sx={{ ml: 2, flexGrow: 1 }}>
        <Typography sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </Box>
    </Box>
  );
  
  const handleCompleteStep = async (step) => {
    if (step === "personal") {
      await showPersonalInfoForm();
    }
  };

  const showPersonalInfoForm = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/user/getProfileDetails`, {
        withCredentials: true,
      });

      if (response.status !== 200) throw new Error("Failed to fetch profile details.");

      const { success, data } = response.data;
      if (success && data?.personalDetails) {
        setPersonalDetails(data.personalDetails);
        setFormValues({
          fullName: data.personalDetails.fullName || "",
          gender: data.personalDetails.gender || "",
          personalEmail: data.personalDetails.personalEmail || "",
          maritalStatus: data.personalDetails.maritalStatus || "",
          spouseName: data.personalDetails.spouseName || "",
          dob: data.personalDetails.dob || "",
        });
        setOpenModal(true);
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

  const handleFormChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formValues.personalEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    const updatedDetails = {
      fullName: formValues.fullName,
      gender: formValues.gender,
      dob: formValues.dob,
      personalEmail: formValues.personalEmail,
      maritalStatus: formValues.maritalStatus,
      spouseName:
        formValues.maritalStatus === "MARRIED" ? formValues.spouseName : null,
    };

    setIsFetching(true);

    try {
      const response = await axios.patch(
        `${BASE_URL}/api/user/personalInfo`,
        updatedDetails,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        Swal.fire("Success", "Details updated successfully!", "success");
        setStepCompleted(true); // Mark step as completed
        setOpenModal(false);
        onComplete(); // Notify parent component
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
        icon={ <Person />}
        title="Personal Information"
        description="Please update your personal details."
        onClick={() => setOpenModal(true)}
        disabled={disabled || stepCompleted}
        completed={stepCompleted}

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
            marginBottom: "30%",
          }}
        >
          <Typography sx={{ marginBottom: 2 }}>
            Share Your Details
          </Typography>

          <TextField
            label="Full Name"
            value={formValues.fullName}
            fullWidth
            disabled
            sx={{ marginBottom: 2 }}
          />

          <TextField
            label="Email"
            value={formValues.personalEmail}
            onChange={(e) => handleFormChange("personalEmail", e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
            error={!!error && !formValues.personalEmail.includes("@")}
            helperText={
              !!error && !formValues.personalEmail.includes("@") ? error : ""
            }
          />

          <TextField
            label="Date of Birth"
            value={formValues.dob}
            fullWidth
            disabled
            sx={{ marginBottom: 2 }}
          />

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

          {formValues.maritalStatus === "MARRIED" && (
            <TextField
              label="Spouse Name"
              value={formValues.spouseName}
              onChange={(e) => handleFormChange("spouseName", e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
          )}

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

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
} from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../baseURL";

const PersonalInfo = ({ onComplete, disabled }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [personalDetails, setPersonalDetails] = useState(null);
  const [formValues, setFormValues] = useState({
    fullName: "",
    gender: "",
    dob: "",
    personalEmail: "",
    maritalStatus: "",
    spouseName: "",
  });

  const [error, setError] = useState("");

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
          dob: data.personalDetails.dob || "",
          personalEmail: data.personalDetails.personalEmail || "",
          maritalStatus: data.personalDetails.maritalStatus || "",
          spouseName: data.personalDetails.spouseName || "",
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
    if (!formValues.personalEmail.includes("@")) {
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
        formValues.maritalStatus === "Married" ? formValues.spouseName : null,
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
        alert("Details updated successfully!");
        setOpenModal(false); // Close the modal on success
        onComplete(); // Notify parent component when step is completed
      } else {
        setError("Failed to update details.");
      }
    } catch (error) {
      console.error("Error updating details:", error);
      setError("Failed to update personal details.");
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => handleCompleteStep("personal")}
        disabled={disabled} // Disable the button if the step is already completed
      >
        Complete Personal Info
      </Button>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
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

          {/* Date of Birth */}
          <TextField
            label="Date of Birth"
            value={formValues.dob}
            onChange={(e) => handleFormChange("dob", e.target.value)}
            fullWidth
            type="date"
            sx={{ marginBottom: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
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
              <MenuItem value="Single">Single</MenuItem>
              <MenuItem value="Married">Married</MenuItem>
              <MenuItem value="Divorced">Divorced</MenuItem>
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

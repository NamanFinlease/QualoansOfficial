import React, { useState } from "react";
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
import { LocationOn } from "@mui/icons-material"; // For Address Info Icon
import axios from "axios";
import { BASE_URL } from "../../baseURL";
import Swal from "sweetalert2";

const StepBox = ({ icon, title, description, onComplete, disabled }) => (
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
      cursor: disabled ? "not-allowed" : "pointer",
      textAlign: "left",
      background: "linear-gradient(45deg, #4D4D4E, orange)",
      color: "white",
      "@media (max-width: 600px)": {
        width: "80%",
        margin: "auto",
      },
    }}
  >
    <IconButton sx={{ color: "white", ml: 1 }} disabled={disabled}>
      {icon}
    </IconButton>
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
      disabled={disabled} // Disable the button if the step is completed
    >
      Start
    </Button>
  </Box>
);

const AddressInfo = ({ onComplete, disabled }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [formValues, setFormValues] = useState({
    address: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    residenceType: "OWNED",
  });
  const [error, setError] = useState("");
  const [isStepCompleted, setIsStepCompleted] = useState(false); // Track completion status

  const handleFormChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    if (error) setError(""); // Clear error on input change
  };

  const handleSubmit = async () => {
    // Check if any field is empty
    if (Object.values(formValues).some((val) => !val)) {
      setError("Please fill out all fields.");
      return;
    }

    setIsFetching(true);
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/user/currentResidence`,
        formValues,
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      console.log('Response:', response); // Log the response

      if (response.status >= 200 && response.status < 300) {
        Swal.fire("Address details updated successfully!");
        setOpenModal(false);
        setIsStepCompleted(true); // Mark step as completed
        onComplete?.();
      } else {
        setError("Failed to update address details.");
      }
    } catch (error) {
      console.error('API Error:', error); // Log the error
      setError("Error submitting address details. Please try again.");
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <>
      <StepBox
        icon={<LocationOn />}
        title="Address Information"
        description="Update your current residence details."
        onComplete={() => setOpenModal(true)}
        disabled={disabled || isStepCompleted} // Disable "Start" button if step is completed or if previous step is not completed
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
            mb: "20%",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Current Residence Information
          </Typography>

          {["address", "landmark", "pincode", "city", "state"].map((field) => (
            <TextField
              key={field}
              label={field.replace(/^\w/, (c) => c.toUpperCase())}
              value={formValues[field]}
              onChange={(e) => handleFormChange(field, e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
              required
            />
          ))}

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Residence Type</InputLabel>
            <Select
              value={formValues.residenceType}
              onChange={(e) => handleFormChange("residenceType", e.target.value)}
            >
              {["OWNED", "RENTED", "PARENTAL", "COMPANY PROVIDED", "OTHERS"].map(
                (type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>

          {error && <Typography color="error">{error}</Typography>}

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" color="secondary" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit} disabled={isFetching || isStepCompleted}>
              {isFetching ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AddressInfo;

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { BASE_URL } from "../baseURL";
import { getToken } from "../../tokenManager";

// Initialize SweetAlert with React content
const MySwal = withReactContent(Swal);


const DocumentUploadModal = () => {
  const token = getToken();
  const [formValues, setFormValues] = useState({
    salarySlip: null,
    aadhaarFront: null,
    aadhaarBack: null,
    panCard: null,
    otherType: "",
    otherDocument: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleFileChange = (field, file) => {
    setFormValues({ ...formValues, [field]: file });
  };

  const handleDropdownChange = (event) => {
    setFormValues({ ...formValues, otherType: event.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.salarySlips) newErrors.salarySlips = "Required";
    if (!formValues.aadhaarFront) newErrors.aadhaarFront = "Required";
    if (!formValues.aadhaarBack) newErrors.aadhaarBack = "Required";
    if (!formValues.panCard) newErrors.panCard = "Required";
    if (!formValues.otherType) newErrors.otherType = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    // Prepare form-data
    const formData = new FormData();
    formData.append("salarySlip", formValues.salarySlip);
    formData.append("aadhaarFront", formValues.aadhaarFront);
    formData.append("aadhaarBack", formValues.aadhaarBack);
    formData.append("panCard", formValues.panCard);
    if (formValues.otherType) {
      formData.append("type", formValues.otherType);
      formData.append("others", formValues.otherDocument);
    }

    setLoading(true);

    try {
      // const token =
      //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2UzZmQxMDczYjMxNTQyNjU3YTI3ZSIsImlhdCI6MTczNjMyNzEyMiwiZXhwIjoxNzM4OTE5MTIyfQ.SDrVOSRa2_x5RC6JBRtdL_yzxkZQPn61dJHmLpI4oQI";

      // Fetch the API using axios
      const response = await axios.patch(
        `${BASE_URL}/api/loanApplication/uploadDocuments`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization: `Bearer ${token}`, // Uncomment if token is needed
          },
          withCredentials: true, // Ensures that cookies are included with the request
        }
      );
      
      // Handle success response
      console.log("API response:", response.data);
      MySwal.fire({
        icon: "success",
        title: "Documents uploaded successfully",
      });
      MySwal.close();
    } catch (error) {
      // Handle error response
      console.error("Error uploading documents:", error);
      MySwal.fire({
        icon: "error",
        title: "Failed to upload documents",
        text: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const style = document.createElement("style");
  style.innerHTML = `
    .swal-custom-popup {
      background-color: #4D4D4E !important; /* Dark gray background */
      color: white !important; /* White text color */
      padding:0
    }
    .swal2-input {
      background-color: #4D4D4E !important; /* Input field background */
      color: white !important; /* Input text color */
      border: 1px solid #ddd !important;
    }
    .swal2-confirm {
      background-color: #007bff !important; /* Confirm button color */
      color: white !important;
    }
    .swal2-cancel {
      background-color: #f44336 !important; /* Cancel button color */
      color: white !important;
    }
  `;
  document.head.appendChild(style);

  return (
    <Box
  sx={{
    padding: 4,
    border: "2px solid #ddd",
    borderRadius: 3,
    maxWidth: 900,
    margin: "0 auto",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    background: "#4D4D4E",
  }}
>
  <Typography variant="h5" mb={2} sx={{ color: "white" }}>
    Upload Documents
  </Typography>

  <Grid container spacing={2}>
    {/* Salary Slips */}
    <Grid item xs={12}>
      <TextField
        fullWidth
        type="file"
        inputProps={{ accept: ".pdf" }}
        label="Upload Salary Slips (Last 3 Months)"
        placeholder="Last 3 Months (PDF only)"
        error={!!errors.salarySlips}
        helperText={errors.salarySlips}
        InputLabelProps={{ shrink: true }}
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "white",
            "& fieldset": { borderColor: "white" },
            "&:hover fieldset": { borderColor: "white" },
          },
          "& input": { color: "white" },
          label: { color: "white" },
        }}
        onChange={(e) => handleFileChange("salarySlips", e.target.files[0])}
      />
    </Grid>

    {/* Aadhaar Front */}
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        type="file"
        inputProps={{ accept: ".pdf,image/*" }}
        label="Aadhaar Front"
        placeholder="Upload PDF or Image"
        error={!!errors.aadhaarFront}
        helperText={errors.aadhaarFront}
        InputLabelProps={{ shrink: true }}
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "white",
            "& fieldset": { borderColor: "white" },
            "&:hover fieldset": { borderColor: "white" },
          },
          "& input": { color: "white" },
          label: { color: "white" },
        }}
        onChange={(e) => handleFileChange("aadhaarFront", e.target.files[0])}
      />
    </Grid>

    {/* Aadhaar Back */}
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        type="file"
        inputProps={{ accept: ".pdf,image/*" }}
        label="Aadhaar Back"
        placeholder="Upload PDF or Image"
        error={!!errors.aadhaarBack}
        helperText={errors.aadhaarBack}
        InputLabelProps={{ shrink: true }}
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "white",
            "& fieldset": { borderColor: "white" },
            "&:hover fieldset": { borderColor: "white" },
          },
          "& input": { color: "white" },
          label: { color: "white" },
        }}
        onChange={(e) => handleFileChange("aadhaarBack", e.target.files[0])}
      />
    </Grid>

    {/* PAN Card */}
    <Grid item xs={12}>
      <TextField
        fullWidth
        type="file"
        inputProps={{ accept: ".pdf,image/*" }}
        label="PAN Card"
        placeholder="Upload PDF or Image"
        error={!!errors.panCard}
        helperText={errors.panCard}
        InputLabelProps={{ shrink: true }}
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "white",
            "& fieldset": { borderColor: "white" },
            "&:hover fieldset": { borderColor: "white" },
          },
          "& input": { color: "white" },
          label: { color: "white" },
        }}
        onChange={(e) => handleFileChange("panCard", e.target.files[0])}
      />
    </Grid>

    {/* Other Document Type */}
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        select
        label="Other Document Type"
        placeholder="Select Document Type"
        value={formValues.otherType}
        onChange={handleDropdownChange}
        InputLabelProps={{ shrink: true }}
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "white",
            "& fieldset": { borderColor: "white" },
            "&:hover fieldset": { borderColor: "white" },
          },
          label: { color: "white" },
        }}
      >
        <MenuItem value="">None</MenuItem>
        <MenuItem value="Residential Address">Residential Address</MenuItem>
        <MenuItem value="Electricity Bill">Electricity Bill</MenuItem>
        <MenuItem value="Gas Connection">Gas Connection</MenuItem>
      </TextField>
    </Grid>

    {/* Other Document */}
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        type="file"
        inputProps={{ accept: ".pdf,image/*" }}
        label="Other Document (Optional)"
        placeholder="Upload PDF or Image"
        InputLabelProps={{ shrink: true }}
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "white",
            "& fieldset": { borderColor: "white" },
            "&:hover fieldset": { borderColor: "white" },
          },
          "& input": { color: "white" },
          label: { color: "white" },
        }}
        onChange={(e) => handleFileChange("otherDocument", e.target.files[0])}
      />
    </Grid>
  </Grid>

  {/* Submit and Cancel Buttons */}
  <Box mt={3} textAlign="right">
    <Button
      variant="outlined"
      onClick={() => MySwal.close()}
      sx={{ mr: 2, color: "white", borderColor: "white" }}
    >
      Cancel
    </Button>
    <Button
      variant="contained"
      onClick={handleSubmit}
      disabled={loading}
      sx={{ backgroundColor: "orange", color: "white" }}
      startIcon={loading && <CircularProgress size={20} />}
    >
      {loading ? "Submitting..." : "Submit"}
    </Button>
  </Box>
</Box>

  
  
  );
};

export default DocumentUploadModal;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { BASE_URL } from "../../baseURL";
import Swal from "sweetalert2";

const Employment = ({ onComplete, disabled, prefillData }) => {
  const [openModal, setOpenModal] = useState(false);
  const [formValues, setFormValues] = useState(prefillData || {});
  const [addressValues, setAddressValues] = useState({});
  const [stepData, setStepData] = useState({});
  const [stepCompleted, setStepCompleted] = useState(false);

  const openEmploymentModal = () => {
    if (disabled) return;

    const fields = [
      {
        label: "Are you working from Office or Home?",
        name: "workFrom",
        type: "select",
        options: ["OFFICE", "HOME"],
      },
      { label: "Company Name", name: "companyName", type: "text" },
      { label: "Company Type", name: "companyType", type: "text" },
      { label: "Your Designation", name: "designation", type: "text" },
      { label: "Office Email", name: "officeEmail", type: "email" },
      { label: "Office Address", name: "officeAddrress", type: "text" },
      { label: "Landmark", name: "landmark", type: "text" },
      { label: "City", name: "city", type: "text" },
      { label: "State", name: "state", type: "text" },
      { label: "Pincode", name: "pincode", type: "text" },
    ];

    setStepData({
      title: "Information about the Company",
      fields,
      onSubmit: handleEmploymentSubmit,
    });
    setOpenModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (stepData.fields.some((field) => field.name === name)) {
      setFormValues({ ...formValues, [name]: value });
    } else {
      setAddressValues({ ...addressValues, [name]: value });
    }
  };

  const handleEmploymentSubmit = async () => {
    try {
      if (
        !formValues.workFrom ||
        !formValues.companyName ||
        !formValues.companyType ||
        !formValues.designation ||
        !formValues.officeEmail
      ) {
        Swal.fire("All fields are required.");
        return;
      }

      const apiData = {
        ...formValues,
        ...addressValues,
      };

      const response = await axios.patch(
        `${BASE_URL}/api/loanApplication/addEmploymentInfo`,
        apiData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        Swal.fire("Employment information submitted successfully!");
        setStepCompleted(true);
        setOpenModal(false);

        if (onComplete) {
          onComplete(apiData); // Pass data back to the parent
        }
      } else {
        Swal.fire("Error submitting employment information.");
      }
    } catch (error) {
      Swal.fire("An error occurred while submitting the data.");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (prefillData) {
      setFormValues(prefillData);
      setStepCompleted(true);
    }
  }, [prefillData]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: 3,
          border: "1px solid #ddd",
          borderRadius: 3,
          background: disabled
            ? "#ccc"
            : stepCompleted
            ? "green" // Change the background color to green when the step is completed
            : "linear-gradient(45deg, #4D4D4E, orange)",
          cursor: disabled ? "not-allowed" : "pointer", // Disable the cursor if disabled
          height: 150,
          width: "1o0%",
          maxWidth: 350,
          transition: "all 0.3s",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            backgroundColor: disabled
              ? "#ccc"
              : stepCompleted
              ? "green" // Keep the green background on hover if the step is completed
              : "orange",
            color: disabled ? "white" : "black",
            transform: disabled ? "none" : "scale(1.03)",
          },
        }}
        onClick={openEmploymentModal}
      >
               <IconButton
          sx={{
            marginBottom: 1,
            color: "white",
            "&:hover": {
              backgroundColor: "white",
            },
          }}
          disabled={disabled}
        >
          {stepCompleted ? (
            <CheckCircleIcon sx={{ color: "white" }} />
          ) : (
        
          <AccountBalanceIcon />)}
        </IconButton>
        <Typography
          sx={{
            fontWeight: "bold",
            marginBottom: 1,
            color: "white",
          }}
        >
          Employment Information
        </Typography>
        <Typography variant="body2" sx={{ color: "white" }}>
          Provide details about your employment.
        </Typography>
      </Box>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>{stepData.title}</DialogTitle>
        <DialogContent>
          {stepData.fields?.map((field, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  onChange={handleInputChange}
                  value={formValues[field.name] || ""}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
                >
                  <option value="" disabled selected>
                    {field.label}
                  </option>
                  {field.options?.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <TextField
                  fullWidth
                  name={field.name}
                  label={field.label}
                  value={formValues[field.name] || ""}
                  onChange={handleInputChange}
                  variant="outlined"
                  margin="normal"
                  type={field.type}
                />
              )}
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEmploymentSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Employment;

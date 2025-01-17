import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { BASE_URL } from "../../baseURL";
import axios from "axios";
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
      disabled={disabled}
    >
      Start
    </Button>
  </Box>
);

const IncomeInfoForm = ({ onComplete, disabled }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [formValues, setFormValues] = useState({
    employementType: "",
    monthlyIncome: "",
    obligations: "",
    nextSalaryDate: "",
    incomeMode: "",
  });
  const [isStepCompleted, setIsStepCompleted] = useState(false);

  const [error, setError] = useState("");
  const [formCompleted, setFormCompleted] = useState(false);

  const handleFormChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    if (error) setError(""); // Clear error on input change
  };

  const handleSubmit = async () => {
    const {
      employementType,
      monthlyIncome,
      obligations,
      nextSalaryDate,
      incomeMode,
    } = formValues;

    if (!employementType || !monthlyIncome || !obligations || !nextSalaryDate || !incomeMode) {
      setError("Please fill out all fields.");
      return;
    }

    setIsFetching(true);
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/user/addIncomeDetails`,
        { employementType, monthlyIncome, obligations, nextSalaryDate, incomeMode },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      if (response.status === 200) {
        Swal.fire("Success", "Income details added successfully!", "success");
        setFormCompleted(true); // Mark the form as completed
        setIsStepCompleted(true); // Mark step as completed

        setOpenModal(false);
        if (onComplete) onComplete();
      } else {
        setError(response?.data?.message || "Failed to add income details.");
      }
    } catch (error) {
      setError(error.message || "An error occurred while adding income details.");
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <>
      <StepBox
        icon={<AccountBalanceWalletIcon />}
        title="Income Information"
        description="Please provide your income details."
        onComplete={() => setOpenModal(true)}
        disabled={disabled || isStepCompleted}
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
            Income Information
          </Typography>

          {/* Employment Type */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
              select
              label="Employee Type"
              value={formValues.employementType}
              onChange={(e) => handleFormChange("employementType", e.target.value)}
              fullWidth
              required
              variant="outlined"
              InputLabelProps={{
                shrink: true,
                style: { color: "#4D4D4E" },
              }}
              disabled={formCompleted}
            >
              <option value="SALARIED">Salaried</option>
              <option value="SELF EMPLOYED">Self-Employed</option>
            </TextField>
          </FormControl>

          {/* Monthly Income */}
          <TextField
            label="Monthly Income"
            type="number"
            value={formValues.monthlyIncome}
            onChange={(e) => handleFormChange("monthlyIncome", e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
            required
            variant="outlined"
            InputLabelProps={{
              shrink: true,
              style: { color: "#4D4D4E" },
            }}
            disabled={formCompleted}
          />

          {/* Obligations */}
          <TextField
            label="Loan Amount"
            type="number"
            value={formValues.obligations}
            onChange={(e) => handleFormChange("obligations", e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
            required
            variant="outlined"
            InputLabelProps={{
              shrink: true,
              style: { color: "#4D4D4E" },
            }}
            disabled={formCompleted}
          />

          {/* Next Salary Date */}
          <TextField
            label="Next Salary Date"
            type="date"
            value={formValues.nextSalaryDate}
            onChange={(e) => handleFormChange("nextSalaryDate", e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
            required
            variant="outlined"
            InputLabelProps={{
              shrink: true,
              style: { color: "#4D4D4E" },
            }}
            disabled={formCompleted}
          />

          {/* Income Mode */}
          <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            Mode of Income Received
          </Typography>
          <RadioGroup
            value={formValues.incomeMode}
            onChange={(e) => handleFormChange("incomeMode", e.target.value)}
            row
            disabled={formCompleted}
          >
            <FormControlLabel value="BANK" control={<Radio />} label="Bank" />
            <FormControlLabel value="CHEQUE" control={<Radio />} label="Cheque" />
            <FormControlLabel value="CASH" control={<Radio />} label="Cash" />
            <FormControlLabel value="OTHERS" control={<Radio />} label="Others" />
          </RadioGroup>

          {error && <Typography color="error">{error}</Typography>}

          {/* Actions */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" color="secondary" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit} disabled={isFetching || formCompleted}>
              {isFetching ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default IncomeInfoForm;

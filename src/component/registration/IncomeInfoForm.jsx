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
} from "@mui/material";
import axios from "axios";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { BASE_URL } from "../../baseURL";

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
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const {
      employementType,
      monthlyIncome,
      obligations,
      nextSalaryDate,
      incomeMode,
    } = formValues;

    // Validation
    if (
      !employementType ||
      !monthlyIncome ||
      !obligations ||
      !nextSalaryDate ||
      !incomeMode
    ) {
      setError("Please fill out all fields.");
      return;
    }

    setIsFetching(true);

    try {
      const response = await axios.patch(
        `${BASE_URL}/api/user/addIncomeDetails`,
        {
          employementType,
          monthlyIncome,
          obligations,
          nextSalaryDate,
          incomeMode,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert("Income details added successfully!");
        setOpenModal(false); // Close the modal on success
        if (onComplete) onComplete(); // Notify parent component when income info is updated
      } else {
        setError(response?.data?.message || "Failed to add income details.");
      }
    } catch (error) {
      setError(
        error.message || "An error occurred while adding income details."
      );
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpenModal(true)}
        disabled={disabled} // Disable the button if the step is already completed
      >
        <AccountBalanceWalletIcon /> Income Info
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
            Income Information
          </Typography>

          {/* Employment Type */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
              select
              label="Employee Type"
              value={formValues.employementType}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  employementType: e.target.value,
                }))
              }
              fullWidth
              required
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
            onChange={(e) =>
              setFormValues((prev) => ({
                ...prev,
                monthlyIncome: e.target.value,
              }))
            }
            fullWidth
            sx={{ marginBottom: 2 }}
            required
          />

          {/* Obligations */}
          <TextField
            label="Obligations"
            type="number"
            value={formValues.obligations}
            onChange={(e) =>
              setFormValues((prev) => ({
                ...prev,
                obligations: e.target.value,
              }))
            }
            fullWidth
            sx={{ marginBottom: 2 }}
          />

          {/* Next Salary Date */}
          <TextField
            label="Next Salary Date"
            type="date"
            value={formValues.nextSalaryDate}
            onChange={(e) =>
              setFormValues((prev) => ({
                ...prev,
                nextSalaryDate: e.target.value,
              }))
            }
            fullWidth
            sx={{ marginBottom: 2 }}
            required
          />

          {/* Income Mode */}
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", marginBottom: 2 }}
          >
            Mode of Income Received
          </Typography>
          <RadioGroup
            value={formValues.incomeMode}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, incomeMode: e.target.value }))
            }
            row
            required
          >
            <FormControlLabel value="BANK" control={<Radio />} label="Bank" />
            <FormControlLabel
              value="CHEQUE"
              control={<Radio />}
              label="Cheque"
            />
            <FormControlLabel value="CASH" control={<Radio />} label="Cash" />
            <FormControlLabel
              value="OTHERS"
              control={<Radio />}
              label="OTHERS"
            />
          </RadioGroup>

          {/* Error message */}
          {error && <Typography color="error">{error}</Typography>}

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

export default IncomeInfoForm;

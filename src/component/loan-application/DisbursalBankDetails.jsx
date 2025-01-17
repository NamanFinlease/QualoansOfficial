import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Button,
  TextField,
  Select,
  MenuItem,
  Modal,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SweetAlert from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { BASE_URL } from "../../baseURL";

const MySwal = withReactContent(SweetAlert);

const DisbursalBankDetails = ({ onComplete, disabled, prefillData }) => {
  const [stepCompleted, setStepCompleted] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [formValues, setFormValues] = useState({
    accountNumber: prefillData?.accountNumber || "",
    confirmAccountNo: prefillData?.confirmAccountNo || "",
    ifscCode: prefillData?.ifscCode || "",
    bankName: prefillData?.bankName || "",
    accountType: prefillData?.accountType || "",
  });

  useEffect(() => {
    if (stepCompleted) {
      onComplete(formValues); // Pass form values to the parent when the step is completed
    }
  }, [stepCompleted, formValues, onComplete]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { accountNumber, confirmAccountNo, ifscCode, bankName, accountType } =
      formValues;

    // Validation
    if (
      !accountNumber ||
      !confirmAccountNo ||
      !ifscCode ||
      !bankName ||
      !accountType
    ) {
      MySwal.fire({
        icon: "error",
        title: "Oops!",
        text: "All fields are required.",
      });
      return;
    }

    if (accountNumber !== confirmAccountNo) {
      MySwal.fire({
        icon: "error",
        title: "Oops!",
        text: "Account numbers do not match.",
      });
      return;
    }

    try {
      const response = await axios.patch(
        `${BASE_URL}/api/loanApplication/disbursalBankDetails`,
        formValues,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setStepCompleted(true);
        setOpenModal(false);
        MySwal.fire({
          icon: "success",
          title: "Success",
          text: "Bank details saved successfully!",
        });
      } else {
        MySwal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to submit your bank details.",
        });
      }
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while saving the bank details.",
      });
    }
  };

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
            : "linear-gradient(45deg, #4D4D4E, orange)",
          cursor: disabled ? "not-allowed" : "pointer", // Disable the cursor if disabled
          height: 180,
          width: "100%",
          maxWidth: 350,
          transition: "all 0.3s",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            backgroundColor: disabled ? "#ccc" : "orange",
            color: disabled ? "white" : "black",
            transform: disabled ? "none" : "scale(1.03)",
          },
        }}
        onClick={!disabled ? () => setOpenModal(true) : null}
      >
        <IconButton
          disabled={disabled || stepCompleted}
          sx={{
            marginBottom: 1,
            backgroundColor: "#4D4D4E",
            color: "white",
            "&:hover": {
              backgroundColor: "white",
            },
          }}
        >
          {stepCompleted ? (
            <CheckCircleIcon color="success" />
          ) : (
            <AccountBalanceWalletIcon />
          )}
        </IconButton>
        <Box sx={{ textAlign: "left", width: "100%" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginBottom: 1,
              color: "white",
            }}
          >
            Disbursal Bank Details
          </Typography>
          <Typography variant="body2" sx={{ color: "white" }}>
            Share your disbursal bank details
          </Typography>
        </Box>
      </Box>

      {/* Modal for Bank Details */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            minWidth: 400,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Disbursal Bank Details
          </Typography>
          <TextField
            fullWidth
            label="Account Number"
            name="accountNumber"
            value={formValues.accountNumber}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Confirm Account Number"
            name="confirmAccountNo"
            value={formValues.confirmAccountNo}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="IFSC Code"
            name="ifscCode"
            value={formValues.ifscCode}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Bank Name"
            name="bankName"
            value={formValues.bankName}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <Select
            fullWidth
            name="accountType"
            value={formValues.accountType}
            onChange={handleInputChange}
            displayEmpty
            sx={{ mb: 2 }}
          >
            <MenuItem value="" disabled>
              Select Account Type
            </MenuItem>
            <MenuItem value="SAVINGS">Savings</MenuItem>
            <MenuItem value="CURRENT">Current</MenuItem>
          </Select>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default DisbursalBankDetails;

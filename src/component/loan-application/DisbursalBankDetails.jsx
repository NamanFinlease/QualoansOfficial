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
import CompletionImage from "../../assets/image/vidu-general-4-2025-01-18T06_43_27Z (1).gif";
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(SweetAlert);

const DisbursalBankDetails = ({ onComplete, disabled, prefillData }) => {
  const [stepCompleted, setStepCompleted] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [completionModalOpen, setCompletionModalOpen] = useState(false); // For the new modal
  const navigate = useNavigate(); // To navigate to other pages
  const [formValues, setFormValues] = useState({
    accountNumber: prefillData?.accountNumber || "",
    confirmAccountNo: prefillData?.confirmAccountNo || "",
    ifscCode: prefillData?.ifscCode || "",
    bankName: prefillData?.bankName || "",
    accountType: prefillData?.accountType || "",
  });

  useEffect(() => {
    if (stepCompleted) {
      onComplete(formValues);
    }
  }, [stepCompleted, formValues, onComplete]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { accountNumber, confirmAccountNo, ifscCode, bankName, accountType } =
      formValues;

    if (!accountNumber || !confirmAccountNo || !ifscCode || !bankName || !accountType) {
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
        setCompletionModalOpen(true); // Open the completion modal
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

  const handleModalClose = () => {
    setCompletionModalOpen(false);
    navigate("/ourjourney"); // Navigate to the desired page
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
            : stepCompleted
            ? "green"
            : "linear-gradient(45deg, #4D4D4E, orange)",
          cursor: disabled ? "not-allowed" : "pointer",
          height: 150,
          width: "100%",
          maxWidth: 350,
          transition: "all 0.3s",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            backgroundColor: disabled
              ? "#ccc"
              : stepCompleted
              ? "green"
              : "orange",
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
            color: "white",
            "&:hover": {
              backgroundColor: "white",
            },
          }}
        >
          {stepCompleted ? (
            <CheckCircleIcon sx={{ color: "white" }} />
          ) : (
            <AccountBalanceWalletIcon />
          )}
        </IconButton>
        <Box sx={{ textAlign: "left", width: "100%" }}>
          <Typography sx={{ fontWeight: "bold", marginBottom: 1, color: "white" }}>
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
          <Typography sx={{ mb: 2 }}>Disbursal Bank Details</Typography>
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
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                backgroundColor: "orange",
                "&:hover": {
                  backgroundColor: "#ff7f00",
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Completion Modal */}
      <Modal
        open={completionModalOpen}
        onClose={handleModalClose}
        aria-labelledby="loan-completion-modal"
        aria-describedby="loan-completion-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            borderRadius: 4,
            boxShadow: 24,
            textAlign: "center",
          }}
        >
          <img
            src={CompletionImage}
            alt="Loan Completion"
            style={{ width: "100%", marginBottom: "20px" }}
          />
          <Typography id="loan-completion-modal-description" sx={{ mt: 2 }}>
            Process is completed! You are eligible for the loan.
          </Typography>
          <Button
            onClick={handleModalClose}
            sx={{
              borderRadius: 50,
              px: 4,
              mb: 5,
              mt: 2,
              backgroundColor: "orange",
              color: "white",
              "&:hover": {
                backgroundColor: "#4D4D4E",
              },
            }}
          >
            Completed
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default DisbursalBankDetails;

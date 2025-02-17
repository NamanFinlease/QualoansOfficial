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
import { animate } from "framer-motion";

const MySwal = withReactContent(SweetAlert);

const DisbursalBankDetails = ({
  onComplete,
  disabled,
  prefillData,
  isUploaded,
}) => {
  const [stepCompleted, setStepCompleted] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [completionModalOpen, setCompletionModalOpen] = useState(false); // For the new modal
  const navigate = useNavigate(); // To navigate to other pages
  const [formValues, setFormValues] = useState({
    beneficiaryName: prefillData?.beneficiaryName || "",
    accountNumber: prefillData?.accountNumber || "",
    confirmAccountNo: prefillData?.confirmAccountNo || "",
    ifscCode: prefillData?.ifscCode || "",
    branchName: prefillData?.branchName || "",
    bankName: prefillData?.bankName || "",
    accountType: prefillData?.accountType || "",
  });

  useEffect(() => {
    if (stepCompleted) {
      onComplete(formValues);
    }
  }, [stepCompleted, formValues, onComplete]);

  useEffect(() => {
    if (formValues.ifscCode.length === 11) {
      fetchBankDetails(formValues.ifscCode);
    }
  }, [formValues.ifscCode]);

  const fetchBankDetails = async (ifscCode) => {
    try {
      const response = await axios.get(`https://ifsc.razorpay.com/${ifscCode}`);
      setFormValues((prev) => ({
        ...prev,
        bankName: response.data.BANK,
        branchName: response.data.BRANCH,
      }));
    } catch (error) {
      console.error("Error fetching bank details", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { accountNumber, confirmAccountNo, ifscCode, bankName, accountType } =
      formValues;

    if (
      !accountNumber ||
      !confirmAccountNo ||
      !ifscCode ||
      !bankName ||
      !accountType
    ) {
      alert("Oops! All fields are required.");

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
        `${BASE_URL}/disbursalBankDetails`,
        formValues,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("response", response);

      if (response.status === 200) {
        setStepCompleted(true);
        setOpenModal(false);
        setCompletionModalOpen(true); // Open the completion modal
      } else {
        alert("Error submitting bank details");
        setOpenModal(false);
      }
    } catch (error) {
      // console.log("Error submitting bank details:", error);
      // setError(error);
      alert(error.response.data.message);

      // Show error message
    }
  };

  const handleModalClose = () => {
    setCompletionModalOpen(false);
    navigate("/ourjourney"); // Navigate to the desired page
  };

  const handleModalClick = async () => {
    setOpenModal(true);
    setIsLoading(true);

    try {
      const getDashboardDetailsResponse = await axios.get(
        `${BASE_URL}/getDashboardDetails`,
        {
          withCredentials: true,
        }
      );

      if (getDashboardDetailsResponse.status === 200) {
        setIsLoading(false);

        const { isDisbursalDetailsSaved } = getDashboardDetailsResponse.data;

        // Set the value of isAddressVerified based on the fetched response
        setStepCompleted(isDisbursalDetailsSaved);

        // if (isDisbursalDetailsSaved) {
        console.log("isDisbursalDetailsSaved", isDisbursalDetailsSaved);

        const getProfileDetailsResponse = await axios.get(
          `${BASE_URL}/getApplicationDetails?applicationStatus=disbursalBankDetails`,
          {
            withCredentials: true,
          }
        );

        const EmpData = getProfileDetailsResponse?.data?.data;
        console.log("getProfileDetailsResponse", EmpData);

        // Update formValues with residenceData
        setFormValues({
          beneficiaryName: EmpData?.beneficiaryName || "",
          accountNumber: EmpData?.accountNumber || "",
          confirmAccountNo: EmpData?.confirmAccountNo || "",
          ifscCode: EmpData?.ifscCode || "",
          branchName: EmpData?.branchName || "",
          bankName: EmpData?.bankName || "",
          accountType: EmpData?.accountType || "",
        });
        // }
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Box
        // sx={{
        //   display: "flex",
        //   flexDirection: "column",
        //   alignItems: "flex-start",
        //   padding: 3,
        //   border: "1px solid #ddd",
        //   borderRadius: 3,
        //   background: disabled
        //     ? "#ccc"
        //     : stepCompleted
        //     ? "green"
        //     : "linear-gradient(45deg, #4D4D4E, orange)",
        //   cursor: disabled ? "not-allowed" : "pointer",
        //   height: 150,
        //   width: "100%",
        //   maxWidth: 350,
        //   transition: "all 0.3s",
        //   boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        //   "&:hover": {
        //     backgroundColor: disabled
        //       ? "#ccc"
        //       : stepCompleted
        //       ? "green"
        //       : "orange",
        //     color: disabled ? "white" : "black",
        //     transform: disabled ? "none" : "scale(1.03)",
        //   },
        // }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 2,
          borderColor:
            // completed ? "green" :
            disabled ? "#1c1c1c" : "#F26722",
          borderRadius: 3,
          margin: 1,
          width: "25%",
          minWidth: 200,
          cursor: disabled ? "not-allowed" : "pointer",
          textAlign: "left",
          background:
            //  completed
            //   ? "linear-gradient(45deg, #28a745, #218838)" // Green gradient when step is complete
            //   :
            disabled ? "#d9d9d9" : "#F26722",
          color:
            //  completed ||
            !disabled ? "white" : "#1c1c1c",
          "@media (max-width: 600px)": {
            width: "80%",
            margin: "auto",
          },
        }}
        onClick={!disabled && handleModalClick}
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
          {(stepCompleted || isUploaded) && !disabled ? (
            <CheckCircleIcon sx={{ color: "#4caf50" }} />
          ) : (
            <AccountBalanceWalletIcon />
          )}
        </IconButton>
        <Box sx={{ textAlign: "left", width: "100%" }}>
          <Typography
            sx={{ fontWeight: "bold", marginBottom: 1, color: "white" }}
          >
            Bank Details
          </Typography>
          <Typography variant="body2" sx={{ color: "white" }}>
            Share your bank details
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
            maxHeight: "80vh", // Limit height to 80% of the viewport
            overflow: "auto", // Enable scroll if content overflows
          }}
        >
          <Typography sx={{ mb: 2 }}> Bank Details</Typography>

          <TextField
            fullWidth
            label="Beneficiary Name"
            name="beneficiaryName"
            value={
              formValues.beneficiaryName || prefillData?.beneficiaryName || ""
            }
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />

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
            label="Branch Name"
            name="branchName"
            value={formValues.branchName || prefillData?.branchName || ""}
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
            <MenuItem value="OVERDRAFT">Overdraft</MenuItem>
          </Select>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                backgroundColor: "#F26722",
                color: "white",
                // "&:hover": {
                //   backgroundColor: "#ff7f00",
                // },
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
            overflow: "auto", // Enable scroll if content overflows
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            borderRadius: 4,
            boxShadow: 24,
            textAlign: "center",
            maxHeight: "80vh", // Limit height to 80% of the viewport
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

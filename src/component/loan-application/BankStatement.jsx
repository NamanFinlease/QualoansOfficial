import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import SweetAlert from "sweetalert2";
import { BASE_URL } from "../../baseURL";

const BankStatement = ({ onComplete, disabled, prefillData }) => {
  const [bankStatement, setBankStatement] = useState(prefillData || null);
  const [stepCompleted, setStepCompleted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleOpenModal = () => {
    if (!disabled) setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setBankStatement(prefillData || null); // Reset upload state if closed
  };

  const handleBankStatementUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBankStatement(file); // Set the uploaded file in the state
      setStepCompleted(true); // Mark the step as completed
    }
  };

  const handleSubmit = async () => {
    if (!bankStatement) {
      SweetAlert.fire(
        "Error",
        "Please upload a bank statement first.",
        "error"
      );
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("bankStatement", bankStatement); // Key "bankStatement"

      const response = await fetch(`${BASE_URL}/uploadDocuments`, {
        method: "PATCH",
        body: formData,
        credentials: "include",
      });

      console.log("hhhb", response);

      if (response.ok) {
        const responseData = await response.json();
        onComplete({ bankStatement }); // Notify parent that upload is complete
        SweetAlert.fire(
          "Success",
          "Bank statement uploaded successfully!",
          "success"
        );
      } else {
        const errorData = await response.json();
        SweetAlert.fire(
          "Error",
          errorData.message || "Unexpected error occurred.",
          "error"
        );
      }
    } catch (error) {
      SweetAlert.fire(
        "Error",
        error.message || "An error occurred while uploading.",
        "error"
      );
    } finally {
      setIsUploading(false);
      setIsModalOpen(false); // Close the modal after successful upload
    }
  };

  const handleDelete = () => {
    setBankStatement(null); // Reset uploaded file
    setStepCompleted(false); // Reset step completion
  };

  const handleModalClick = async () => {
    setIsModalOpen(true);
    setIsUploading(true);

    try {
      const getDashboardDetailsResponse = await axios.get(
        `${BASE_URL}/getDashboardDetails`,
        {
          withCredentials: true,
        }
      );

      console.log(
        "getDashboardDetailsResponse >>> ",
        getDashboardDetailsResponse
      );

      if (getDashboardDetailsResponse.status === 200) {
        setIsUploading(false);

        const { isEmploymentDetailsSaved } = getDashboardDetailsResponse.data;

        setStepCompleted(isEmploymentDetailsSaved);

        if (isEmploymentDetailsSaved) {
          console.log("isEmploymentDetailsSaved", isEmploymentDetailsSaved);

          const getProfileDetailsResponse = await axios.get(
            `${BASE_URL}/getDocumentStatus`,
            {
              withCredentials: true,
            }
          );

          // Axios does not use response.ok, check status instead
          if (getProfileDetailsResponse.status !== 200) {
            throw new Error("Failed to fetch document data");
          }

          // Extract data from the response
          const data = getProfileDetailsResponse.data;

          setFormValues(data.singleDocumentsStatus || []);
        }
      }
    } catch (error) {
      setIsUploading(false); // Change from setIsLoading(false) to setIsUploading(false) for consistency
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      {/* Main Upload Box */}
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
        //     ? "green" // Change the background color to green when the step is completed
        //     : "linear-gradient(45deg, #4D4D4E, orange)",
        //   cursor: disabled ? "not-allowed" : "pointer", // Disable the cursor if disabled
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
        onClick={handleModalClick} // Trigger modal on click instead of upload
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
            <DescriptionIcon />
          )}
        </IconButton>
        <Box sx={{ textAlign: "left", width: "100%" }}>
          <Typography
            sx={{
              fontWeight: "bold",
              marginBottom: 1,
              color: "white",
            }}
          >
            Upload Bank Statement
          </Typography>
          <Typography variant="body2" sx={{ color: "white" }}>
            Share your bank statement(last 6 month)
          </Typography>
        </Box>
      </Box>

      {/* Modal for Upload */}
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Upload Bank Statement
          <IconButton
            onClick={handleCloseModal}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Please upload your bank statement in PDF, JPG, or PNG format.
          </Typography>
          <Button
            variant="contained"
            component="label"
            disabled={isUploading}
            sx={{ marginBottom: 2, bgcolor: "#4D4D4E" }}
          >
            {isUploading ? "Uploading..." : "Choose File"}
            <input
              type="file"
              hidden
              accept=".pdf,.jpg,.png"
              onChange={handleBankStatementUpload} // Just handle the file selection
            />
          </Button>
          {bankStatement && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ flexGrow: 1 }}
              >
                Uploaded File: {bankStatement.name}
              </Typography>
              <IconButton onClick={handleDelete} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="error">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit} // Call submit function here
            disabled={!bankStatement || isUploading}
            variant="contained"
            sx={{
              backgroundColor: "orange",
              "&:hover": {
                backgroundColor: "#FF7043", // Optional: darker shade for hover effect
              },
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BankStatement;

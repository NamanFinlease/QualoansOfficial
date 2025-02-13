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
// import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";

const BankStatement = ({ onComplete, disabled, prefillData }) => {
  const [bankStatement, setBankStatement] = useState(prefillData || null);
  const [stepCompleted, setStepCompleted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formValues, setFormValues] = useState(false);
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
      // Check file type
      const validFileTypes = ["application/pdf"];
      if (!validFileTypes.includes(file.type)) {
        SweetAlert.fire(
          "Error",
          "Please upload a valid file (PDF, JPG, PNG).",
          "error"
        );
        return;
      }

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
        "getDashboardDetailsResponse.data",
        getDashboardDetailsResponse
      ); // Add this line to inspect the response

      if (getDashboardDetailsResponse.status === 200) {
        setIsUploading(false);

        const { isEmploymentDetailsSaved } = getDashboardDetailsResponse.data;
        setStepCompleted(isEmploymentDetailsSaved);

        if (isEmploymentDetailsSaved) {
          const getProfileDetailsResponse = await axios.get(
            `${BASE_URL}/getDocumentStatus`,
            {
              withCredentials: true,
            }
          );

          if (getProfileDetailsResponse.status !== 200) {
            throw new Error("Failed to fetch document data");
          }

          const data = getProfileDetailsResponse.data;
          setFormValues(data.singleDocumentsStatus || []);
        }
      }
    } catch (error) {
      setIsUploading(false);
      console.error("Error fetching data:", error);
    }
  };

  // const handlePreview = async (docId, docType) => {
  //   const apiUrl = `${BASE_URL}/api/loanApplication/documentPreview?docType=${docType}&docId=${docId}`;

  //   try {
  //     const response = await axios.get(apiUrl, { withCredentials: true });
  //     if (response.data && response.data.url) {
  //       window.open(response.data.url, "_blank"); // Open document preview in new tab
  //     } else {
  //       throw new Error("URL not found in the response");
  //     }
  //   } catch (error) {
  //     SweetAlert.fire({
  //       icon: "error",
  //       title: "Failed to load document preview",
  //       text: error.response?.data?.message || "Something went wrong",
  //     });
  //   }
  // };

  return (
    <>
      {/* Main Upload Box */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 2,
          borderColor: disabled ? "#1c1c1c" : "#F26722",
          borderRadius: 3,
          margin: 1,
          width: "25%",
          minWidth: 200,
          cursor: disabled ? "not-allowed" : "pointer",
          textAlign: "left",
          background: disabled ? "#d9d9d9" : "#F26722",
          color: !disabled ? "white" : "#1c1c1c",
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
            Share your bank statement (last 6 months)
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
              onChange={handleBankStatementUpload}
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
              {/* <IconButton
                onClick={() => (
                  <IconButton
                    onClick={
                      () => handlePreview(bankStatement.name, "pdf") // Adjust "pdf" based on the actual file type
                    }
                    color="primary"
                  >
                    <VisibilityIcon />
                  </IconButton>
                )}
                color="primary"
              >
                <VisibilityIcon />
              </IconButton> */}
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
            onClick={handleSubmit}
            disabled={!bankStatement || isUploading}
            variant="contained"
            sx={{
              backgroundColor: "orange",
              "&:hover": {
                backgroundColor: "#FF7043",
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

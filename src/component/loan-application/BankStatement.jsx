import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import withReactContent from "sweetalert2-react-content";

import SweetAlert from "sweetalert2";
import { BASE_URL } from "../../baseURL";
import axios from "axios";

const MySwal = withReactContent(SweetAlert);

const BankStatement = ({ onComplete, disabled, prefillData, isUploaded }) => {
  const [bankStatement, setBankStatement] = useState(prefillData || null);
  const [stepCompleted, setStepCompleted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formValues, setFormValues] = useState(false);
  const [bankStatementUploaded, setBankStatementUploaded] = useState(false);

  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [password, setPassword] = useState("");

  const handleCheckboxChange = (event) => {
    setIsPasswordProtected(event.target.checked);
    if (!event.target.checked) {
      setPassword(""); // Reset password field if unchecked
    }
  };

  useEffect(() => {
    // if (isDocUploaded || isUploadSuccess) {
    const fetchDocumentList = async () => {
      const documentListResponse = await axios.get(
        `${BASE_URL}/getDocumentList`,
        { withCredentials: true }
      );
      console.log(
        "documentListResponse zsdss",
        documentListResponse.data.documents
      );
      const data = documentListResponse.data.documents;
      const result = {};
      console.log(" res asdasda >>> ?? ", data);

      const requiredTypes = ["bankStatement"];

      const hasAllRequired = requiredTypes.every((type) =>
        data.some((item) => item.type === type)
      );

      console.log("hasAllRequired", hasAllRequired);

      if (hasAllRequired) {
        console.log("uploaded");
        // onComplete({ success: true, data: null });
      }

      // const requiredNames = ["salarySlip_1", "salarySlip_2", "salarySlip_3"];

      // for (const item of data) {
      //   if (requiredNames.includes(item.name) && !result[item.name]) {
      //     result[item.name] = item;
      //   }
      // }

      // const firstOccurrencesArray = Object.values(result);
      // setFirstOccurrences(firstOccurrencesArray);

      // setFormValues((prev) => ({
      //   ...prev,
      //   salarySlip: data.filter((doc) => doc.type === "salarySlip"),
      //   aadhaarFront: data.find((doc) => doc.type === "aadhaarFront"),
      //   aadhaarBack: data.find((doc) => doc.type === "aadhaarBack"),
      //   panCard: data.find((doc) => doc.type === "panCard"),
      //   others: data.filter((doc) => doc.type === "others"),
      // }));
    };
    fetchDocumentList();
    // }
  }, []);

  // const handlePreview = async (docId, docType) => {
  //   console.log("Previewing document:", docId, docType);
  //   // const docType = "salarySlip";
  //   const apiUrl = `${BASE_URL}/documentPreview?docType=${docType}&docId=${docId}`;
  //   try {
  //     const response = await axios.get(apiUrl, { withCredentials: true });
  //     console.log("Preview data:", response.data);
  //     if (response.data && response.data.url) {
  //       // Redirect to the URL
  //       // window.location.href = response.data.url;
  //       window.open(response.data.url, "_blank");
  //     } else {
  //       throw new Error("URL not found in the response");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching document preview:", error);
  //     MySwal.fire({
  //       icon: "error",
  //       title: "Failed to load document preview",
  //       text: error.response?.data?.message || "Something went wrong",
  //     });
  //   }
  // };

  // useEffect(() => {
  //   handlePreview();
  // }, []);

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

      console.log("hhhb", response);

      if (response.status === 200) {
        const responseData = await response.json();
        onComplete({ bankStatement }); // Notify parent that upload is complete
        setBankStatementUploaded(true);
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

        // if (isUploaded) {
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
        // }
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
        onClick={!disabled && handleModalClick} // Trigger modal on click instead of upload
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
          {isUploaded || bankStatementUploaded ? (
            <CheckCircleIcon sx={{ color: "green" }} />
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
            Please upload your bank statement in PDF format only.
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
              accept=".pdf"
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

          {/* Password Protection Checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                checked={isPasswordProtected}
                onChange={handleCheckboxChange}
                color="primary"
              />
            }
            label="Is this file password protected?"
            sx={{ marginTop: 2 }}
          />

          {/* Password Input Field (Visible only if checkbox is checked) */}
          {isPasswordProtected && (
            <TextField
              label="Enter Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={{ marginTop: 2 }}
              required
            />
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

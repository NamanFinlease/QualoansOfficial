import React, { useEffect, useRef, useState } from "react";
import {
  Typography,
  Button,
  Box,
  IconButton,
  Checkbox,
  TextField,
  CircularProgress,
  Tooltip,
  useTheme,
  Alert,
  MenuItem,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
// import { useUploadDocumentsMutation } from "../Service/Query";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import DocumentsTable from "./DocumentsTable";
import axios from "axios";
import { BASE_URL } from "../baseURL";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";

const UploadDocuments = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef();
  //   const { empInfo, activeRole } = useAuthStore();
  const [uploadedDocs, setUploadedDocs] = useState();
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [selectedDocType, setSelectedDocType] = useState(null);
  const [fileInputs, setFileInputs] = useState([{ file: null, remarks: "" }]);
  const [documents, setDocuments] = useState({
    aadhaarFront: null,
    aadhaarBack: null,
    panCard: null,
    salarySlip: [],
    bankStatement: [],
  });
  const [formValues, setFormValues] = useState({
    salarySlip: [],
    aadhaarFront: null,
    aadhaarBack: null,
    panCard: null,
    others: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDocUploaded, setIsDocUploaded] = useState(false);
  const [isUploadSuccess, setIsUploadSuccess] = useState(0);
  const [firstOccurrences, setFirstOccurrences] = useState([]);
  const [requiredSalarySlips] = useState(3);
  const [requiredField, setRequiredField] = useState(false);
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const getPreviousData = async () => {
      const getDashboardDetailsResponse = await axios.get(
        `${BASE_URL}/getDashboardDetails`,
        { withCredentials: true }
      );
    

      if (getDashboardDetailsResponse.data.success) {
        const { isDocumentUploaded } = getDashboardDetailsResponse.data;
        setIsDocUploaded(isDocumentUploaded);
      }
    };
    getPreviousData();
  }, []);

  // Color theme
  const theme = useTheme();

  // Handle file selection
  const handleFileChange = (index, event) => {
    const selectedFile = event.target.files[0];
    event.target.value = null;
    setFileInputs((prevFileInputs) => {
      const newFileInputs = [...prevFileInputs];
      newFileInputs[index].file = selectedFile;
      return newFileInputs;
    });
    setSelectedDocuments((prevFileInputs) => ({
      ...prevFileInputs,
      file: selectedFile,
    }));
  };

  //

  // Handle remarks input
  const handleRemarksChange = (index, event) => {
    const { value } = event.target;
    setFileInputs((prevFileInputs) => {
      const newFileInputs = [...prevFileInputs];
      newFileInputs[index].remarks = value;
      return newFileInputs;
    });
    setSelectedDocuments((prevFileInputs) => ({
      ...prevFileInputs,
      remarks: value,
    }));
  };

  // Add new file input
  const handleAddFileInput = () => {
    const lastInput = fileInputs[fileInputs.length - 1];
    if (!lastInput || !lastInput.file) {
      Swal.fire(
        "Warning!",
        "Please select a file for the current input before adding a new one.",
        "warning"
      );
      return;
    }
    setFileInputs([...fileInputs, { file: null, remarks: "" }]);
  };

  // Remove file input
  const handleRemoveFileInput = (index) => {
    const updatedInputs = fileInputs.filter((_, i) => i !== index);
    setFileInputs(updatedInputs);
  };

  useEffect(() => {
    const fetchLoans = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/loanList`, {
          withCredentials: true,
        });

        setLoans(response?.data?.loanList[0]?.isClosed);
      } catch (error) {
        console.error("Error fetching loans:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoans();
  }, []); // Ensure dependencies are correctly managed

  const handleSubmit = async () => {
    setIsLoading(true);
    const hasFileSelected = fileInputs.some((input) => input.file);
    setIsLoading(false);
    if (!hasFileSelected) {
      alert("Please select at least one file to upload.");
      return;
    }

    const formData = new FormData();

    // Prepare data to be sent to the FormData
    fileInputs.forEach((input, index) => {
      console.log("input ??? ", input);
      if (input.file) {
        formData.append(`${selectedDocType}`, input.file); // Append file to formData
        formData.append(`remarks`, input.remarks); // Append remarks to formData
      }
    });

    try {
      const response = await axios.patch(
        `${BASE_URL}/uploadDocuments`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      // console.log("Response data:", response.data);

      console.log("REs >>> ", response);

      if (response.status === 200) {
        setIsUploadSuccess(isUploadSuccess + 1);
        Swal.fire({
          title: "Success!",
          text: "Documents uploaded successfully!",
          icon: "success",
          width: window.innerWidth <= 600 ? "90%" : "30%", // 90% width on mobile, 30% on desktop
          padding: window.innerWidth <= 600 ? "1rem" : "2rem", // Adjust padding for mobile
          confirmButtonColor: "#FFA500", // Orange confirm button
          customClass: {
            popup: "custom-popup-responsive",
            confirmButton: "confirm-button-orange",
          },
          didOpen: () => {
            const popup = document.querySelector(".swal2-popup");

            if (popup) {
              popup.style.marginTop =
                window.innerWidth <= 600 ? "20px" : "50px"; // Reduce margin for mobile
              popup.style.fontSize = window.innerWidth <= 600 ? "14px" : "16px"; // Smaller font on mobile
            }
          },
        });
        setFormValues({
          salarySlip: [],
          aadhaarFront: null,
          aadhaarBack: null,
          panCard: null,
          others: [],
        });
        setFileInputs([{ file: null, remarks: "" }]); // Reset file inputs
        setSelectedDocType(null);
        setIsLoading(false);
      }
    } catch (error) {
      Swal.fire(error.response?.data?.message || "Error!");
      console.error("Upload error:", error); // Log error for debugging
    }
  };
    useEffect(() => {
    // if (isDocUploaded || isUploadSuccess) {
    const fetchDocumentList = async () => {
      const documentListResponse = await axios.get(
        `${BASE_URL}/getDocumentList`,
        { withCredentials: true }
      );

      const data = documentListResponse.data.documents;
      const result = {};

      const requiredTypes = [
        "aadhaarFront",
        "aadhaarBack",
        "salarySlip",
        "panCard",
      ];

      const hasAllRequired = requiredTypes.every((type) =>
        data.some((item) => item.type === type)
      );

      console.log("hasAllRequired", hasAllRequired);

      if (hasAllRequired) {
        setRequiredField(true);
      }

      setFormValues((prev) => ({
        ...prev,
        salarySlip: data.filter((doc) => doc.type === "salarySlip"),
        aadhaarFront: data.find((doc) => doc.type === "aadhaarFront"),
        aadhaarBack: data.find((doc) => doc.type === "aadhaarBack"),
        panCard: data.find((doc) => doc.type === "panCard"),
        others: data.filter((doc) => doc.type === "others"),
      }));
    };
    fetchDocumentList();
    // }
  }, [isDocUploaded, isUploadSuccess]);

  console.log("formValues >>> ", formValues);

  useEffect(() => {
    setUploadedDocs(transformDocuments(formValues));
  }, [formValues]);
  // setUploadedDocs(transformDocuments(formValues));
  function transformDocuments(documents) {
    let result = [];

    // Process salary slips
    if (documents.salarySlip && Array.isArray(documents.salarySlip)) {
      documents.salarySlip.forEach((slip, index) => {
        result.push({
          id: slip.id,
          name: `salarySlip ${index + 1}`,
          type: slip.type,
          url: slip.url,
          remarks: slip.remarks || "", // using backend value
        });
      });
    }

    if (documents.others && Array.isArray(documents.others)) {
      documents.others.forEach((slip, index) => {
        result.push({
          id: slip.id,
          name: `others ${index + 1}`,
          type: slip.type,
          url: slip.url,
          remarks: slip.remarks || "", // using backend value
        });
      });
    }

    // Process other individual documents
    const keysToProcess = ["aadhaarFront", "aadhaarBack", "panCard"];
    keysToProcess.forEach((key) => {
      if (documents[key]) {
        result.push({
          id: documents[key].id,
          name: documents[key].name,
          type: documents[key].type,
          url: documents[key].url,
          remarks: documents[key].remarks || "", // Access the remarks from the correct document
        });
      }
    });

    return result;
  }

  const handleContinueBtn = () => {
    const isClosed = loans;

    if (isClosed) {
      // Check if at least 3 salary slips are uploaded
      if (
        !formValues.salarySlip ||
        formValues.salarySlip.length < requiredSalarySlips
      ) {
        Swal.fire(
          "Warning!",
          "Please upload the last 3 months' salary slips for a reloan.",
          "warning"
        );
        return;
      }

      // Ensure that the latest salary slip is newly uploaded
      if (formValues.salarySlip.length >= requiredSalarySlips) {
        Swal.fire(
          "Warning!",
          "For reloan, you must upload a new salary slip.",
          "warning"
        );
        return;
      }
    } else {
      // For a new loan, all required documents must be uploaded
      if (
        !formValues.aadhaarFront ||
        !formValues.aadhaarBack ||
        !formValues.panCard ||
        !formValues.salarySlip
      ) {
        Swal.fire(
          "Warning!",
          "Please upload all required documents: Aadhaar Front, Aadhaar Back, PAN Card, and Salary Slip.",
          "warning"
        );
        return;
      }
    }

    // If all required documents are uploaded, proceed
    navigate(`/loan-application`);
  };
  // const handleContinueBtn = () => {
  //   const isClosed = loans;

  //   if (isClosed) {
  //     if (
  //       !formValues.salarySlip ||
  //       formValues.salarySlip.length < requiredSalarySlips
  //     ) {
  //       Swal.fire(
  //         "Warning!",
  //         "Please upload last 3 month Salary Slips for reloan.",
  //         "warning"
  //       );
  //       return;
  //     }
  //   } else {
  //     // For new loan, all other documents are required
  //     if (
  //       !formValues.aadhaarFront ||
  //       !formValues.aadhaarBack ||
  //       !formValues.panCard ||
  //       !formValues.salarySlip
  //     ) {
  //       Swal.fire(
  //         "Warning!",
  //         "Please upload all required documents: Aadhaar Front, Aadhaar Back, and PAN Card.",
  //         "warning"
  //       );
  //       return;
  //     }
  //   }

  //   // If all required documents are uploaded, proceed
  //   navigate(`/loan-application`);
  // };

  return (
    <>
      <Dashboard />
      <Box
        sx={{
          maxWidth: "1000px",
          margin: "0 auto",
          mt: 3,
          p: 3,
          backgroundColor: "#FFF",
          color: "#F26722",
          borderRadius: "20px",
          border: `1px solid #F26722`,
          // boxShadow: `0px 0px 20px rgb(0,0,0,0.2)`,
        }}
      >
        <Typography
          variant="h6"
          style={{
            fontWeight: "600",
            color: "#F26722",
            marginBottom: "10px",
            textAlign: "center",
            fontSize: "18px",
          }}
        >
          Upload Documents
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            {[
              "aadhaarFront",
              "aadhaarBack",
              "panCard",
              "salarySlip",
              // "bankStatement",
              "others",
            ].map((key) => (
              <Box
                key={key}
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "1",
                }}
              >
                <Checkbox
                  checked={selectedDocType === key}
                  onChange={(e) => {
                    setSelectedDocType(null);
                    setFileInputs([{ file: null, remarks: "" }]);

                    if (e.target.checked) {
                      setSelectedDocType(key);
                    }
                  }}
                  sx={{
                    color: "#F26722",
                    "&.Mui-checked": { color: "#F26722" },
                  }}
                />
                <Typography
                  variant="subtitle2"
                  style={{
                    fontWeight: "600",
                    color: "#000000",
                    fontSize: "14px",
                  }}
                >
                  {console.log("key before >>> ", key.charAt(0).toUpperCase())}
                  {console.log(
                    "key after >>> ",
                    key.slice(1).replace(/([A-Z])/g, " $1")
                  )}

                  {key === "panCard"
                    ? "panCard".replace(/panCard/g, "PAN Card")
                    : key.charAt(0).toUpperCase() +
                      key.slice(1).replace(/([A-Z])/g, " $1")}
                </Typography>
              </Box>
            ))}
          </Box>

          {selectedDocType && (
            <>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {selectedDocType === "salarySlip" && (
                  <Typography variant="subtitle2" sx={{ color: "#F26722" }}>
                    Please upload {requiredSalarySlips} salary slips. Salary
                    slips are required.
                  </Typography>
                )}
                {selectedDocType === "aadhaarFront" && (
                  <Typography variant="subtitle2" sx={{ color: "#F26722" }}>
                    Aadhaar Front is required
                  </Typography>
                )}
                {selectedDocType === "panCard" && (
                  <Typography variant="subtitle2" sx={{ color: "#F26722" }}>
                    PAN Card is required
                  </Typography>
                )}
                {selectedDocType === "others" && (
                  <Typography variant="subtitle2">
                    <span style={{ color: "#F26722", fontWeight: "bold" }}>
                      Note:
                    </span>{" "}
                    You can upload one or more address proof documents, such as
                    a{" "}
                    <span style={{ color: "#1976D2" }}>
                      Gas Connection Bill
                    </span>
                    , <span style={{ color: "#1976D2" }}>Electricity Bill</span>
                    , or{" "}
                    <span style={{ color: "#1976D2" }}>
                      any other valid Address Proof
                    </span>
                    , along with remarks.
                  </Typography>
                )}
                {fileInputs.map((input, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 2,
                      borderRadius: "20px",
                      backgroundColor: "#FFF",
                      // boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <Button
                      variant="outlined"
                      component="label"
                      // onClick={() => fileInputRef.current.click()}
                      sx={{
                        minWidth: 120,
                        background: "#F26722",
                        borderColor: "#F26722",
                        color: "#FFF",
                        borderRadius: "10px",
                        "&:hover": {
                          background: "#F26722",
                        },
                      }}
                    >
                      Choose File
                      <input
                        type="file"
                        // ref={fileInputRef}
                        hidden
                        onChange={(event) => handleFileChange(index, event)}
                      />
                    </Button>

                    {/* Remarks Input */}
                    {selectedDocType === "others" ? (
                      <TextField
                        select
                        label="Select Document Type"
                        value={input.remarks}
                        onChange={(event) => handleRemarksChange(index, event)}
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{
                          flex: 1,
                          "& .MuiInputBase-input": {
                            color: "#F26722",
                          },
                          "& .MuiInputLabel-root": {
                            color: "#F26722",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#F26722",
                              borderRadius: "10px",
                            },
                            "&:hover fieldset": {
                              borderColor: "#F26722",
                            },
                          },
                        }}
                      >
                        <MenuItem value="Electricity Bill">
                          Electricity Bill
                        </MenuItem>
                        <MenuItem value="Gas Connection">
                          Gas Connection
                        </MenuItem>
                        <MenuItem value="Residence Proof">
                          Residence Proof
                        </MenuItem>
                      </TextField>
                    ) : (
                      <TextField
                        label="Remarks"
                        value={input.remarks}
                        onChange={(event) => handleRemarksChange(index, event)}
                        variant="outlined"
                        size="small"
                        sx={{
                          flex: 1,
                          "& .MuiInputBase-input": {
                            color: "#F26722",
                          },
                          "& .MuiInputLabel-root": {
                            color: "#F26722",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#F26722",
                              borderRadius: "10px",
                            },
                            "&:hover fieldset": {
                              borderColor: "#F26722",
                            },
                          },
                        }}
                      />
                    )}

                    {/* View Button */}
                    {input.file && (
                      <IconButton
                        color="primary"
                        component="a"
                        href={URL.createObjectURL(input.file)}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ color: "#F26722" }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    )}

                    {/* Remove File Button */}
                    {index > 0 && (
                      <IconButton
                        color="secondary"
                        onClick={() => handleRemoveFileInput(index)}
                        sx={{ color: "#ff4d4f" }}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    )}

                    {/* Add New Input Button */}
                    {index === fileInputs.length - 1 &&
                      !["aadhaarFront", "aadhaarBack", "panCard"].includes(
                        selectedDocType
                      ) &&
                      fileInputs[fileInputs.length - 1].file && (
                        <IconButton
                          color="primary"
                          onClick={handleAddFileInput}
                          sx={{
                            backgroundColor: "#007bff",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "#0056b3",
                            },
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      )}
                  </Box>
                ))}
              </Box>
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                // variant="contained"
                sx={{
                  backgroundColor: isLoading ? "#ccc" : "#FFF",
                  border: isLoading ? "ccc" : `1px solid #F26722`,
                  borderRadius: "10px",
                  color: isLoading ? "#666" : "#F26722",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  "&:hover": {
                    backgroundColor: isLoading ? "#ccc" : "#F26722",
                    color: isLoading ? "#ccc" : "#FFF",
                  },
                }}
              >
                {isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Submit"
                )}
              </Button>
            </>
          )}
        </Box>
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {uploadedDocs && uploadedDocs.length > 0 && (
          <DocumentsTable uploadedDocs={uploadedDocs} />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 3,
          mb: 3,
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#F26722",
            color: "#FFF",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "#F26722",
              color: "#FFF",
            },
          }}
          onClick={handleContinueBtn}
        >
          Continue to Loan Application
        </Button>
      </Box>
    </>
  );
};

export default UploadDocuments;

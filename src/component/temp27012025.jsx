import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Grid,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { BASE_URL } from "../baseURL";

const availableOptions = [
  "Residential Address",
  "Electricity Bill",
  "Gas Connection",
];
const MySwal = withReactContent(Swal);

const DocumentUploadModal = ({ prefillData }) => {
  const [formValues, setFormValues] = useState({
    salarySlip: [null, null, null],
    aadhaarFront: prefillData?.aadhaarFront || null,
    aadhaarBack: prefillData?.aadhaarBack || null,
    panCard: prefillData?.panCard || null,
    otherDocuments: prefillData?.otherDocuments || [{ type: "", files: null }],
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isDocUploaded, setIsDocUploaded] = useState(false);
  const [firstOccurrences, setFirstOccurrences] = useState([]);

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

  useEffect(() => {
    if (isDocUploaded) {
      const fetchDocumentList = async () => {
        const documentListResponse = await axios.get(
          `${BASE_URL}/api/loanApplication/getDocumentList`,
          { withCredentials: true }
        );
        const data = documentListResponse.data.documents;
        const result = {};
        const requiredNames = ["salarySlip_1", "salarySlip_2", "salarySlip_3"];

        for (const item of data) {
          if (requiredNames.includes(item.name) && !result[item.name]) {
            result[item.name] = item;
          }
        }

        const firstOccurrencesArray = Object.values(result);
        setFirstOccurrences(firstOccurrencesArray);

        setFormValues((prev) => ({
          ...prev,
          salarySlip: firstOccurrencesArray.map((doc) => doc || null),
        }));
      };
      fetchDocumentList();
    }
  }, [isDocUploaded]);

  const getAvailableOptions = (index) => {
    const uploadedDocuments = formValues.otherDocuments.map((doc, idx) =>
      idx === index ? "" : doc.type
    );
    return availableOptions.filter(
      (option) => !uploadedDocuments.includes(option)
    );
  };

  const handleFileChange = (field, file, index = 0) => {
    const updatedFormValues = { ...formValues };
    if (field === "salarySlip") {
      updatedFormValues.salarySlip[index] = file;
    } else if (field === "otherDocuments") {
      updatedFormValues.otherDocuments[index].files = file;
    } else {
      updatedFormValues[field] = file;
    }
    setFormValues(updatedFormValues);
  };

  const handleDropdownChange = (event, index) => {
    const selectedType = event.target.value;
    const updatedFormValues = { ...formValues };
    updatedFormValues.otherDocuments[index].type = selectedType;
    setFormValues(updatedFormValues);
  };

  const deleteUploadedFile = (field, index = 0) => {
    const updatedFormValues = { ...formValues };
    if (field === "salarySlip") {
      updatedFormValues.salarySlip[index] = null;
    } else if (field === "otherDocuments") {
      updatedFormValues.otherDocuments[index].files = null;
    } else {
      updatedFormValues[field] = null;
    }
    setFormValues(updatedFormValues);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.salarySlip.every((file) => file)) {
      newErrors.salarySlip = "All three salary slips are required.";
    }
    if (!formValues.aadhaarFront) newErrors.aadhaarFront = "Required";
    if (!formValues.aadhaarBack) newErrors.aadhaarBack = "Required";
    if (!formValues.panCard) newErrors.panCard = "Required";

    formValues.otherDocuments.forEach((doc, index) => {
      if (!doc.type) newErrors[`otherType-${index}`] = "Required";
      if (!doc.files) newErrors[`otherFiles-${index}`] = "Required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formValues.salarySlip.forEach((file) => {
      formData.append("salarySlip", file);
    });
    formData.append("aadhaarFront", formValues.aadhaarFront);
    formData.append("aadhaarBack", formValues.aadhaarBack);
    formData.append("panCard", formValues.panCard);

    setLoading(true);

    try {
      const response = await axios.patch(
        `${BASE_URL}/api/loanApplication/uploadDocuments`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      MySwal.fire({
        icon: "success",
        title: "Documents uploaded successfully",
      });
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Failed to upload documents",
        text: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = async (docId) => {
    const docType = "salarySlip";
    const apiUrl = `http://localhost:8081/api/loanApplication/documentPreview?docType=${docType}&docId=${docId}`;
    try {
      const response = await axios.get(apiUrl, { withCredentials: true });
      if (response.data && response.data.url) {
        window.open(response.data.url, "_blank");
      } else {
        throw new Error("URL not found in the response");
      }
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Failed to load document preview",
        text: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        border: "2px solid #ddd",
        borderRadius: 3,
        maxWidth: 900,
        margin: "0 auto",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        background: "white",
      }}
    >
      <Typography variant="h5" mb={2}>
        Upload Documents
      </Typography>
      <Grid container spacing={2}>
        {[0, 1, 2].map((index) => (
          <Grid item xs={12} sm={4} key={index}>
            {formValues.salarySlip[index]?.file ? (
              <Box display="flex" flexDirection="column" alignItems="center">
                {formValues.salarySlip[index].preview &&
                  formValues.salarySlip[index].file.type.startsWith(
                    "image/"
                  ) && (
                    <img
                      src={formValues.salarySlip[index].preview}
                      alt={`Salary Slip ${index + 1}`}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "150px",
                        marginBottom: "10px",
                      }}
                    />
                  )}
                {formValues.salarySlip[index].preview &&
                  !formValues.salarySlip[index].file.type.startsWith(
                    "image/"
                  ) && (
                    <Typography
                      sx={{
                        textDecoration: "underline",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        color: "blue",
                      }}
                      onClick={() =>
                        window.open(
                          formValues.salarySlip[index].preview,
                          "_blank"
                        )
                      }
                    >
                      View Uploaded File
                    </Typography>
                  )}
                <IconButton
                  onClick={() => deleteUploadedFile("salarySlip", index)}
                >
                  <ClearIcon sx={{ color: "red" }} />
                </IconButton>
              </Box>
            ) : (
              <TextField
                fullWidth
                type="file"
                inputProps={{ accept: ".pdf,image/*" }}
                label={`Upload Salary Slip ${index + 1}`}
                onChange={(e) =>
                  handleFileChange("salarySlip", e.target.files[0], index)
                }
              />
            )}
          </Grid>
        ))}
        {["aadhaarFront", "aadhaarBack", "panCard"].map((field, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <TextField
              fullWidth
              type="file"
              inputProps={{ accept: ".pdf,image/*" }}
              label={`Upload ${field.replace(/([A-Z])/g, " $1")}`}
              onChange={(e) => handleFileChange(field, e.target.files[0])}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DocumentUploadModal;

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
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import VisibilityIcon from "@mui/icons-material/Visibility";
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
    residential: null,
    electricityBill: null,
    gasConnection: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isDocUploaded, setIsDocUploaded] = useState(false);
  const [firstOccurrences, setFirstOccurrences] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState(availableOptions);
  const [selectedOption, setSelectedOption] = useState("");
  const [additionalFields, setAdditionalFields] = useState([]);

  useEffect(() => {
    const getPreviousData = async () => {
      const getDashboardDetailsResponse = await axios.get(
        `${BASE_URL}/getDashboardDetails`,
        { withCredentials: true }
      );
      console.log(
        "doccccc srssss ress <>>>> ",
        getDashboardDetailsResponse.data
      );

      if (getDashboardDetailsResponse.data.success) {
        const { isDocumentUploaded } = getDashboardDetailsResponse.data;
        setIsDocUploaded(isDocumentUploaded);
      }
    };
    getPreviousData();
  }, []);

  // Handle logic after isDocUploaded changes
  useEffect(() => {
    if (isDocUploaded) {
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
          aadhaarFront: data.find((doc) => doc.type === "aadhaarFront"),
          aadhaarBack: data.find((doc) => doc.type === "aadhaarBack"),
          panCard: data.find((doc) => doc.type === "panCard"),
          residential: data.find((doc) => doc.type === "residential"),
          electricityBill: data.find((doc) => doc.type === "electricityBill"),
          gasConnection: data.find((doc) => doc.type === "gasConnection"),
        }));
      };
      fetchDocumentList();
    }
  }, [isDocUploaded]);

  const handleDropdownChange = (event) => {
    const selectedField = event.target.value;

    if (selectedField) {
      setAdditionalFields((prev) => [...prev, selectedField]);
      setDropdownOptions((prev) =>
        prev.filter((option) => option !== selectedField)
      );
    }
  };

  const handleFileChange = (field, file, index = 0) => {
    const updatedFormValues = { ...formValues };
    const filePreview = file ? URL.createObjectURL(file) : null;

    if (field === "salarySlip") {
      updatedFormValues.salarySlip[index] = file;
      setFormValues(updatedFormValues);
    } else {
      if (field === "Residential Address") {
        setFormValues((prev) => ({
          ...prev,
          residential: file,
        }));
      } else if (field === "Electricity Bill") {
        setFormValues((prev) => ({
          ...prev,
          electricityBill: file,
        }));
      } else if (field === "Gas Connection") {
        setFormValues((prev) => ({
          ...prev,
          gasConnection: file,
        }));
      } else {
        setFormValues((prev) => ({
          ...prev,
          [field]: file,
        }));
      }
    }
    // setFormValues(updatedFormValues);
  };

  const deleteUploadedFile = (field, index = 0) => {
    const updatedFormValues = { ...formValues };
    if (field === "salarySlip") {
      updatedFormValues.salarySlip[index] = null;
      setFormValues(updatedFormValues);
    } else {
      // updatedFormValues[field] = null;
      setFormValues((prev) => ({
        ...prev,
        [field]: null,
      }));
      const fieldDisplayName = availableOptions.find(
        (option) =>
          field.toLowerCase() === option.toLowerCase().replace(" ", "")
      );
      // console.log("fieldDisplayName <<>> ", fieldDisplayName);
      if (fieldDisplayName) {
        setDropdownOptions((prev) => [...prev, fieldDisplayName]);
      }

      // Remove the field from additionalFields
      setAdditionalFields((prev) =>
        prev.filter((existingField) => existingField !== field)
      );
    }
    // setFormValues(updatedFormValues);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.salarySlip.every((file) => file)) {
      newErrors.salarySlip = "All three salary slips are required.";
    }
    if (!formValues.salarySlip) newErrors.salarySlip = "Required";
    if (!formValues.aadhaarFront) newErrors.aadhaarFront = "Required";
    if (!formValues.aadhaarBack) newErrors.aadhaarBack = "Required";
    if (!formValues.panCard) newErrors.panCard = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    console.log("formValues >>> ");

    // Prepare form-data
    const formData = new FormData();

    if (formValues.selectedOption && formValues.selectedFile) {
      const selectedKey = optionKeyMap[formValues.selectedOption];
      if (selectedKey) {
        formData.append(selectedKey, formValues.selectedFile);
      }
    }

    formValues.salarySlip.forEach((file, index) => {
      formData.append(`salarySlip`, file);
    });
    formData.append("salarySlip", formValues.salarySlip);
    formData.append("aadhaarFront", formValues.aadhaarFront);
    formData.append("aadhaarBack", formValues.aadhaarBack);
    formData.append("panCard", formValues.panCard);

    if (formValues.residential)
      formData.append("residential", formValues.residential);
    if (formValues.electricityBill)
      formData.append("electricityBill", formValues.electricityBill);
    if (formValues.gasConnection)
      formData.append("gasConnection", formValues.gasConnection);

    setLoading(true);

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

  const isSubmitDisabled = () => {
    const requiredFields = [
      // formValues.salarySlip,
      formValues.aadhaarFront,
      formValues.aadhaarBack,
      formValues.panCard,
    ];

    return requiredFields.some((field) => !field);
  };

  const handlePreview = async (docId, docType) => {
    // const docType = "salarySlip";
    const apiUrl = `${BASE_URL}/documentPreview?docType=${docType}&docId=${docId}`;
    try {
      const response = await axios.get(apiUrl, { withCredentials: true });
      if (response.data && response.data.url) {
        window.open(response.data.url, "_blank");
      } else {
        throw new Error("URL not found in the response");
      }
    } catch (error) {
      console.error("Error fetching document preview:", error);
      MySwal.fire({
        icon: "error",
        title: "Failed to load document preview",
        text: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  const handleDelete = (field) => {
    const updatedFormValues = { ...formValues };
    updatedFormValues[field] = null;
    setFormValues(updatedFormValues);
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
      <Typography variant="h5" mb={2} sx={{ color: "black" }}>
        Upload Documents
      </Typography>
      <Grid container spacing={2}>
        {[0, 1, 2].map((index) => {
          return (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={2}
            >
              {formValues.salarySlip[index] ? (
                <>
                  <Typography
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                    onClick={() =>
                      firstOccurrences[index]
                        ? handlePreview(
                            firstOccurrences[index].id,
                            firstOccurrences[index].type
                          )
                        : null
                    }
                  >
                    {index === 0
                      ? "Salary Slip 1"
                      : index === 1
                      ? "Salary Slip 2"
                      : "Salary Slip 3"}
                  </Typography>
                  <Box>
                    <IconButton
                      onClick={() => handlePreview(document.id, document.type)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => deleteUploadedFile("salarySlip", index)}
                    >
                      <ClearIcon sx={{ color: "red" }} />
                    </IconButton>
                  </Box>
                </>
              ) : (
                <TextField
                  fullWidth
                  type="file"
                  inputProps={{ accept: ".pdf,image/*" }}
                  label={`Upload Salary Slip ${index + 1}`}
                  error={!!errors.salarySlip && !formValues.salarySlip[index]}
                  helperText={
                    errors.salarySlip && !formValues.salarySlip[index]
                      ? "Required"
                      : ""
                  }
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) =>
                    handleFileChange("salarySlip", e.target.files[0], index)
                  }
                />
              )}
            </Box>
          );
        })}

        {["salarySlip", "aadhaarFront", "aadhaarBack", "panCard"].map(
          (field) => {
            const document = formValues[field];
            return (
              <Box
                key={field}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                {document ? (
                  <>
                    <Typography
                      onClick={() => handlePreview(document.id, document.type)}
                      style={{ cursor: "pointer", textDecoration: "underline" }}
                    >
                      {document.name}
                    </Typography>
                    <Box>
                      <IconButton
                        onClick={() =>
                          handlePreview(document.id, document.type)
                        }
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(field)}>
                        <ClearIcon sx={{ color: "red" }} />
                      </IconButton>
                    </Box>
                  </>
                ) : (
                  <TextField
                    fullWidth
                    type="file"
                    inputProps={{ accept: ".pdf,image/*" }}
                    label={`Upload ${field.replace(/([A-Z])/g, " $1")}`}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) =>
                      handleFileChange(document.type, e.target.files[0], index)
                    }
                  />
                )}
              </Box>
            );
          }
        )}

        {dropdownOptions.length > 0 && (
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Select Document Type"
              value=""
              onChange={handleDropdownChange}
              InputLabelProps={{ shrink: true }}
            >
              {dropdownOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        )}

        {/* {["residential", "electricityBill", "gasConnection"].map((field) => {
          const document = formValues[field];
          return (
            <Box
              key={field}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={2}
            >
              {document ? (
                <>
                  <Typography
                    onClick={() => handlePreview(document.id, document.type)}
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                  >
                    {document.name}
                  </Typography>
                  <Box>
                    <IconButton
                      onClick={() => handlePreview(document.id, document.type)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(field)}>
                      <ClearIcon sx={{ color: "red" }} />
                    </IconButton>
                  </Box>
                </>
              ) : (
                <TextField
                  fullWidth
                  type="file"
                  inputProps={{ accept: ".pdf,image/*" }}
                  label={`Upload ${field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}`}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => handleFileChange(field, e.target.files[0])}
                />
              )}
            </Box>
          );
        })} */}

        {additionalFields.map((field) => {
          const document = formValues[field];
          return (
            <Box
              key={field}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={2}
            >
              {document ? (
                <>
                  <Typography
                    onClick={() => handlePreview(document.id, document.type)}
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                  >
                    {document.name}
                  </Typography>
                  <Box>
                    <IconButton
                      onClick={() => handlePreview(document.id, document.type)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(field)}>
                      <ClearIcon />
                    </IconButton>
                  </Box>
                </>
              ) : (
                <TextField
                  fullWidth
                  type="file"
                  inputProps={{ accept: ".pdf,image/*" }}
                  label={`Upload ${field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}`}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => handleFileChange(field, e.target.files[0])}
                />
              )}
            </Box>
          );
        })}

        <Grid item xs={12}>
          <Box mt={3} textAlign="center">
            <Button
              variant="outlined"
              onClick={() => MySwal.close()}
              sx={{ mr: 2, color: "black", borderColor: "black" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              // disabled={isSubmitDisabled() || loading}
              sx={{ backgroundColor: "orange", color: "white" }}
              startIcon={loading && <CircularProgress size={20} />}
            >
              Submit
              {/* {loading ? "Submitting..." : "Submit"} */}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DocumentUploadModal;

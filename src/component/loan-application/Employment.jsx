import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { BASE_URL } from "../../baseURL";
import Swal from "sweetalert2";

const Employment = ({ onComplete, disabled, prefillData, isUploaded }) => {
  const [openModal, setOpenModal] = useState(false);
  const [formValues, setFormValues] = useState(prefillData || {});
  const [addressValues, setAddressValues] = useState({});
  const [stepData, setStepData] = useState({});
  const [stepCompleted, setStepCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmploymentDetailsSaved, setIsEmploymentDetailsSaved] =
    useState(false);

  const openEmploymentModal = () => {
    if (disabled) return;

    const fields = [
      {
        label: "Are you working from Office or Home?",
        name: "workFrom",
        type: "select",
        options: ["OFFICE", "HOME"],
      },
      { label: "Company Name", name: "companyName", type: "text" },
      { label: "Company Type", name: "companyType", type: "text" },
      { label: "Your Designation", name: "designation", type: "text" },
      { label: "Office Email", name: "officeEmail", type: "email" },
      { label: "Employed Since", name: "employedSince", type: "date" },
      { label: "Office Address", name: "officeAddrress", type: "text" },
      { label: "Landmark", name: "landmark", type: "text" },
      { label: "City", name: "city", type: "text" },
      { label: "State", name: "state", type: "text" },
      { label: "Pincode", name: "pincode", type: "text" },
    ];

    setStepData({
      title: "Information about the Company",
      fields,
      onSubmit: handleEmploymentSubmit,
    });
    setOpenModal(true);
  };

  const handlePincodeChange = async (e) => {
    const value = e.target.value;

    if (/^\d{0,6}$/.test(value)) {
      setFormValues({ ...formValues, pincode: value });

      if (value.length === 6) {
        try {
          const response = await fetch(
            `https://api.postalpincode.in/pincode/${value}`
          );
          const data = await response.json();

          if (data[0].Status === "Success") {
            const { Block, State } = data[0].PostOffice[0];
            setFormValues((prev) => ({
              ...prev,
              city: Block,
              state: State,
            }));
          } else {
            setFormValues((prev) => ({
              ...prev,
              city: "",
              state: "",
            }));
            alert("Please enter a valid pincode.");
          }
        } catch (error) {
          alert(
            "An error occurred while fetching data. Please try again later."
          );
        }
      } else {
        setFormValues((prev) => ({
          ...prev,
          city: "",
          state: "",
        }));
      }
    } else {
      setFormValues({ ...formValues, pincode: "", city: "", state: "" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (stepData.fields.some((field) => field.name === name)) {
      setFormValues({ ...formValues, [name]: value });
    } else {
      setAddressValues({ ...addressValues, [name]: value });
    }
  };

  const handleEmploymentSubmit = async () => {
    try {
      if (
        !formValues.workFrom ||
        !formValues.companyName ||
        !formValues.companyType ||
        !formValues.designation ||
        !formValues.officeEmail ||
        !formValues.employedSince ||
        !formValues.designation
      ) {
        alert("All fields are required.");
        return;
      }

      const apiData = { ...formValues, ...addressValues };

      console.log("Submitting data:", apiData);

      const response = await axios.patch(
        `${BASE_URL}/addEmploymentInfo`,
        apiData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("Response from backend:", response);

      if (response.status === 200) {
        Swal.fire("Employment information submitted successfully!");
        setStepCompleted(true);
        setOpenModal(false);
        setIsEmploymentDetailsSaved(true);

        if (onComplete) {
          onComplete(apiData); // Pass data back to the parent
        }
      } else {
        // Swal.fire("Error submitting employment information.");
        alert(error.response.data.message);
        setOpenModal(false);
      }
    } catch (error) {
      alert(error.response.data.message);
      setOpenModal(false);
    }
  };

  const handleModalClick = async () => {
    openEmploymentModal(true);
    setIsLoading(true);

    try {
      const getDashboardDetailsResponse = await axios.get(
        `${BASE_URL}/getDashboardDetails`,
        {
          withCredentials: true,
        }
      );

      console.log("Dashboard Details Response:", getDashboardDetailsResponse);

      if (getDashboardDetailsResponse.status === 200) {
        setIsLoading(false);
        console.log("Response Data:", getDashboardDetailsResponse?.data); // Check this in detail

        // Safely access employmentInfo to avoid destructuring errors
        const { isEmploymentDetailsSaved } =
          getDashboardDetailsResponse.data || {};

        // Ensure we have a valid boolean value for isEmploymentDetailsSaved
        if (typeof isEmploymentDetailsSaved !== "boolean") {
          console.error("Invalid response format for isEmploymentDetailsSaved");
          setStepCompleted(false);
        } else {
          setStepCompleted(isEmploymentDetailsSaved);
        }

        console.log("isEmploymentDetailsSaved:", isEmploymentDetailsSaved);

        // if (isEmploymentDetailsSaved) {
        const getProfileDetailsResponse = await axios.get(
          `${BASE_URL}/getApplicationDetails?applicationStatus=employeeDetails`,
          {
            withCredentials: true,
          }
        );

        console.log("Profile Details Response:", getProfileDetailsResponse);

        const EmpData = getProfileDetailsResponse?.data?.data;

        // Update form values based on the fetched data
        setFormValues({
          workFrom: EmpData?.workFrom || "",
          companyName: EmpData?.companyName || "",
          companyType: EmpData?.companyType || "",
          designation: EmpData?.designation || "",
          officeEmail: EmpData?.officeEmail || "",
          employedSince: EmpData?.employedSince || "",
          officeAddrress: EmpData?.officeAddrress || "",
          landmark: EmpData?.landmark || "",
          city: EmpData?.city || "",
          state: EmpData?.state || "",
          pincode: EmpData?.pincode || "",
        });
        // }
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching dashboard details:", error);
    }
  };

  useEffect(() => {
    if (prefillData) {
      setFormValues(prefillData);
      setStepCompleted(true);
    }
  }, [prefillData]);

  useEffect(() => {
    console.log("Updated Step Completed:", stepCompleted); // Check if state updates correctly
  }, [stepCompleted]);

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
        //     ? "green" // Change the background color to green when the step is completed
        //     : "linear-gradient(45deg, #4D4D4E, orange)",
        //   cursor: disabled ? "not-allowed" : "pointer", // Disable the cursor if disabled
        //   height: 150,
        //   width: "1o0%",
        //   maxWidth: 350,
        //   transition: "all 0.3s",
        //   boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        //   "&:hover": {
        //     backgroundColor: disabled
        //       ? "#ccc"
        //       : stepCompleted
        //       ? "green" // Keep the green background on hover if the step is completed
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
          sx={{
            marginBottom: 1,
            color: "white",
            "&:hover": {
              backgroundColor: "white",
            },
          }}
          disabled={disabled}
        >
          {stepCompleted || isUploaded || isEmploymentDetailsSaved ? (
            <CheckCircleIcon sx={{ color: "green" }} />
          ) : (
            <AccountBalanceIcon />
          )}
        </IconButton>
        <Typography
          sx={{
            fontWeight: "bold",
            marginBottom: 1,
            color: "white",
          }}
        >
          Employment Information
        </Typography>
        <Typography variant="body2" sx={{ color: "white" }}>
          Provide details about your employment.
        </Typography>
      </Box>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>{stepData.title}</DialogTitle>
        <DialogContent>
          {stepData.fields
            ?.filter(
              (field) =>
                !["pincode", "city", "state", "employedSince"].includes(
                  field.name
                )
            ) // Exclude pincode, city, and state if present in stepData.fields
            .map((field, index) => (
              <Box key={index} sx={{ marginBottom: 2 }}>
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    onChange={handleInputChange}
                    value={formValues[field.name] || ""}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                    }}
                    required
                  >
                    <option value="" disabled selected>
                      {field.label}
                    </option>
                    {field.options?.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <TextField
                    fullWidth
                    name={field.name}
                    label={field.label}
                    value={formValues[field.name] || ""}
                    onChange={handleInputChange}
                    variant="outlined"
                    margin="normal"
                    type={field.type}
                    required
                  />
                )}
              </Box>
            ))}

          {/* Editable Pincode, City, and State */}

          <TextField
            fullWidth
            name="employedSince"
            label="Employed Since"
            type="date"
            value={formValues.employedSince || ""}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            sx={{ marginBottom: 2 }}
            required
          />
          <TextField
            label="Pincode"
            value={formValues.pincode || ""}
            onChange={handlePincodeChange}
            fullWidth
            sx={{ marginBottom: 2 }}
            required
          />
          <TextField
            label="City"
            value={formValues.city || ""}
            onChange={handleInputChange} // Make city editable
            name="city"
            fullWidth
            sx={{ marginBottom: 2 }}
            required
          />
          <TextField
            label="State"
            value={formValues.state || ""}
            onChange={handleInputChange} // Make state editable
            name="state"
            fullWidth
            sx={{ marginBottom: 2 }}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleEmploymentSubmit}
            color="primary"
            sx={{ backgroundColor: "#F26722", color: "white" }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Employment;

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

const Employment = ({ onComplete, disabled, prefillData }) => {
  const [openModal, setOpenModal] = useState(false);
  const [formValues, setFormValues] = useState(prefillData || {});
  const [addressValues, setAddressValues] = useState({});
  const [stepData, setStepData] = useState({});
  const [stepCompleted, setStepCompleted] = useState(false);

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
            Swal.fire({
              icon: "error",
              title: "Invalid Pincode",
              text: "Please enter a valid pincode.",
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while fetching data. Please try again later.",
          });
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
        !formValues.officeEmail
      ) {
        Swal.fire("All fields are required.");
        return;
      }

      const apiData = {
        ...formValues,
        ...addressValues,
      };

      const response = await axios.patch(
        `${BASE_URL}/api/loanApplication/addEmploymentInfo`,
        apiData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        Swal.fire("Employment information submitted successfully!");
        setStepCompleted(true);
        setOpenModal(false);

        if (onComplete) {
          onComplete(apiData); // Pass data back to the parent
        }
      } else {
        Swal.fire("Error submitting employment information.");
      }
    } catch (error) {
      Swal.fire("An error occurred while submitting the data.");
      console.error("Error:", error);
    }
  };
   const handleModalClick = async () => {
    openLoanCalculatorModal(true);
    setIsLoading(true);

    try {
      const getDashboardDetailsResponse = await axios.get(
        `${BASE_URL}/api/user/getDashboardDetails`,
        {
          withCredentials: true,
        }
      );

      // console.log(
      //   "getDashboardDetailsResponse >>> ",
      //   getDashboardDetailsResponse
      // );

      if (getDashboardDetailsResponse.status === 200) {
        setIsLoading(false);
        console.log(
          "getDashboardDetailsResponse >>> ",
          getDashboardDetailsResponse
        );
        const { isLoanCalculated } = getDashboardDetailsResponse.data;

        console.log("isLoanCalculated>>>>:", isLoanCalculated);

        // Set the value of isAddressVerified based on the fetched response
        setIsComplete(isLoanCalculated);

        if (isLoanCalculated) {
          const getProfileDetailsResponse = await axios.get(
            `${BASE_URL}/api/loanApplication/getApplicationDetails?applicationStatus=loanDetails`,
            {
              withCredentials: true,
            }
          );

          console.log(
            "getProfileDetailsResponse >>> ",
            getProfileDetailsResponse
          );

          const LoanData = getProfileDetailsResponse?.data?.data?.residence;

          // Update formValues with residenceData
          setFormValues({
            address: residenceData?.address || "",
            landmark: residenceData?.landmark || "",
            city: residenceData?.city || "",
            state: residenceData?.state || "",
            pincode: residenceData?.pincode || "",
            residenceType: residenceData?.residenceType || "OWNED",
          });
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (prefillData) {
      setFormValues(prefillData);
      setStepCompleted(true);
    }
  }, [prefillData]);

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
        onClick={openEmploymentModal}
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
              (field) => !["pincode", "city", "state"].includes(field.name)
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
                  />
                )}
              </Box>
            ))}

          {/* Editable Pincode, City, and State */}
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

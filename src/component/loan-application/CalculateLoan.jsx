import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  Box,
  Grid,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Slider,
  Container,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  TextField,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import loanImage from "../../assets/image/Untitled design.gif";
import axios from "axios";
import { BASE_URL } from "../../baseURL";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { form } from "framer-motion/client";

const LoanCalculator = ({ onComplete, disabled, isUploaded }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [othersInputs, setOthersInputs] = useState([""]); // start with one empty input

  const [isComplete, setIsComplete] = useState(false); // Add this state for completion tracking
  const [formValues, setFormValues] = useState({
    loanPurpose: "",
    principal: 5000,
    tenure: 1,
    roi: 0.5,
    totalPayble: 0,
  });

  const [maxLoan, setMaxLoan] = useState(0);

  // const fetchIncomeData = async () => {
  //   try {
  //     const response = await fetch(`${BASE_URL}/getProfileDetails`, {
  //       method: "GET",
  //       headers: { "Content-Type": "application/json" },
  //       credentials: "include",
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch income data");
  //     }

  //     const data = await response.json();
  //     const { incomeDetails } = data?.data || {};
  //     setFormValues((prev) => ({
  //       ...prev,
  //       principal: incomeDetails?.monthlyIncome || 5000,
  //     }));
  //     setMaxLoan(incomeDetails?.monthlyIncome);
  //   } catch (err) {
  //     // setError(err.message);
  //   } finally {
  //     // setLoading(false);
  //   }
  // };
  const fetchIncomeData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/getProfileDetails`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch income data");
      }

      const data = await response.json();
      const { incomeDetails } = data?.data || {};

      if (incomeDetails?.monthlyIncome) {
        const maxLoanAmount = Math.floor(incomeDetails.monthlyIncome * 0.4); // 40% of income

        setFormValues((prev) => ({
          ...prev,
          principal: maxLoanAmount || 5000, // Default principal
        }));
        setMaxLoan(maxLoanAmount); // Set maxLoan as 40% of salary
      }
    } catch (err) {
      console.error("Error fetching income data:", err);
    }
  };

  const openLoanCalculatorModal = () => {
    if (!disabled) {
      setIsModalOpen(true);
    }
  };

  const closeLoanCalculatorModal = () => {
    setIsModalOpen(false);
  };

  // const calculateTotalAmount = () => {
  //   const totalInterest =
  //     (formValues.principal * formValues.roi * formValues.tenure) / 100;
  //   const total = formValues.principal + totalInterest;
  //   // setTotalAmount(total);
  //   setFormValues((prev) => ({ ...prev, totalPayble: total }));
  // };

  const calculateTotalAmount = () => {
    const principal = parseFloat(formValues.principal) || 0;
    const roi = parseFloat(formValues.roi) || 0.5;
    const tenure = parseFloat(formValues.tenure) || 1;

    const totalInterest = (principal * roi * tenure) / 100;
    const total = principal + totalInterest;

    setFormValues((prev) => ({ ...prev, totalPayble: total }));
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [
    formValues.principal,
    formValues.tenure,
    formValues.roi,
    formValues.totalPayble,
  ]);

  // console.log("Loan Amount:", formValues.totalPayble);

  const handleSubmit = async () => {
    if (!formValues.loanPurpose) {
      alert("Please select a loan purpose!");
      return;
    }

    const payload = {
      principal: formValues.principal,
      totalPayble: formValues.totalPayble.toFixed(2),
      roi: formValues.roi,
      tenure: formValues.tenure,
      loanPurpose:
        formValues.loanPurpose === "OTHERS"
          ? othersInputs.filter((input) => input.trim() !== "").join(", ")
          : formValues.loanPurpose.toUpperCase(),
    };

    try {
      const response = await axios.post(`${BASE_URL}/applyLoan`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      onComplete({ success: true, data: payload });
      setIsModalOpen(false);

      // Set the box color to green after successful submission
      setIsComplete(true);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.message,
        });
      }
    } catch (error) {
      alert(error.response.data.message);
      setIsModalOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelLoanApplication = () => {
    alert(
      "Process Cancelled: Your loan application process has been cancelled."
    );
    setIsModalOpen(false);
  };

  const handleModalClick = async () => {
    openLoanCalculatorModal(true);
    setIsLoading(true);

    try {
      const getDashboardDetailsResponse = await axios.get(
        `${BASE_URL}/getDashboardDetails`,
        {
          withCredentials: true,
        }
      );

      // console.log(
      //   "getDashboardDetailsResponse111111 >>> ",
      //   getDashboardDetailsResponse
      // );

      if (getDashboardDetailsResponse.status === 200) {
        setIsLoading(false);
        // console.log(
        //   "getDashboardDetailsResponse >>> ",
        //   getDashboardDetailsResponse
        // );
        const { isLoanCalculated } = getDashboardDetailsResponse.data || {};

        // console.log("isLoanCalculated>>>>:", isLoanCalculated);

        // Set the value of isAddressVerified based on the fetched response
        setIsComplete(isLoanCalculated);

        //if (isLoanCalculated || isUploaded) {
        const getProfileDetailsResponse = await axios.get(
          `${BASE_URL}/getApplicationDetails?applicationStatus=loanDetails`,
          {
            withCredentials: true,
          }
        );

        // console.log(
        //   "getProfileDetailsResponse >>> ",
        //   getProfileDetailsResponse?.data?.data
        // );

        const LoanData = getProfileDetailsResponse?.data?.data;

        // Update formValues with residenceData
        setFormValues({
          principal: LoanData?.principal || 5000,
          totalPayble: LoanData?.totalPayble || "",
          roi: LoanData?.roi || 0.5,
          tenure: LoanData?.tenure || 1,
          loanPurpose: LoanData?.loanPurpose || "",
        });

        fetchIncomeData();

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
        onClick={handleModalClick}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          // justifyContent: "center",
          padding: 2,
          borderColor:
            // completed ? "green" :
            disabled ? "#1c1c1c" : "rgb(72, 145, 193)",
          borderRadius: 3,
          margin: 1,
          width: "25%",
          minWidth: 200,
          cursor: disabled ? "not-allowed" : "pointer",
          textAlign: "left",
          background: disabled ? "#d9d9d9" : "rgb(72, 145, 193)",
          color:
            //  completed ||
            !disabled ? "white" : "#1c1c1c",
          "@media (max-width: 600px)": {
            width: "80%",
            margin: "auto",
          },
        }}
      >
        <IconButton
          disabled={disabled || isComplete}
          sx={{
            marginBottom: 1,
            color: "white",
            "&:hover": {
              backgroundColor: "white",
            },
          }}
        >
          {isComplete || isUploaded ? (
            <CheckCircleIcon sx={{ color: "green" }} />
          ) : (
            <WorkIcon />
          )}
        </IconButton>
        <Typography
          sx={{ fontWeight: "bold", marginBottom: 1, color: "white" }}
        >
          Open Loan Calculator
        </Typography>
        <Typography variant="body2" sx={{ color: "white" }}>
          Choose the loan amount and tenure
        </Typography>
      </Box>

      {/* Modal for Loan Calculator */}
      <Dialog
        open={isModalOpen}
        onClose={closeLoanCalculatorModal}
        fullWidth
        maxWidth="md"
      >
        <DialogContent>
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#444", marginBottom: 1 }}
            >
              Loan Calculator
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 1,
                alignItems: "stretch",
                padding: 1,
                borderRadius: "5px",
                background: "#4D4D4E",
                boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Loan Image and Details */}
              <Box
                component={Paper}
                elevation={4}
                sx={{
                  flex: 1,
                  padding: 3,
                  borderRadius: "4px",
                  background: "#ffffff",
                  boxShadow: "0px 0px 0px rgba(255, 255, 255, 0.7)",
                }}
              >
                <img
                  src={loanImage}
                  alt="Loan"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "15px",
                    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                    marginBottom: "12px",
                  }}
                />
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    color: "#333",
                    marginBottom: 2,
                  }}
                >
                  Get quick loans with transparent processes.
                </Typography>
                <Box
                  sx={{
                    padding: 1,
                    background: "rgb(72, 145, 193)",
                    borderRadius: "3px",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    textAlign: "center",
                    boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  Charges as applicable
                </Box>

                <Typography
                  sx={{ marginTop: 2, color: "#555", textAlign: "center" }}
                >
                  <strong>Note</strong> : The actual rate of interest may vary
                  and will be clearly mentioned in the sanction letter.
                </Typography>
              </Box>

              {/* Loan Calculator Inputs */}
              <Box
                component={Paper}
                elevation={4}
                sx={{
                  flex: 1,
                  padding: 3,
                  borderRadius: "4px",
                  background: "#f8f9fa",
                  minHeight: "300px",
                }}
              >
                <InputLabel>Purpose of Loan</InputLabel>
                <FormControl
                  required
                  fullWidth
                  sx={{
                    marginBottom: 3,
                    backgroundColor: "rgb(72, 145, 193)", // Background color
                    borderRadius: "8px", // Rounded corners
                    border: "2px solid white", // Full-width white border
                    "& .MuiInputLabel-root": {
                      color: "black", // Label color
                    },
                    "& .MuiOutlinedInput-root": {
                      color: "white", // Selected text color white
                      "& fieldset": {
                        border: "none", // Removes default border to keep custom styling
                      },
                    },
                    "& .MuiSelect-icon": {
                      color: "white", // Dropdown icon color white
                    },
                  }}
                >
                  <Select
                    value={formValues.loanPurpose}
                    label="Select"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        loanPurpose: e.target.value,
                        othersInputs:
                          e.target.value === "OTHERS"
                            ? formValues.othersInputs
                            : "",
                      })
                    }
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          backgroundColor: "rgb(72, 145, 193)", // Dropdown background color
                          color: "white", // Dropdown text color white
                        },
                      },
                    }}
                  >
                    <MenuItem value="TRAVEL">TRAVEL</MenuItem>
                    <MenuItem value="MEDICAL">MEDICAL</MenuItem>
                    <MenuItem value="ACADEMICS">ACADEMICS</MenuItem>
                    <MenuItem value="OBLIGATIONS">OBLIGATIONS</MenuItem>
                    <MenuItem value="FESTIVAL">FESTIVAL</MenuItem>
                    <MenuItem value="OTHERS">OTHERS</MenuItem>
                  </Select>
                </FormControl>

                {/* Conditionally render the additional input field if "OTHERS" is selected */}
                {formValues.loanPurpose === "OTHERS" && (
                  <Box sx={{ marginBottom: 3 }}>
                    {othersInputs.map((value, idx) => (
                      <TextField
                        key={idx}
                        label="Purpose of Loan"
                        fullWidth
                        sx={{ marginBottom: 1 }}
                        value={value}
                        onChange={(e) => {
                          const newOthers = [...othersInputs];
                          newOthers[idx] = e.target.value;
                          setOthersInputs(newOthers);
                        }}
                      />
                    ))}
                  </Box>
                )}

                <Box sx={{ marginBottom: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Principal (Amount)
                  </Typography>
                  <TextField
                    type="text" // Set to "text" to prevent the browser's number input behavior
                    value={formValues.principal || ""}
                    // value={loanAmount || ""} // Ensure loanAmount is a valid number or empty string
                    onChange={(e) => {
                      const value = e.target.value;

                      if (value === "") {
                        // Update just the principal field, not the entire state
                        setFormValues({ ...formValues, principal: "" });
                      } else if (/^\d+$/.test(value)) {
                        const numericValue = Number(value);

                        if (numericValue > maxLoan) {
                          setFormValues({ ...formValues, principal: maxLoan });
                        } else {
                          setFormValues({
                            ...formValues,
                            principal: numericValue,
                          });
                        }
                      }
                    }}
                    variant="outlined"
                    fullWidth
                    sx={{
                      marginBottom: 2,
                      background: "rgb(72, 145, 193)",
                      borderRadius: "16px",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "16px",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(0, 0, 0, 0.23)", // Default border color
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgb(72, 145, 193)", // Border color on hover
                      },
                      // Remove spinner arrows
                      '& input[type="text"]': {
                        color: "white",
                        MozAppearance: "textfield", // For Firefox
                      },
                      '& input[type="text"]::-webkit-outer-spin-button, & input[type="text"]::-webkit-inner-spin-button':
                        {
                          WebkitAppearance: "none", // For Chrome, Safari, Edge
                          margin: 0,
                        },
                    }}
                  />

                  <Slider
                    value={formValues.principal}
                    min={5000}
                    max={maxLoan}
                    onChange={(e, newValue) =>
                      setFormValues(() => ({
                        ...formValues,
                        principal: newValue,
                      }))
                    }
                    valueLabelDisplay="auto"
                    marks={[
                      { value: 5000, label: "5K" },
                      { value: 100000, label: "100K" },
                    ]}
                    sx={{
                      color: "rgb(72, 145, 193)", // Main slider color
                      "& .MuiSlider-thumb": {
                        backgroundColor: "white", // Thumb color (circle)
                        border: "2px solid rgb(72, 145, 193)", // Thumb border
                      },
                      "& .MuiSlider-track": {
                        backgroundColor: "rgb(72, 145, 193)", // Track color
                      },
                      "& .MuiSlider-rail": {
                        backgroundColor: "rgba(72, 145, 193, 0.3)", // Rail color (unfilled part)
                      },
                      "& .MuiSlider-markLabel": {
                        color: "black", // Labels (5K, 100K) color
                      },
                    }}
                  />
                </Box>

                <Box sx={{ marginBottom: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Loan Tenure (Days)
                  </Typography>
                  {/* <TextField
                    fullWidth
                    // label="Enter Loan Amount"
                    value={formValues.tenure}
                    onChange={(e, newValue) => {
                      const value = Number(e.target.value);
                      if (value >= 1 && value <= 90) {
                        setFormValues(() => ({
                          ...formValues,
                          tenure: newValue,
                        }));
                      }
                    }}
                    variant="outlined"
                    margin="normal"
                    type="number"
                  />
                  <Slider
                    value={formValues.tenure}
                    min={1}
                    max={90}
                    onChange={(e, newValue) =>
                      setFormValues(() => ({
                        ...formValues,
                        tenure: newValue,
                      }))
                    } */}
                  <TextField
                    type="text"
                    value={formValues.tenure || ""}
                    onChange={(e) => {
                      const inputValue = e.target.value; // Get the raw input string

                      // Allow the input to be cleared (set tenure to empty string or a default value)
                      if (inputValue === "") {
                        setFormValues({ ...formValues, tenure: "" });
                        return;
                      }

                      // Check if the input contains only digits
                      if (/^\d+$/.test(inputValue)) {
                        const numericValue = Number(inputValue);

                        // Ensure the value is within the range (1 to 90)
                        if (numericValue < 1) {
                          setFormValues({ ...formValues, tenure: 1 });
                        } else if (numericValue > 90) {
                          setFormValues({ ...formValues, tenure: 90 });
                        } else {
                          setFormValues({
                            ...formValues,
                            tenure: numericValue,
                          });
                        }
                      }
                    }}
                    variant="outlined"
                    fullWidth
                    sx={{
                      marginBottom: 2,
                      background: "rgb(72, 145, 193)",
                      borderRadius: "16px",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "16px",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(0, 0, 0, 0.23)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgb(72, 145, 193)",
                      },
                      '& input[type="text"]': {
                        color: "white",
                        MozAppearance: "textfield",
                      },
                      '& input[type="text"]::-webkit-outer-spin-button, & input[type="text"]::-webkit-inner-spin-button':
                        {
                          WebkitAppearance: "none",
                          margin: 0,
                        },
                    }}
                  />

                  <Slider
                    value={
                      typeof formValues.tenure === "number"
                        ? formValues.tenure
                        : 1
                    }
                    min={1}
                    max={90}
                    onChange={(e, newValue) =>
                      setFormValues({ ...formValues, tenure: newValue })
                    }
                    valueLabelDisplay="auto"
                    marks={[
                      { value: 1, label: "1" },
                      { value: 90, label: "90" },
                    ]}
                    sx={{
                      color: "rgb(72, 145, 193)", // Main slider color
                      "& .MuiSlider-thumb": {
                        backgroundColor: "white", // Thumb color (circle)
                        border: "2px solid rgb(72, 145, 193)", // Thumb border
                      },
                      "& .MuiSlider-track": {
                        backgroundColor: "rgb(72, 145, 193)", // Track color
                      },
                      "& .MuiSlider-rail": {
                        backgroundColor: "rgba(72, 145, 193, 0.3)", // Rail color (unfilled part)
                      },
                      "& .MuiSlider-markLabel": {
                        color: "black", // Labels (5K, 100K) color
                      },
                    }}
                  />
                </Box>

                <Box sx={{ marginBottom: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Interest Rate (%)
                  </Typography>
                  {/* <TextField
                    fullWidth
                    // label="Enter Loan Amount"
                    value={formValues.roi}
                    onChange={(e, newValue) => {
                      const value = Number(e.target.value);
                      if (newValue >= 0.5 && newValue <= 2.75) {
                        setFormValues(() => ({
                          ...formValues,
                          roi: newValue,
                        }));
                      }
                    }}
                    variant="outlined"
                    margin="normal"
                    type="number"
                  /> */}
                  <TextField
                    inputProps={{ maxLength: 4 }} // Limits input to 2 characters; adjust as needed
                    type="text"
                    value={formValues.roi || ""}
                    onChange={(e) => {
                      const inputValue = e.target.value; // work with the raw string

                      // If the input is cleared, update just the roi field with an empty string (or a default value)
                      if (inputValue === "") {
                        setFormValues({ ...formValues, roi: "" });
                        return;
                      }

                      // Check if the input is a valid number (allow decimals)
                      if (/^\d*\.?\d*$/.test(inputValue)) {
                        const numericValue = parseFloat(inputValue);

                        // Enforce the maximum value
                        if (numericValue > 2.75) {
                          setFormValues({ ...formValues, roi: 2.75 });
                        } else {
                          // Update the state with the current input (keeping it as a string for now)
                          setFormValues({ ...formValues, roi: inputValue });
                        }
                      }
                    }}
                    onBlur={() => {
                      // When leaving the field, enforce the range properly
                      const numericValue = parseFloat(formValues.roi);
                      if (formValues.roi === "" || numericValue < 0.5) {
                        setFormValues({ ...formValues, roi: 0.5 });
                      } else if (numericValue > 2.75) {
                        setFormValues({ ...formValues, roi: 2.75 });
                      } else {
                        // Format it as a number if needed
                        setFormValues({ ...formValues, roi: numericValue });
                      }
                    }}
                    variant="outlined"
                    fullWidth
                    sx={{
                      marginBottom: 1,
                      background: "rgb(72, 145, 193)",
                      borderRadius: "16px",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "16px",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(0, 0, 0, 0.23)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#1976d2",
                      },
                      "& input[type=text]": {
                        color: "white",
                        MozAppearance: "textfield",
                      },
                      "& input[type=text]::-webkit-outer-spin-button, & input[type=text]::-webkit-inner-spin-button":
                        {
                          WebkitAppearance: "none",
                          margin: 0,
                        },
                    }}
                  />

                  <Slider
                    value={formValues.roi}
                    min={0.5}
                    max={2.75}
                    step={0.1}
                    onChange={(e, newValue) =>
                      setFormValues(() => ({
                        ...formValues,
                        roi: newValue,
                      }))
                    }
                    marks={[
                      { value: 0.5, label: "0.5%" },
                      { value: 2.75, label: "2.75%" },
                    ]}
                    valueLabelDisplay="auto"
                    sx={{
                      color: "rgb(72, 145, 193)", // Main slider color
                      "& .MuiSlider-thumb": {
                        backgroundColor: "white", // Thumb color (circle)
                        border: "2px solid rgb(72, 145, 193)", // Thumb border
                      },
                      "& .MuiSlider-track": {
                        backgroundColor: "rgb(72, 145, 193)", // Track color
                      },
                      "& .MuiSlider-rail": {
                        backgroundColor: "rgba(72, 145, 193, 0.3)", // Rail color (unfilled part)
                      },
                      "& .MuiSlider-markLabel": {
                        color: "black", // Labels (5K, 100K) color
                      },
                    }}
                  />
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography variant="h6">
                      Total Amount Payable (₹)
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
                    >
                      {formValues?.totalPayble}
                    </Typography>
                  </Grid>
                </Grid>

                <Box
                  sx={{
                    marginTop: 3,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    variant="contained"
                    color="error"
                    onClick={cancelLoanApplication}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    sx={{
                      backgroundColor: "rgb(72, 145, 193)",
                      color: "white",
                    }}
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Container>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoanCalculator;

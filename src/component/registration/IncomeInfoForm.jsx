import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Typography,
  CircularProgress,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { format } from "date-fns"; // Import date-fns format function

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { BASE_URL } from "../../baseURL";
import axios from "axios";
import Swal from "sweetalert2";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const IncomeInfoForm = ({ onComplete, disabled, prefillData, isVerified }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isIncomeDetails, setisIncomeDetails] = useState(false);
  let defaultvalue = {
    employementType: "",
    monthlyIncome: "",
    obligations: "",
    nextSalaryDate: "",
    incomeMode: "",
    workingSince: "",
  };
  const [formValues, setFormValues] = useState(
    prefillData && Object.keys(prefillData).length > 0
      ? prefillData
      : defaultvalue
  );
  const [error, setError] = useState("");

  const today = dayjs().format("YYYY-MM-DD");

  const handleKeyDown = (e) => {
    if (
      e.key.length === 1 &&
      !(e.key >= "0" && e.key <= "9") &&
      e.key !== "."
    ) {
      e.preventDefault();
    }
    if (e.key === "." && e.target.value.includes(".")) {
      e.preventDefault();
    }
  };

  const handleDate = (date) => {
    setFormValues((prev) => ({
      ...prev,
      nextSalaryDate: dayjs(date).format("YYYY/MM/DD"),
    }));
    setSelectedDate(date ? dayjs(date) : null);
  };

  const handleFormChange = (key, value) => {
    const trimedValues = typeof value === "string" ? value.trim() : value;
    setFormValues((prev) => ({ ...prev, [key]: trimedValues }));

    // Reset error when the user modifies input
    if (error) setError("");

    // Loan amount validation
    if (key === "obligations" && formValues.monthlyIncome) {
      const loanAmount = parseFloat(trimedValues) || 0;
      const monthlyIncome = parseFloat(formValues.monthlyIncome) || 0;
      const maxLoanAmount = 0.4 * monthlyIncome; // 40% of monthly income

      if (loanAmount > maxLoanAmount) {
        setError(
          `Loan amount should not exceed 40% of monthly income (₹${maxLoanAmount})`
        );
      }
    }
  };

  const handleSubmit = async () => {
    const trimmedValues = Object.fromEntries(
      Object.entries(formValues).map(([key, value]) => [
        key,
        typeof value === "string" ? value.trim() : value,
      ])
    );

    const formatteNextSalary = dayjs(trimmedValues.nextSalaryDate).format(
      "YYYY/MM/DD"
    );

    const formattedWorkingSince = dayjs(trimmedValues.workingSince).format(
      "YYYY/MM/DD"
    );

    if (Object.values(trimmedValues).some((val) => !val)) {
      setError("Please fill out the mandatory fields.");
      return;
    }

    const updatedDetails = {
      employementType: trimmedValues.employementType,
      monthlyIncome: trimmedValues.monthlyIncome,
      obligations: trimmedValues.obligations,
      nextSalaryDate: formatteNextSalary,
      incomeMode: trimmedValues.incomeMode,
      workingSince: formattedWorkingSince,
    };

    // if (
    //   !employementType ||
    //   !monthlyIncome ||
    //   !obligations ||
    //   !nextSalaryDate ||
    //   !incomeMode ||
    //   !workingSince
    // ) {
    //   setError("Please fill out this fields.");
    //   return;
    // }

    setIsFetching(true);
    try {
      const response = await axios.patch(
        `${BASE_URL}/addIncomeDetails`,
        updatedDetails,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        Swal.fire("Success", "Income details added successfully!", "success");
        setOpenModal(false);
        setisIncomeDetails(true);
        if (onComplete) onComplete({ formValues });
      } else {
        setError(response?.data?.message || "Failed to add income details.");
      }
    } catch (error) {
      setError(
        error.message || "An error occurred while adding income details."
      );
    } finally {
      setIsFetching(false);
    }
  };

  const handleModalClick = async () => {
    setOpenModal(true);
    setIsLoading(true);

    try {
      const dashboardResponse = await axios.get(
        `${BASE_URL}/getDashboardDetails`,
        {
          withCredentials: true,
        }
      );

      if (dashboardResponse.status === 200) {
        const { isIncomeDetails } = dashboardResponse.data;
        setisIncomeDetails(isIncomeDetails);

        if (isVerified) {
          const profileResponse = await axios.get(
            `${BASE_URL}/getProfileDetails`,
            {
              withCredentials: true,
            }
          );

          console.log("profileResponse", profileResponse);

          if (profileResponse.status === 200) {
            const profileData = profileResponse?.data?.data?.incomeDetails;

            console.log("profileData", profileData);

            setFormValues({
              employementType: profileData?.employementType || "",
              monthlyIncome: profileData?.monthlyIncome || "",
              obligations: profileData?.obligations || "",
              nextSalaryDate: profileData.nextSalaryDate
                ? new Date(profileData.nextSalaryDate)
                    .toISOString()
                    .split("T")[0]
                : "",
              incomeMode: profileData?.incomeMode || "",
              workingSince: profileData.workingSince
                ? new Date(profileData.workingSince).toISOString().split("T")[0]
                : "",
            });
          }
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (prefillData?.isIncomeDetails) {
      const profileData = prefillData.incomeDetails || {};
      setFormValues({
        employementType: profileData.employementType || "",
        monthlyIncome: profileData.monthlyIncome || "",
        obligations: profileData.obligations || "",
        nextSalaryDate: profileData.nextSalaryDate || "",
        incomeMode: profileData.incomeMode || "",
        workingSince: profileData.workingSince || "",
      });
    }
  }, [prefillData]);

  const StepBox = ({
    icon,
    title,
    description,
    disabled,
    completed,
    onClick,
    isVerified,
  }) => (
    <Box
      onClick={onClick}
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
        background: disabled ? "#d9d9d9" : "rgb(72, 145, 193)",
        color: !disabled ? "white" : "#1c1c1c",
        "@media (max-width: 600px)": {
          width: "80%",
          margin: "auto",
        },
      }}
    >
      {/* <IconButton
        sx={{
          color: completed ? "white" : disabled ? "#1c1c1c" : "white",
          ml: 1,
        }}
      >
        {completed ? (
          <i className="fas fa-check-circle" style={{ fontSize: "24px" }}></i>
        ) : (
          icon
        )}
      </IconButton> */}

      <IconButton
        sx={{
          color:
            //  isPanValidated ||

            disabled ? "grey" : "white",
          ml: 1,
        }}
        disabled={disabled}
      >
        {isIncomeDetails || isVerified ? (
          <CheckCircleIcon sx={{ color: "green" }} />
        ) : (
          icon
        )}
      </IconButton>

      {/* <IconButton
        sx={{
          color:
            // completed ? "white" :
            disabled ? "grey" : "green",
          ml: 1,
        }}
      >
        {isIncomeDetails ? <CheckCircleIcon /> : icon}
      </IconButton> */}
      <Box sx={{ ml: 2, flexGrow: 1 }}>
        <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
        <Typography variant="body2">{description}</Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <StepBox
        icon={<AccountBalanceWalletIcon />}
        title="Income Information"
        description="Please provide your income details."
        onClick={!disabled && handleModalClick}
        disabled={disabled}
        completed={isIncomeDetails}
        isVerified={isVerified}
      />

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 4,
            padding: 3,
            maxWidth: 400,
            margin: "auto",
            marginTop: "5%",
            mb: "20%",
            overflowY: "auto",
            maxHeight: "90vh",
            "& .MuiFormControl-root": {
              width: "100%",
            },
          }}
        >
          <Typography sx={{ marginBottom: 2 }}>Income Information</Typography>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="employee-type-label">Employee Type</InputLabel>
            <Select
              labelId="employee-type-label"
              value={formValues.employementType}
              onChange={(e) =>
                handleFormChange("employementType", e.target.value)
              }
              fullWidth
              required
              variant="outlined"
              label="Employee Type" // Important to link with InputLabel
            >
              <MenuItem value="SALARIED">Salaried</MenuItem>
              <MenuItem value="SELF EMPLOYED">Self-Employed</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Monthly Income"
            type="text"
            onKeyDown={handleKeyDown}
            value={formValues.monthlyIncome}
            onChange={(e) => handleFormChange("monthlyIncome", e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
            required
          />
          <TextField
            label="Loan Amount"
            type="text"
            onKeyDown={handleKeyDown}
            value={formValues.obligations}
            onChange={(e) => handleFormChange("obligations", e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
            required
            error={!!error}
            helperText={error}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
            <DatePicker
              label="Next Salary Date"
              sx={{
                marginBottom: "15px",
                "& .MuiSvgIcon-root": {
                  fill: "#000000",
                },
                "& .MuiFormLabel-root": {
                  color: "#000000",
                },
                // "& .MuiOutlinedInput-notchedOutline": {
                //   borderColor: "transparent",
                // },
              }}
              value={dayjs(formValues?.nextSalaryDate)}
              onChange={(date) => {
                setFormValues((prev) => ({
                  ...prev,
                  nextSalaryDate: dayjs(date).format("YYYY/MM/DD"),
                }));
              }}
              slotProps={{
                textField: { format: "DD/MM/YYYY" },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    ...params.inputProps,
                    min: today,
                  }}
                />
              )}
              minDate={dayjs(today)}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
            <DatePicker
              label="Working Since"
              sx={{
                marginBottom: "15px",
                "& .MuiSvgIcon-root": {
                  fill: "#000000",
                },
                "& .MuiFormLabel-root": {
                  color: "#000000",
                },
                // "& .MuiOutlinedInput-notchedOutline": {
                //   borderColor: "transparent",
                // },
              }}
              value={dayjs(formValues?.workingSince)}
              onChange={(date) => {
                setFormValues((prev) => ({
                  ...prev,
                  workingSince: dayjs(date).format("YYYY/MM/DD"),
                }));
              }}
              slotProps={{
                textField: { format: "DD/MM/YYYY" },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    ...params.inputProps,
                    min: today,
                  }}
                />
              )}
              maxDate={dayjs(today)}
            />
          </LocalizationProvider>
          <Typography variant="body1" sx={{ fontWeight: "bold", mb: 2 }}>
            Mode of Income Received
          </Typography>
          <RadioGroup
            value={formValues.incomeMode}
            onChange={(e) => handleFormChange("incomeMode", e.target.value)}
            row
          >
            <FormControlLabel value="BANK" control={<Radio />} label="Bank" />
            <FormControlLabel
              value="CHEQUE"
              control={<Radio />}
              label="Cheque"
            />
            <FormControlLabel value="CASH" control={<Radio />} label="Cash" />
            <FormControlLabel
              value="OTHERS"
              control={<Radio />}
              label="Others"
            />
          </RadioGroup>

          {error && <Typography color="error">{error}</Typography>}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
            }}
          >
            <Button variant="outlined" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isFetching}
              sx={{ backgroundColor: "rgb(72, 145, 193)", color: "white" }}
            >
              {isFetching ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default IncomeInfoForm;

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
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { BASE_URL } from "../../baseURL";
import axios from "axios";
import Swal from "sweetalert2";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const StepBox = ({
  icon,
  title,
  description,
  disabled,
  completed,
  onClick,
}) => (
  <Box
    onClick={!disabled && !completed ? onClick : null}
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
          // completed ? "white" :
          disabled ? "grey" : "white",
        ml: 1,
      }}
    >
      {completed ? <CheckCircleIcon /> : icon}
    </IconButton>
    <Box sx={{ ml: 2, flexGrow: 1 }}>
      <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
      <Typography variant="body2">{description}</Typography>
    </Box>
  </Box>
);

const IncomeInfoForm = ({ onComplete, disabled, prefillData }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isIncomDetails, setIsIncomDetails] = useState(false);
  const [formValues, setFormValues] = useState({
    employementType: "",
    monthlyIncome: "",
    obligations: "",
    nextSalaryDate: "",
    incomeMode: "",
  });
  const [error, setError] = useState("");

  const handleFormChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    if (error) setError("");
  };

  const handleSubmit = async () => {
    const {
      employementType,
      monthlyIncome,
      obligations,
      nextSalaryDate,
      incomeMode,
    } = formValues;

    if (
      !employementType ||
      !monthlyIncome ||
      !obligations ||
      !nextSalaryDate ||
      !incomeMode
    ) {
      setError("Please fill out all fields.");
      return;
    }

    setIsFetching(true);
    try {
      const response = await axios.patch(
        `${BASE_URL}/addIncomeDetails`,
        {
          employementType,
          monthlyIncome,
          obligations,
          nextSalaryDate,
          incomeMode,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        Swal.fire("Success", "Income details added successfully!", "success");
        setOpenModal(false);
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
      console.log(dashboardResponse);

      if (dashboardResponse.status === 200) {
        const { isIncomDetails } = dashboardResponse.data;
        setIsIncomDetails(isIncomDetails);
        console.log(isIncomDetails);

        if (isIncomDetails) {
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
            });
            console.log("bhhjhjhb>>>", employementType);
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
    if (prefillData?.isIncomDetails) {
      const profileData = prefillData.incomeDetails || {};
      setFormValues({
        employementType: profileData.employementType || "",
        monthlyIncome: profileData.monthlyIncome || "",
        obligations: profileData.obligations || "",
        nextSalaryDate: profileData.nextSalaryDate || "",
        incomeMode: profileData.incomeMode || "",
      });
    }
  }, [prefillData]);

  return (
    <>
      <StepBox
        icon={<AccountBalanceWalletIcon />}
        title="Income Information"
        description="Please provide your income details."
        onClick={handleModalClick}
        disabled={disabled}
        completed={isIncomDetails}
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
          }}
        >
          <Typography sx={{ marginBottom: 2 }}>Income Information</Typography>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
              select
              label="Employee Type"
              value={formValues.employementType}
              onChange={(e) =>
                handleFormChange("employementType", e.target.value)
              }
              fullWidth
              required
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            >
              <option value="SALARIED">Salaried</option>
              <option value="SELF_EMPLOYED">Self-Employed</option>
            </TextField>
          </FormControl>

          <TextField
            label="Monthly Income"
            type="number"
            value={formValues.monthlyIncome}
            onChange={(e) => handleFormChange("monthlyIncome", e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
            required
          />

          <TextField
            label="Loan Amount"
            type="number"
            value={formValues.obligations}
            onChange={(e) => handleFormChange("obligations", e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
            required
          />

          <TextField
            label="Next Salary Date"
            type="date"
            value={formValues.nextSalaryDate}
            onChange={(e) => handleFormChange("nextSalaryDate", e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
            required
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: new Date().toISOString().split("T")[0] }}
          />

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
              sx={{ backgroundColor: "#F26722", color: "white" }}
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

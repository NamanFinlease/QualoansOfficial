import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import { LocationOn } from "@mui/icons-material"; // For Address Info Icon
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";
import { format } from "date-fns";

import axios from "axios";
import { BASE_URL } from "../../baseURL";
import Swal from "sweetalert2";

const AddressInfo = ({ onComplete, disabled, prefillData, isVerified }) => {
  const [openModal, setOpenModal] = useState(false);
  const [residingSince, setResidingSince] = useState("");

  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stepCompleted, setStepCompleted] = useState(false);
  let defaultvalue = {
    address: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    residenceType: "OWNED",
    residingSince: dayjs(),
  };
  const [formValues, setFormValues] = useState(
    prefillData && Object.keys(prefillData).length > 0
      ? prefillData
      : defaultvalue
  );

  const [error, setError] = useState("");
  const [isAddressVerified, setIsAddressVerified] = useState(false);
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [mobile, setMobile] = useState("");
  const today = new Date();
  const handleFormChange = (key, value) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: typeof value === "string" ? value.trim() : value, // Only trim strings
    }));

    if (error) setError("");
  };

  // const handlePincodeChange = async (e) => {
  //   const value = e.target.value.trim();

  //   if (/^\d{0,6}$/.test(value)) {
  //     setFormValues({ ...formValues, pincode: value });

  //     if (value.length === 6) {
  //       try {
  //         const response = await fetch(
  //           `https://api.postalpincode.in/pincode/${value}`
  //         );
  //         const data = await response.json();

  //         if (data[0].Status === "Success") {
  //           const { Block, State } = data[0].PostOffice[0];
  //           setFormValues((prev) => ({
  //             ...prev,
  //             city: Block.trim(),
  //             state: State.trim(),
  //           }));
  //         } else {
  //           setFormValues((prev) => ({
  //             ...prev,
  //             city: "",
  //             state: "",
  //           }));

  //           alert("Please enter a valid pincode.");
  //         }
  //       } catch (error) {
  //         alert("Error fetching pincode data:", error);
  //         alet(
  //           "An error occurred while fetching data. Please try again later."
  //         );
  //       }
  //     } else {
  //       setFormValues((prev) => ({
  //         ...prev,
  //         city: "",
  //         state: "",
  //       }));
  //     }
  //   } else {
  //     setFormValues({ ...formValues, pincode: "", city: "", state: "" });
  //   }
  // };

  const handleDate = (date) => {
    console.log("dayjs", dayjs(date).format("YYYY/MM/DD"));
    setFormValues((prev) => ({
      ...prev,
      residingSince: dayjs(date).format("YYYY/MM/DD"),
    }));
    setSelectedDate(date ? dayjs(date) : null);
  };

  const handleSubmit = async () => {
    const trimmedValues = Object.fromEntries(
      Object.entries(formValues).map(([key, value]) => [
        key,
        typeof value === "string" ? value.trim() : value, // Safely trim strings only
      ])
    );
    // const trimmedValues = Object.fromEntries(
    //   Object.entries(formValues).map(([key, value]) => [key, value.trim()])
    // );

    const formattedResidingSince = format(
      new Date(trimmedValues.residingSince),
      "yyyy/MM/dd"
    );

    if (Object.values(trimmedValues).some((val) => !val)) {
      setError("Please fill out all fields.");
      return;
    }
    const updatedDetails = {
      ...trimmedValues,
      residingSince: formattedResidingSince,
    };

    // const updatedDetails = {
    //   address: trimmedValues.address,
    //   landmark: trimmedValues.landmark,
    //   pincode: trimmedValues.pincode,
    //   city: trimmedValues.city,
    //   state: trimmedValues.state,
    //   residenceType: trimmedValues.residenceType,
    //   residingSince: formatteResidingSince,
    // };

    console.log("residingSince", residingSince);

    setIsFetching(true);
    try {
      const response = await axios.patch(
        `${BASE_URL}/currentResidence`,
        updatedDetails,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("response", response);

      if (response.status === 200) {
        Swal.fire("Address details updated successfully!");
        setIsAddressVerified(true);
        setOpenModal(false);
        setStepCompleted(true);
        onComplete({ formValues });
      } else {
        setError("Failed to update address details.");
      }
    } catch (error) {
      console.error("API Error:", error);
      setError("Error submitting address details. Please try again.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleModalClick = async () => {
    setOpenModal(true);
    setIsLoading(true);

    try {
      const getDashboardDetailsResponse = await axios.get(
        `${BASE_URL}/getDashboardDetails`,
        {
          withCredentials: true,
        }
      );

      console.log(
        "getDashboardDetailsResponse >>> ",
        getDashboardDetailsResponse
      );

      if (getDashboardDetailsResponse.status === 200) {
        setIsLoading(false);
        const { isCurrentResidence } = getDashboardDetailsResponse.data;

        console.log("isCurrentResidence:", isCurrentResidence);

        // Set the value of isAddressVerified based on the fetched response
        setIsAddressVerified(isCurrentResidence);

        if (isCurrentResidence) {
          const getProfileDetailsResponse = await axios.get(
            `${BASE_URL}/getProfileDetails`,
            {
              withCredentials: true,
            }
          );

          // console.log(
          //   "getProfileDetailsResponse >>> ",
          //   getProfileDetailsResponse
          // );

          const residenceData =
            getProfileDetailsResponse?.data?.data?.residence;

          // Update formValues with residenceData
          {
            console.log(
              "residenceData?.residingSince ",
              residenceData.residingSince
            );
          }

          setFormValues({
            address: residenceData?.address || "",
            landmark: residenceData?.landmark || "",
            city: residenceData?.city || "",
            state: residenceData?.state || "",
            pincode: residenceData?.pincode || "",
            residenceType: residenceData?.residenceType || "OWNED",
            residingSince: dayjs(residenceData?.residingSince),
          });
        }
      }
    } catch (error) {
      setIsLoading(false);
      alert("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (prefillData) {
      setFormValues({
        ...prefillData,
        residingSince: dayjs(prefillData?.residingSince),
      });
      setStepCompleted(true);
    }
  }, [prefillData]);

  // useEffect(() => {
  //   if (prefillData && prefillData.address) {
  //     setFormValues({
  //       address: prefillData.address || "",
  //       landmark: prefillData.landmark || "",
  //       pincode: prefillData.pincode || "",
  //       city: prefillData.city || "",
  //       state: prefillData.state || "",
  //       residenceType: prefillData.residenceType || "OWNED",
  //       residingSince: prefillData.residingSince || "",
  //     });
  //   }
  // }, [prefillData]);

  const StepBox = ({
    icon,
    title,
    description,
    onClick,
    disabled,
    completed,
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
          color:
            // completed ? "white" :
            disabled ? "grey" : "white",
          ml: 1,
        }}
      >
        {completed ? <CheckCircleIcon sx={{ color: "#4caf50" }} /> : icon}
      </IconButton> */}
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
        {isAddressVerified || isVerified ? (
          <CheckCircleIcon sx={{ color: "green" }} />
        ) : (
          <LocationOn />
        )}
      </IconButton>
      <Box sx={{ ml: 2, flexGrow: 1 }}>
        <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
        <Typography variant="body2">{description}</Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <StepBox
        icon={<LocationOn />}
        title="Address Information"
        description="Update your current residence details."
        onClick={!disabled && handleModalClick}
        disabled={disabled}
        completed={isAddressVerified}
        isVerified={isVerified}
      />

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 4,
            boxShadow: 24,
            padding: 3,
            maxWidth: 400,
            margin: "auto",
            marginTop: "5%",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <Typography sx={{ marginBottom: 2 }}>
            Current Residence Information
          </Typography>

          {["address", "landmark", "pincode", "city", "state"].map((field) => (
            <TextField
              key={field}
              label={field.replace(/^\w/, (c) => c.toUpperCase())}
              value={formValues[field]}
              onChange={
                // field === "pincode"
                //   ? handlePincodeChange
                //   :
                (e) => handleFormChange(field, e.target.value)
              }
              fullWidth
              sx={{ marginBottom: 2 }}
              required
            />
          ))}

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="residence-type-label">Residence Type</InputLabel>
            <Select
              labelId="residence-type-label"
              value={formValues.residenceType}
              onChange={(e) =>
                handleFormChange("residenceType", e.target.value)
              }
              label="Residence Type"
            >
              {[
                "OWNED",
                "RENTED",
                "PARENTAL",
                "COMPANY PROVIDED",
                "OTHERS",
              ].map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {console.log(formValues.residingSince)}

          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
            <DatePicker
              label="Residing Since"
              type="date"
              value={
                formValues.residingSince
                  ? dayjs(formValues.residingSince)
                  : null
              }
              // value={dayjs(formValues?.residingSince)}
              onChange={handleDate}
              sx={{
                paddingBottom: "20px !important",
                minWidth: "100%",
                "& .MuiSvgIcon-root": {
                  fill: "#000000",
                },
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
            />
          </LocalizationProvider>

          {error && <Typography color="error">{error}</Typography>}

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setOpenModal(false)}
              sx={{ color: "#1c1c1c", borderColor: "#1c1c1c" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isFetching || stepCompleted}
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

export default AddressInfo;

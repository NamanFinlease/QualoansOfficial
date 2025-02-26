import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import axios from "axios";
import Swal from "sweetalert2";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PANValidation from "./PanValidation";
import { BASE_URL } from "../../baseURL";

const UserDetails = ({
  onComplete,
  disabled,
  isVerified,
  isMobileVerified,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPanValidated, setIsPanValidated] = useState(false);
  const [details, setDetails] = useState({
    fullName: "",
    fathersName: "",
    pan: "",
    mobile: "",
  });
  const [error, setError] = useState("");

  // Fetch Profile Details
  const fetchProfileDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/getProfileDetails?detailsType=personalDetails`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setDetails({
          fullName: response.data.fullName || "",
          fathersName: response.data.fathersName || "",
          pan: response.data.pan || "",
          mobile: response.data.mobile || "",
        });
      } else {
        Swal.fire("Error", "Failed to fetch profile details.", "error");
      }
    } catch (err) {
      Swal.fire("Error", "An error occurred while fetching data.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileDetails();
  }, []);

  const handleChange = (field, value) => {
    if (field === "pan") {
      const filteredValue = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
      if (filteredValue.length <= 10) {
        setDetails((prev) => ({ ...prev, [field]: filteredValue }));
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
        setError(
          filteredValue.length === 10 && !panRegex.test(filteredValue)
            ? "Invalid PAN format. It should be 5 letters, 4 digits, 1 letter."
            : ""
        );
      }
    } else {
      setDetails((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async () => {
    if (
      !details.fullName ||
      !details.fathersName ||
      !details.pan ||
      !details.mobile
    ) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.patch(
        `${BASE_URL}/addFormDetails`,
        details,
        {
          withCredentials: true,
        }
      );

      console.log("Response data:", response.status, response.data);

      if (response.status === 200) {
        Swal.fire("Success", "User details updated successfully.", "success");
        setOpen(false);
        setIsPanValidated(true);

        // **Check if onComplete exists before calling it**
        if (typeof onComplete === "function") {
          console.log("Calling onComplete with details:", details);
          onComplete(details);
        } else {
          console.warn("onComplete is not defined or is not a function.");
        }

        fetchProfileDetails(); // Refresh updated details
      } else {
        Swal.fire(
          "Error",
          response.data?.message || "Failed to submit details.",
          "error"
        );
      }
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "An error occurred while submitting.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        onClick={!disabled ? () => setOpen(true) : null}
        sx={{
          p: 2,
          background: isMobileVerified ? "#F26722" : "#d9d9d9",

          // bgcolor: disabled ? "#F26722" : "#F26722",
          color: isMobileVerified ? "white" : "#1c1c1c",
          borderRadius: 2,
          cursor: disabled ? "not-allowed" : "pointer",
          width: "25%",
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          "@media (max-width: 600px)": {
            width: "80%",
            margin: "auto",
          },
        }}
      >
        <IconButton disabled={disabled} sx={{ p: 0, mb: 1, ml: 1 }}>
          {isVerified ? (
            <CheckCircleIcon sx={{ color: "green" }} />
          ) : (
            <Person sx={{ color: isMobileVerified ? "white" : "grey" }} />
          )}
        </IconButton>
        <Box sx={{ ml: 2, flexGrow: 1 }}>
          <Typography sx={{ fontWeight: "bold" }}>User Details</Typography>
          <Typography variant="body2">
            Please update your personal details.
          </Typography>
        </Box>
      </Box>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 2,
            p: 3,
            maxWidth: 400,
            mx: "auto",
            mt: "5%",
          }}
        >
          <Typography variant="h6">Enter Your Information</Typography>
          <TextField
            label="Full Name"
            value={details.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Father's Name"
            value={details.fathersName}
            onChange={(e) => handleChange("fathersName", e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="PAN"
            value={details.pan}
            onChange={(e) => handleChange("pan", e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Mobile Number"
            value={details.mobile}
            onChange={(e) => handleChange("mobile", e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </Box>
        </Box>
      </Modal>
      {isPanValidated && <PANValidation />}
    </>
  );
};

export default UserDetails;

import React, { useState } from "react";
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
import { LocationOn } from "@mui/icons-material"; // For Address Info Icon
import axios from "axios";
import { BASE_URL } from "../../baseURL";
import Swal from "sweetalert2";

const StepBox = ({ icon, title, description, onClick, disabled, completed }) => (
  <Box
    onClick={!disabled && !completed ? onClick : null}
    sx={{
      display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 2,
        borderColor: completed ? "green" : disabled ? "grey" : "orange",
        borderRadius: 3,
        margin: 1,
        width: "30%",
        minWidth: 200,
        cursor: disabled ? "not-allowed" : "pointer",
        textAlign: "left",
        background: completed
          ? "linear-gradient(45deg, #28a745, #218838)" // Green gradient when step is complete
          : disabled
          ? "lightgrey"
          : "linear-gradient(45deg, #4D4D4E, orange)",
        color: completed || !disabled ? "white" : "darkgrey",
        "@media (max-width: 600px)": {
          width: "80%",
          margin: "auto",
              },
    }}
  >
    <IconButton
      sx={{
        color: completed ? "white" : disabled ? "grey" : "white",
        ml: 1,
      }}
    >
      {completed ? (
        <i className="fas fa-check-circle" style={{ fontSize: "24px" }}></i>
      ) : (
        icon
      )}
    </IconButton>
    <Box sx={{ ml: 2, flexGrow: 1 }}>
      <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
      <Typography variant="body2">{description}</Typography>
    </Box>
  </Box>
);

const AddressInfo = ({ onComplete, disabled }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [stepCompleted, setStepCompleted] = useState(false);
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [formValues, setFormValues] = useState({
    address: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    residenceType: "OWNED",
  });
  const [error, setError] = useState("");

  const handleFormChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    if (error) setError("");
  };

  

  const handlePincodeChange = async (e) => {
    const value = e.target.value;

    // Only allow numeric input and ensure the pincode has no more than 6 digits
    if (/^\d{0,6}$/.test(value)) {
      setFormValues({ ...formValues, pincode: value });

      // If the pincode has exactly 6 digits, fetch city and state
      if (value.length === 6) {
        try {
          const response = await fetch(`https://api.postalpincode.in/pincode/${value}`);
          console.log("response",response);
          
          const data = await response.json();

          if (data[0].Status === "Success") {
            const { Block, State } = data[0].PostOffice[0];
            setFormValues((prev) => ({
              ...prev,
              city: Block,
              state: State,
            }));
            console.log("City:", Block, "State:", State);
          } else {
            // Handle invalid pin code case
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
          console.error("Error fetching pincode data:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while fetching data. Please try again later.",
          });
        }
      } else {
        // Reset city and state if pincode is incomplete
        setFormValues((prev) => ({
          ...prev,
          city: "",
          state: "",
        }));
      }
    } else {
      // Clear the pincode and reset city/state if input is invalid
      setFormValues({ ...formValues, pincode: "", city: "", state: "" });
    }
  };

  const handleSubmit = async () => {
    if (Object.values(formValues).some((val) => !val)) {
      setError("Please fill out all fields.");
      return;
    }

    setIsFetching(true);
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/user/currentResidence`,
        formValues,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        Swal.fire("Address details updated successfully!");
        setOpenModal(false);
        setStepCompleted(true);
        onComplete?.();
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

  return (
    <>
      <StepBox
        icon={<LocationOn />}
        title="Address Information"
        description="Update your current residence details."
        onClick={() => setOpenModal(true)}
        disabled={disabled || stepCompleted}
        completed={stepCompleted}
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
            maxHeight: "90vh", // Set the maximum height
            overflowY: "auto", // Enable vertical scrolling
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
                field === "pincode" ? handlePincodeChange : (e) => handleFormChange(field, e.target.value)
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
              onChange={(e) => handleFormChange("residenceType", e.target.value)}
              label="Residence Type" // Ensure this matches the InputLabel text
            >
              {["OWNED", "RENTED", "PARENTAL", "COMPANY PROVIDED", "OTHERS"].map(
                (type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>

          {error && <Typography color="error">{error}</Typography>}

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isFetching || stepCompleted}
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

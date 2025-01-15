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
} from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../baseURL";

const AddressInfo = ({ onComplete, disabled }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [formValues, setFormValues] = useState({
    address: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    residenceType: "OWNED",
  });
  const [error, setError] = useState("");

  // Function to handle form submission
  const handleSubmit = async () => {
    const { address, landmark, pincode, city, state, residenceType } =
      formValues;

    // Validation
    if (!address || !landmark || !pincode || !city || !state) {
      setError("Please fill out all fields.");
      return;
    }

    setIsFetching(true);

    try {
      const apiData = {
        address,
        landmark,
        pincode,
        city,
        state,
        residenceType,
      };
      const response = await axios.patch(
        `${BASE_URL}/api/user/currentResidence`,
        apiData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert("Address details updated successfully!");
        setOpenModal(false); // Close the modal on success
        if (onComplete) onComplete(); // Notify parent component when address is updated
      } else {
        setError("Failed to update address details.");
      }
    } catch (error) {
      console.error("Error updating address data:", error);
      setError("Error submitting address details. Please try again.");
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpenModal(true)}
        disabled={disabled} // Disable the button if the step is already completed
      >
        Complete Address Info
      </Button>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 4,
            boxShadow: 24,
            padding: 3,
            maxWidth: 400,
            margin: "auto",
            marginTop: "20%",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Current Resident Address
          </Typography>

          {/* Address */}
          <TextField
            label="Address"
            value={formValues.address}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, address: e.target.value }))
            }
            fullWidth
            sx={{ marginBottom: 2 }}
            required
          />

          {/* Landmark */}
          <TextField
            label="Landmark"
            value={formValues.landmark}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, landmark: e.target.value }))
            }
            fullWidth
            sx={{ marginBottom: 2 }}
            required
          />

          {/* Pincode */}
          <TextField
            label="Pincode"
            value={formValues.pincode}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, pincode: e.target.value }))
            }
            fullWidth
            sx={{ marginBottom: 2 }}
            required
          />

          {/* City */}
          <TextField
            label="City"
            value={formValues.city}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, city: e.target.value }))
            }
            fullWidth
            sx={{ marginBottom: 2 }}
            required
          />

          {/* State */}
          <TextField
            label="State"
            value={formValues.state}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, state: e.target.value }))
            }
            fullWidth
            sx={{ marginBottom: 2 }}
            required
          />

          {/* Residence Type */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Residence Type</InputLabel>
            <Select
              value={formValues.residenceType}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  residenceType: e.target.value,
                }))
              }
            >
              <MenuItem value="OWNED">Owned</MenuItem>
              <MenuItem value="RENTED">Rented</MenuItem>
              <MenuItem value="PARENTAL">Parental</MenuItem>
              <MenuItem value="COMPANY PROVIDED">Company Provided</MenuItem>
              <MenuItem value="OTHERS">Others</MenuItem>
            </Select>
          </FormControl>

          {/* Error message */}
          {error && <Typography color="error">{error}</Typography>}

          {/* Actions */}
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
              disabled={isFetching}
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

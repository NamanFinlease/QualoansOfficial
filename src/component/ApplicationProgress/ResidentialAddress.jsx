import React, { useState, useEffect } from "react";
import {
  Box,
  FormHelperText,
  Typography,
  Grid,
  Divider,
  Button,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { BASE_URL } from "../../baseURL";
import { sharedStyles } from "../shared/styles";
import axios from "axios";
import { format } from "date-fns";
import moment from "moment";

// Define the ResidentialAddress component
const ResidentialAddress = () => {
  const [Residential, setResidential] = useState({
    address: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    residenceType: "",
    residingSince: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const residenceOptions = ["OWNED", "RENTED", "PARENTAL", "COMPANY PROVIDED"];
  // Fetch Residential details from the backend API
  useEffect(() => {
    const fetchResidentialData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/getProfileDetails`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch Residential data");
        }

        const data = await response.json();
        setResidential({
          address: data?.data?.residence?.address,
          landmark: data?.data?.residence?.landmark,
          city: data?.data?.residence?.city,
          state: data?.data?.residence?.state,
          pincode: data?.data?.residence?.pincode,
          residenceType: data?.data?.residence?.residenceType,
          residingSince: data?.data?.residence?.residingSince,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResidentialData();
  }, []);
  // const handleSave = async () => {
  //   // Check if any field is empty
  //   if (
  //     !Residential.address ||
  //     !Residential.landmark ||
  //     !Residential.city ||
  //     !Residential.state ||
  //     !Residential.pincode ||
  //     !Residential.residenceType ||
  //     !Residential.residingSince
  //   ) {
  //     setError("All fields are required!");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const formattedResidenceSince = moment(
  //       Residential.residingSince,
  //       "YYYY-MM-DD",
  //       true
  //     ).isValid()
  //       ? moment(Residential.residingSince).format("YYYY-MM-DD")
  //       : "";

  //     const updatedResident = {
  //       ...Residential,
  //       residingSince: formattedResidenceSince,
  //     };

  //     const response = await axios.patch(
  //       `${BASE_URL}/currentResidence`,
  //       updatedResident,
  //       {
  //         headers: { "Content-Type": "application/json" },
  //         withCredentials: true,
  //       }
  //     );

  //     if (response.status !== 200) {
  //       throw new Error("Failed to update Residential data");
  //     }

  //     setEditMode(false); // Disable edit mode after saving
  //     setError(null); // Clear error message after successful save
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSave = async () => {
    if (
      !Residential.address ||
      !Residential.landmark ||
      !Residential.city ||
      !Residential.state ||
      !Residential.pincode ||
      !Residential.residenceType ||
      !Residential.residingSince
    ) {
      alert("All fields are required!");
      return;
    }
    setLoading(true);
    try {
      const formattedResidenceSince = moment(
        Residential.residingSince,
        "YYYY-MM-DD",
        true
      ).isValid()
        ? moment(Residential.residingSince).format("YYYY-MM-DD")
        : "";

      const updatedResident = {
        ...Residential,
        residingSince: formattedResidenceSince,
      };

      const response = await axios.patch(
        `${BASE_URL}/currentResidence`,
        updatedResident,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to update Residential data");
      }

      setEditMode(false); // Disable edit mode after saving
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle change in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setResidential((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <Typography variant="h6" align="center">
        Loading...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" align="center" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={sharedStyles.containerBox}>
      <Typography variant="h4" sx={sharedStyles.title}>
        Residential Address
      </Typography>

      <Divider sx={sharedStyles.divider} />

      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            maxHeight: "600px",
            overflowY: "auto",
            padding: 2,
            borderRadius: "8px",
            backgroundColor: "white",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "white",
            }}
          >
            <tbody>
              {editMode ? (
                <>
                  <tr style={styles.tableRow}>
                    <td style={styles.tableCell}>Address</td>
                    <td style={styles.tableCell}>
                      <TextField
                        fullWidth
                        name="address"
                        value={Residential.address}
                        onChange={handleChange}
                        required
                        error={!Residential.address}
                        helperText={
                          !Residential.address ? "Address is required" : ""
                        }
                      />
                    </td>
                  </tr>
                  <tr style={styles.tableRow}>
                    <td style={styles.tableCell}>Landmark</td>
                    <td style={styles.tableCell}>
                      <TextField
                        fullWidth
                        name="landmark"
                        value={Residential.landmark}
                        onChange={handleChange}
                        required
                        error={!Residential.landmark}
                        helperText={
                          !Residential.landmark ? "Landmark is required" : ""
                        }
                      />
                    </td>
                  </tr>

                  <tr style={styles.tableRow}>
                    <td style={styles.tableCell}>Pincode</td>
                    <td style={styles.tableCell}>
                      <TextField
                        fullWidth
                        name="pincode"
                        value={Residential.pincode}
                        onChange={handleChange}
                        required
                        error={!Residential.pincode}
                        helperText={
                          !Residential.pincode ? "Pincode is required" : ""
                        }
                      />
                    </td>
                  </tr>

                  <tr style={styles.tableRow}>
                    <td style={styles.tableCell}>City</td>
                    <td style={styles.tableCell}>
                      <TextField
                        fullWidth
                        name="city"
                        value={Residential.city}
                        onChange={handleChange}
                        required
                        error={!Residential.city}
                        helperText={!Residential.city ? "City is required" : ""}
                      />
                    </td>
                  </tr>

                  <tr style={styles.tableRow}>
                    <td style={styles.tableCell}>State</td>
                    <td style={styles.tableCell}>
                      <TextField
                        fullWidth
                        name="state"
                        value={Residential.state}
                        onChange={handleChange}
                        required
                        error={!Residential.state}
                        helperText={
                          !Residential.state ? "State is required" : ""
                        }
                      />
                    </td>
                  </tr>

                  <tr style={styles.tableRow}>
                    <td style={styles.tableCell}>Residence Type</td>
                    <td style={styles.tableCell}>
                      <FormControl
                        fullWidth
                        error={!Residential.residenceType}
                        required
                      >
                        <Select
                          name="residenceType"
                          value={Residential.residenceType}
                          onChange={handleChange}
                          displayEmpty
                        >
                          <MenuItem value="" disabled>
                            Select Residence Type
                          </MenuItem>
                          {residenceOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                        {!Residential.residenceType && (
                          <FormHelperText>
                            Residence Type is required
                          </FormHelperText>
                        )}
                      </FormControl>
                    </td>
                  </tr>

                  <tr style={styles.tableRow}>
                    <td style={styles.tableCell}>Residence Since</td>
                    <td style={styles.tableCell}>
                      <TextField
                        fullWidth
                        type="date"
                        name="residingSince"
                        value={Residential.residingSince || ""}
                        onChange={handleChange}
                        required
                        error={!Residential.residingSince}
                        helperText={
                          !Residential.residingSince
                            ? "Residence Since is required"
                            : ""
                        }
                        InputLabelProps={{ shrink: true }}
                      />
                    </td>
                  </tr>
                </>
              ) : (
                <>
                  <tr style={styles.tableRow}>
                    <td
                      style={{
                        padding: "16px",
                        fontWeight: "bold",
                        width: "40%",
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      Address
                    </td>
                    <td style={styles.tableCell}>{Residential.address}</td>
                  </tr>
                  <tr style={styles.tableRow}>
                    <td
                      style={{
                        padding: "16px",
                        fontWeight: "bold",
                        width: "40%",
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      Landmark
                    </td>
                    <td style={styles.tableCell}>{Residential.landmark}</td>
                  </tr>
                  <tr style={styles.tableRow}>
                    <td
                      style={{
                        padding: "16px",
                        fontWeight: "bold",
                        width: "40%",
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      Pincode
                    </td>
                    <td style={styles.tableCell}>{Residential.pincode}</td>
                  </tr>
                  <tr style={styles.tableRow}>
                    <td
                      style={{
                        padding: "16px",
                        fontWeight: "bold",
                        width: "40%",
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      City
                    </td>
                    <td style={styles.tableCell}>{Residential.city}</td>
                  </tr>
                  <tr style={styles.tableRow}>
                    <td
                      style={{
                        padding: "16px",
                        fontWeight: "bold",
                        width: "40%",
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      State
                    </td>
                    <td style={styles.tableCell}>{Residential.state}</td>
                  </tr>
                  <tr style={styles.tableRow}>
                    <td
                      style={{
                        padding: "16px",
                        fontWeight: "bold",
                        width: "40%",
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      Residence Type
                    </td>
                    <td style={styles.tableCell}>
                      {Residential.residenceType}
                    </td>
                  </tr>
                  <tr style={styles.tableRow}>
                    <td
                      style={{
                        padding: "16px",
                        fontWeight: "bold",
                        width: "40%",
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      Residence Since
                    </td>
                    <td style={styles.tableCell}>
                      {Residential.residingSince
                        ? format(
                            new Date(Residential.residingSince),
                            "dd/MM/yyyy"
                          )
                        : "N/A"}{" "}
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>

          <Button
            variant="contained"
            sx={{
              marginTop: 2,
              backgroundColor: "gray",
              "&:hover": { backgroundColor: "darkgray" },
            }}
            onClick={() => setEditMode((prev) => !prev)}
          >
            {editMode ? "Cancel" : "Edit"}
          </Button>
          {editMode && (
            <Button
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "rgb(72, 145, 193)",
                "&:hover": { backgroundColor: "#d65e1b" },
                ml: 2,
              }}
              onClick={handleSave}
            >
              Save
            </Button>
          )}
        </Box>
      </div>
    </Box>
  );
};

const styles = {
  tableCell: {
    color: "rgb(72, 145, 193)",
    padding: "16px",
    fontWeight: "bold",
    backgroundColor: "white",
  },
  tableRow: {
    borderBottom: "1px solid #e0e0e0",
  },
};

export default ResidentialAddress;

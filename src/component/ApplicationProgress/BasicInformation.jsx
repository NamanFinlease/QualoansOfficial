import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import dayjs from "dayjs";
import { BASE_URL } from "../../baseURL";
import Swal from "sweetalert2";
import axios from "axios";
import { sharedStyles } from "../shared/styles";

const BasicInformation = () => {
  const [user, setUser] = useState({
    fullName: "",
    mothersName: "",
    fathersName: "",
    gender: "",
    dob: "",
    personalEmail: "",
    maritalStatus: "",
    spouseName: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false); // Edit mode toggle
  const [fieldErrors, setFieldErrors] = useState({}); // Object to track field-specific errors

  // Fetch user details from the backend API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/getProfileDetails`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Ensures cookies and credentials are included in the request
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser({
          fullName: data?.data?.personalDetails?.fullName,
          gender: data?.data?.personalDetails?.gender,
          mothersName: data?.data?.personalDetails?.mothersName,
          fathersName: data?.data?.personalDetails?.fathersName,
          dob: data?.data?.personalDetails?.dob,
          personalEmail: data?.data?.personalDetails?.personalEmail,
          maritalStatus: data?.data?.personalDetails?.maritalStatus,
          spouseName: data?.data?.personalDetails?.spouseName,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear error for the field when edited
  };

  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors = {};

    if (!user.mothersName) errors.mothersName = "Mother's name is required.";
    if (!user.fathersName) errors.fathersName = "Father's name is required.";
    if (!user.personalEmail || !emailRegex.test(user.personalEmail))
      errors.personalEmail = "Please enter a valid email address.";
    if (!user.maritalStatus)
      errors.maritalStatus = "Marital status is required.";

    if (user.maritalStatus === "MARRIED" && !user.spouseName)
      errors.spouseName = "Spouse name is required.";

    setFieldErrors(errors);

    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleSave = async () => {
    if (!validateFields()) return; // Validate before saving

    try {
      setLoading(true);
      const response = await axios.patch(`${BASE_URL}/personalInfo`, user, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Updated Successfully!",
          confirmButtonColor: "rgb(72, 145, 193)",
        });
        setEditMode(false); // Toggle off edit mode after saving
      } else {
        throw new Error("Failed to update details.");
      }
    } catch (error) {
      setError("An error occurred while updating details.");
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while fetching data
  if (loading) {
    return (
      <Typography variant="h6" align="center">
        Loading...
      </Typography>
    );
  }

  // Show error if there's an issue with the API request
  if (error) {
    return (
      <Typography variant="h6" align="center" color="error">
        {error}
      </Typography>
    );
  }

  // If no user data, show a message
  if (!user) {
    return (
      <Typography variant="h6" align="center">
        No user data found.
      </Typography>
    );
  }

  return (
    <Box sx={sharedStyles.containerBox}>
      <Typography variant="h4" sx={sharedStyles.title}>
        Basic Information
      </Typography>

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
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <tbody>
              <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                <td
                  style={{
                    padding: "16px",
                    fontWeight: "bold",
                    width: "40%",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  Full Name
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "rgb(72, 145, 193)",
                    fontWeight: "bold",
                  }}
                >
                  {user.fullName}
                </td>
              </tr>

              <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                <td
                  style={{
                    padding: "16px",
                    fontWeight: "bold",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  Mother's Name
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "rgb(72, 145, 193)",
                    fontWeight: "bold",
                  }}
                >
                  {editMode ? (
                    <>
                      <TextField
                        name="mothersName"
                        value={user.mothersName}
                        onChange={handleChange}
                        fullWidth
                      />
                      {fieldErrors.mothersName && (
                        <FormHelperText error>
                          {fieldErrors.mothersName}
                        </FormHelperText>
                      )}
                    </>
                  ) : (
                    user.mothersName
                  )}
                </td>
              </tr>

              <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                <td
                  style={{
                    padding: "16px",
                    fontWeight: "bold",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  Father's Name
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "rgb(72, 145, 193)",
                    fontWeight: "bold",
                  }}
                >
                  {editMode ? (
                    <>
                      <TextField
                        name="fathersName"
                        value={user.fathersName}
                        onChange={handleChange}
                        fullWidth
                      />
                      {fieldErrors.fathersName && (
                        <FormHelperText error>
                          {fieldErrors.fathersName}
                        </FormHelperText>
                      )}
                    </>
                  ) : (
                    user.fathersName
                  )}
                </td>
              </tr>

              <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                <td
                  style={{
                    padding: "16px",
                    fontWeight: "bold",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  Gender
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "rgb(72, 145, 193)",
                    fontWeight: "bold",
                  }}
                >
                  {user.gender}
                </td>
              </tr>

              <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                <td
                  style={{
                    padding: "16px",
                    fontWeight: "bold",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  Date of Birth
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "rgb(72, 145, 193)",
                    fontWeight: "bold",
                  }}
                >
                  {user.dob ? dayjs(user.dob).format("DD/MM/YYYY") : "N/A"}
                </td>
              </tr>

              <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                <td
                  style={{
                    padding: "16px",
                    fontWeight: "bold",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  Personal Email
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "rgb(72, 145, 193)",
                    fontWeight: "bold",
                  }}
                >
                  {
                    // editMode ? (
                    //   <TextField
                    //     name="personalEmail"
                    //     value={user.personalEmail}
                    //     onChange={handleChange}
                    //     fullWidth
                    //   />
                    // ) : (
                    user.personalEmail
                    // )
                  }
                </td>
              </tr>

              <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                <td
                  style={{
                    padding: "16px",
                    fontWeight: "bold",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  Marital Status
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "rgb(72, 145, 193)",
                    fontWeight: "bold",
                  }}
                >
                  {editMode ? (
                    <Select
                      value={user.maritalStatus}
                      onChange={(e) =>
                        handleChange({
                          target: {
                            name: "maritalStatus",
                            value: e.target.value,
                          },
                        })
                      }
                      label="Marital Status"
                      fullWidth
                    >
                      <MenuItem value="SINGLE">Single</MenuItem>
                      <MenuItem value="MARRIED">Married</MenuItem>
                      <MenuItem value="DIVORCED">Divorced</MenuItem>
                    </Select>
                  ) : (
                    user.maritalStatus
                  )}
                </td>
              </tr>
              {user.maritalStatus === "MARRIED" && (
                <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                  <td
                    style={{
                      padding: "16px",
                      fontWeight: "bold",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    Spouse Name
                  </td>
                  <td
                    style={{
                      padding: "16px",
                      color: "rgb(72, 145, 193)",
                      fontWeight: "bold",
                    }}
                  >
                    {editMode ? (
                      <>
                        <TextField
                          name="spouseName"
                          value={user.spouseName}
                          onChange={handleChange}
                          fullWidth
                        />
                        {fieldErrors.spouseName && (
                          <FormHelperText error>
                            {fieldErrors.spouseName}
                          </FormHelperText>
                        )}
                      </>
                    ) : (
                      user.spouseName
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Edit/Save buttons */}
          <Box sx={sharedStyles.actionBox}>
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
        </Box>
      </div>
    </Box>
  );
};

export default BasicInformation;

import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Grid,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Link,
} from "@mui/material";
import {
  Person,
  Email,
  Phone,
  CurrencyRupee,
  PinDrop,
  CalendarToday,
  Public,
  LocationOn,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import LoanImage from "../assets/image/slide.gif"; // Import your image
import { source } from "framer-motion/client";
import { useNavigate } from "react-router-dom";

const ApplyForm = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [formValues, setFormValues] = useState({
    fullName: "",
    pan: "",
    mobile: "",
    email: "",
    pinCode: "",
    salary: "",
    loanAmount: "",
    source: "website",
  });
  const [formErrors, setFormErrors] = useState({});
  const [animationState, setAnimationState] = useState([]);

  const handleCheckboxChange = (event) => {
    setTermsAccepted(event.target.checked);
  };
  const navigate = useNavigate(); // Initialize navigation

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("the pan value is 1", value);

    // Validation for input fields (only block if invalid input is entered)

    // Mobile: Only digits and max 10 characters
    if (name === "fullName" && !/^[A-Za-z\s]*$/.test(value)) return;

    if (name === "mobile" && (!/^\d*$/.test(value) || value.length > 10))
      return;

    // Salary and Loan Amount: Only digits
    if ((name === "salary" || name === "loanAmount") && !/^\d*$/.test(value))
      return;

    // PinCode: Only digits and max 6 characters
    if (name === "pinCode" && (!/^\d*$/.test(value) || value.length > 6))
      return;

    //pan validation
    if (name === "pan") {
      // Convert to uppercase for consistency
      const panInput = value.toUpperCase();

      // Allow only up to 10 characters and validate per character
      if (panInput.length <= 10) {
        // Regular expression to match PAN format progressively
        if (
          /^[A-Z]{0,5}$/.test(panInput) || // First 5 characters must be letters
          /^[A-Z]{5}\d{0,4}$/.test(panInput) || // Next 4 characters must be digits
          /^[A-Z]{5}\d{4}[A-Z]?$/.test(panInput) // Last character must be a letter
        ) {
          setFormValues({ ...formValues, [name]: panInput });
          setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear any error message
        } else {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]:
              "PAN format should be 5 letters, 4 digits, and 1 letter (e.g., ABCDE1234F).",
          }));
        }
      }
      return; // Prevent further processing if input exceeds 10 characters
    }

    // validation for dob

    console.log("the pan value is ", value);
    // Update form values and reset errors for the specific field
    setFormValues({ ...formValues, [name]: value });
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const errors = {};
    const mobileValid = /^\d{10}$/.test(formValues.mobile);
    const panValid = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formValues.pan);
    const emailValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
      formValues.personalEmail
    );

    const pinCodeValid = /^\d{6}$/.test(formValues.pinCode);

    Object.keys(formValues).forEach((field) => {
      if (!formValues[field]) {
        errors[field] = "This field is required";
      }
    });

    if (!mobileValid) errors.mobile = "Mobile number must be a 10-digit number";

    if (!panValid) errors.pan = "Invalid PAN format (e.g., ABCDE1234F)";
    if (!emailValid) errors.email = "Invalid email format";
    if (!pinCodeValid) errors.pinCode = "pinCode must be 6 digits";
    if (!termsAccepted)
      errors.termsAccepted = "You must accept the Terms & Conditions";

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("the values of object ", formValues);

    const errors = validateForm(); // Validate form and get errors

    // console.log("the values of object ", Object.keys(errors).length);
    // Check for validation errors
    if (Object.keys(errors).length >= 2) {
      setFormErrors(errors); // Set the errors in state
      return; // Prevent submission
    }

    console.log("the values of object ", formValues);

    // Proceed with form submission if there are no errors
    try {
      const response = await fetch(
        `https://api.qualoan.com/api/leads/landingPageData`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formValues,

            termsAccepted,
            source: "website",
          }),
        }
      );
      console.log("the response is ", response);

      if (!response.ok) throw new Error("Network response was not ok");

      const result = await response.json();

      navigate("/success"); // Redirect to the success page

      // Reset form after successful submission
      setFormValues({
        fullName: "",

        pan: "",

        mobile: "",

        email: "",

        pinCode: "",
        salary: "",
        loanAmount: "",
      });
      setTermsAccepted(false);

      setFormErrors({}); // Reset form errors
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, // Stack in column on small screens, row on larger ones
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <form style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
        <Box
          component="form"
          id="loanForm"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            padding: { xs: 1, md: 2 },
            width: "100%",
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            align="center"
            style={{ fontWeight: "bold" }}
          >
            Apply For Loan
          </Typography>

          <Grid container spacing={3} sx={{ gap: 2 }}>
            {[
              { label: "Full Name", name: "fullName", icon: <Person /> },

              { label: "PAN", name: "pan", icon: <Public /> },
              { label: "Mobile", name: "mobile", icon: <Phone /> },

              {
                label: "Personal Email",
                name: "email",
                icon: <Email />,
              },
              {
                label: "Monthly Salary",
                name: "salary",
                icon: <CurrencyRupee />,
              },
              {
                label: "Loan Amount Required",
                name: "loanAmount",
                icon: <CurrencyRupee />,
              },
              {
                label: "PinCode ",
                name: "pinCode",
                icon: <PinDrop sx={{ color: "rgba(0, 0, 0, 0.6)" }} />,
              },
            ].map((field, index) => (
              <Grid key={index} item xs={12} md={4}>
                <TextField
                  fullWidth
                  required
                  name={field.name}
                  label={field.label}
                  value={formValues[field.name]}
                  onChange={handleInputChange}
                  type={field.type || "text"}
                  select={field.type === "select"}
                  error={!!formErrors[field.name]}
                  helperText={formErrors[field.name] || ""}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {field.icon}
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
              </Grid>
            ))}

            <Grid item xs={12} md={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={termsAccepted}
                    onChange={handleCheckboxChange}
                  />
                }
                label={
                  <Typography variant="body2">
                    I accept the{" "}
                    <Link href="terms-condition" target="_blank" rel="noopener">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="privacy-policy" target="_blank" rel="noopener">
                      Privacy Policy
                    </Link>
                  </Typography>
                }
              />
              {formErrors.termsAccepted && (
                <Typography color="error" variant="body2">
                  {formErrors.termsAccepted}
                </Typography>
              )}
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              variant="contained"
              type="submit"
              onClick={handleSubmit}
              sx={{
                backgroundColor: "orange",
                padding: "4px",
                width: "100%",
                textAlign: "center",
                fontSize: "0.875rem",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </form>

      {/* Right Side - Image */}
      <Box
        sx={{
          mb: { xs: 1, md: 1 }, // Margin-bottom remains
          mt: { xs: 2, md: 7 }, // Margin-top remains
          width: { xs: "100%", md: "40%" }, // Full width on mobile, 40% on larger screens
          height: { xs: "50vh", md: "100vh" }, // Adjust height on mobile
          backgroundImage: `url(${LoanImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: { xs: 2, md: 5 }, // Adjust border radius for mobile
        }}
      />
    </Box>
  );
};

export default ApplyForm;

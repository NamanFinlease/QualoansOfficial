import React, { useState } from "react";
import ReactDOM from "react-dom";
import withReactContent from "sweetalert2-react-content";

import {
  Box,
  LinearProgress,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WorkIcon from "@mui/icons-material/Work";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SweetAlert from "sweetalert2"; // Import SweetAlert2
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import { BASE_URL } from "../baseURL";
import axios from "axios";
import DocumentUploadModal from "./DocumentUploadModal";
import Swal from "sweetalert2";
import { getToken } from "../../tokenManager";

const LoanApplication = () => {
  const token=getToken();
  const [bankStatement, setBankStatement] = useState(null); // Add state for the bank statement

  const navigate = useNavigate(); // React Router hook for navigation

  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);
  const [step5, setStep5] = useState(false);
  // const [step6, setStep6] = useState(false);

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [formValues, setFormValues] = useState({ pinCode: "" });

  const calculateProgress = () => {
    let completedSteps = 0;
    if (step1) completedSteps++;
    if (step2) completedSteps++;
    if (step3) completedSteps++;
    if (step4) completedSteps++;
    if (step5) completedSteps++;
    // if (step6) completedSteps++;
    return (completedSteps / 5) * 100;
  };

  // const DocumentUploadModal = () => {
  //   return (
  //     <div style={{ padding: "20px", textAlign: "center" }}>
  //       <h3 style={{ color: "#4D4D4E" }}>Document Upload</h3>
  //       <p>Upload your documents to verify your details.</p>
  //       <input type="file" />
  //     </div>
  //   );
  // };

  // const handleDocumentationUpload = async () => {
  //   Swal.fire({
  //     html: ``,
  //     showConfirmButton: false,
  //     width: "800px",
  //   });
  // };

  const MySwal = withReactContent(Swal);

  const handleDocumentationUpload = async () => {
    // Create a container element
    const container = document.createElement("div");

    // Render the React component into the container
    ReactDOM.render(<DocumentUploadModal />, container);

    // Use SweetAlert2 to display the container
    MySwal.fire({
      html: container,
      showConfirmButton: false,
      width: "800px",
      margin: "0px",
      padding: 0,
      willClose: () => {
        // Clean up React rendering when SweetAlert closes
        ReactDOM.unmountComponentAtNode(container);
      },
    });
  };

  const steps = [
    {
      step: step1,
      setStep: setStep1,
      title: "Loan Calculator",
      icon: WorkIcon,
      description: "Choose the loan amount and tenure",
      link: "/calculator-loan",
    },
    {
      step: step2,
      setStep: setStep2,
      title: "Employment Information",
      icon: AccountBalanceIcon,
      description: "Share about your work status",
      action: () => handleEmploymentInfo(), // Trigger SweetAlert on click
    },
    {
      step: step3,
      setStep: setStep3,
      title: "Fetch Bank Statement",
      icon: DescriptionIcon,
      description: "Share your bank statement",
      action: () => handleBankStatementUpload(),
    },
    {
      step: step4,
      setStep: setStep4,
      title: "Documentation",
      icon: AccountBalanceIcon,
      description: "Share your documents to verify your details",
      action: () => handleDocumentationUpload(), // Trigger upload on click
    },
    {
      step: step5,
      setStep: setStep5,
      title: "Disbursal Bank Details",
      icon: AccountBalanceWalletIcon,
      description: "Share your dis.bank details",
      action: () => handleDisbursalbankdetails(),
    },
  ];

  const handleDisbursalbankdetails = async () => {

    

    
    // First SweetAlert with Bank Details Form
    const { value: formValues } = await SweetAlert.fire({
      title: "Disbursal Bank Details",
      html: `
        <div style="text-align: left; padding: 10px;">
          <input id="accountNo" class="swal2-input" placeholder="Account Number" style="border-radius: 8px; border: 1px solid #ddd; padding: 12px; width: 80%; margin-bottom: 10px; font-size: 14px;"/>
          <input id="confirmAccountNo" class="swal2-input" placeholder="Confirm Account Number" style="border-radius: 8px; border: 1px solid #ddd; padding: 12px; width: 80%; margin-bottom: 10px; font-size: 14px;"/>
          <input id="ifscCode" class="swal2-input" placeholder="IFSC Code" style="border-radius: 8px; border: 1px solid #ddd; padding: 12px; width: 80%; margin-bottom: 10px; font-size: 14px;"/>
          <input id="bankName" class="swal2-input" placeholder="Bank Name" style="border-radius: 8px; border: 1px solid #ddd; padding: 12px; width: 80%; margin-bottom: 10px; font-size: 14px;"/>
          <select id="accountType" class="swal2-input" style="border-radius: 8px; border: 1px solid #ddd; padding: 8px; width: 80%; margin-bottom: 10px; font-size: 14px;">
            <option value="" disabled selected>Select Account Type</option>
            <option value="Saving">Saving</option>
            <option value="Current">Current</option>
          </select>
        </div>
      `,
      preConfirm: () => {
        const accountNumber = document.getElementById("accountNo")?.value;
        const confirmAccountNo =
          document.getElementById("confirmAccountNo")?.value;
        const ifscCode = document.getElementById("ifscCode")?.value;
        const bankName = document.getElementById("bankName")?.value;
        const accountType = document.getElementById("accountType")?.value;

        console.log("hhhh>>>");
    console.log("account ",accountNumber);
    console.log("account ",confirmAccountNo);
    console.log("account ",ifscCode);
    console.log("account ",bankName);
    console.log("account ",accountType);
        // Validation
        if (
          !accountNumber ||
          !confirmAccountNo ||
          !ifscCode ||
          !bankName ||
          !accountType
        ) {
          SweetAlert.fire({
            icon: "error",
            title: "Oops!",
            text: "All fields are required.",
          });
          return false;
        }
        if (accountNumber !== confirmAccountNo) {
          SweetAlert.fire({
            icon: "error",
            title: "Oops!",
            text: "Account numbers do not match.",
          });
          return false;
        }

        return {
          accountNumber,
          confirmAccountNo,
          ifscCode,
          bankName,
          accountType,
        };
      },
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#007bff",
      cancelButtonColor: "#f44336",
      customClass: {
        popup: "swal-custom-popup", // Custom class for the popup
      },
    });

    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2UzZmQxMDczYjMxNTQyNjU3YTI3ZSIsImlhdCI6MTczNjMyNzEyMiwiZXhwIjoxNzM4OTE5MTIyfQ.SDrVOSRa2_x5RC6JBRtdL_yzxkZQPn61dJHmLpI4oQI";

    if (formValues) {
      try {
        const response = await fetch("http://localhost:8081/api/loanApplication/disbursalBankDetails", {
          method: "PATCH", // Using PATCH method
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`, // Uncomment and use token if required
          },
          body: JSON.stringify(formValues), // Replace 'apiData' with the data you want to send in the body
          credentials: 'include', // Ensures cookies and credentials are included in the request
        });
        
        
        console.log("bbbb>>>",response);
        
        if (response.status === 200) {
          console.log(response.status);

          const result = await response.json();
          SweetAlert.fire({
            icon: "success",
            title: "Success",
            text: "Bank details saved successfully!",
          });
          console.log(result);
        } else {
          SweetAlert.fire({
            icon: "error",
            title: "Error!",
            text: "There was an issue submitting your bank details.",
          });
        }
      } catch (error) {
        console.error("Error saving data:", error);
        SweetAlert.fire({
          icon: "error",
          title: "Error",
          text: "Failed to save bank details. Please try again.",
        });
      }
    }
  };

  const handleBankStatementUpload = () => {
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.accept = ".pdf,.jpg,.png"; // Accept specific formats for bank statements
    inputFile.onchange = async (event) => {
      const bankStatement = event.target.files[0];
      if (bankStatement) {
        setBankStatement(bankStatement); // Save the uploaded file for later use
        await uploadBankStatementToServer("bankStatement");
      }
    };
    inputFile.click();
  };

  const uploadBankStatementToServer = async (bankStatement) => {
    const formData = new FormData();
    formData.append("bankStatement", bankStatement); // Key "bankStatement"
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2UzZmQxMDczYjMxNTQyNjU3YTI3ZSIsImlhdCI6MTczNjMyNzEyMiwiZXhwIjoxNzM4OTE5MTIyfQ.SDrVOSRa2_x5RC6JBRtdL_yzxkZQPn61dJHmLpI4oQI";

    try {
      const response = await fetch(
        `${BASE_URL}/api/loanApplication/uploadDocuments`,
        {
          method: "PATCH",
          headers: {
            // Authorization: `Bearer ${token}`, // Uncomment if token is needed
          },
          body: formData, // Include the FormData object
          credentials: "include", // Ensures that cookies are sent with the request
        }
      );
      
      // console.log(response);

      // Check if the response is OK (status 200-299)
      if (response.ok) {
        console.log(response.status);

        const responseData = await response.json(); // Parse JSON response
        SweetAlert.fire(
          "Success",
          "Bank statement uploaded successfully!",
          "success"
        );
      } else {
        const errorData = await response.json(); // Parse error details
        SweetAlert.fire(
          "Error",
          errorData.message || "Unexpected error occurred.",
          "error"
        );
      }
    } catch (error) {
      console.error("Upload Error:", error); // Log error for debugging
      SweetAlert.fire(
        "Error",
        error.message ||
          "An error occurred while uploading the bank statement.",
        "error"
      );
    }
  };

  const handleEmploymentInfo = async () => {
    // First SweetAlert with Employment Info Form
    const { value: formValues } = await SweetAlert.fire({
      title: "Information about the Company",
      html: `
        <div style="text-align: left; padding: 10px;">
          <select id="workMode" class="swal2-input" style="border-radius: 8px; border: 1px solid #ddd; padding: 8px; width: 80%; margin-bottom: 10px; font-size: 14px;">
            <option value="" disabled selected>Are you working from Office or Home?</option>
            <option value="Office">Office</option>
            <option value="Home">Home</option>
          </select>
          <input id="company" class="swal2-input" placeholder="Company Name" style="border-radius: 8px; border: 1px solid #ddd; padding: 12px; width: 80%; margin-bottom: 10px; font-size: 14px;"/>
          <input id="companyType" class="swal2-input" placeholder="Company Type" style="border-radius: 8px; border: 1px solid #ddd; padding: 12px; width: 80%; margin-bottom: 10px; font-size: 14px;"/>
          <input id="designation" class="swal2-input" placeholder="Your Designation" style="border-radius: 8px; border: 1px solid #ddd; padding: 12px; width: 80%; margin-bottom: 10px; font-size: 14px;"/>
          <input id="officeEmail" class="swal2-input" placeholder="Office Email" style="border-radius: 8px; border: 1px solid #ddd; padding: 12px; width: 80%; margin-bottom: 10px; font-size: 14px;"/>
        </div>
      `,
      preConfirm: () => {
        return {
          workFrom: document.getElementById("workMode").value,
          companyName: document.getElementById("company").value,
          companyType: document.getElementById("companyType").value,
          designation: document.getElementById("designation").value,
          officeEmail: document.getElementById("officeEmail").value,
        };
      },
      showCancelButton: true,
      confirmButtonText: "Next",
      confirmButtonColor: "orange",
      customClass: {
        popup: "swal-custom-popup",
      },
    });

    if (formValues) {
      // Validation for mandatory fields
      if (
        !formValues.workFrom ||
        !formValues.companyName ||
        !formValues.companyType ||
        !formValues.designation ||
        !formValues.officeEmail
      ) {
        SweetAlert.fire({
          icon: "error",
          title: "Oops!",
          text: "All fields are required.",
        });
        return;
      }

      // Proceed to the second SweetAlert for Address Info
      const { value: addressValues } = await SweetAlert.fire({
        title: "Your Office Address",
        html: `
         <div style="text-align: left; padding: 10px;">
      <input id="officeAddress" class="swal2-input" placeholder="Office Address" style="border-radius: 8px; border: 1px solid #ddd; padding: 8px; width: 80%; margin-bottom: 10px; font-size: 14px;"/>
      <input id="landmark" class="swal2-input" placeholder="Landmark" style="border-radius: 8px; border: 1px solid #ddd; padding: 8px; width: 80%; margin-bottom: 10px; font-size: 14px;"/>
      <input id="pincode" class="swal2-input" placeholder="Pincode" oninput="handlePincodeChange()" style="border-radius: 8px; border: 1px solid #ddd; padding: 8px; width: 80%; margin-bottom: 10px; font-size: 14px;"/>
      <input id="city" class="swal2-input" placeholder="City" style="border-radius: 8px; border: 1px solid #ddd; padding: 8px; width: 80%; margin-bottom: 10px; font-size: 14px;"/>
      <input id="state" class="swal2-input" placeholder="State" style="border-radius: 8px; border: 1px solid #ddd; padding: 8px; width: 80%; margin-bottom: 10px; font-size: 14px;"/>
    </div>

        `,
        preConfirm: () => {
          return {
            officeAddrress: document.getElementById("officeAddress").value,
            landmark: document.getElementById("landmark").value,
            pincode: document.getElementById("pincode").value,
            city: document.getElementById("city").value,
            state: document.getElementById("state").value,
          };
        },
        showCancelButton: true,
        confirmButtonText: "Submit",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#007bff",
        cancelButtonColor: "#f44336",
        customClass: {
          popup: "swal-custom-popup",
        },
      });

      if (addressValues) {
        // Validation for mandatory fields
        if (
          !addressValues.officeAddrress ||
          !addressValues.landmark ||
          !addressValues.pincode ||
          !addressValues.state ||
          !addressValues.city
        ) {
          SweetAlert.fire({
            icon: "error",
            title: "Oops!",
            text: "All fields are required.",
          });
          return;
        }

        // Prepare API data
        const apiData = {
          workFrom: formValues.workFrom,
          companyName: formValues.companyName,
          companyType: formValues.companyType,
          designation: formValues.designation,
          officeEmail: formValues.officeEmail,
          officeAddrress: addressValues.officeAddrress,
          landmark: addressValues.landmark,
          pincode: addressValues.pincode,
          city: addressValues.city,
          state: addressValues.state,
        };
        // const token =
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2UzZmQxMDczYjMxNTQyNjU3YTI3ZSIsImlhdCI6MTczNjMyNzEyMiwiZXhwIjoxNzM4OTE5MTIyfQ.SDrVOSRa2_x5RC6JBRtdL_yzxkZQPn61dJHmLpI4oQI";
        // API call to submit employment info
        try {
          const response = await fetch(
            `${BASE_URL}/api/loanApplication/addEmploymentInfo`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${token}`, // Uncomment if you need to include token
              },
              body: JSON.stringify(apiData), // Ensure data is structured correctly
              credentials: "include", // This will send cookies and credentials with the request
            }
          );
          console.log("VVVVVV>>>", response);
          

          if (response.status === 200) {
            const result = await response.json();
            console.log("result <>> ", result);

            SweetAlert.fire({
              icon: "success",
              title: "Success!",
              text: "Your employment information has been updated successfully.",
            });
          } else {
            SweetAlert.fire({
              icon: "error",
              title: "Error!",
              text: "There was an issue submitting your employment information.",
            });
          }
        } catch (error) {
          console.log("after>>>", result.status);
          console.error("Error submitting data:", error);
          SweetAlert.fire({
            icon: "error",
            title: "Error!",
            text: "There was an issue submitting your employment information.",
          });
        }
      }
    }
  };

  // Add CSS to style SweetAlert dialog
  const style = document.createElement("style");
  style.innerHTML = `
    .swal-custom-popup {
      background-color: #4D4D4E !important; /* Dark gray background */
      color: white !important; /* White text color */
    }
    .swal2-input {
      background-color: #4D4D4E !important; /* Input field background */
      color: white !important; /* Input text color */
      border: 1px solid #ddd !important;
    }
    .swal2-confirm {
      background-color: #007bff !important; /* Confirm button color */
      color: white !important;
    }
    .swal2-cancel {
      background-color: #f44336 !important; /* Cancel button color */
      color: white !important;
    }
  `;
  document.head.appendChild(style);

  return (
    <>
      <Dashboard />
      <Box
        sx={{
          padding: 4,
          border: "2px solid #ddd",
          borderRadius: 3,
          maxWidth: 900,
          margin: "0 auto",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          background: "linear-gradient(to bottom, #ffffff, #f9f9f9)",
        }}
      >
        {/* Title and Progress Bar Section */}
        <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{ marginBottom: 4 }}
        >
          {/* Title Section */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                textAlign: { xs: "center", md: "left" },
                padding: 2,
                // backgroundColor: "#4D4D4E",
                borderRadius: 3,
                color: "#4D4D4E",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Begin a Journey to Financial Empowerment
              </Typography>
            </Box>
          </Grid>

          {/* Progress Bar Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{ padding: 2 }}>
              <Typography variant="h6" sx={{ marginBottom: 1 }}>
                Loan Application
              </Typography>
              <LinearProgress
                variant="determinate"
                value={calculateProgress()}
                sx={{
                  height: 30,
                  borderRadius: 5,
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#007bff",
                  },
                }}
              />
              <Typography
                variant="body2"
                sx={{ textAlign: "left", marginTop: 1, color: "#555" }}
              >
                {Math.round(calculateProgress())}% Complete
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Steps Section */}
        <Box sx={{ padding: 2 }}>
          <Grid container spacing={3}>
            {steps.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
              {console.log('HHHHHH....>>>',item)
              }
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: 3,
                    border: "1px solid #ddd",
                    borderRadius: 3,
                    background: "linear-gradient(45deg, #4D4D4E, orange)",
                    cursor: "pointer",
                    height: 180,
                    width: "100%",
                    maxWidth: 350,
                    transition: "all 0.3s",
                    boxShadow: item.step
                      ? "0px 4px 15px rgba(0, 123, 255, 0.3)"
                      : "0px 2px 8px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                      backgroundColor: "orange",
                      color: "white",
                      transform: "scale(1.03)",
                    },
                  }}
                  onClick={() => {
                    if (item.link) {
                      navigate(item.link); // Navigate to the link if it exists
                    } else if (item.action) {
                      item.action(); // Trigger the action callback
                    }
                  }}
                >
                  <IconButton
                    disabled={item.step}
                    sx={{
                      marginBottom: 1,
                      backgroundColor: "#4D4D4E",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "white",
                      },
                    }}
                  >
                    {item.step ? (
                      <CheckCircleIcon color="success" />
                    ) : (
                      <item.icon />
                    )}
                  </IconButton>
                  <Box sx={{ textAlign: "left", width: "100%" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        marginBottom: 1,
                        color: "white",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "white" }}>
                      {item.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default LoanApplication;

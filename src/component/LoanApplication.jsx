import React, { useState } from "react";
import { Box, LinearProgress, Typography, Grid, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WorkIcon from "@mui/icons-material/Work";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SweetAlert from "sweetalert2"; // Import SweetAlert2
import { useNavigate } from "react-router-dom";

const LoanApplication = () => {

    const navigate = useNavigate(); // React Router hook for navigation

  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);
  const [step5, setStep5] = useState(false);
  const [step6, setStep6] = useState(false);

  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [formValues, setFormValues] = useState({ pinCode: '' });

  const calculateProgress = () => {
    let completedSteps = 0;
    if (step1) completedSteps++;
    if (step2) completedSteps++;
    if (step3) completedSteps++;
    if (step4) completedSteps++;
    if (step5) completedSteps++;
    if (step6) completedSteps++;
    return (completedSteps / 6) * 100;
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
      action: () => handleBankStatementUpload()

      
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
      description: "Share your disbursal bank details",
      action: () => handleDisbursalbankdetails()

    },
    {
      step: step6,
      setStep: setStep6,
      title: "Complete Application",
      icon: AccountBalanceWalletIcon,
      description: "Submit your loan application",
      link: "/complete-application",
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
          <input id="ifcCode" class="swal2-input" placeholder="IFC Code" style="border-radius: 8px; border: 1px solid #ddd; padding: 12px; width: 80%; margin-bottom: 10px; font-size: 14px;"/>
          <input id="bankName" class="swal2-input" placeholder="Bank Name" style="border-radius: 8px; border: 1px solid #ddd; padding: 12px; width: 80%; margin-bottom: 10px; font-size: 14px;"/>
          <input id="accountType" class="swal2-input" placeholder="Account Type" style="border-radius: 8px; border: 1px solid #ddd; padding: 12px; width: 80%; margin-bottom: 10px; font-size: 14px;"/>
        </div>
      `,
      preConfirm: () => {
        const accountNo = document.getElementById("accountNo").value;
        const confirmAccountNo = document.getElementById("confirmAccountNo").value;
        const ifcCode = document.getElementById("ifcCode").value;
        const bankName = document.getElementById("bankName").value;
        const accountType = document.getElementById("accountType").value;
  
        // Validation
        if (!accountNo || !confirmAccountNo || !ifcCode || !bankName || !accountType) {
          SweetAlert.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'All fields are required.',
          });
          return false;
        }
        if (accountNo !== confirmAccountNo) {
          SweetAlert.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Account numbers do not match.',
          });
          return false;
        }
  
        return { accountNo, confirmAccountNo, ifcCode, bankName, accountType };
      },
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#007bff",
      cancelButtonColor: "#f44336",
      customClass: {
        popup: 'swal-custom-popup', // Custom class for the popup
      },
    });
  
    if (formValues) {
      // Handle form submission (e.g., save to state or API)
      try {
        const response = await fetch("https://your-backend-api.com/disbursal-bank-details", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });
  
        const result = await response.json();
        console.log(result);
  
        SweetAlert.fire({
          icon: "success",
          title: "Success",
          text: "Bank details saved successfully!",
        });
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
      const file = event.target.files[0];
      if (file) {
        setBankStatement(file);
        await uploadBankStatementToServer(file);
      }
    };
    inputFile.click();
  };

  // Function to upload the bank statement to the server
  const uploadBankStatementToServer = async (file) => {
    const formData = new FormData();
    formData.append("bankStatement", file);

    try {
      const response = await axios.post("http://localhost:5000/upload-bank-statement", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        Swal.fire("Success", "Bank statement uploaded successfully!", "success");
      } else {
        Swal.fire("Error", response.data.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "An error occurred while uploading the bank statement.", "error");
    }
  };

  const handleDocumentationUpload = () => {
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.accept = ".pdf,.jpg,.png"; // Accept formats for documents
    inputFile.multiple = true; // Allow multiple files for document upload
  
    inputFile.onchange = async (event) => {
      const files = Array.from(event.target.files);
      if (files.length > 0) {
        await uploadDocumentsToServer(files);
      }
    };
    inputFile.click();
  };
  
  // Function to upload the documents to the server
  const uploadDocumentsToServer = async (files) => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`document-${index + 1}`, file);
    });
  
    try {
      const response = await axios.post("http://localhost:5000/upload-documents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.data.success) {
        Swal.fire("Success", "Documents uploaded successfully!", "success");
      } else {
        Swal.fire("Error", response.data.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "An error occurred while uploading the documents.", "error");
    }
  };


  
  const handleEmploymentInfo = async () => {
    // First SweetAlert with Employment Info Form
    const { value: formValues } = await SweetAlert.fire({
      title: "Information about the Company",
      html: `
        <div style="text-align: left; padding: 10px;">
          <input id="office" class="swal2-input" placeholder="Are you working from office or home?" style="border-radius: 8px; border: 1px solid #ddd; padding: 12px; width: 80%; margin-bottom: 10px; font-size: 14px;"/>
          <input id="company" class="swal2-input" placeholder="Company Name" style="border-radius: 8px; border: 1px solid #ddd; padding: 12px; width: 80%; margin-bottom: 10px; font-size: 14px;"/>
          <input id="companyType" class="swal2-input" placeholder="Company Type" style="border-radius: 8px; border: 1px solid #ddd; padding: 12px; width: 80%; margin-bottom: 10px; font-size: 14px;"/>
          <input id="designation" class="swal2-input" placeholder="Your Designation" style="border-radius: 8px; border: 1px solid #ddd; padding: 12px; width: 80%; margin-bottom: 10px; font-size: 14px;"/>
        </div>
      `,
      preConfirm: () => {
        return {
          office: document.getElementById("office").value,
          company: document.getElementById("company").value,
          companyType: document.getElementById("companyType").value,
          designation: document.getElementById("designation").value,
        };
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#007bff',
      cancelButtonColor: '#f44336',
      customClass: {
        popup: 'swal-custom-popup', // Custom class for the popup
      },
    });
  
    if (formValues) {
      // Validation for mandatory fields
      if (!formValues.office || !formValues.company || !formValues.companyType || !formValues.designation) {
        SweetAlert.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'All fields are required.',
        });
        return;
      }
  
      // Handle form submission (e.g., save to state or API)
      try {
        const response = await fetch('https://your-backend-api.com/employment-info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
        });
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error('Error saving data:', error);
      }
    }
  
    // Second SweetAlert with Office Info and Pincode Auto-Fill
    const { value: addressValues } = await SweetAlert.fire({
      title: "Your Office Address",
      html: `
        <div style="text-align: left; padding: 10px;">
          <input id="officeAddress" class="swal2-input" placeholder="Office Address" style="border-radius: 8px; border: 1px solid #ddd; padding: 8px; width: 80%; margin-bottom: 10px; font-size: 14px;"/>
          <input id="landmark" class="swal2-input" placeholder="Landmark" style="border-radius: 8px; border: 1px solid #ddd; padding: 8px; width: 80%; margin-bottom: 10px; font-size: 14px;"/>
          <input id="pincode" class="swal2-input" placeholder="Pincode" oninput="handlePincodeChange()" style="border-radius: 8px; border: 1px solid #ddd; padding: 8px; width: 80%; margin-bottom: 10px; font-size: 14px;"/>
          <input id="city" class="swal2-input" placeholder="City" value="${city}" disabled style="border-radius: 8px; border: 1px solid #ddd; padding: 8px; width: 80%; margin-bottom: 10px; font-size: 14px;"/>
          <input id="state" class="swal2-input" placeholder="State" value="${state}" disabled style="border-radius: 8px; border: 1px solid #ddd; padding: 8px; width: 80%; margin-bottom: 10px; font-size: 14px;"/>
        </div>
      `,
      preConfirm: () => {
        return {
          officeAddress: document.getElementById("officeAddress").value,
          landmark: document.getElementById("landmark").value,
          pincode: document.getElementById("pincode").value,
          city: document.getElementById("city").value,
          state: document.getElementById("state").value,
        };
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#007bff',
      cancelButtonColor: '#f44336',
      customClass: {
        popup: 'swal-custom-popup', // Custom class for the popup
      },
    });
  
    if (addressValues) {
      // Validation for mandatory fields
      if (!addressValues.officeAddress || !addressValues.landmark || !addressValues.pincode) {
        SweetAlert.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'All fields are required.',
        });
        return;
      }
  
      // Handle address form submission (e.g., save to state or API)
      try {
        const response = await fetch('https://your-backend-api.com/office-address', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(addressValues),
        });
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error('Error saving data:', error);
      }
    }
  };
  
  // Add CSS to style SweetAlert dialog
  const style = document.createElement('style');
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
    <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 4 }}>
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
   {/* Steps Section */}
<Box sx={{ padding: 2 }}>
  <Grid container spacing={3}>
    {steps.map((item, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: 3,
            border: "1px solid #ddd",
            borderRadius: 3,
            backgroundColor: "#4D4D4E",
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
  

  
  );
};

export default LoanApplication;

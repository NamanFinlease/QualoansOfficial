import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SweetAlert from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import DocumentUploadModal from "../DocumentUploadModal";
import { BASE_URL } from "../../baseURL";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dashboard from "../Dashboard";

const MySwal = withReactContent(SweetAlert);

const DocumentationStep = ({
  onComplete,
  disabled,
  prefillData,
  isUploaded,
}) => {
  const navigate = useNavigate();
  const [stepCompleted, setStepCompleted] = useState(false); // Add this line to define stepCompleted state

  // useEffect(() => {
  //   // if (isDocUploaded || isUploadSuccess) {
  //   const fetchDocumentList = async () => {
  //     const documentListResponse = await axios.get(
  //       `${BASE_URL}/getDocumentList`,
  //       { withCredentials: true }
  //     );
  //     console.log(
  //       "documentListResponse zsdss",
  //       documentListResponse.data.documents
  //     );
  //     const data = documentListResponse.data.documents;
  //     const result = {};

  //     const requiredTypes = ["aadhaarFront", "salarySlip", "panCard"];

  //     const hasAllRequired = requiredTypes.every((type) =>
  //       data.some((item) => item.type === type)
  //     );

  //     console.log("hasAllRequired", hasAllRequired);

  //     if (hasAllRequired) {
  //       console.log("uploaded");
  //       onComplete({ success: true, data: null });
  //     }
  //   };
  //   fetchDocumentList();
  //   // }
  // }, []);

  // const handleDocumentationUpload = async () => {
  //   // Create a container element
  //   const container = document.createElement("div");

  //   // Render the React component into the container
  //   ReactDOM.render(
  //     <DocumentUploadModal prefillData={prefillData} isUploaded={isUploaded} />,
  //     container
  //   );

  //   // Use SweetAlert2 to display the container
  //   MySwal.fire({
  //     html: container,
  //     showConfirmButton: false,
  //     width: "800px",
  //     margin: "0px",
  //     padding: 0,
  //     willClose: () => {
  //       // Clean up React rendering when SweetAlert closes
  //       ReactDOM.unmountComponentAtNode(container);
  //     },
  //   });

  //   // After successful upload, mark the step as completed
  //   setStepCompleted(true); // Set stepCompleted to true after the upload is handled

  //   onComplete({ completed: true, data: prefillData });
  // };

  const handleDocumentationUpload = async () => {
    navigate("/upload-document");

    // // Create a container element
    // const container = document.createElement("div");

    // // Render the React component into the container
    // ReactDOM.render(
    //   // <DocumentUploadModal prefillData={prefillData} isUploaded={isUploaded} />,
    //   <UploadDocuments />,

    //   container
    // );

    // // Use SweetAlert2 to display the container
    // MySwal.fire({
    //   html: container,
    //   showConfirmButton: false,
    //   width: "800px",
    //   margin: "0px",
    //   padding: 0,
    //   willClose: () => {
    //     // Clean up React rendering when SweetAlert closes
    //     ReactDOM.unmountComponentAtNode(container);
    //   },
    // });

    // // After successful upload, mark the step as completed
    // setStepCompleted(true); // Set stepCompleted to true after the upload is handled

    // onComplete({ completed: true, data: prefillData });
  };

  return (
    <>
      <Box
        // sx={{
        //   display: "flex",
        //   flexDirection: "column",
        //   alignItems: "flex-start",
        //   padding: 3,
        //   border: "1px solid #ddd",
        //   borderRadius: 3,
        //   background: disabled
        //     ? "#ccc"
        //     : stepCompleted
        //     ? "green" // Change the background color to green when the step is completed
        //     : "linear-gradient(45deg, #4D4D4E, orange)",
        //   cursor: disabled ? "not-allowed" : "pointer", // Disable the cursor if disabled
        //   height: 150,
        //   width: "100%",
        //   maxWidth: 350,
        //   transition: "all 0.3s",
        //   boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        //   "&:hover": {
        //     backgroundColor: disabled
        //       ? "#ccc"
        //       : stepCompleted
        //       ? "green" // Keep the green background on hover if the step is completed
        //       : "orange",
        //     color: disabled ? "white" : "black",
        //     transform: disabled ? "none" : "scale(1.03)",
        //   },
        // }}

        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 2,
          borderColor:
            // completed ? "green" :
            disabled ? "#1c1c1c" : "#F26722",
          borderRadius: 3,
          margin: 1,
          width: "25%",
          minWidth: 200,
          cursor: disabled ? "not-allowed" : "pointer",
          textAlign: "left",
          background:
            //  completed
            //   ? "linear-gradient(45deg, #28a745, #218838)" // Green gradient when step is complete
            //   :
            disabled ? "#d9d9d9" : "#F26722",
          color:
            //  completed ||
            !disabled ? "white" : "#1c1c1c",
          "@media (max-width: 600px)": {
            width: "80%",
            margin: "auto",
          },
        }}
        onClick={!disabled ? handleDocumentationUpload : null}
      >
        <IconButton
          sx={{
            marginBottom: 1,
            color: "white",
            "&:hover": {
              backgroundColor: "white",
            },
          }}
          disabled={disabled}
        >
          {stepCompleted || isUploaded ? (
            <CheckCircleIcon sx={{ color: "green" }} />
          ) : (
            <AccountBalanceIcon />
          )}
        </IconButton>
        <Box sx={{ textAlign: "left", width: "100%" }}>
          <Typography
            sx={{
              fontWeight: "bold",
              marginBottom: 1,
              color: "white",
            }}
          >
            Documentation
          </Typography>
          <Typography variant="body2" sx={{ color: "white" }}>
            Share your documents to verify your details
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default DocumentationStep;

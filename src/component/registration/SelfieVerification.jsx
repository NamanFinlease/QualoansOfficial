// import React, { useState } from "react";
// import {
//   Modal,
//   Box,
//   Button,
//   Typography,
//   CircularProgress,
//   IconButton,
// } from "@mui/material";
// import CameraAltIcon from "@mui/icons-material/CameraAlt";
// import InfoIcon from "@mui/icons-material/Info";
// import CheckCircle from "@mui/icons-material/CheckCircle";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
// import { BASE_URL } from "../../baseURL";
// import yourImage from "../../assets/image/Untitled design (1).gif"; // Import your image

// const SelfieVerification = ({ onComplete, disabled }) => {
//   const [openModal, setOpenModal] = useState(false);
//   const [selfie, setSelfie] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [error, setError] = useState("");
//   const [stepCompleted, setStepCompleted] = useState(false); // Track step completion

//   const navigate = useNavigate();

//   const handleSelfieCapture = () => {
//     const inputFile = document.createElement("input");
//     inputFile.type = "file";
//     inputFile.accept = "image/*";
//     inputFile.capture = "environment";

//     inputFile.onchange = (event) => {
//       const file = event.target.files[0];
//       if (file) {
//         setSelfie(file);
//         uploadSelfieToBackend(file);
//       }
//     };

//     inputFile.click();
//   };

//   const StepBox = ({
//     icon,
//     title,
//     description,
//     disabled,
//     completed,
//     onClick,
//   }) => (
//     <Box
//       onClick={!disabled && !completed ? onClick : null}
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "flex-start",
//         justifyContent: "center",
//         padding: 2,
//         borderColor: completed ? "green" : disabled ? "grey" : "orange",
//         borderRadius: 3,
//         margin: 1,
//         width: "30%",
//         minWidth: 200,
//         cursor: disabled || completed ? "not-allowed" : "pointer",
//         textAlign: "left",
//         background: completed
//           ? "linear-gradient(45deg, #28a745, #218838)"
//           : disabled
//           ? "lightgrey"
//           : "linear-gradient(45deg, #4D4D4E, orange)",
//         color: completed || !disabled ? "white" : "darkgrey",
//         "@media (max-width: 600px)": {
//           width: "80%",
//           margin: "auto",
//         },
//       }}
//     >
//       <IconButton
//         sx={{ color: completed ? "white" : disabled ? "grey" : "white", ml: 1 }}
//       >
//         {completed ? <CheckCircle style={{ fontSize: "24px" }} /> : icon}
//       </IconButton>
//       <Box sx={{ ml: 2, flexGrow: 1 }}>
//         <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
//         <Typography variant="body2">{description}</Typography>
//       </Box>
//     </Box>
//   );

//   const uploadSelfieToBackend = async (fileData) => {
//     const formData = new FormData();
//     formData.append("profilePicture", fileData);

//     try {
//       setIsUploading(true);
//       const response = await axios.patch(
//         `${BASE_URL}/api/user/uploadProfile`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//           withCredentials: true,
//         }
//       );

//       setIsUploading(false);

//       if (response.status === 200) {
//         setStepCompleted(true); // Mark step as completed
//         Swal.fire("Success", "Selfie uploaded successfully!", "success").then(
//           () => {
//             Swal.fire({
//               title: "You have successfully registered to Qualoan!",
//               html: `
//               <div style="animation: zoomOut 1.5s infinite, blink 0.8s infinite;size=20px">
//                 Complete your loan application process.
//               </div>`,
//               imageUrl: yourImage,
//               imageWidth: 100,
//               imageHeight: 100,
//               confirmButtonText: "Go to Loan Application",
//               customClass: {
//                 popup: "custom-popup",
//                 confirmButton: "confirm-button-orange",
//               },
//             }).then((result) => {
//               if (result.isConfirmed) {
//                 navigate("/loan-application");
//               }
//             });
//           }
//         );
//       } else {
//         Swal.fire("Error", response.data.message, "error");
//       }
//     } catch (error) {
//       setIsUploading(false);
//       setError("An error occurred while uploading the selfie.");
//       console.error("Upload Error:", error);
//     }
//   };

//   return (
//     <>
//       <StepBox
//         icon={<InfoIcon />}
//         title="Selfie Verification"
//         description="Verify your identity by uploading a selfie."
//         disabled={disabled || stepCompleted}
//         completed={stepCompleted}
//         onClick={() => setOpenModal(true)} // Open modal on StepBox click
//       />
//       <Modal open={openModal} onClose={() => setOpenModal(false)}>
//         <Box
//           sx={{
//             backgroundColor: "white",
//             borderRadius: 4,
//             boxShadow: 24,
//             padding: 3,
//             maxWidth: 400,
//             margin: "auto",
//             marginTop: "20%",
//             textAlign: "center",
//           }}
//         >
//           <Typography sx={{ marginBottom: 2 }}>Upload Your Selfie</Typography>

//           {selfie ? (
//             <Typography sx={{ marginBottom: 2 }}>
//               Selfie captured: {selfie.name}
//             </Typography>
//           ) : (
//             <Typography sx={{ marginBottom: 2 }}>
//               Please capture your selfie to proceed.
//             </Typography>
//           )}

//           {error && <Typography color="error">{error}</Typography>}

//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSelfieCapture}
//               disabled={isUploading}
//               sx={{ marginBottom: 2 }}
//             >
//               {isUploading ? <CircularProgress size={24} /> : "Capture Selfie"}
//             </Button>
//             <Button
//               variant="outlined"
//               color="secondary"
//               onClick={() => setOpenModal(false)}
//             >
//               Cancel
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default SelfieVerification;

import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Webcam from "react-webcam"; // Import Webcam for camera functionality
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { BASE_URL } from "../../baseURL";
import yourImage from "../../assets/image/Untitled design (1).gif"; // Import your image

const SelfieVerification = ({ onComplete, disabled }) => {
  const [openModal, setOpenModal] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [stepCompleted, setStepCompleted] = useState(false); // Track step completion

  const navigate = useNavigate();
  const webcamRef = React.useRef(null);

  const capturePhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
    }
  };

  const uploadSelfieToBackend = async (imageSrc) => {
    try {
      setIsUploading(true);

      // Convert base64 to Blob
      const blob = await (await fetch(imageSrc)).blob();
      const formData = new FormData();
      formData.append("profilePicture", blob, "selfie.jpg");

      const response = await axios.patch(
        `${BASE_URL}/api/user/uploadProfile`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      setIsUploading(false);

      if (response.status === 200) {
        setStepCompleted(true); // Mark step as completed
        Swal.fire("Success", "Selfie uploaded successfully!", "success").then(
          () => {
            Swal.fire({
              title: "You have successfully registered to Qualoan!",
              html: `
              <div style="animation: zoomOut 1.5s infinite, blink 0.8s infinite;size=20px">
                Complete your loan application process.
              </div>`,
              imageUrl: yourImage,
              imageWidth: 100,
              imageHeight: 100,
              confirmButtonText: "Go to Loan Application",
              customClass: {
                popup: "custom-popup",
                confirmButton: "confirm-button-orange",
              },
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/loan-application");
              }
            });
          }
        );
      } else {
        Swal.fire("Error", response.data.message, "error");
      }
    } catch (error) {
      setIsUploading(false);
      setError("An error occurred while uploading the selfie.");
      console.error("Upload Error:", error);
    }
  };

  const StepBox = ({
    icon,
    title,
    description,
    disabled,
    completed,
    onClick,
  }) => (
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
        cursor: disabled || completed ? "not-allowed" : "pointer",
        textAlign: "left",
        background: completed
          ? "linear-gradient(45deg, #28a745, #218838)"
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
        sx={{ color: completed ? "white" : disabled ? "grey" : "white", ml: 1 }}
      >
        {completed ? <CheckCircle style={{ fontSize: "24px" }} /> : icon}
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
        icon={<InfoIcon />}
        title="Selfie Verification"
        description="Verify your identity by uploading a selfie."
        disabled={disabled || stepCompleted}
        completed={stepCompleted}
        onClick={() => setOpenModal(true)} // Open modal on StepBox click
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
            textAlign: "center",
          }}
        >
          <Typography sx={{ marginBottom: 2 }}>Upload Your Selfie</Typography>
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            style={{ width: "100%", marginBottom: "20px" }}
          />
          {capturedImage && (
            <Box>
              <Typography>Preview:</Typography>
              <img src={capturedImage} alt="Captured" width="100%" />
            </Box>
          )}
          {error && <Typography color="error">{error}</Typography>}
          <Button
            variant="contained"
            color="primary"
            onClick={
              capturedImage
                ? () => uploadSelfieToBackend(capturedImage)
                : capturePhoto
            }
            disabled={isUploading}
          >
            {isUploading ? (
              <CircularProgress size={24} />
            ) : capturedImage ? (
              "Upload Selfie"
            ) : (
              "Capture Selfie"
            )}
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default SelfieVerification;

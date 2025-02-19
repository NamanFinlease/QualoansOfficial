import React, { useState, useRef } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import Webcam from "react-webcam"; // Import Webcam for camera functionality
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { BASE_URL } from "../../baseURL";
import yourImage from "../../assets/image/vidu-general-4-2025-01-18T06_43_27Z (1).gif"; // Import your image
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const SelfieVerification = ({ onComplete, disabled }) => {
  const [openModal, setOpenModal] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [stepCompleted, setStepCompleted] = useState(false); // Track step completion
  const [isCameraOpen, setIsCameraOpen] = useState(false); // Track if camera is open
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    profileImage: "",
  });

  const handleCompleteStep = async () => {
    if (disabled) return;
    setOpenModal(true);
  };

  const capturePhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCapturedImage(URL.createObjectURL(file)); // Show preview
      uploadSelfieToBackend(file); // Call API for the uploaded file
    }
    // Keep the input field accessible for multiple uploads
    event.target.value = null; // Reset the input value to allow re-upload of the same file
  };

  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setCapturedImage(URL.createObjectURL(file)); // Show preview
  //     uploadSelfieToBackend(file);
  //   }
  // };
  const style = document.createElement("style");
  style.innerHTML = `
  @keyframes blink {
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
  }
  .blink-text {
    animation: blink 1s infinite;
  }
`;
  document.head.appendChild(style);

  const uploadSelfieToBackend = async (imageSrcOrFile) => {
    try {
      setIsUploading(true);

      const formData = new FormData();

      if (typeof imageSrcOrFile === "string") {
        // For captured photo (base64 string)
        const blob = await (await fetch(imageSrcOrFile)).blob();
        formData.append("profilePicture", blob, "selfie.jpg");
      } else {
        // For uploaded file
        formData.append("profilePicture", imageSrcOrFile);
      }

      const response = await axios.patch(
        `${BASE_URL}/uploadProfile`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      // setIsUploading(false);
      console.log("response sel >>> ", response);

      if (response.status === 200) {
        {
          stepCompleted && (
            <Typography variant="body2" color="green">
              Upload Complete! 🎉
            </Typography>
          );
        }

        setIsCameraOpen(false);
        setStepCompleted(true);
        setOpenModal(false);
        onComplete({ capturedImage });
        Swal.fire("Success", "Selfie uploaded successfully!", "success").then(
          () => {
            Swal.fire({
              title: "You have successfully registered to Qualoan!",
              html: `<span class="blink-text">Complete your loan application process.</span>`,
              imageUrl: yourImage,
              imageWidth: "10s0%", // Set image width to 100% of the popup
              imageHeight: "60%", // Maintain aspect ratio
              confirmButtonText: "Go to Loan Application",
              confirmButtonColor: "#FFA500", // Set button color to orange
              width: "30%", // Set the width of the popup
              customClass: {
                popup: "custom-popup",
                confirmButton: "confirm-button-orange",
              },
              didOpen: () => {
                // Apply custom styles after the popup has opened
                const popup = document.querySelector(".swal2-popup");
                const image = document.querySelector(".swal2-image");
                const content = document.querySelector(".swal2-html-container");

                if (popup && image && content) {
                  // Add top margin to the popup
                  popup.style.marginTop = "50px"; // Adjust this value as needed

                  // Reduce padding inside the popup for a smaller height
                  popup.style.padding = "10px"; // Adjust padding to reduce height

                  // Remove margin from the image
                  image.style.margin = "0";

                  // Reduce margin between the image and the text
                  content.style.marginTop = "2px"; // Adjust this value to control spacing
                }
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
        borderColor: completed ? "green" : disabled ? "#1c1c1c" : "#F26722",
        borderRadius: 3,
        margin: 1,
        width: "25%",
        minWidth: 200,
        cursor: disabled || completed ? "not-allowed" : "pointer",
        textAlign: "left",
        background:
          //completed ? "linear-gradient(45deg, #28a745, #218838)" :
          disabled ? "#d9d9d9" : "#F26722",
        color: completed || !disabled ? "white" : "#1c1c1c",
        "@media (max-width: 600px)": {
          width: "80%",
          margin: "auto",
        },
      }}
    >
      <IconButton
        sx={{
          color:
            //  isPanValidated ||

            disabled ? "grey" : "white",
          ml: 1,
        }}
        disabled={disabled}
      >
        {completed ? (
          <CheckCircleIcon sx={{ color: "green" }} />
        ) : (
          icon
        )}
      </IconButton>

      {/* <IconButton
        sx={{
          color: completed ? "white" : disabled ? "#1c1c1c" : "white",
          ml: 1,
        }}
      >
        {completed ? <CheckCircle style={{ fontSize: "24px" }} /> : icon}
      </IconButton> */}
      <Box sx={{ ml: 2, flexGrow: 1 }}>
        <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
        <Typography variant="body2">{description}</Typography>
      </Box>
    </Box>
  );

  const handleModalClick = async () => {
    setOpenModal(true);
    setIsLoading(true);

    try {
      const dashboardResponse = await axios.get(
        `${BASE_URL}/api/user/getDashboardDetails`,
        {
          withCredentials: true,
        }
      );
      console.log("dashboardResponse>>>>>", dashboardResponse);

      if (dashboardResponse.status === 200) {
        const { isProfileImage } = dashboardResponse.data;
        setIsUploading(isProfileImage);

        console.log("selfieVerification....>>>>", isProfileImage);

        if (isProfileImage) {
          const profileResponse = await axios.get(
            `${BASE_URL}/api/user/getProfileDetails`,
            {
              withCredentials: true,
            }
          );

          console.log("profileResponse", profileResponse);

          if (profileResponse.status === 200) {
            const profileData = profileResponse?.data?.data?.isProfileImage;

            console.log("profileData", profileData);

            setFormValues({
              profileImage: profileData?.profileImage || "",
            });
          }
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <StepBox
        icon={<InfoIcon />}
        title="Selfie Verification"
        description="Verify your identity by uploading a selfie."
        onClick={handleModalClick}
        disabled={disabled || stepCompleted}
        completed={stepCompleted}
      />
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 4,
            boxShadow: 24,
            padding: 4,
            maxWidth: 500,
            margin: "auto",
            marginTop: "1%",
            marginBottom: "60px", // Set margin bottom to 30px
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{ fontWeight: "bold", color: "#333" }}
          >
            {isCameraOpen
              ? "Take a Picture"
              : "Choose an Option to Upload Your Selfie"}
          </Typography>

          {isCameraOpen ? (
            <>
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                style={{
                  width: "50%",
                  borderRadius: "8px",
                  border: "2px solid #ccc",
                  marginBottom: "0px",
                }}
              />
              {capturedImage && (
                <Box sx={{ width: "50%", marginTop: 2, textAlign: "center" }}>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    Preview:
                  </Typography>
                  <img
                    src={capturedImage}
                    alt="Captured"
                    style={{
                      width: "50%",
                      borderRadius: "8px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </Box>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={
                  capturedImage
                    ? () => uploadSelfieToBackend(capturedImage)
                    : capturePhoto
                }
                disabled={isUploading}
                sx={{ width: "20%", marginTop: 2 }}
              >
                {isUploading ? (
                  <CircularProgress size={24} />
                ) : capturedImage ? (
                  "Upload"
                ) : (
                  "Capture"
                )}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsCameraOpen(true)}
                sx={{
                  width: "100%",
                  padding: "10px",
                  textTransform: "none",
                  fontSize: "16px",
                  backgroundColor: "#F26722",
                  color: "white",
                }}
              >
                Take a Picture
              </Button>
              {/* <Button
                variant="outlined"
                component="label"
                sx={{
                  width: "100%",
                  padding: "10px",
                  textTransform: "none",
                  fontSize: "16px",
                  borderColor: "#ccc",
                  color: "#333",
                }}
              >
                Upload from Device
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileUpload}
                />
              </Button> */}
              {capturedImage && (
                <Box sx={{ width: "100%", marginTop: 2, textAlign: "center" }}>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    Preview:
                  </Typography>
                  <img
                    src={capturedImage}
                    alt="Selected"
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </Box>
              )}
            </>
          )}

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setIsCameraOpen(false);
              setOpenModal(false);
            }}
            sx={{
              width: "20%",
              padding: "10px",
              textTransform: "none",
              fontSize: "16px",
              borderColor: "#ccc",
              color: "#333",
            }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default SelfieVerification;

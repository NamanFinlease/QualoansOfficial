import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserShield,
  faFolderOpen,
  faLandmark,
  faHeadset,
  faCalendarCheck,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

const Whywe = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const features = [
    {
      icon: faCircleCheck,
      title: "Easy to Apply",
      description:
        "Our online application process is convenient and only requires personal and employment information for quick and easy completion.",
    },
    {
      icon: faUserShield,
      title: "Safe and Secure",
      description:
        "We are dedicated to protecting your information and communications with advanced 256-bit encryption technology.",
    },
    {
      icon: faCalendarCheck,
      title: "Same-Day Funding Available",
      description:
        "If approved, you may receive the money in your account as quickly as the same business day, ensuring a hassle-free experience!",
    },
    {
      icon: faHeadset,
      title: "Loan Support At Every Step",
      description:
        "Our top-rated Loan Advocates are available to provide support at every step of the application process. We both succeed when you do!",
    },
    {
      icon: faLandmark,
      title: "Build Credit History",
      description:
        "We report your payment history with us to the three major credit bureaus, so every on-time payment may help boost your credit history.",
    },
    {
      icon: faFolderOpen,
      title: "Transparent Process",
      description:
        "We supply you with an easy-to-read schedule with predictable payments and the ability to set up automatic payments.",
    },
  ];

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        background:
          "linear-gradient(270deg, hsla(188,100%,59%,0.16), rgba(102,0,255,0.1), #fff38739)",
        boxShadow:
          "0 5px 10px rgba(0, 0, 0, 0.3), 0 0px 10px rgba(0, 0, 0, 0.3)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50px",
        marginBottom: "50px",
        padding: "50px 20px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "navy",
          marginBottom: "40px",
          textAlign: "center",
          fontWeight: "bold",
          "&:hover": {
            color: "#fc8403",
          },
        }}
      >
        Why Qua Loan Is Right For You
      </Typography>
      <Grid container spacing={4} justifyContent="center" sx={{ width: "90%" }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                width: "100%",
                maxWidth: "330px",
                height: "auto",
                textAlign: "center",
                padding: "20px",
                borderRadius: "15px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "auto",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "-40px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "70px",
                  height: "70px",
                  backgroundColor: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  border: "2px solid #878787",
                }}
              >
                <FontAwesomeIcon
                  icon={feature.icon}
                  style={{ fontSize: "32px", color: "orange" }}
                />
              </Box>
              <Typography
                variant="h6"
                sx={{ color: "orange", marginTop: "30px", fontWeight: "bold" }} 
              >
                {feature.title}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: "15px" }}>
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Whywe;

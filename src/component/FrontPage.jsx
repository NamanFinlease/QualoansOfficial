import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import bannerImage from "../assets/image/Qua-Loan-banner-Home-Image.jpg"; // Adjust the path as needed

const FrontPage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        overflowX: "hidden",
        width: "100%",
        height: "auto",
        backgroundColor: "#f9f9f9",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(2),
        color: "white",
        textAlign: "center",
      }}
    >
      {/* Centered Content */}
      <Box
        sx={{
          marginBottom: theme.spacing(4), // Space below text and button
        }}
      >
        <Typography
          variant="h2"
          sx={{
            paddingTop: "40px",

            fontWeight: "bold",
            color: "black",
            textTransform: "uppercase", // Ensures the text is in capital letters

            marginBottom: theme.spacing(2), // Space below heading
            [theme.breakpoints.down("sm")]: {
              fontSize: "1.5rem",
            },
            [theme.breakpoints.up("md")]: {
              fontSize: "2.5rem",
            },
          }}
        >
          Quick, Urgent, Assured Loans
        </Typography>
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#fc8403",
            textTransform: "uppercase", // Ensures the text is in capital letters

            marginBottom: theme.spacing(2), // Space below heading
            [theme.breakpoints.down("sm")]: {
              fontSize: "1.5rem",
            },
            [theme.breakpoints.up("md")]: {
              fontSize: "2rem",
            },
          }}
        >
          {" "}
          Your Emergency, Our Priority
        </Typography>

        {/* Button */}
        {/* <Button
          variant="contained"
          href="/apply-now"
          sx={{
            borderRadius:'80px',
            backgroundColor: "black",
            color: "white",
            fontWeight: "bold",
            fontSize: { xs: "14px", sm: "16px" },
            padding: { xs: "8px 16px", sm: "6px 30px" },
            animation: "blinking 1.5s infinite",
            "&:hover": {
              backgroundColor: "#fc8403",
            },
            "@keyframes blinking": {
              "0%": { backgroundColor: "black", color: "white" },
              "50%": { backgroundColor: "#fc8403", color: "black" },
              "100%": { backgroundColor: "black", color: "white" },
            },
          }}
        >
          Apply Now
        </Button> */}
      </Box>

      {/* Banner Image Section */}
      <Box
        sx={{
          marginTop: "-10px",
          paddingLeft: { xs: 0, md: "100px" },
          paddingRight: { xs: 0, md: "100px" },
          width: "100%",
          textAlign: "center",
          mx: "90px",
          maxHeight: "320px",

          backgroundColor: "rgba(255, 255, 255, 0)",
          borderRadius: "80px", // Parent border radius
          overflow: "hidden", // Add this if needed
        }}
      >
        <Box
          component="img"
          src={bannerImage}
          alt="Banner"
          sx={{
            marginTop: "10px",
            width: "100%",
            maxHeight: "320px",
            objectFit: "cover",
            borderRadius: "80px", // Material-UI handles this directly
          }}
        />
      </Box>
    </Box>
  );
};

export default FrontPage;

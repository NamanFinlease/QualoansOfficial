import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import {
  Book,
  Person,
  VerifiedUser,
  AccountBalance,
  CreditCard,
} from "@mui/icons-material";

const infoItems = [
  {
    icon: (
      <Book
        sx={{
          fontSize: 50,
          color: "darkorange",
          animation: "zoomEffect 2s infinite",
        }}
      />
    ),
    title: "Completed Registration form",
    description:
      "Ensure all details are filled correctly to expedite your loan approval.",
  },
  {
    icon: (
      <Person
        sx={{
          fontSize: 50,
          color: "darkorange",
          animation: "zoomEffect 2s infinite",
        }}
      />
    ),
    title: "Employment Details ",
    description: "Fill your employment information correctly .",
  },
  {
    icon: (
      <VerifiedUser
        sx={{
          fontSize: 50,
          color: "darkorange",
          animation: "zoomEffect 2s infinite",
        }}
      />
    ),
    title: "Identity (ID) Proof",
    description:
      "Aadhaar or PAN Card and Aadhaar Card is mandatory for verification.",
  },
  {
    icon: (
      <AccountBalance
        sx={{
          fontSize: 50,
          color: "darkorange",
          animation: "zoomEffect 2s infinite",
        }}
      />
    ),
    title: "Bank Statement",
    description: "Provide your latest 6 months' bank statement for processing.",
  },
  {
    icon: (
      <CreditCard
        sx={{
          fontSize: 50,
          color: "darkorange",
          animation: "zoomEffect 2s infinite",
        }}
      />
    ),
    title: "Salary Slip",
    description:
      "Submit your last 3 months' salary slips for loan eligibility.",
  },
];

const AddressAndCredential = () => {
  return (
    <Box
      sx={{ backgroundColor: "rgb(72, 145, 193)", py: 5, textAlign: "center" }}
    >
      <Typography variant="h4" color="white" gutterBottom>
        Application Process
      </Typography>
      <Typography sx={{ color: "white", mb: 4 }}>
        Fill out the easy loan approval registration online. Your information is
        safe and secure with us. Be rest assured.
        <br /> (Fill your details correctly to avoid any delays in loan
        approval)
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {infoItems.map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
            <Box
              sx={{
                borderTopRightRadius: "40px",
                borderBottomLeftRadius: "40px",
                backgroundColor: "white",
                padding: "20px",
                boxShadow: "-10px 10px 15px rgba(216, 27, 96, 0.5)",
                textAlign: "center",
                width: "70%",
                minHeight: "250px",
                marginLeft: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
                "@keyframes zoomEffect": {
                  "0%": { transform: "scale(1)" },
                  "50%": { transform: "scale(1.2)" },
                  "100%": { transform: "scale(1)" },
                },
              }}
            >
              {item.icon}
              <Typography variant="h6" fontWeight="bold" mt={1}>
                {item.title}
              </Typography>
              <Box
                sx={{
                  width: "40px",
                  height: "3px",
                  backgroundColor: "#d81b60",
                  marginTop: 1,
                }}
              />
              <Typography variant="body2" mt={2}>
                {item.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AddressAndCredential;

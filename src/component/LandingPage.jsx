import React from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Card,
} from "@mui/material";
import { styled } from "@mui/system";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { orange } from "@mui/material/colors";
import ApplyForm from "./ApplyForm";
import applyGif from "../assets/image/Apply online (1).gif"; // GIF for applying online
import approvalGif from "../assets/image/Get the  approveal (2).gif"; // GIF for quick approval
import disbursalGif from "../assets/image/Receive the loan amount.gif"; // GIF for loan disbursal

const WhiteSection = styled(Box)({
  backgroundColor: "white",
  padding: "40px",
  textAlign: "center",
});

const OrangeSection = styled(Box)({
  backgroundColor: "orange",
  padding: "40px",
  textAlign: "center",
  color: "white",
});

const LoanFormSection = styled(Box)({
  padding: "40px",
});

const LoanStepsSection = styled(Box)({
  bgcolor: "#f9f9f9",
  padding: "40px",
  textAlign: "center",
});

const LandingPage = () => {
  const features = [
    {
      title: "Smooth and Easy Application",
      description:
        "The loan application is extremely easy, and it can be applied from anywhere therefore, you don’t have to wait longer or visit the office physically. So, it imparts an easy and hassle-free lending experience.",
      icon: "📱", // Replace with an actual icon component if needed
    },
    {
      title: "Multipurpose Usage",
      description:
        "The personal loan can be used for any purpose and therefore, there are no restrictions on the expenses of the loan amount at all.Our easy loan applications help you get freedom from the cash crunch at any time.",
      icon: "💼",
    },
    {
      title: "Easy Repayment",
      description:
        "One of the best components to enhance the credit score is the easy repayment of personal loan and our lending services provide an efficient way to present the personal loan.",
      icon: "💰",
    },
  ];

  return (
    <Box>
      {/* Loan Amount Section */}
      <WhiteSection>
        <Typography variant="h4" fontWeight="bold">
          Let’s decide your loan amount.
        </Typography>
        <Typography variant="h6">
          Instant loan amount Upto Rs. 1 Lakh
        </Typography>
      </WhiteSection>

      {/* Trustworthy Lender Section */}
      <OrangeSection>
        <Typography variant="h4" fontWeight="bold">
          Fast, Secure, and Hassle-free loans!
        </Typography>
        <Typography variant="h6">
          Get connected with a trusted lender and receive funds in minutes.
        </Typography>
      </OrangeSection>

      {/* Loan Application Form Section */}

      <ApplyForm />

      {/* Loan Steps Section */}
      <LoanStepsSection>
        <Typography variant="h5" fontWeight="bold" sx={{ color: "gray" }}>
          Application of Loan in Simple Steps
        </Typography>
        <Typography variant="h4" sx={{ marginBottom: 6 }}>
          It’s easy to apply for a loan by following{" "}
          <strong style={{ color: "orange" }}>some simple steps</strong>
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4} textAlign="center">
            <img
              src={applyGif}
              alt="Apply online and submit documents"
              style={{ width: "50%", height: "50%" }}
            />
            <Typography variant="h5" sx={{ mt: 2 }}>
              Apply online and submit documents
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Go through the loan application form and enter all the details.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} textAlign="center">
            <img
              src={approvalGif}
              alt="Get the approval in a few hours"
              style={{ width: "50%", height: "50%" }}
            />
            <Typography variant="h5" sx={{ mt: 2 }}>
              Get the approval in a few hours
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Once the documents are submitted, it takes very less time for
              approval.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} textAlign="center">
            <img
              src={disbursalGif}
              alt="Receive the loan amount"
              style={{ width: "50%", height: "50%" }}
            />
            <Typography variant="h5" sx={{ mt: 2 }}>
              Receive the loan amount
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Get the disbursal directly into your linked account and use it for
              expenses.
            </Typography>
          </Grid>
        </Grid>
      </LoanStepsSection>

      <Box sx={{ bgcolor: "#f3f4f6", py: 6, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" color="orange">
          Some Unique Features That You Get in Our Lending Process.
        </Typography>
        <Grid container spacing={3} justifyContent="center" sx={{ mt: 4 }}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  maxWidth: 345,
                  height: 300, // Set a fixed height
                  mx: "auto",
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between", // Ensure consistent spacing
                  border: "2px solid orange",
                  borderRadius: 2,
                  boxShadow: 3,
                  textAlign: "center",
                }}
              >
                <Box sx={{ fontSize: 40, mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h5" fontWeight="bold">
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {feature.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ bgcolor: "#fff", py: 6, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" color="orange">
          Personal Loan Eligibility Criteria
        </Typography>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ mt: 4, paddingX: 3 }}
        >
          {[
            { title: "Age", description: "21 - 60 years" },
            { title: "Employment", description: "Salaried Employees" },
            // { title: "CIBIL Score", description: "650 or above" },
            {
              title: "Monthly Salary",
              description: "Starting Rs. 35,000 or above",
            },
          ].map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: 180,
                  mx: 1,
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  //   border: "2px solid orange",
                  borderRadius: 2,
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Border shadow

                  textAlign: "center",
                  bgcolor: "#fff3e0", // Light Orange Background
                  position: "relative",
                }}
              >
                {/* Index Number with Orange Background */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 20,
                    width: 50,
                    height: 50,
                    bgcolor: "#ff9800", // Orange background
                    color: "black",
                    fontSize: 22,
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                  }}
                >
                  {index + 1}
                </Box>
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>
                  {item.title}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {item.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default LandingPage;

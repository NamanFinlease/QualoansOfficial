import React, { useEffect } from "react";
import WarningIcon from "@mui/icons-material/Warning";
import { Grid, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const VerifyRepayment = () => {
  useEffect(() => {
    Swal.fire({
      title: "Transaction Success!",
      text: "Your transaction has been successfully completed.",
      icon: "success",
      confirmButtonColor: "#F26722",
    });
  }, []);
  return (
    <>
      <Box
        sx={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          width: "100%",
          padding: "8px 0",
        }}
      >
        <Typography
          component="div"
          sx={{
            display: "inline-block",
            animation: "marquee 20s linear infinite",
            fontWeight: "600",
            color: "#F26722",
            fontSize: "24px",
            fontFamily: "Inter",
          }}
        >
          ⚠️ Beware of fraud! Always use our secure Repayment Website Link for
          payments. Qua Loan is not responsible for payments made to other
          accounts.
        </Typography>

        <style>
          {`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}
        </style>
      </Box>
      {/* Alert Banner */}

      <Box
        sx={{
          background: "linear-gradient(to bottom, #ffffff, #f5f5f5)",
          minHeight: "96vh",
          padding: "20px",
        }}
      >
        {/* Warning Section */}
        <Box
          sx={{
            background: "#F5F5F5",
            borderRadius: "16px",
            padding: "20px",
            maxWidth: "900px",
            margin: "0 auto",
            mb: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 1,
            }}
          >
            <WarningIcon sx={{ color: "#F26722", fontSize: "32px" }} />
          </Box>

          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              color: "#1c1c1c",
              fontWeight: 500,
              mb: 1,
              fontSize: { xs: "24px", sm: "28px" },
              fontFamily: "Inter",
            }}
          >
            Important Payment Notice
          </Typography>

          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              color: "#1c1c1c",
              fontSize: { xs: "14px", sm: "16px" },
              fontFamily: "Inter",
              //   mb: 2,
            }}
          >
            We are not liable for payments made to personal accounts. Please use
            only the official company account.
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              textAlign: "center",
              color: "#1c1c1c",
              fontWeight: 500,
              fontSize: { xs: "18px", sm: "20px" },
              fontFamily: "Inter",
            }}
          >
            Please repay your loan and interest to this bank account
          </Typography>
        </Box>
        <Box
          sx={{
            background: "#F26722",
            borderRadius: "16px",
            maxWidth: "900px",
            margin: "0 auto",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={12}>
              <Box
                sx={{
                  textAlign: "center",
                  padding: "20px",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(255, 142, 83, 0.05)",
                    borderRadius: "12px",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 500,
                    color: "#FFFFFF",
                    fontSize: { xs: "24px", sm: "28px" },
                    mb: 1,
                    fontFamily: "Inter",
                  }}
                >
                  Share Your Payment Proof
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "18px", sm: "20px" },
                    fontFamily: "Inter",
                    color: "#FFFFFF",
                    mb: 3,
                  }}
                >
                  Please send your transfer screenshot to:
                </Typography>

                <a
                  href="mailto:collection@qualoan.com"
                  style={{
                    color: "#F26722",
                    backgroundColor: "#fff",
                    padding: "14px 34px",
                    borderRadius: "11px",
                    display: "inline-block",
                    fontWeight: "500",
                    fontSize: "20px",
                    cursor: "pointer",
                    textDecoration: "none",
                    fontFamily: "Inter",
                    animation: "pulse 2s infinite",
                  }}
                >
                  collection@qualoan.com
                </a>
                {/* Buttons for Navigation */}
                <Box
                  sx={{
                    mt: 4,
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#fff",
                      color: "#F26722",
                      fontWeight: "600",
                      fontSize: "18px",
                      padding: "10px 20px",
                      borderRadius: "10px",
                      "&:hover": {
                        backgroundColor: "#FFD5B5",
                      },
                    }}
                    onClick={() => navigate("/dashboard")}
                  >
                    Go to Dashboard
                  </Button>

                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#fff",
                      color: "#F26722",
                      fontWeight: "600",
                      fontSize: "18px",
                      padding: "10px 20px",
                      borderRadius: "10px",
                      "&:hover": {
                        backgroundColor: "#FFD5B5",
                      },
                    }}
                    onClick={() => navigate("/loan-application")}
                  >
                    Go to Loan Application
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <style>
        {`
          @keyframes scroll-text {
            from { transform: translateX(100%); }
            to { transform: translateX(-100%); }
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </>
  );
};

export default VerifyRepayment;

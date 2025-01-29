import React from "react";
import { Link } from "react-router-dom";
import WarningIcon from "@mui/icons-material/Warning"; // Import Warning icon
import HDFC from "../assets/image/download (1) (1).png";
import repayaImage from "../assets/image/Qua-Repayment.jpg";
import { Grid, Box, Typography, Button, Divider } from "@mui/material";
import qrCode1 from "../assets/image/WhatsApp Image 2025-01-28 at 3.51.13 AM.jpeg"; // Import QR code image 1

const RepayLoan = () => {
  return (
    <>
      {/* <Header/> */}

      <Box
        sx={{
          background: "#f9f9f9",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          padding: { xs: "20px", sm: "45px" },
        }}
      >
        {/* Image Section */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: "20vh", md: "60vh" },
            overflow: "hidden",
            borderRadius: "20px",
            mb: 5,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            component="img"
            src={repayaImage}
            alt="Repay Loan"
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        {/* Marquee Section */}
        <Box
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            width: "100%",
            backgroundColor: "#f9f9f9",
            py: 1,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              display: "inline-block",
              animation: "scroll-text 20s linear infinite",
              fontSize: { xs: "14px", sm: "18px" },
              color: "#B22222",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            "Beware of fraud! Always use our secure Repayment Website Link for
            loan payments. Qua Loan is not responsible for payments made to
            other accounts."
          </Typography>
          <style>
            {`
        @keyframes scroll-text {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(-100%);
          }
        }
      `}
          </style>
        </Box>

        {/* Warning Message */}
        <Box
          sx={{
            textAlign: "center",
            borderRadius: "30px",
            padding: "16px",
            maxWidth: "80vw",
            margin: "0 auto",
            mt: 6,
          }}
        >
          <Typography
            variant="h5"
            color="black"
            sx={{
              fontFamily: "Inter",
              fontSize: { xs: "22px", sm: "30px" },
              lineHeight: "50px",
              letterSpacing: "-0.408px",
              mb: 2,
            }}
          >
            <strong style={{ fontSize: "30px", color: "#fc8403" }}>
              Warning:
            </strong>{" "}
            We are not liable for any payments made in personal accounts of
            employees. Please make all payments in the company’s account only.
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <WarningIcon color="error" />
          </Box>

          <Typography
            variant="body2"
            sx={{
              mt: 1,
              color: "#fc8403",
              fontFamily: "Inter",
              fontSize: { xs: "16px", sm: "25px" },
              lineHeight: "36px",
              letterSpacing: "-0.408px",
              mb: 5,
            }}
          >
            Please repay your loan and interest amount into the following bank
            a/c:
          </Typography>
        </Box>

        {/* Main Content */}
        <Box
          mt={10}
          sx={{ background: "#D9D9D9", borderRadius: "30px", margin: 1 }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={4}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: 500,
                  mb: 4,
                  textAlign: { xs: "center", md: "left" },
                  paddingX: { xs: "20px", sm: "50px" },
                }}
              >
                Please share a screenshot of your transfer <br />
                from your bank/Google Pay to{" "}
                <strong style={{ color: "#fc8403" }}>
                  collection@qualoan.com
                </strong>
                .
              </Typography>
            </Grid>

            <Grid item xs={12} md={8} sx={{ marginLeft: { xs: 3, md: 0 } }}>
              <Box className="inner-page-line" mt={10}>
                <Grid container spacing={6} justifyContent="center">
                  <Grid container spacing={6}>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={3}
                      textAlign="center"
                      sx={{
                        marginLeft: { xs: 6, md: 5 },
                        marginRight: { xs: 6, md: 15 },
                        mb: 10,
                        // justifyContent: "center",
                      }}
                    >
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          Scan the QR Code for Faster Payment:
                        </Typography>
                        <img
                          src={qrCode1}
                          alt="QR Code"
                          style={{
                            width: "250px",
                            height: "auto",
                            borderRadius: "8px",
                          }}
                        />
                      </Box>
                    </Grid>
                    <Box
                      sx={{
                        marginRight: { xs: 0, sm: 3.5 }, // Remove right margin for small screens, keep it for larger screens
                        marginBottom: { xs: 6, sm: 10 }, // Adjust bottom margin for smaller screens
                        marginTop: { xs: 6, sm: 15 }, // Adjust top margin for smaller screens

                        display: "flex",
                        flexDirection: "column", // Keep vertical alignment
                        alignItems: "center", // Center horizontally
                        justifyContent: "center", // Center vertically
                        padding: { xs: "8px", sm: "10px" }, // Adjust padding for smaller screens

                        borderRadius: "20px",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                        background:
                          "linear-gradient(180deg, #AE285D 0%, #5B437C 100%)",

                        width: { xs: "100%", sm: "auto" }, // Full width for mobile screens, auto width for larger ones
                        mx: "auto", // Centers the box horizontally on smaller screens
                      }}
                    >
                      {/* Logo Section */}
                      <Grid item xs={12} sm={12} md={12}>
                        <Box
                          component="img"
                          src={HDFC} // Using the imported logo
                          alt="Company Logo"
                          sx={{
                            width: { xs: "120px", sm: "250px" }, // Adjust logo size for different screen sizes
                            height: "auto",
                            mb: 1, // Reduced margin at the bottom for less space
                          }}
                        />
                        {/* Divider After Logo */}
                        <Divider
                          sx={{
                            borderColor: "#ffffff", // White color for the divider
                            opacity: 0.5, // Transparency
                            width: { xs: "120px", sm: "250px" }, // Same width as the logo
                            my: 0, // No vertical margin, tight to logo
                          }}
                        />
                      </Grid>

                      {/* Account Details Section */}
                      <Box sx={{ mt: 0 }}>
                        <Typography
                          variant="body1"
                          sx={{
                            mb: 2,
                            display: "flex",
                            alignItems: "center",
                            color: "#ffffff", // White text color
                          }}
                        >
                          <Box
                            component="span"
                            sx={{
                              fontWeight: "bold",
                              minWidth: { xs: "100px", sm: "130px" },
                            }}
                          >
                            Bank Name
                          </Box>
                          <Typography
                            sx={{
                              marginLeft: { xs: 2, md: 3 },
                              color: "#ffffff",
                            }}
                          >
                            HDFC
                          </Typography>
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            mb: 2,
                            display: "flex",
                            alignItems: "center",
                            color: "#ffffff", // White text color
                          }}
                        >
                          <Box
                            component="span"
                            sx={{
                              fontWeight: "bold",
                              minWidth: { xs: "100px", sm: "130px" },
                            }}
                          >
                            Name
                          </Box>
                          <Typography
                            sx={{
                              marginLeft: { xs: 2, md: 3 },
                              color: "#ffffff",
                            }}
                          >
                            Naman Finlease Private Limited
                          </Typography>
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            mb: 2,
                            display: "flex",
                            alignItems: "center",
                            color: "#ffffff", // White text color
                          }}
                        >
                          <Box
                            component="span"
                            sx={{
                              fontWeight: "bold",
                              minWidth: { xs: "100px", sm: "130px" },
                            }}
                          >
                            Account Number
                          </Box>
                          <Typography
                            sx={{
                              marginLeft: { xs: 2, md: 3 },
                              color: "#ffffff",
                            }}
                          >
                            50200105867815
                          </Typography>
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            mb: 2,
                            display: "flex",
                            alignItems: "center",
                            color: "#ffffff", // White text color
                          }}
                        >
                          <Box
                            component="span"
                            sx={{
                              fontWeight: "bold",
                              minWidth: { xs: "100px", sm: "130px" },
                            }}
                          >
                            IFSC Code
                          </Box>
                          <Typography
                            sx={{
                              marginLeft: { xs: 2, md: 3 },
                              color: "#ffffff",
                            }}
                          >
                            HDFC0001203
                          </Typography>
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            mb: 2,
                            display: "flex",
                            alignItems: "center",
                            color: "#ffffff", // White text color
                          }}
                        >
                          <Box
                            component="span"
                            sx={{
                              fontWeight: "bold",
                              minWidth: { xs: "100px", sm: "130px" },
                            }}
                          >
                            Account Type
                          </Box>
                          <Typography
                            sx={{
                              marginLeft: { xs: 2, md: 3 },
                              color: "#ffffff",
                            }}
                          >
                            Current Account
                          </Typography>
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                {/* </Box> */}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default RepayLoan;

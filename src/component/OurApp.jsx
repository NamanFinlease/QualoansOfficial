import React from "react";
import { Box, Typography, Button, keyframes } from "@mui/material";
import myImage from "../assets/image/download-app.png";
import DownloadIcon from "@mui/icons-material/Download";

// Define the blinking animation
const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;
const apkLink = "/app-release.apk"; // Update with your actual APK filename

export const OurApp = () => {
  return (
    <Box
      sx={{
        mt: 5,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mb: 5,
        px: 2,
      }}
    >
      <Box
        sx={{
          width: "80%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Box
          component="img"
          src={myImage}
          alt="Download App"
          sx={{
            height: { xs: 250, sm: 350, md: 500 },
            width: { xs: "100%", sm: "80%", md: 500 },
            mixBlendMode: "darken",
            mb: { xs: 3, md: 0 },
            mr: { md: 5 }, // Added margin-right for gap on larger screens
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            gap: 3,
            width: { xs: "100%", md: "50%" },
            pb: { xs: 3, md: 5 },
            ml: { md: 5 }, // Added margin-left for gap on larger screens
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "navy",
              fontSize: { xs: 24, sm: 30, md: 36 },
              fontWeight: "bold",
            }}
          >
            Get started with Us by Downloading our Qualoan App.
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "black",
              fontSize: { xs: 16, sm: 18, md: 20 },
            }}
          >
            We provide the right financial choices to make your life better,
            <br />
            Download Qualoan app to get updated credit score anytime. Get direct
            access to personal loans.
          </Typography>

          <Box
            component="ul"
            sx={{
              m: 0,
              pl: { xs: 0, md: 0 },
              listStyle: "none",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography
              component="li"
              sx={{
                fontSize: { xs: 16, md: 18 },
                color: "black",
                lineHeight: "40px",
              }}
            >
              ✅ Apply for a loan in 5 mins
            </Typography>
            <Typography
              component="li"
              sx={{
                fontSize: { xs: 16, md: 18 },
                color: "black",
                lineHeight: "40px",
              }}
            >
              ✅ Secure and reliable platform
            </Typography>
            <Typography
              component="li"
              sx={{
                fontSize: { xs: 16, md: 18 },
                color: "black",
                lineHeight: "40px",
              }}
            >
              ✅ Instant loan disbursal
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "start" },
              gap: 5,
            }}
          >
            <a href={apkLink} download style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                sx={{
                  backgroundColor: "orange",
                  color: "white",
                  fontSize: { xs: 14, md: 16 },
                  padding: "10px 20px",
                  borderRadius: "12px",
                  animation: `${blink} 1.5s infinite`,
                  "&:hover": { backgroundColor: "darkgray" },
                }}
              >
                Download Now
              </Button>
            </a>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

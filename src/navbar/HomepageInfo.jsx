import React from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import myVideo from "../assets/image/loan-company1.mp4";

export const HomepageInfo = () => {
  return (
    <Box sx={{ mt: 8, width: "100%", position: "relative", mb: 5 }}>
      <Box
        sx={{
          paddingTop: { xs: "20px", md: "5px" },
          width: "100%",
          height: { xs: "auto", md: "500px" },
          background:
            "linear-gradient(270deg, rgba(0,255,255,0.2), rgba(102,0,255,0.1), #fff38739)",
          boxShadow: "0 5px 10px rgba(0, 0, 0, 0.3)",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-evenly",
          alignItems: "center",
          borderBottomRightRadius: "100px",
          borderBottomLeftRadius: "100px",
        }}
      >
        {/* Video Section */}
        <Box
          sx={{
            height: { xs: "250px", sm: "350px", md: "500px" },
            width: { xs: "100%", sm: "500px", md: "600px" },
          }}
        >
          <video
            src={myVideo}
            autoPlay
            loop
            muted
            style={{
              height: "100%",
              width: "100%",
              mixBlendMode: "darken",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </Box>

        {/* Content Section */}
        <Box
          sx={{
            mb: { xs: 5, md: 0 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: { xs: "center", md: "flex-start" },
            textAlign: { xs: "left", md: "left" },
            gap: "20px",
            width: { xs: "90%", md: "30%" },
            zIndex: 1,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 600, color: "black" }}>
            Welcome to Qualoan
          </Typography>
          <Typography
            variant="h3"
            sx={{ color: "#0033cc", fontWeight: "bold", lineHeight: "1.2" }}
          >
            {" "}
            Quick, Urgent, Assured Loans
          </Typography>

          <Box component="ul" sx={{ paddingLeft: "20px", margin: 0 }}>
            <Typography
              component="li"
              sx={{ fontSize: "18px", lineHeight: "1.8" }}
            >
              Streamlined and Digital process.{" "}
            </Typography>
            <Typography
              component="li"
              sx={{ fontSize: "18px", lineHeight: "1.8" }}
            >
              Quick approval and disbursal.
            </Typography>
            <Typography
              component="li"
              sx={{ fontSize: "18px", lineHeight: "1.8" }}
            >
              No hidden fees.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

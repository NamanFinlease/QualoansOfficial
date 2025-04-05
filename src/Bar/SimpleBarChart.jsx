import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

const uData = [4000, 3000, 2000, 0, 0, 0, 0];
const pData = [2400, 1398, 9800, 0, 0, 0, 0];
const xLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];

export default function SimpleBarChart() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Responsive condition

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row", // Column on mobile, row on larger screens
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        padding: 3,
        background: "linear-gradient(135deg, #eef2f3, #d1d8e0)",
        borderRadius: 3,
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
        overflow: "hidden", // Ensures nothing overflows
        width: "100%", // Ensures proper responsiveness
      }}
    >
      {/* Left Side - Chart */}
      <Box
        sx={{
          backgroundColor: "white",
          padding: isMobile ? 2 : 3,
          borderRadius: 3,
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
          width: "100%", // Ensures it fits within the box
          maxWidth: isMobile ? "100%" : 600, // Prevents overflow on mobile
          transition: "all 0.3s ease-in-out",
          "&:hover": { transform: "scale(1.02)" },
        }}
      >
        <Box sx={{ width: "100%", overflowX: "auto" }}>
          {/* Wraps chart in a scrollable container if needed */}
          <BarChart
            width={isMobile ? 320 : 600} // Adjust width for mobile
            height={isMobile ? 250 : 400} // Adjust height for mobile
            series={[
              { data: pData, label: "Loan Disbursal", id: "pvId" },
              { data: uData, label: "Loan Rejection", id: "uvId" },
            ]}
            xAxis={[{ data: xLabels, scaleType: "band" }]}
          />
        </Box>
      </Box>

      {/* Right Side - Content Box */}
      <Box
        sx={{
          width: "100%", // Ensures it fits within the box
          maxWidth: isMobile ? "100%" : 600,
          height: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: isMobile ? 2 : 4,
          backgroundColor: "white",
          borderRadius: 3,
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
          transition: "all 0.3s ease-in-out",
          "&:hover": { transform: "scale(1.02)" },
          overflow: "hidden", // Prevents text from going outside
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"} // Adjust font size for mobile
          sx={{
            fontWeight: 700,
            marginBottom: 2,
            color: "#2c3e50",
            textAlign: "center", // Centers text on mobile
            width: "100%",
            wordWrap: "break-word", // Prevents overflow
          }}
        >
          📌 Loan Performance Overview
        </Typography>

        <Typography
          variant="body1"
          sx={{
            marginBottom: 2,
            fontSize: "1rem",
            color: "#333",
            textAlign: "justify",
          }}
        >
          ✅ <strong>Loan Disbursal:</strong> Tracks the total number of loans
          successfully disbursed.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginBottom: 2,
            fontSize: "1rem",
            color: "#333",
            textAlign: "justify",
          }}
        >
          ❌ <strong>Loan Rejection:</strong> Indicates the number of loan
          applications that were denied.
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: "1rem", color: "#333", textAlign: "justify" }}
        >
          📊 <strong>Comparison Analysis:</strong> Understand approval vs.
          rejection rates over time.
        </Typography>
      </Box>
    </Box>
  );
}

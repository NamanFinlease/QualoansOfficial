import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Typography } from "@mui/material";

const uData = [4000, 3000, 2000, 0, 0, 0, 0];
const pData = [2400, 1398, 9800, 0, 0, 0, 0];
const xLabels = ["January", "February", "March", "April", "May", "June", "July"];

export default function SimpleBarChart() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        padding: 4,
        background: "linear-gradient(135deg, #eef2f3, #d1d8e0)", // Gradient background
        borderRadius: 3,
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)", // Smooth shadow
      }}
    >
      {/* Left Side - Chart */}
      <Box
        sx={{
          backgroundColor: "white",
          padding: 3,
          borderRadius: 3,
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)", // Shadow for chart box
          transition: "all 0.3s ease-in-out",
          "&:hover": { transform: "scale(1.02)" }, // Hover effect
        }}
      >
        <BarChart
          width={600}
          height={400}
          series={[
            { data: pData, label: "Loan Disbursal", id: "pvId" },
            { data: uData, label: "Loan Rejection", id: "uvId" },
          ]}
          xAxis={[{ data: xLabels, scaleType: "band" }]}
        />
      </Box>

      {/* Right Side - Content Box */}
      <Box
        sx={{
          width: 600, // Same width as BarChart
          height: 400, // Same height as BarChart
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: 4,
          backgroundColor: "white",
          borderRadius: 3,
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)", // Card effect
          transition: "all 0.3s ease-in-out",
          "&:hover": { transform: "scale(1.02)" }, // Hover effect
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            marginBottom: 2,
            color: "#2c3e50", // Darker color for title
          }}
        >
          📌 Loan Performance Overview
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: 2, fontSize: "1.1rem", color: "#333" }}>
          ✅ <strong>Loan Disbursal:</strong> Tracks the total number of loans successfully disbursed.  
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2, fontSize: "1.1rem", color: "#333" }}>
          ❌ <strong>Loan Rejection:</strong> Indicates the number of loan applications that were denied.  
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "1.1rem", color: "#333" }}>
          📊 <strong>Comparison Analysis:</strong> Understand approval vs. rejection rates over time.  
        </Typography>
      </Box>
    </Box>
  );
}

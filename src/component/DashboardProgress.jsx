import React, { useState, useEffect } from "react";
import { Grid, Typography, LinearProgress } from "@mui/material";

const calculateProgress = (registrationStatus) => {
    const stepValue = 16.67;
    let progress = 0;
  
    switch (registrationStatus) {
      case "NEW":
      case "AADAR_VERIFIED":
        progress = 0;
        break;
      case "MOBILE_VERIFIED":
        progress = stepValue;
        break;
      case "PAN_VERIFIED":
        progress = stepValue * 2;
        break;
      case "PERSONAL_DETAILS":
        progress = stepValue * 3;
        break;
      case "CURRENT_RESIDENCE":
        progress = stepValue * 4;
        break;
      case "INCOME_DETAILS":
        progress = stepValue * 5;
        break;
      case "UPLOAD_PROFILE":
      case "COMPLETE_DETAILS":
        progress = stepValue * 6;
        break;
      default:
        progress = 0;
        break;
    }
  
    return progress;
  };
  

const DashboardProgress = ({ registrationStatus }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (registrationStatus) {
      const newProgress = calculateProgress(registrationStatus);
      setProgress(newProgress);
    }
    
  }, [registrationStatus]);

  return (
    <Grid item xs={12} sm={6}>
      <Typography
        variant="body1"
        sx={{ marginBottom: 3, fontStyle: "italic", color: "#555" }}
      >
        Your progress: {Math.floor(progress)}% completed.
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          marginBottom: 4,
          height: 20,
          borderRadius: 5,
          backgroundColor: "#e0e0e0",
          "& .MuiLinearProgress-bar": {
            background: "linear-gradient(90deg, #00aaff, #0077cc)",
          },
        }}
      />
    </Grid>
  );
};

export default DashboardProgress

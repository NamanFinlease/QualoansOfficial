import { Box, Typography } from "@mui/material";

const MarqueeAlert = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#fff",
        // padding: "10px 0",
        boxShadow: "0px -2px 5px rgba(0,0,0,0.1)",
        zIndex: 1000,
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      <Typography
        component="div"
        sx={{
          display: "inline-block",
          animation: "marquee 30s linear infinite",
          fontWeight: "500",
          color: "#F26722",
          fontSize: "18px",
          fontFamily: "Inter",
          // paddingLeft: "100%",
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
  );
};

export default MarqueeAlert;

import { Box, Typography } from "@mui/material";

const MarqueeAlert = () => {
  return (
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
  );
};

export default MarqueeAlert;

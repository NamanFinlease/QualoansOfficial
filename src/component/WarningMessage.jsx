import { Box, Typography } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

const WarningMessage = () => {
  return (
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
      <Typography
        variant="h5"
        color="black"
        sx={{
          fontFamily: "Inter",
          fontSize: { xs: "22px", sm: "30px" },
          lineHeight: "50px",
          letterSpacing: "-0.408px",
          mb: 2,
          textAlign: "center",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)", // Bottom shadow
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
          variant="body2"
          sx={{
            textAlign: "center",
            color: "#1c1c1c",
            fontSize: { xs: "14px", sm: "16px" },
            fontFamily: "Inter",
          }}
        >
          We are not liable for any payments made in <br />
          personal accounts of employees. Please make all <br />
          payments in the company’s account only.
        </Typography>
      </Typography>
    </Box>
  );
};

export default WarningMessage;

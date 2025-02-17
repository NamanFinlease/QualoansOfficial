import { Box, Typography, Tooltip, IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const PaymentProof = () => {
  const email = "collection@qualoan.com";
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        padding: "20px",
        position: "relative",
        marginTop: "2rem",
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
          color: "black",
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
          color: "black",
          mb: 3,
        }}
      >
        Please send your transfer screenshot to:
      </Typography>
      <a
        href={`mailto:${email}`}
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
        <span>{email}</span>
      </a>
      <Tooltip title="Copy Email">
        <IconButton
          onClick={() => handleCopy(email)}
          size="small"
          sx={{ ml: 1 }}
        >
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default PaymentProof;

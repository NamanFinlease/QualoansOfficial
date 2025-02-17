import { Box, Typography, Tooltip, IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const bankDetails = [
  { label: "Bank Name", value: "HDFC" },
  { label: "Name", value: "Naman Finlease Private Limited" },
  { label: "Account Number", value: "50200105867815" },
  { label: "IFSC Code", value: "HDFC0001203" },
  { label: "UPI ID", value: "vyapar.173031688235@hdfcbank" },
  { label: "Account Type", value: "Current Account" },
];

const CopyButton = ({ text }) => (
  <Tooltip title={`Copy ${text}`}>
    <IconButton
      onClick={() => navigator.clipboard.writeText(text)}
      size="small"
      sx={{ ml: 1 }}
    >
      <ContentCopyIcon fontSize="small" />
    </IconButton>
  </Tooltip>
);

const BankDetails = () => (
  <Box sx={{ padding: "20px" }}>
    {bankDetails.map(({ label, value }) => (
      <Typography
        key={label}
        variant="body1"
        sx={{ color: "black", fontFamily: "Inter" }}
      >
        <strong>{label}:</strong> {value}
        <CopyButton text={value} />
        <br />
      </Typography>
    ))}
  </Box>
);

export default BankDetails;

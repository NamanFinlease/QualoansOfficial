import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Tooltip,
  IconButton,
} from "@mui/material";
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
  <Tooltip title="Copy">
    <IconButton
      onClick={() => navigator.clipboard.writeText(text)}
      size="small"
    >
      <ContentCopyIcon fontSize="small" />
    </IconButton>
  </Tooltip>
);

const BankDetailsTable = () => (
  <Box
    sx={{
      width: "100%",
      maxWidth: { xs: "100%", sm: 400 }, // Full width on small screens
      margin: "auto",
      mt: 2,
      paddingTop: 10,
      px: { xs: 1, sm: 2 }, // Adjust padding for small screens
    }}
  >
    <Box sx={{ overflowX: "auto" }}>
      {" "}
      {/* Enables horizontal scrolling if needed */}
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table size="small">
          <TableBody>
            {bankDetails.map(({ label, value }) => (
              <TableRow key={label}>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "12px", sm: "14px" },
                    py: { xs: 0.5, sm: 1 },
                  }}
                >
                  {label}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: { xs: "12px", sm: "14px" },
                    py: { xs: 0.5, sm: 1 },
                  }}
                >
                  {value}
                </TableCell>
                <TableCell sx={{ py: { xs: 0.5, sm: 1 } }}>
                  <CopyButton text={value} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  </Box>
);

export default BankDetailsTable;

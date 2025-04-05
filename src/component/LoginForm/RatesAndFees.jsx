import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from "@mui/material";

const RatesAndFees = () => {
  return (
    <Box sx={{ width: "100%", maxWidth: 1200, padding: 2, mx: "auto" }}>
      {/* Title */}
      <Typography variant="h4" fontWeight="bold">
        Rates and Fees
      </Typography>
      <Divider
        sx={{ width: "60px", border: "2px solid #d81b60", marginBottom: 2 }}
      />

      {/* Details */}
      <Typography variant="body1">
        <strong> Interest Rate :</strong> .75
      </Typography>

      <Typography variant="body1">
        <strong>Tenure/Repayment Period:</strong> 1 month
      </Typography>
      <Typography variant="body1">
        <strong>Minimum-Maximum Loan Amount:</strong> INR 5,000 - 1,00,000
      </Typography>
      <Typography variant="body1">
        <strong>Processing Fee:</strong> 15%
      </Typography>
      <Typography variant="body1" mb={3}>
        <strong>GST on Processing Fee (Exclusive):</strong> 18%
      </Typography>

      {/* Representative Example Section */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Representative Example:
      </Typography>

      {/* Full-Width Table */}
      <TableContainer component={Paper} elevation={3} sx={{ width: "100%" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              {[
                "Loan Amount",
                "APR",
                "Tenure",
                "Processing Fee",
                "GST on Processing Fee",
                "Amount Disbursed",

                "Total Repayment Amount",
                "Total Interest",
              ].map((header) => (
                <TableCell key={header} sx={{ fontWeight: "bold" }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>₹ 50,000</TableCell>
              <TableCell>22.5%</TableCell>
              <TableCell>1 Months</TableCell>
              <TableCell>₹ 1,000</TableCell>
              <TableCell>₹ 180</TableCell>
              <TableCell>₹ 48,820</TableCell>
              <TableCell>₹ 1,125,000</TableCell>
              <TableCell>₹ 1,075,00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RatesAndFees;

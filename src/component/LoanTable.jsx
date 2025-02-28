import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Container,
} from "@mui/material";
import { BASE_URL } from "../baseURL";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import Dashboard from "./Dashboard";
import { useSidebar } from "../context/SidebarContext";

const LoanTable = () => {
  const { sidebarOpen, sidebarExpanded } = useSidebar();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/loanList`, {
        withCredentials: true,
      });
      console.log("response", response?.data?.loanList);
      // const sortedLoans = response.data.loanList.sort(
      //   (a, b) => new Date(b.date) - new Date(a.date)
      // );
      setLoans(response?.data?.loanList);
    } catch (error) {
      console.error("Error fetching loans:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("loans loan table >>> ?? ", loans);

  const handlePaymentSubmit = async (loanNo, loanAmount) => {
    console.log("sd  ");
    // Validate loan amount
    if (!loanAmount || isNaN(loanAmount) || parseFloat(loanAmount) <= 0) {
      Swal.fire("Invalid Amount", "Please enter a valid loan amount.", "error");
      return;
    }

    // Prepare data for payment API
    const paymentData = {
      loanNo: loanNo, // Loan number
      // amount: parseFloat(loanAmount), // Amount should be a number
    };

    setLoading(true);
    // try {
    // Make API call to the payNow endpoint
    // const response = await fetch(
    //   "https://preprod-crm.api.qualoan.com/api/user/payNow",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(paymentData),

    //   }
    // );

    const response = await axios.post(
      `${BASE_URL}/payNow`,
      paymentData, // Axios automatically stringifies JSON data
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("gjhjh>>", response);

    // Check if the response is successful
    // if (!response.ok) {
    //   throw new Error(
    //     `Payment API call failed with status ${response.status}`
    //   );
    // }

    // const data = await response.json();
    // console.log("data ???? ", data);
    // if (response.status === 200) {
    console.log("hiii", response.data.order_id);
    window.location.href =
      "https://api.paytring.com/pay/token/" + response.data.order_id;
    navigate("/verify-repayment");

    console.log("paytring", paytring);
    // }
    // if (data.status) {
    //   const paytring = new Paytring({
    //     order_id: data.order_id,
    //     success: (orderId) => {
    //       console.log("inside succ  ");
    //       alert(`Payment Successful! Order ID: ${orderId}`);
    //     },
    //     failed: (orderId) => {
    //       console.log("inside fail  ");
    //       alert(`Payment Failed! Order ID: ${orderId}`);
    //     },
    //     onClose: (orderId) => {
    //       console.log("inside close  ");
    //       alert(`Payment Popup Closed! Order ID: ${orderId}`);
    //     },
    //     events: (event) => {
    //       console.log(
    //         `Event Triggered: ${event.event_name} - ${event.event_value}`,
    //         event
    //       );
    //     },
    //   });

    //   paytring.open();

    //   console.log("paytring", paytring);
    // }
    // } catch (error) {
    //   // Handle error response
    //   console.error("Error processing payment:", error);
    //   Swal.fire(
    //     "Error",
    //     "Failed to process the payment. Please try again.",
    //     "error"
    //   );
    // } finally {
    //   setLoading(false);
    // }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Dashboard />
      <Box
        sx={{
          padding: { xs: 2, sm: 3 },
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
          width: `calc(100% - ${
            sidebarOpen ? (sidebarExpanded ? 240 : 70) : 0
          }px)`,
          marginLeft: `${sidebarOpen ? (sidebarExpanded ? 240 : 70) : 0}px`,
          transition: "width 0.3s ease, margin-left 0.3s ease",
        }}
      >
        {loans.length > 0 ? (
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              position: "relative",
              overflowX: "auto",
            }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: "grey.100" }}>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "left" }}>
                    S. No.
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "left" }}>
                    Loan No.
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "left" }}>
                    Payable Amount(as on today)
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "left" }}>
                    Repayment Amount
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "left" }}>
                    PAN
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "left" }}>
                    Date
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      textAlign: "left",
                      position: "sticky",
                      right: 0,
                      backgroundColor: "grey.100",
                      zIndex: 2,
                    }}
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loans.map((loan, index) => (
                  <TableRow
                    key={loan.sno || index}
                    sx={{ "&:hover": { bgcolor: "grey.50" } }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{loan.loanNo}</TableCell>
                    <TableCell>₹{loan.outstandingAmount}</TableCell>
                    <TableCell>₹{loan.repaymentAmount}</TableCell>
                    <TableCell>{loan.pan}</TableCell>
                    <TableCell>
                      {moment(loan.repaymentDate).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell
                      sx={{
                        position: "sticky",
                        right: 0,
                        backgroundColor: "white",
                        zIndex: 1,
                      }}
                    >
                      {loan.isDisbursed && loan.isActive ? (
                        <Button
                          onClick={() =>
                            handlePaymentSubmit(
                              loan.loanNo,
                              loan.outstandingAmount,
                              loan.repaymentAmount
                            )
                          }
                          sx={{
                            px: 2,
                            py: 0.5,
                            borderRadius: "30px",
                            fontSize: "small",
                            bgcolor: "#F26722",
                            color: "#fff",
                            "&:hover": { bgcolor: "#bf4102" },
                          }}
                        >
                          Repay Now
                        </Button>
                      ) : !loan.isDisbursed && loan.isActive ? (
                        <Chip
                          sx={{
                            px: 2,
                            py: 0.5,
                            borderRadius: "full",
                            fontSize: "small",
                            bgcolor: "error.100",
                            color: "#0c6900",
                          }}
                          label="Active"
                        />
                      ) : (
                        <Chip
                          sx={{
                            px: 2,
                            py: 0.5,
                            borderRadius: "full",
                            fontSize: "small",
                            bgcolor: "error.100",
                            color: "#d10202",
                          }}
                          label="Closed"
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Container maxWidth="sm">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="50vh"
              textAlign="center"
            >
              <Typography variant="h6" color="textSecondary">
                No loans found
              </Typography>
            </Box>
          </Container>
        )}
      </Box>
    </>
  );
};

export default LoanTable;

//   const loans = [
//     {
//       sno: 1,
//       loanNo: "123",
//       loanAmount: 5000,
//       pan: "ASDF3",
//       date: "12/02/2023",
//       status: "Closed",
//     },
//     {
//       sno: 2,
//       loanNo: "453",
//       loanAmount: 3000,
//       pan: "SDSF3",
//       date: "14/06/2023",
//       status: "Closed",
//     },
//     {
//       sno: 3,
//       loanNo: "654",
//       loanAmount: 15000,
//       pan: "OSDF3",
//       date: "16/06/2024",
//       status: "Repay",
//     },
//   ];

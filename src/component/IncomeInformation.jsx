import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, Button, TextField } from "@mui/material";
import { BASE_URL } from "../baseURL";
import { sharedStyles } from "./shared/styles";
import moment from "moment";
import axios from "axios";

const IncomeInformation = () => {
  // State to store income data
  const [income, setIncome] = useState({
    employementType: "",
    monthlyIncome: "",
    obligations: "",
    nextSalaryDate: "",
    incomeMode: "",
    workingSince: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDisable, setIsDisable] = useState(true);
  const [loanError, setLoanError] = useState("");

  // Fetch income details from the backend API
  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/getProfileDetails`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch income data");
        }

        const data = await response.json();

        setIncome({
          employementType: data?.data?.incomeDetails?.employementType,
          monthlyIncome: data?.data?.incomeDetails?.monthlyIncome,
          obligations: data?.data?.incomeDetails?.obligations,
          nextSalaryDate: data?.data?.incomeDetails?.nextSalaryDate, // Assume backend returns a valid date string (e.g., "2023-06-15")
          incomeMode: data?.data?.incomeDetails?.incomeMode,
          workingSince: data?.data?.incomeDetails?.workingSince,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIncomeData();
  }, []);

  // Handle input field changes
  const handleChange = (e) => {
    setIsDisable(false);
    const { name, value } = e.target;

    const numValue = Number(value);
    const maxLoanAmount = Number(income.monthlyIncome) * 0.4;

    if (name === "obligations") {
      if (numValue > maxLoanAmount) {
        setLoanError(
          `Loan amount cannot exceed 40% of Monthly Income (${maxLoanAmount})`
        );
        return;
      } else {
        setLoanError(""); // Clear error if valid
      }
    }

    setIncome((prev) => ({ ...prev, [name]: value }));
  };

  // Handle save operation to update income information in the backend
  const handleSave = async () => {
    setLoading(true);
    try {
      const formattedNextSalaryDate = moment(
        income.nextSalaryDate,
        "YYYY-MM-DD",
        true
      ).isValid()
        ? moment(income.nextSalaryDate).format("YYYY-MM-DD")
        : moment(income.nextSalaryDate, "DD-MM-YYYY").format("YYYY-MM-DD");

      const formattedWorkingSince = moment(
        income.workingSince,
        "YYYY-MM-DD",
        true
      ).isValid()
        ? moment(income.workingSince).format("YYYY-MM-DD")
        : moment(income.workingSince, "DD-MM-YYYY").format("YYYY-MM-DD");

      const updatedIncome = {
        ...income,
        nextSalaryDate: formattedNextSalaryDate,
        workingSince: formattedWorkingSince,
      };

      const response = await axios.patch(
        `${BASE_URL}/addIncomeDetails`,
        updatedIncome,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to update income data");
      }

      setEditMode(false);
      setLoading(false);
      // setIsDisable(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <Typography variant="h6" align="center">
        Loading...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" align="center" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={sharedStyles.containerBox}>
      <Typography variant="h4" sx={sharedStyles.title}>
        Income Information
      </Typography>
      <Divider sx={sharedStyles.divider} />

      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            maxHeight: "600px",
            overflowY: "auto",
            padding: 2,
            borderRadius: "8px",
            backgroundColor: "white",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "white",
            }}
          >
            <tbody>
              {editMode ? (
                <>
                  <tr style={styles.tableRow}>
                    <td style={styles.tableCell}>Employment Type</td>
                    <td style={styles.tableCell}>
                      <TextField
                        fullWidth
                        name="employementType"
                        value={income.employementType}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr style={styles.tableRow}>
                    <td style={styles.tableCell}>Monthly Income</td>
                    <td style={styles.tableCell}>
                      <TextField
                        fullWidth
                        name="monthlyIncome"
                        value={income.monthlyIncome}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr style={styles.tableRow}>
                    <td style={styles.tableCell}>Loan Amount</td>
                    <td style={styles.tableCell}>
                      <TextField
                        fullWidth
                        name="obligations"
                        value={income.obligations}
                        onChange={handleChange}
                        error={!!loanError}
                        helperText={loanError}
                        type="number"
                      />
                    </td>
                  </tr>
                  <tr style={styles.tableRow}>
                    <td style={styles.tableCell}>Next Salary Date</td>
                    <td style={styles.tableCell}>
                      {/* Use type="date" for proper date input */}
                      <TextField
                        fullWidth
                        name="nextSalaryDate"
                        type="date"
                        value={
                          income.nextSalaryDate
                            ? moment(income.nextSalaryDate).format("YYYY-MM-DD")
                            : ""
                        }
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr style={styles.tableRow}>
                    <td style={styles.tableCell}>Working Since</td>
                    <td style={styles.tableCell}>
                      <TextField
                        fullWidth
                        name="workingSince"
                        type="date"
                        value={
                          income.workingSince
                            ? moment(income.workingSince).format("YYYY-MM-DD")
                            : ""
                        }
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr style={styles.tableRow}>
                    <td style={styles.tableCell}>Income Mode</td>
                    <td style={styles.tableCell}>
                      <TextField
                        fullWidth
                        name="incomeMode"
                        value={income.incomeMode}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                </>
              ) : (
                <>
                  <tr style={styles.tableRow}>
                    <td
                      style={{
                        padding: "16px",
                        fontWeight: "bold",
                        width: "40%",
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      Employment Type
                    </td>
                    <td style={styles.tableCell}>{income.employementType}</td>
                  </tr>
                  <tr style={styles.tableRow}>
                    <td
                      style={{
                        padding: "16px",
                        fontWeight: "bold",
                        width: "40%",
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      Monthly Income
                    </td>
                    <td style={styles.tableCell}>{income.monthlyIncome}</td>
                  </tr>
                  <tr style={styles.tableRow}>
                    <td
                      style={{
                        padding: "16px",
                        fontWeight: "bold",
                        width: "40%",
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      Loan Amount
                    </td>
                    <td style={styles.tableCell}>{income.obligations}</td>
                  </tr>
                  <tr style={styles.tableRow}>
                    <td
                      style={{
                        padding: "16px",
                        fontWeight: "bold",
                        width: "40%",
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      Next Salary Date
                    </td>
                    <td style={styles.tableCell}>
                      {moment(income.nextSalaryDate).format("DD-MM-YYYY")}
                    </td>
                  </tr>
                  <tr style={styles.tableRow}>
                    <td
                      style={{
                        padding: "16px",
                        fontWeight: "bold",
                        width: "40%",
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      Working Since
                    </td>
                    <td style={styles.tableCell}>
                      {moment(income.workingSince).format("DD-MM-YYYY")}
                    </td>
                  </tr>
                  <tr style={styles.tableRow}>
                    <td
                      style={{
                        padding: "16px",
                        fontWeight: "bold",
                        width: "40%",
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      Income Mode
                    </td>
                    <td style={styles.tableCell}>{income.incomeMode}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "gray",
                "&:hover": { backgroundColor: "darkgray" },
              }}
              onClick={() => setEditMode((prev) => !prev)}
            >
              {editMode ? "Cancel" : "Edit"}
            </Button>
            {editMode && (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#F26722",
                  "&:hover": { backgroundColor: "#d65e1b" },
                  ml: 2,
                }}
                onClick={handleSave}
                disabled={isDisable}
              >
                Save
              </Button>
            )}
          </Box>
        </Box>
      </div>
    </Box>
  );
};

const styles = {
  tableCell: {
    color: "orange",
    padding: "16px",
    fontWeight: "bold",
    backgroundColor: "white",
  },
  tableRow: {
    borderBottom: "1px solid #e0e0e0",
  },
};

export default IncomeInformation;

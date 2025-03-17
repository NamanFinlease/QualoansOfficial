import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Slider,
  Paper,
  useMediaQuery,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(5000);
  const [loanTenure, setLoanTenure] = useState(1);
  const [interestRate, setInterestRate] = useState(0.5);

  const totalInterest = (loanAmount * interestRate * loanTenure) / 100;
  const totalAmount = loanAmount + totalInterest;

  const pieData = [
    { name: "Principal", value: loanAmount },
    { name: "Interest", value: totalInterest },
  ];
  const COLORS = ["#2E86C1", "#566573"]; // Corporate Look

  const isMobile = useMediaQuery("(max-width: 900px)");

  return (
    <Box
      sx={{
        mt: { xs: "15%", md: "5%" },

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 7,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background:
            "linear-gradient(270deg, rgba(0,255,255,0.2), rgba(102,0,255,0.1), #fff38739)",
          width: "95%",
          borderRadius: 3,
          mt: 4,
          boxShadow: 3,
          p: 3,
        }}
      >
        <Typography
          variant="h4"
          color="navy"
          mb={2}
          sx={{ fontWeight: 700, textAlign: "center" }}
        >
          Personal Loan Calculator
        </Typography>
        <Typography
          textAlign="center"
          mb={4}
          sx={{ paddingX: 6, fontSize: "1.2rem" }}
        >
          Calculate your loan effortlessly with our user-friendly platform.
          Adjust amounts, tenure, and interest rates to see the total cost and
          make informed financial decisions.{" "}
        </Typography>

        <Grid
          container
          spacing={3}
          direction={isMobile ? "column" : "row"}
          alignItems="center"
        >
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                width: "100%",
                p: { xs: 10, md: 3 },
                bgcolor: "#ffffff7f",
                borderRadius: 2,
              }}
            >
              {/* Loan Amount Slider */}
              <Typography variant="h6">Loan Amount</Typography>
              <Slider
                value={loanAmount}
                min={5000}
                max={100000}
                step={1000}
                marks={[
                  { value: 5000, label: "5K" },
                  { value: 20000, label: "20K" },
                  { value: 40000, label: "40K" },
                  { value: 60000, label: "60K" },
                  { value: 80000, label: "80K" },
                  { value: 100000, label: "1L" },
                ]}
                onChange={(e, val) => setLoanAmount(val)}
                valueLabelDisplay="auto"
                sx={{
                  height: 20, // Increased height
                  color: "#757575", // Gray color
                  marginTop: "20px", // Moves the entire slider down
                  "& .MuiSlider-thumb": {
                    height: 25,
                    width: 20,
                    backgroundColor: "#2E86C1", // Thumb color
                  },
                  "& .MuiSlider-track": {
                    height: 15,
                    backgroundColor: "#2E86C1", // Track color
                  },
                  "& .MuiSlider-rail": {
                    height: 12,
                    backgroundColor: "#9E9E9E", // Rail color
                  },
                  "& .MuiSlider-mark": {
                    height: 15, // Keep it visible like a vertical line
                    width: 2, // Make it a thin vertical line
                    backgroundColor: "#333", // Dark gray for marks
                    marginTop: "4px", // Move marks slightly down
                  },
                  "& .MuiSlider-markLabel": {
                    fontSize: "14px", // Keep original size
                    marginTop: "10px", // Move labels down slightly
                  },
                }}
              />

              <Typography sx={{ color: "#2E86C1" }}>
                ₹{loanAmount.toLocaleString()}
              </Typography>
              {/* Loan Tenure Slider */}
              <Typography variant="h6" mt={3}>
                Loan Tenure (Days)
              </Typography>
              <Slider
                value={loanTenure}
                min={1}
                max={90}
                step={1}
                marks={[
                  { value: 1, label: "1" },
                  { value: 15, label: "15" },
                  { value: 30, label: "30" },
                  { value: 45, label: "45" },
                  { value: 60, label: "60" },
                  { value: 75, label: "75" },
                  { value: 90, label: "90" },
                ]}
                onChange={(e, val) => setLoanTenure(val)}
                valueLabelDisplay="auto"
                sx={{
                  height: 20, // Increased height
                  color: "#757575", // Gray color
                  marginTop: "20px", // Moves the entire slider down
                  "& .MuiSlider-thumb": {
                    height: 25,
                    width: 20,
                    backgroundColor: "#2E86C1", // Thumb color
                  },
                  "& .MuiSlider-track": {
                    height: 15,
                    backgroundColor: "#2E86C1", // Track color
                  },
                  "& .MuiSlider-rail": {
                    height: 12,
                    backgroundColor: "#9E9E9E", // Rail color
                  },
                  "& .MuiSlider-mark": {
                    height: 15, // Keep it visible like a vertical line
                    width: 2, // Make it a thin vertical line
                    backgroundColor: "#333", // Dark gray for marks
                    marginTop: "4px", // Move marks slightly down
                  },
                  "& .MuiSlider-markLabel": {
                    fontSize: "14px", // Keep original size
                    marginTop: "10px", // Move labels down slightly
                  },
                }}
              />
              <Typography sx={{ color: "#2E86C1" }}>
                {loanTenure} Days
              </Typography>
              {/* Interest Rate Slider */}
              <Typography variant="h6" mt={3}>
                Interest Rate
              </Typography>
              <Slider
                value={interestRate}
                min={0.5}
                max={2.75}
                step={0.1}
                marks={[
                  { value: 0.5, label: "0.5%" },
                  { value: 1, label: "1%" },
                  { value: 1.5, label: "1.5%" },
                  { value: 2, label: "2%" },
                  // { value: 2.5, label: "2.5%" },
                  { value: 2.75, label: "2.75%" },
                ]}
                onChange={(e, val) => setInterestRate(val)}
                valueLabelDisplay="auto"
                sx={{
                  height: 20, // Increased height
                  color: "#757575", // Gray color
                  marginTop: "20px", // Moves the entire slider down
                  "& .MuiSlider-thumb": {
                    height: 25,
                    width: 20,
                    backgroundColor: "#2E86C1", // Thumb color
                  },
                  "& .MuiSlider-track": {
                    height: 15,
                    backgroundColor: "#2E86C1", // Track color
                  },
                  "& .MuiSlider-rail": {
                    height: 12,
                    backgroundColor: "#9E9E9E", // Rail color
                  },
                  "& .MuiSlider-mark": {
                    height: 15, // Keep it visible like a vertical line
                    width: 2, // Make it a thin vertical line
                    backgroundColor: "#333", // Dark gray for marks
                    marginTop: "4px", // Move marks slightly down
                  },
                  "& .MuiSlider-markLabel": {
                    fontSize: "14px", // Keep original size
                    marginTop: "10px", // Move labels down slightly
                  },
                }}
              />
              <Typography sx={{ color: "#2E86C1" }}>
                {interestRate.toFixed(2)}%
              </Typography>
            </Box>
          </Grid>

          {/* Pie Chart Section */}
          <Grid item xs={12} md={5} sx={{ paddingX: { xs: 22, sm: 3, md: 0 } }}>
            <Box
              sx={{
                height: 532,
                width: { xs: "200%", md: "100%" },
                bgcolor: "#ffffff7f",
                paddingX: { xs: 2, sm: 3 }, // Padding for small screens
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
        </Grid>

        {/* Loan Summary */}
        <Grid container spacing={3} justifyContent="center" mt={3}>
          {[
            { label: "Loan Amount", value: `₹${loanAmount.toLocaleString()}` },
            { label: "Total Interest", value: `₹${totalInterest.toFixed(2)}` },
            {
              label: "Total Amount",
              value: `₹${totalAmount.toLocaleString()}`,
            },
            { label: "Total Days", value: `${loanTenure} Days` },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                sx={{
                  p: 2,
                  textAlign: "center",
                  boxShadow: 3,
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6">{item.label}</Typography>
                <Typography>{item.value}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default LoanCalculator;

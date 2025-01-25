// import React, { useState } from "react";
// import {
//   Modal,
//   Box,
//   TextField,
//   FormControl,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   Button,
//   Typography,
//   CircularProgress,
//   IconButton,
// } from "@mui/material";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// import { BASE_URL } from "../../baseURL";
// import axios from "axios";
// import Swal from "sweetalert2";

// const StepBox = ({
//   icon,
//   title,
//   description,
//   disabled,
//   completed,
//   onClick,
// }) => (
//   <Box
//     onClick={!disabled && !completed ? onClick : null}
//     sx={{
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "flex-start",
//       justifyContent: "center",
//       padding: 2,
//       borderColor:
//         // completed ? "green" :
//         disabled ? "#1c1c1c" : "#F26722",
//       borderRadius: 3,
//       margin: 1,
//       width: "25%",
//       minWidth: 200,
//       cursor: disabled || completed ? "not-allowed" : "pointer",
//       textAlign: "left",
//       background:
//         //completed ? "linear-gradient(45deg, #28a745, #218838)":
//         disabled ? "#d9d9d9" : "#F26722",
//       color:
//         // completed ||
//         !disabled ? "white" : "#1c1c1c",
//       "@media (max-width: 600px)": {
//         width: "80%",
//         margin: "auto",
//       },
//     }}
//   >
//     <IconButton
//       sx={{
//         color: completed ? "white" : disabled ? "#1c1c1c" : "white",
//         ml: 1,
//       }}
//     >
//       {completed ? (
//         <i className="fas fa-check-circle" style={{ fontSize: "24px" }}></i> // Green tick icon
//       ) : (
//         icon
//       )}
//     </IconButton>
//     <Box sx={{ ml: 2, flexGrow: 1 }}>
//       <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
//       <Typography variant="body2">{description}</Typography>
//     </Box>
//   </Box>
// );

// const IncomeInfoForm = ({ onComplete, disabled }) => {
//   const [openModal, setOpenModal] = useState(false);
//   const [isFetching, setIsFetching] = useState(false);
//   const [formValues, setFormValues] = useState({
//     employementType: "",
//     monthlyIncome: "",
//     obligations: "",
//     nextSalaryDate: "",
//     incomeMode: "",
//   });
//   const [isStepCompleted, setIsStepCompleted] = useState(false);
//   const [error, setError] = useState("");

//   const handleFormChange = (key, value) => {
//     setFormValues((prev) => ({ ...prev, [key]: value }));
//     if (error) setError(""); // Clear error on input change
//   };

//   const handleSubmit = async () => {
//     const {
//       employementType,
//       monthlyIncome,
//       obligations,
//       nextSalaryDate,
//       incomeMode,
//     } = formValues;

//     if (
//       !employementType ||
//       !monthlyIncome ||
//       !obligations ||
//       !nextSalaryDate ||
//       !incomeMode
//     ) {
//       setError("Please fill out all fields.");
//       return;
//     }

//     setIsFetching(true);
//     try {
//       const response = await axios.patch(
//         `${BASE_URL}/api/user/addIncomeDetails`,
//         {
//           employementType,
//           monthlyIncome,
//           obligations,
//           nextSalaryDate,
//           incomeMode,
//         },
//         {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: true,
//         }
//       );
//       if (response.status === 200) {
//         Swal.fire("Success", "Income details added successfully!", "success");
//         setIsStepCompleted(true); // Mark step as completed
//         setOpenModal(false);
//         console.log("formvalue ,<>><><> ", formValues);
//         if (onComplete) onComplete({ formValues });
//       } else {
//         setError(response?.data?.message || "Failed to add income details.");
//       }
//     } catch (error) {
//       setError(
//         error.message || "An error occurred while adding income details."
//       );
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   return (
//     <>
//       <StepBox
//         icon={<AccountBalanceWalletIcon />}
//         title="Income Information"
//         description="Please provide your income details."
//         onClick={() => setOpenModal(true)}
//         disabled={disabled || isStepCompleted}
//         completed={isStepCompleted}
//       />

//       <Modal open={openModal} onClose={() => setOpenModal(false)}>
//         <Box
//           sx={{
//             backgroundColor: "white",
//             borderRadius: 4,
//             // boxShadow: 24,
//             padding: 3,
//             maxWidth: 400,
//             margin: "auto",
//             marginTop: "5%",
//             mb: "20%",
//             overflowY: "auto", // Enable vertical scrolling
//             maxHeight: "90vh", // Set the maximum height
//           }}
//         >
//           <Typography sx={{ marginBottom: 2 }}>Income Information</Typography>

//           {/* Employment Type */}
//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <TextField
//               select
//               label="Employee Type"
//               value={formValues.employementType}
//               onChange={(e) =>
//                 handleFormChange("employementType", e.target.value)
//               }
//               fullWidth
//               required
//               variant="outlined"
//               InputLabelProps={{
//                 shrink: true,
//                 style: { color: "#4D4D4E" },
//               }}
//               disabled={isStepCompleted}
//             >
//               <option value="SALARIED">Salaried</option>
//               <option value="SELF_EMPLOYED">Self-Employed</option>
//             </TextField>
//           </FormControl>

//           {/* Monthly Income */}
//           <TextField
//             label="Monthly Income"
//             type="number"
//             value={formValues.monthlyIncome}
//             onChange={(e) => handleFormChange("monthlyIncome", e.target.value)}
//             fullWidth
//             sx={{ marginBottom: 2 }}
//             required
//             variant="outlined"
//             InputLabelProps={{
//               shrink: true,
//               style: { color: "#4D4D4E" },
//             }}
//             disabled={isStepCompleted}
//           />

//           {/* Obligations */}
//           <TextField
//             label="Loan Amount"
//             type="number"
//             value={formValues.obligations}
//             onChange={(e) => handleFormChange("obligations", e.target.value)}
//             fullWidth
//             sx={{ marginBottom: 2 }}
//             required
//             variant="outlined"
//             InputLabelProps={{
//               shrink: true,
//               style: { color: "#4D4D4E" },
//             }}
//             disabled={isStepCompleted}
//           />

//           {/* Next Salary Date */}
//           <TextField
//             label="Next Salary Date"
//             type="date"
//             value={formValues.nextSalaryDate}
//             onChange={(e) => handleFormChange("nextSalaryDate", e.target.value)}
//             fullWidth
//             sx={{ marginBottom: 2 }}
//             required
//             variant="outlined"
//             InputLabelProps={{
//               shrink: true,
//               style: { color: "#4D4D4E" },
//             }}
//             disabled={isStepCompleted}
//           />

//           {/* Income Mode */}
//           <Typography
//             variant="body1"
//             sx={{ fontWeight: "bold", marginBottom: 2 }}
//           >
//             Mode of Income Received
//           </Typography>
//           <RadioGroup
//             value={formValues.incomeMode}
//             onChange={(e) => handleFormChange("incomeMode", e.target.value)}
//             row
//           >
//             <FormControlLabel value="BANK" control={<Radio />} label="Bank" />
//             <FormControlLabel
//               value="CHEQUE"
//               control={<Radio />}
//               label="Cheque"
//             />
//             <FormControlLabel value="CASH" control={<Radio />} label="Cash" />
//             <FormControlLabel
//               value="OTHERS"
//               control={<Radio />}
//               label="Others"
//             />
//           </RadioGroup>

//           {error && <Typography color="error">{error}</Typography>}

//           {/* Actions */}
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               marginTop: 2,
//             }}
//           >
//             <Button
//               variant="outlined"
//               color="secondary"
//               onClick={() => setOpenModal(false)}
//               sx={{ color: "#1c1c1c", borderColor: "#1c1c1c" }}
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="contained"
//               onClick={handleSubmit}
//               disabled={isFetching || isStepCompleted}
//               sx={{ backgroundColor: "#F26722", color: "white" }}
//             >
//               {isFetching ? <CircularProgress size={24} /> : "Submit"}
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default IncomeInfoForm;

import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { BASE_URL } from "../../baseURL";
import axios from "axios";
import Swal from "sweetalert2";

const StepBox = ({
  icon,
  title,
  description,
  disabled,
  completed,
  onClick,
}) => (
  <Box
    onClick={!disabled && !completed ? onClick : null}
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: 2,
      borderColor: disabled ? "#1c1c1c" : "#F26722",
      borderRadius: 3,
      margin: 1,
      width: "25%",
      minWidth: 200,
      cursor: disabled ? "not-allowed" : "pointer",
      textAlign: "left",
      background: disabled ? "#d9d9d9" : "#F26722",
      color: !disabled ? "white" : "#1c1c1c",
      "@media (max-width: 600px)": {
        width: "80%",
        margin: "auto",
      },
    }}
  >
    <IconButton
      sx={{
        color: completed ? "white" : disabled ? "#1c1c1c" : "white",
        ml: 1,
      }}
    >
      {completed ? (
        <i className="fas fa-check-circle" style={{ fontSize: "24px" }}></i>
      ) : (
        icon
      )}
    </IconButton>
    <Box sx={{ ml: 2, flexGrow: 1 }}>
      <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
      <Typography variant="body2">{description}</Typography>
    </Box>
  </Box>
);

const IncomeInfoForm = ({ onComplete, disabled }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [formValues, setFormValues] = useState({
    employementType: "",
    monthlyIncome: "",
    obligations: "",
    nextSalaryDate: "",
    incomeMode: "",
  });
  const [error, setError] = useState("");

  const handleFormChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    if (error) setError("");
  };

  const handleSubmit = async () => {
    const {
      employementType,
      monthlyIncome,
      obligations,
      nextSalaryDate,
      incomeMode,
    } = formValues;

    if (
      !employementType ||
      !monthlyIncome ||
      !obligations ||
      !nextSalaryDate ||
      !incomeMode
    ) {
      setError("Please fill out all fields.");
      return;
    }

    setIsFetching(true);
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/user/addIncomeDetails`,
        {
          employementType,
          monthlyIncome,
          obligations,
          nextSalaryDate,
          incomeMode,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        Swal.fire("Success", "Income details added successfully!", "success");
        setOpenModal(false);
        if (onComplete) onComplete({ formValues });
      } else {
        setError(response?.data?.message || "Failed to add income details.");
      }
    } catch (error) {
      setError(
        error.message || "An error occurred while adding income details."
      );
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <>
      <StepBox
        icon={<AccountBalanceWalletIcon />}
        title="Income Information"
        description="Please provide your income details."
        onClick={() => setOpenModal(true)}
        disabled={disabled} // Do not rely on isStepCompleted
        completed={false} // Always false to keep the box clickable
      />

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 4,
            padding: 3,
            maxWidth: 400,
            margin: "auto",
            marginTop: "5%",
            mb: "20%",
            overflowY: "auto",
            maxHeight: "90vh",
          }}
        >
          <Typography sx={{ marginBottom: 2 }}>Income Information</Typography>

          {/* Employment Type */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
              select
              label="Employee Type"
              value={formValues.employementType}
              onChange={(e) =>
                handleFormChange("employementType", e.target.value)
              }
              fullWidth
              required
              variant="outlined"
              InputLabelProps={{
                shrink: true,
                style: { color: "#4D4D4E" },
              }}
            >
              <option value="SALARIED">Salaried</option>
              <option value="SELF_EMPLOYED">Self-Employed</option>
            </TextField>
          </FormControl>

          {/* Other Fields */}
          <TextField
            label="Monthly Income"
            type="number"
            value={formValues.monthlyIncome}
            onChange={(e) => handleFormChange("monthlyIncome", e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
            required
            variant="outlined"
          />

          <TextField
            label="Loan Amount"
            type="number"
            value={formValues.obligations}
            onChange={(e) => handleFormChange("obligations", e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
            required
            variant="outlined"
          />

          {/* <TextField
            label="Next Salary Date"
            type="date"
            value={formValues.nextSalaryDate}
            onChange={(e) => handleFormChange("nextSalaryDate", e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
            required
            variant="outlined"
          /> */}
          {/* Next Salary Date */}
          <TextField
            label="Next Salary Date"
            type="date"
            value={formValues.nextSalaryDate}
            onChange={(e) => handleFormChange("nextSalaryDate", e.target.value)}
            sx={{ marginBottom: 2 }}
            required
            variant="outlined"
            InputLabelProps={{
              shrink: true,
              style: { color: "#4D4D4E" },
            }}
            inputProps={{
              min: new Date().toISOString().split("T")[0], // Set the minimum date to today
            }}
            disabled={onComplete}
          />

          <Typography variant="body1" sx={{ fontWeight: "bold", mb: 2 }}>
            Mode of Income Received
          </Typography>
          <RadioGroup
            value={formValues.incomeMode}
            onChange={(e) => handleFormChange("incomeMode", e.target.value)}
            row
          >
            <FormControlLabel value="BANK" control={<Radio />} label="Bank" />
            <FormControlLabel
              value="CHEQUE"
              control={<Radio />}
              label="Cheque"
            />
            <FormControlLabel value="CASH" control={<Radio />} label="Cash" />
            <FormControlLabel
              value="OTHERS"
              control={<Radio />}
              label="Others"
            />
          </RadioGroup>

          {error && <Typography color="error">{error}</Typography>}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isFetching}
              sx={{ backgroundColor: "#F26722", color: "white" }}
            >
              {isFetching ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default IncomeInfoForm;

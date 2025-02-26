import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { format } from "date-fns"; // Import date-fns format function

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import moment from "moment";
import { BASE_URL } from "../../baseURL";
import Swal from "sweetalert2";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";


const Employment = ({ onComplete, disabled, prefillData, isUploaded }) => {
  const [openModal, setOpenModal] = useState(false);
  let defaultvalue = {
    workFrom: "",
    companyName: "",
    companyType: "",
    designation: "",
    officeEmail: "",
    employedSince: dayjs(),
    officeAddrress: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  
  }

  // console.log('empty object',!isEmptyObject(prefillData))
  const [formValues, setFormValues] = useState((prefillData && Object.keys(prefillData).length > 0) ?prefillData:defaultvalue );
  const [addressValues, setAddressValues] = useState({});
  const [stepData, setStepData] = useState({});
  const [stepCompleted, setStepCompleted] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isLoading, setIsLoading] = useState(false);
  const [isEmploymentDetailsSaved, setIsEmploymentDetailsSaved] = useState(false);

  const today = new Date();

  console.log('form values',formValues)
  const openEmploymentModal = () => {
    if (disabled) return;

    const fields = [
      {
        label: "Are you working from Office or Home?",
        name: "workFrom",
        type: "select",
        options: ["OFFICE", "HOME"],
      },
      { label: "Company Name", name: "companyName", type: "text" },
      { label: "Company Type", name: "companyType", type: "text" },
      { label: "Your Designation", name: "designation", type: "text" },
      { label: "Office Email", name: "officeEmail", type: "email" },
      { label: "Employed Since", name: "employedSince", type: "date" },
      { label: "Office Address", name: "officeAddrress", type: "text" },
      { label: "Landmark", name: "landmark", type: "text" },
      { label: "City", name: "city", type: "text" },
      { label: "State", name: "state", type: "text" },
      { label: "Pincode", name: "pincode", type: "text" },
    ];

    setStepData({
      title: "Information about the Company",
      fields,
      onSubmit: handleEmploymentSubmit,
    });
    setOpenModal(true);
  };

  const handlePincodeChange = async (e) => {
    const value = e.target.value;

    setFormValues({ ...formValues, pincode: value });
    // if (/^\d{0,6}$/.test(value)) {

    //   if (value.length === 6) {
    //     try {
    //       const response = await fetch(
    //         `https://api.postalpincode.in/pincode/${value}`
    //       );
    //       const data = await response.json();

    //       if (data[0].Status === "Success") {
    //         const { Block, State } = data[0].PostOffice[0];
    //         setFormValues((prev) => ({
    //           ...prev,
    //           city: Block,
    //           state: State,
    //         }));
    //       } else {
    //         setFormValues((prev) => ({
    //           ...prev,
    //           city: "",
    //           state: "",
    //         }));
    //         alert("Please enter a valid pincode.");
    //       }
    //     } catch (error) {
    //       alert(
    //         "An error occurred while fetching data. Please try again later."
    //       );
    //     }
    //   } else {
    //     setFormValues((prev) => ({
    //       ...prev,
    //       city: "",
    //       state: "",
    //     }));
    //   }
    // } else {
    //   setFormValues({ ...formValues, pincode: "", city: "", state: "" });
    // }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const trimedValues = value.trimStart();
    if (stepData.fields.some((field) => field.name === name)) {
      setFormValues({ ...formValues, [name]: trimedValues });
    } else {
      setAddressValues({ ...addressValues, [name]: trimedValues });
    }
  };

  const handleEmploymentSubmit = async () => {
    try {
      const trimmedFormValues = Object.fromEntries(
        Object.entries(formValues).map(([key, value]) => [key, value.trim()])
      );

      const formattedEmployedSince = format(
        new Date(
          trimmedFormValues.employedSince.split("-").reverse().join("-")
        ),
        "yyyy-MM-dd"
      ); // Convert to ISO format

      if (
        !trimmedFormValues.workFrom ||
        !trimmedFormValues.companyName ||
        !trimmedFormValues.companyType ||
        !trimmedFormValues.designation ||
        !trimmedFormValues.officeEmail ||
        !trimmedFormValues.employedSince ||
        !trimmedFormValues.designation
      ) {
        alert("All fields are required.");
        // return;
      }

      // Validate and Format Date
      // let formattedEmployedSince;
      // if (moment(formValues.employedSince, "YYYY-MM-DD", true).isValid()) {
      //   formattedEmployedSince = moment(formValues.employedSince).toISOString();
      // } else {
      //   alert("Invalid Date Format. Please enter a valid date.");
      //   return;
      // }

      const apiData = {
        ...trimmedFormValues,
        ...addressValues,
        employedSince: formattedEmployedSince, // Ensure correct date format
      };

      // const formattedEmployedSince = moment(
      //   formValues.employedSince,
      //   "YYYY-MM-DD",
      //   true
      // ).isValid()
      //   ? moment(formValues.employedSince).toISOString() // Convert to ISO 8601 format
      //   : moment(formValues.employedSince, "DD-MM-YYYY").toISOString();

      // const apiData = {
      //   ...formValues,
      //   ...addressValues,
      //   employedSince: formattedEmployedSince, // Ensure correct date format
      // };

      // const apiData = { ...formValues, ...addressValues };


      const response = await axios.patch(
        `${BASE_URL}/addEmploymentInfo`,
        apiData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );


      if (response.status === 200) {
        Swal.fire({
          title: "Employment information submitted successfully!",
          width: window.innerWidth <= 600 ? "90%" : "30%", // 90% width on mobile, 30% on desktop
          padding: window.innerWidth <= 600 ? "1rem" : "2rem", // Adjust padding for mobile
          confirmButtonColor: "#FFA500", // Button color (orange)
          customClass: {
            popup: "custom-popup-responsive",
            confirmButton: "confirm-button-orange",
          },
          didOpen: () => {
            const popup = document.querySelector(".swal2-popup");

            if (popup) {
              // Adjust popup styling for mobile
              popup.style.marginTop =
                window.innerWidth <= 600 ? "20px" : "50px";
              popup.style.fontSize = window.innerWidth <= 600 ? "14px" : "16px"; // Smaller font on mobile
            }
          },
        });

        setStepCompleted(true);
        setOpenModal(false);
        setIsEmploymentDetailsSaved(true);

        if (onComplete) {
          onComplete(apiData); // Pass data back to the parent
        }
      } else {
        // Swal.fire("Error submitting employment information.");

        alert(error.response.data.message);
        setOpenModal(false);
      }
    } catch (error) {
      alert(error.response.data.message);
      setOpenModal(false);
    }
  };

  const handleModalClick = async () => {
    openEmploymentModal(true);
    setIsLoading(true);

    try {
      const getDashboardDetailsResponse = await axios.get(
        `${BASE_URL}/getDashboardDetails`,
        {
          withCredentials: true,
        }
      );


      if (getDashboardDetailsResponse.status === 200) {
        setIsLoading(false);

        // Safely access employmentInfo to avoid destructuring errors
        const { isEmploymentDetailsSaved } =
          getDashboardDetailsResponse.data || {};

        // Ensure we have a valid boolean value for isEmploymentDetailsSaved
        if (typeof isEmploymentDetailsSaved !== "boolean") {
          console.error("Invalid response format for isEmploymentDetailsSaved");
          setStepCompleted(false);
        } else {
          setStepCompleted(isEmploymentDetailsSaved);
        }


        // if (isEmploymentDetailsSaved) {
        const getProfileDetailsResponse = await axios.get(
          `${BASE_URL}/getApplicationDetails?applicationStatus=employeeDetails`,
          {
            withCredentials: true,
          }
        );


        const EmpData = getProfileDetailsResponse?.data?.data;

        console.log('form valuesssssss', formValues.employedSince,formValues)
        console.log(EmpData)

        // Update form values based on the fetched data
        setFormValues({
          workFrom: EmpData?.workFrom || "",
          companyName: EmpData?.companyName || "",
          companyType: EmpData?.companyType || "",
          designation: EmpData?.designation || "",
          officeEmail: EmpData?.officeEmail || "",
          employedSince: dayjs(EmpData?.employedSince),
          officeAddrress: EmpData?.officeAddrress || "",
          landmark: EmpData?.landmark || "",
          city: EmpData?.city || "",
          state: EmpData?.state || "",
          pincode: EmpData?.pincode || "",
        });
        // }
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching dashboard details:", error);
    }
  };


  const handleDate = (date) => {
    console.log('dayjs', dayjs(date).format("YYYY/MM/DD"))  
    setFormValues(prev => ({ ...prev, employedSince: dayjs(date).format("YYYY/MM/DD") }))
    setSelectedDate(date ? dayjs(date) : null)
  }

  useEffect(() => {
    if (prefillData) {
      setFormValues({
        ...prefillData,
        employedSince: dayjs(prefillData?.employedSince).isValid() 
          ? dayjs(prefillData?.employedSince) 
          : dayjs(),
      });
      setStepCompleted(true);
    }
  }, [prefillData]);

  // useEffect(() => {
  //   if (prefillData) {
  //     console.log(prefillData)
  //     setFormValues({...prefillData,employedSince:dayjs( prefillData?.employedSince)});
  //     setStepCompleted(true);
  //   }
  // }, [prefillData]);

  // useEffect(() => {
  //   console.log("Updated Step Completed:", stepCompleted); // Check if state updates correctly
  // }, [stepCompleted]);

  return (
    <>
      <Box
        // sx={{
        //   display: "flex",
        //   flexDirection: "column",
        //   alignItems: "flex-start",
        //   padding: 3,
        //   border: "1px solid #ddd",
        //   borderRadius: 3,
        //   background: disabled
        //     ? "#ccc"
        //     : stepCompleted
        //     ? "green" // Change the background color to green when the step is completed
        //     : "linear-gradient(45deg, #4D4D4E, orange)",
        //   cursor: disabled ? "not-allowed" : "pointer", // Disable the cursor if disabled
        //   height: 150,
        //   width: "1o0%",
        //   maxWidth: 350,
        //   transition: "all 0.3s",
        //   boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        //   "&:hover": {
        //     backgroundColor: disabled
        //       ? "#ccc"
        //       : stepCompleted
        //       ? "green" // Keep the green background on hover if the step is completed
        //       : "orange",
        //     color: disabled ? "white" : "black",
        //     transform: disabled ? "none" : "scale(1.03)",
        //   },
        // }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 2,
          borderColor:
            // completed ? "green" :
            disabled ? "#1c1c1c" : "#F26722",
          borderRadius: 3,
          margin: 1,
          width: "25%",
          minWidth: 200,
          cursor: disabled ? "not-allowed" : "pointer",
          textAlign: "left",
          background:
            //  completed
            //   ? "linear-gradient(45deg, #28a745, #218838)" // Green gradient when step is complete
            //   :
            disabled ? "#d9d9d9" : "#F26722",
          color:
            //  completed ||
            !disabled ? "white" : "#1c1c1c",
          "@media (max-width: 600px)": {
            width: "80%",
            margin: "auto",
          },
        }}
        onClick={!disabled && handleModalClick}
      >
        <IconButton
          sx={{
            marginBottom: 1,
            color: "white",
            "&:hover": {
              backgroundColor: "white",
            },
          }}
          disabled={disabled}
        >
          {stepCompleted || isUploaded || isEmploymentDetailsSaved ? (
            <CheckCircleIcon sx={{ color: "green" }} />
          ) : (
            <AccountBalanceIcon />
          )}
        </IconButton>
        <Typography
          sx={{
            fontWeight: "bold",
            marginBottom: 1,
            color: "white",
          }}
        >
          Employment Information
        </Typography>
        <Typography variant="body2" sx={{ color: "white" }}>
          Provide details about your employment.
        </Typography>
      </Box>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>{stepData.title}</DialogTitle>
        <DialogContent>
          {stepData.fields
            ?.filter(
              (field) =>
                !["pincode", "city", "state", "employedSince"].includes(
                  field.name
                )
            ) // Exclude pincode, city, and state if present in stepData.fields
            .map((field, index) => (
              <Box key={index} sx={{ marginBottom: 2 }}>
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    onChange={handleInputChange}
                    value={formValues[field.name] || ""}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                    }}
                    required
                  >
                    <option value="" disabled selected>
                      {field.label}
                    </option>
                    {field.options?.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <TextField
                    fullWidth
                    name={field.name}
                    label={field.label}
                    value={formValues[field.name] || ""}
                    onChange={handleInputChange}
                    variant="outlined"
                    margin="normal"
                    type={field.type}
                    required
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ max: new Date().toISOString().split("T")[0] }}
                  />
                )}
              </Box>
            ))}

          {/* Editable Pincode, City, and State */}

          {/* <TextField
            fullWidth
            name="employedSince"
            label="Employed Since"
            type="date"
            value={formValues?.employedSince || ""}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            sx={{ marginBottom: 2 }}
            required
          />
          */}
          {console.log('selected date', new Date(selectedDate))}

          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
            <DatePicker
              label="Employed Since"
              value={ dayjs(formValues?.employedSince) }
              onChange={handleDate}
              sx={{
                paddingBottom: "20px !important",
                minWidth: "100%",
                '& .MuiSvgIcon-root':{
                  fill: "#000000",
                },
              }}
              slotProps={{
                textField: { format: "DD/MM/YYYY" },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    ...params.inputProps,
                    min: today,
                  }}
                />
              )}
              maxDate={dayjs(today)}
            />
          </LocalizationProvider>
          <TextField
            label="Pincode"
            value={formValues?.pincode || ""}
            onChange={handlePincodeChange}
            fullWidth
            sx={{ marginBottom: 2 }}
            required
          />
          <TextField
            label="City"
            value={formValues?.city || ""}
            onChange={handleInputChange} // Make city editable
            name="city"
            fullWidth
            sx={{ marginBottom: 2 }}
            required
          />
          <TextField
            label="State"
            value={formValues?.state || ""}
            onChange={handleInputChange} // Make state editable
            name="state"
            fullWidth
            sx={{ marginBottom: 2 }}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleEmploymentSubmit}
            color="primary"
            sx={{ backgroundColor: "#F26722", color: "white" }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Employment;
import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Box, Button } from "@mui/material";

const MySwal = withReactContent(Swal);

const PersonalInfoPage = () => {
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    dob: "",
    gender: "",
    maritalStatus: "",
  });

  const handlePersonalInfoSubmit = async (formData) => {
    try {
      // Simulate an API call
      const response = await fetch(`${BASE_URL}/api.example.com/personal-info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        MySwal.fire({
          title: "Success!",
          text: "Personal information saved successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save personal information.");
      }
    } catch (error) {
      MySwal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
  };

  const showFormModal = () => {
    MySwal.fire({
      title: "Share Your Details",
      html: `
        <form id="personal-info-form">
          <input type="text" id="fullName" class="swal2-input" placeholder="Full Name" required />
          <input type="email" id="email" class="swal2-input" placeholder="Email ID" required />
          <input type="date" id="dob" class="swal2-input" required />
          <select id="gender" class="swal2-input" required>
            <option value="" disabled selected>Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <select id="maritalStatus" class="swal2-input" required>
            <option value="" disabled selected>Marital Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
          </select>
        </form>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Submit",
      preConfirm: () => {
        const fullName = Swal.getPopup().querySelector("#fullName").value;
        const email = Swal.getPopup().querySelector("#email").value;
        const dob = Swal.getPopup().querySelector("#dob").value;
        const gender = Swal.getPopup().querySelector("#gender").value;
        const maritalStatus = Swal.getPopup().querySelector("#maritalStatus").value;

        if (!fullName || !email || !dob || !gender || !maritalStatus) {
          Swal.showValidationMessage("Please fill out all fields.");
          return false;
        }

        return { fullName, email, dob, gender, maritalStatus };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handlePersonalInfoSubmit(result.value);
      }
    });
  };

  return (
    <Box sx={{ padding: 4, textAlign: "center" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={showFormModal}
        sx={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Open Personal Info Form
      </Button>
    </Box>
  );
};

export default PersonalInfoPage;

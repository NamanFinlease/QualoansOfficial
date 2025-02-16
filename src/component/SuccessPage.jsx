import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Swal.fire({
      title: "Success!",
      text: "Thank you for applying for a loan. Our executive will call you or get back to you within 24 hours.",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/"); // Redirect to homepage or any other page
    });
  }, [navigate]);

  return null; // No UI needed since Swal handles it
};

export default SuccessPage;

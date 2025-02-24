import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Grid, Typography, Box } from "@mui/material";
import Swal from "sweetalert2";
import aboutImage from "../assets/image/Contact-Us.jpg";

const AboutUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    message: "",
    source: "website", // Default source
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await axios.post(
        "https://api.qualoan.com/api/leads/contactUs",
        formData
      );

      setResponseMessage("✅ Message sent successfully!");
      setFormData({
        fullName: "",
        email: "",
        phoneNo: "",
        message: "",
        source: "website",
      }); // Reset form

      // Show success popup
      Swal.fire({
        icon: "success",
        title: "Thank You!",
        text: "We will get in touch with you soon.",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.log(error);
      setResponseMessage(
        `❌ Error sending message.${error.response.data.message} `
      );
      console.error(
        "API Error:",
        error.response ? error.response.data : error.message
      );
    }

    setLoading(false);
  };

  return (
    <Box sx={{ background: "#f9f9f9", minHeight: "100vh", padding: "40px" }}>
      {/* Banner Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "20vh", md: "60vh" },
          overflow: "hidden",
          borderRadius: "20px",
          mb: 5,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          component="img"
          src={aboutImage}
          alt="About Us Banner"
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Content Section */}
      <Box sx={{ marginTop: { xs: 2, md: 10 }, padding: "0px" }}>
        <Grid container spacing={4}>
          {/* Left Section */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#444", mb: 2 }}
            >
              We are always ready to help you and answer your questions
            </Typography>
            <Typography sx={{ color: "#555", fontSize: "18px", mb: 3 }}>
              Your satisfaction is our priority, and we strive to offer prompt
              and reliable support at all times.
            </Typography>

            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "18px",
                color: "#FF5722",
                mb: 1,
              }}
            >
              Call Center
            </Typography>
            <Typography sx={{ mb: 1 }}>+917338437609</Typography>

            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "18px",
                color: "#FF5722",
                mb: 1,
              }}
            >
              Email
            </Typography>
            <Typography sx={{ mb: 3 }}>credit@qualoan.com</Typography>

            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "18px",
                color: "#FF5722",
                mb: 1,
              }}
            >
              Location
            </Typography>
            <Typography>
              Office No. 229, 2nd Floor, Vipul Agora Mall, MG Road, Gurugram,
              122001.
            </Typography>
          </Grid>

          {/* Right Section: Contact Form */}
          <Grid item xs={12} md={6}>
            <Box
              component="form"
              onSubmit={submitHandler}
              sx={{
                background: "rgba(255, 255, 255, 0.9)",
                padding: "30px",
                borderRadius: "15px",
                boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}
              >
                Get in Touch
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Full Name"
                    name="fullName"
                    variant="standard"
                    fullWidth
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    InputProps={{ disableUnderline: false }}
                    sx={{
                      "& .MuiInputBase-input": {
                        fontSize: "16px",
                        borderBottom: "2px solid #000",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    variant="standard"
                    fullWidth
                    required
                    value={formData.email}
                    onChange={handleChange}
                    InputProps={{ disableUnderline: false }}
                    sx={{
                      "& .MuiInputBase-input": {
                        fontSize: "16px",
                        borderBottom: "2px solid #000",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Phone Number"
                    name="phoneNo"
                    type="tel"
                    variant="standard"
                    fullWidth
                    required
                    value={formData.phoneNo}
                    onChange={handleChange}
                    InputProps={{ disableUnderline: false }}
                    sx={{
                      "& .MuiInputBase-input": {
                        fontSize: "16px",
                        borderBottom: "2px solid #000",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Message"
                    name="message"
                    variant="standard"
                    fullWidth
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    sx={{
                      "& .MuiInputBase-input": {
                        fontSize: "16px",
                        borderBottom: "2px solid #000",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    sx={{
                      backgroundColor: "#444",
                      color: "#fff",
                      padding: "10px",
                      "&:hover": { backgroundColor: "#fc8403" },
                    }}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </Grid>
                {responseMessage && (
                  <Grid item xs={12}>
                    <Typography
                      sx={{
                        textAlign: "center",
                        color: responseMessage.includes("✅") ? "green" : "red",
                      }}
                    >
                      {responseMessage}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Google Map Section */}
      {/* <Box sx={{ paddingX: 1, mt: { xs: 5, md: 5 } }}>
        <Box
          component="iframe"
          src="https://www.google.com/maps/embed?..."
          allowFullScreen
          loading="lazy"
          sx={{
            width: "100%",
            height: { xs: "200px", md: "300px" },
            border: 0,
            borderRadius: "30px",
          }}
        />
      </Box> */}

      {/* Google Map Section */}
      <Box
        sx={{
          paddingX: 1,
          display: "flex",
          mb: { xs: -5, md: 0 }, // Add margin-bottom for small screens only
          mt: { xs: 5, md: 5 },
        }}
      >
        <Box
          component="iframe"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13661.975507350297!2d77.0861006!3d28.4692952!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce38996fe5fd3%3A0x63f6c364121c8f56!2sVipul%20Agora%20Mall!5e1!3m2!1sen!2sin!4v1735284965571!5m2!1sen!2sin"
          allowFullScreen
          loading="lazy"
          sx={{
            width: "100%",
            height: { xs: "200px", md: "300px" },
            border: 0,
            borderRadius: "30px",
          }}
        />
      </Box>
    </Box>
  );
};

export default AboutUs;

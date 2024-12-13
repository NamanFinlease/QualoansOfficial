import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Card, IconButton, useMediaQuery } from "@mui/material";
import {
  ArrowBackIos,
  ArrowForwardIos,
  CheckCircleOutline,
  Group,
  Security,
  LiveHelp,
  Payment,
  RateReview,
} from "@mui/icons-material";

const cardDetails = [
  {
    icon: <CheckCircleOutline fontSize="large" />,
    title: "Fast Approval",
    description: `Our entirely digital process ensures\nthat you can apply for a loan quickly\nand efficiently, without lengthy paperwork.`,
  },
  {
    icon: <Group fontSize="large" />,
    title: "Customer-Centric",
    description: `We focus on providing personalized\nloan solutions designed as per\nyour unique financial needs.`,
  },
  {
    icon: <Security fontSize="large" />,
    title: "Secure Transactions",
    description: `We prioritize your data privacy,\nemploying top-notch security \nmeasures to safeguard your personal information.`,
  },
  {
    icon: <LiveHelp fontSize="large" />,
    title: "24/7 Support",
    description: `Our dedicated customer support \nteam is available around the clock\nto assist you with your loan inquiries.`,
  },
  {
    icon: <Payment fontSize="large" />,
    title: "Flexible Options",
    description: `We provide flexible repayment \noptions that fit within your budget,\nensuring that you have the best possible experience.`,
  },
  {
    icon: <RateReview fontSize="large" />,
    title: "Transparent Rates",
    description: `Our interest rates are competitive\nand transparent, so you’ll always \nknow exactly what you’re signing up for.`,
  },
];

function CarouselItemDetail({ icon, imgTitle, description, index }) {
  const colors = ["#fc8403", "#5677d1", "#d1565c", "#15d8ed", "#d111d1"];
  return (
    <Card
      sx={{
        width: { xs: 250, sm: 300 },
        height: { xs: 350, sm: 350 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors[index % colors.length],
        boxShadow: 4,
        borderRadius: 5,
        padding: 2, // Added padding for card
        margin: { xs: 1, sm: 2 }, // Adjust margin for spacing between cards
      }}
    >
      <Box sx={{ marginBottom: 2 }}>
        {React.cloneElement(icon, { sx: { fontSize: "50px", color: "white" } })}
      </Box>
      <Typography
        variant="h5"
        fontWeight="bold"
        color="white"
        align="center"
        sx={{ fontSize: { xs: "1rem", sm: "1.2rem" }, marginBottom: "10px" }}
      >
        {imgTitle}
      </Typography>
      <Box
        mt={1}
        textAlign="center"
        sx={{
          paddingX: 2, // Added padding inside text box for better spacing
        }}
      >
        <Typography
          variant="body1"
          color="white"
          sx={{
            textAlign: "center",
            fontSize: "0.9rem",
            lineHeight: "1.3",
            whiteSpace: "pre-line",
          }}
        >
          {description}
        </Typography>
      </Box>
    </Card>
  );
}

export default function WhyChooseUs() {
  const carouselRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += 300;
    }
    setIsPaused(true);
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= 300;
    }
    setIsPaused(true);
  };

  
  return (
      <Box
        sx={{
          marginTop:'50px',
          display: "flex",
          flexDirection: { xs: "column", sm: "row" }, // Adjust layout for small screens
          justifyContent: "space-between",
          alignItems: "flex-start",
          backgroundColor: "#f5f5f5",
          borderRadius: 4,
          padding: 4,
          gap: 4,
        }}
      >
        {/* Left Section */}
        <Box sx={{ flex: "1", textAlign: { xs: "center", sm: "left" } }}>
          <Typography
            variant="h4"
            fontWeight='bold'
            color="#fc8403"
            gutterBottom
          >
            Why Us?
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ marginBottom: 2 ,fontSize:'20px'}}
          >
            Discover the reasons why customers trust us with their financial needs.
            Our commitment to transparency, security, and convenience ensures a
            comforting experience for all.
          </Typography>
          {/* Scroll Buttons */}
           <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-start" },
              gap: 1,
              marginTop: { xs: "20px", md: "100px" },

            }}
          >
            <IconButton
              onClick={scrollRight}
              sx={{
                color: "gray",
                border: "2px solid gray", // Black border
                borderRadius: "50%", // Circular shape
                width: 60, // Ensure a square shape for the circle
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                "&:hover": {
                  color: "orange",
                  border: "2px solid orange",
  
                },
              }}
              aria-label="Scroll Right"
            >
              <ArrowBackIos />
            </IconButton>
            <IconButton
              onClick={scrollLeft}
              sx={{
                color: "gray",
                border: "2px solid gray", // Black border
                borderRadius: "50%", // Circular shape
                width: 60, // Ensure a square shape for the circle
                height: 60,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)", // Slight hover effect
                  color: "orange",
                  border: "2px solid orange",
  
                },
              }}
              aria-label="Scroll Left"
            >
              <ArrowForwardIos />
            </IconButton>
          </Box>
        </Box>

        {/* Right Section */}
        <Box
          ref={carouselRef}
          sx={{
            display: "flex",
            overflowX: "auto", // Enable horizontal scrolling
            scrollBehavior: "smooth",
            whiteSpace: "nowrap",
            "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar
            flex: 2,
            width: "100%", // Full width on small screens
          }}
        >
          {cardDetails.map((item, index) => (
            <Box key={index} sx={{ display: "inline-block" }}>
              <CarouselItemDetail
                icon={item.icon}
                imgTitle={item.title}
                description={item.description}
                index={index}
              />
            </Box>
          ))}
        </Box>
      </Box>

  );
}

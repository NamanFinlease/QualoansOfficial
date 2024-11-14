import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Card, IconButton } from "@mui/material";
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
    description: `We focus on providing personalized\nloan solutions tailored to meet\nyour unique financial needs.`,
  },
  {
    icon: <Security fontSize="large" />,
    title: "Secure Transactions",
    description: `We prioritize your data privacy,\nemploying top-notch security measures\nto safeguard your personal information.`,
  },
  {
    icon: <LiveHelp fontSize="large" />,
    title: "24/7 Support",
    description: `Our dedicated customer support team\nis available around the clock\nto assist you with your loan inquiries.`,
  },
  {
    icon: <Payment fontSize="large" />,
    title: "Flexible Options",
    description: `We provide flexible repayment options\nthat fit within your budget,\nensuring that you have the best experience possible.`,
  },
  {
    icon: <RateReview fontSize="large" />,
    title: "Transparent Rates",
    description: `Our interest rates are competitive\nand transparent, so you’ll always know\nexactly what you’re signing up for.`,
  },
];


function CarouselItemDetail({ icon, imgTitle, description, index }) {
  const colors = ["#EB685A", "#A77AE2", "#56B8DC", "#AFD97E", "#d7ccc8"];

  return (
    <Card
    sx={{
      width: 300,
      height: 400,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors[index % colors.length],
      boxShadow: 4,
      borderRadius: 3,
      margin: 2,
      transition: "transform 0.3s",
      "&:hover": {
        transform: "scale(1.05)",
        boxShadow: 6,
      },
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
      sx={{ fontSize: "1.2rem", marginBottom: "10px" }}
    >
      {imgTitle}
    </Typography>
    <Box mt={1} textAlign="center">
      <Typography
        variant="body1"
        color="white"
        sx={{
          textAlign: "center",
          fontSize: "0.9rem",
          lineHeight: "1.3",
          whiteSpace: "pre-line",  // This respects line breaks
          paddingX: 2,
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

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= 300;
    }
    setIsPaused(true);
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += 300;
    }
    setIsPaused(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && carouselRef.current) {
        carouselRef.current.scrollLeft += 1;
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    if (isPaused) {
      const timeout = setTimeout(() => setIsPaused(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [isPaused]);

  return (
    <Box sx={{ marginTop: '100px', paddingBottom: '30px', position: "relative" }}>  
      <Typography variant="h3" fontWeight={750} align="center" color="black" gutterBottom > 
        Why Choose Us?
      </Typography>

      {/* Left Scroll Button */}
      <IconButton
        onClick={scrollLeft}
        sx={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          zIndex: 1,
          color: "black",
        }}
      >
        <ArrowBackIos />
      </IconButton>

      <Box
        ref={carouselRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
          whiteSpace: "nowrap",
          "&::-webkit-scrollbar": { display: "none" },
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

      {/* Right Scroll Button */}
      <IconButton
        onClick={scrollRight}
        sx={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          zIndex: 1,
          color: "black",
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
}

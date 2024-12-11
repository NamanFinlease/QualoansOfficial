import React, { useRef } from "react";
import { Box, Typography, Card, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Speed, MonetizationOn, Security, Description, AccountBalance, ThumbUp } from "@mui/icons-material";

// Carousel content configuration
const cardDetails = [
  {
    icon: <Speed fontSize="80px" />,
    title: "Quick Approval",
    description: ` We check your documents and updates you about the status in minutes.`,
  },
  {
    icon: <AccountBalance fontSize="80px" />,
    title: "Easy Repayment",
    description: `Pay back your loan your way. Use UPI or bank transfer With no prepayment charges.`,
  },
  {
    icon: <MonetizationOn fontSize="80px" />,
    title: "Clear Pricing",
    description: `No hidden fees! Our rates are competitive and fair, so you always know what to expect.`,
  },
  {
    icon: <Description fontSize="80px" />,
    title: "Simple Documents",
    description: `Skip the hassle of paperwork. Apply online quickly and easily from anywhere.`,
  },
  {
    icon: <ThumbUp fontSize="80px" />,
    title: "Instant Transfer",
    description: `Once approved, your loan amount is sent to your account right away. No delays!`,
  },
  {
    icon: <Security fontSize="80px" />,
    title: "Safe Process",
    description: `Your data is secure with us. We ensure your loan process is safe and transparent.`,
  },
];

// Carousel Item Component
function CarouselItemDetail({ icon, imgTitle, description, index }) {
  const [visibleLines, setVisibleLines] = React.useState([]);
  const colors = ["#fc8403", "#5677d1", "#d1565c", "#15d8ed", "#d111d1"];

  const descriptionLines = description.split("\n");

  React.useEffect(() => {
    setVisibleLines([]);
    descriptionLines.forEach((_, lineIndex) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, lineIndex]);
      }, lineIndex * 500);
    });
  }, [description]);

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
        // margin: 2,
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 6,
        },
      }}
    >
      <Box
        sx={{
          fontSize: "4rem",
          color: "white",
          marginBottom: 8,
        }}
      >
        {icon}
      </Box>
      <Typography variant="h5" fontWeight="bold" color="white" align="center" sx={{mb:4}}>
        {imgTitle}
      </Typography>
      <Box mt={1} textAlign="center">
        {descriptionLines.map((line, lineIndex) => (
          <Typography
            key={lineIndex}
            color="white"
            sx={{
              marginBottom: 1,
              fontSize: "20px",
              opacity: visibleLines.includes(lineIndex) ? 1 : 0,
              transition: "opacity 0.5s ease",
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
              overflowWrap: "break-word",
              textAlign: "center",
              maxWidth: "100%",
            }}
          >
            {line}
          </Typography>
        ))}
      </Box>
    </Card>
  );
}

// Autoplay Carousel Component
export default function AutoplayCarousel() {
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 400;
      const currentScroll = carouselRef.current.scrollLeft;
      const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;

      let newScroll =
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount;

      if (newScroll < 0) {
        newScroll = 0;
      } else if (newScroll > maxScroll) {
        newScroll = maxScroll;
      }

      carouselRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F5F5F5",
        position: "relative",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        padding: { xs: "10px", sm: "20px", md: "30px" },
      }}
    >
      <Box
        sx={{
          flex: { md: 1 },
          textAlign: { xs: "center", md: "left" },
          marginBottom: { xs: "20px", md: "0px" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: { xs: "center", md: "flex-start" },
        }}
      >
        <Typography
          variant="h4"
          fontWeight={750}
          color="#fc8403"
          gutterBottom
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
          }}
        >
          Why Us?
        </Typography>
        <Typography
          variant="h5"
          color="black"
          paragraph
          sx={{
            fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
          }}
        >
          Get financial support at ease with our instant approval system, flexible repayment options,
          and transparent interest rates. Experience a safe and hassle-free process with minimal documentation.
          No waiting time, no unnecessary paperwork!
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
            gap: 2,
            marginTop: { xs: "20px", md: "40px" },
          }}
        >
          <IconButton
            onClick={() => scrollCarousel("left")}
            sx={{
              padding: { xs: 2, md: 4 },
              border: "2px solid gray",
              color: "gray",
              "&:hover": {
                backgroundColor: "#f2f2f2",
                color: "orange",
                border: "2px solid orange",
              },
            }}
          >
            <ArrowBackIos />
          </IconButton>
          <IconButton
            onClick={() => scrollCarousel("right")}
            sx={{
              padding: { xs: 2, md: 4 },
              border: "2px solid gray",
              color: "gray",
              "&:hover": {
                backgroundColor: "#f2f2f2",
                color: "orange",
                border: "2px solid orange",
              },
            }}
          >
            <ArrowForwardIos />
          </IconButton>
        </Box>
      </Box>

      <Box
        ref={carouselRef}
        sx={{
          flex: { md: 2 },
          display: "flex",
          overflowX: "auto",
          textAlign:'center',
          scrollBehavior: "smooth",
          gap: { xs: 15, sm: 3, md: 0 },
          padding: { xs: "10px 0", sm: "20px 0" },
          "&::-webkit-scrollbar": { display: "none" },
          justifyContent: { xs: "flex-start", sm: "start" },
        }}
      >
        {cardDetails.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "inline-block",
              width: { xs: "260px", sm: "300px", md: "260px" },
              flexShrink: 0,
              margin: { xs: "0 8px", sm: "0 12px", md: "0 26px" },
            }}
          >
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

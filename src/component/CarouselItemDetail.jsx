import React, { useRef } from "react";
import { Box, Typography, Card, CardMedia, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

// Import images
import image1 from "../assets/image/Trust-and-Transparency 1.png";
import image2 from "../assets/image/Easy-Approval-and-Disbursal 2.png";
import image3 from "../assets/image/Easy-Approval-and-Disbursal 2.png";
import image4 from "../assets/image/Easy-Repayment 1.png";
import image5 from "../assets/image/Trust-and-Transparency 1.png";
import image6 from "../assets/image/Trust-and-Transparency 1.png";

// Carousel content configuration
const cardDetails = [
  {
    imgUrl: image1,
    title: "Quick Approval",
    description: `We know your time matters! With our friendly financial technology, we’ll check your documents and approve your loan in just minutes. Once you’re approved, the money will land in your account in no time!`,
  },
  {
    imgUrl: image2,
    title: "Stress-Free Repayment",
    description: `With options like Easy Pay or Bank Transfer, our flexible repayment plans make it a breeze for you to stay on top of your finances. Enjoy upgrading your lifestyle without the worry of cash flow!`,
  },
  {
    imgUrl: image3,
    title: "Clear Pricing",
    description: `Our interest rates and fees are clear, straightforward, and completely fair—there are no hidden surprises. We aim to make your financial journey as smooth and hassle-free as possible.`,
  },
  {
    imgUrl: image4,
    title: "Easy Documentation",
    description: `Say goodbye to the hassle of paperwork and long trips to the bank. With our fully digital loan process, you can enjoy a quick, straightforward, and stress-free experience from start to finish.`,
  },
  {
    imgUrl: image5,
    title: "Fast Fund Transfer",
    description: `As soon as your documents are verified and approved, the money will be sent to your account right away. No waiting—just quick financial relief thanks to our advanced technology!`,
  },
  {
    imgUrl: image6,
    title: "Secure Process",
    description: `Your information is in good hands! Our dedicated teams work diligently at every stage to ensure a safe and transparent experience. Your dreams are important to us, and we’ll protect them like our own.`,
  },
];

// Carousel Item Component
function CarouselItemDetail({ imgUrl, imgTitle, description, index }) {
  const [visibleLines, setVisibleLines] = React.useState([]);
  const colors = ["#EB685A", "#A77AE2", "#56B8DC", "#AFD97E", "#A77AE2"];

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
        width:380 ,
        height:  450,
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
      <Box>
        <CardMedia
          component="img"
          image={imgUrl}
          alt={imgTitle}
          sx={{

            width:{xs:'100%',md:'100%'} ,
            height:{xs:'50%',md:'100%'},
            maxHeight: 150,
            marginBottom: 10,
            marginTop:10
          }}
        />
      </Box>
      <Typography variant="h5" fontWeight="bold" color="white" align="center" >
        {imgTitle}
      </Typography>
      <Box mt={1} textAlign="center">
        {descriptionLines.map((line, lineIndex) => (
          <Typography
            key={lineIndex}
            color="white"
            sx={{
              marginBottom: 10,
              paddingLeft:'30px',
              paddingRight:'30px',

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
      const scrollAmount = 400; // Adjust to control the scroll distance per click
      const currentScroll = carouselRef.current.scrollLeft;
      const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      
      // Calculate the new scroll position
      let newScroll =
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount;

      // Ensure that the scroll position stays within bounds
      if (newScroll < 0) {
        newScroll = 0;
      } else if (newScroll > maxScroll) {
        newScroll = maxScroll;
      }

      // Set the scroll position to the new value with smooth behavior
      carouselRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth", // Add smooth scrolling behavior
      });
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F5F5F5",
        position: "relative",
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, // Responsive layout
        padding: { xs: "10px", sm: "20px", md: "30px" },
      }}
    >
      {/* Left Section: Heading, Description, and Icons */}
      <Box
        sx={{
          flex: { md: 1 }, // Take 1 part of the available space
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
          color="black"
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
          Get quick financial support with our swift approval system, flexible repayment options,
          and transparent interest rates. Experience a safe and hassle-free process with minimal documentation.
          Your money will reach you in an instant!
        </Typography>

        {/* Backward and Forward Icons */}
         <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
            gap: 2,
            marginTop: { xs: "20px", md: "40px" }, // Ensure marginTop is applied on both small and large screens
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
                color: "black",
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
                color: "black",
              },
            }}
          >
            <ArrowForwardIos />
          </IconButton>
        </Box>

      </Box>

      {/* Right Section: Carousel Boxes */}
      <Box
        ref={carouselRef}
        sx={{
          flex: { md: 2 }, // Take 2 parts of the available space
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
          gap: { xs: 15, sm: 3, md: 1 }, // Adjust gap between cards for small screens
          padding: { xs: "10px 0", sm: "20px 0" },
          "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar
          justifyContent: { xs: "flex-start", sm: "start" }, // Align cards to the left
        }}
      >
        {cardDetails.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "inline-block", // Horizontal alignment
              width: { xs: "260px", sm: "300px", md: "360px" }, // Adjust card width for responsiveness
              flexShrink: 0, // Prevent shrinking
              margin: { xs: "0 8px", sm: "0 12px", md: "0 16px" }, // Adjust margin for gaps
            }}
          >
            <CarouselItemDetail
              imgUrl={item.imgUrl}
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

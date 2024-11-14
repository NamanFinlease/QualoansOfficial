import React, { useRef } from "react";
import { Box, Typography, Card, CardMedia, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import backgroundImg from "../assets/image/Frame 464.png";

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
        width: 380,
        height: 450,
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
            width: "100%",
            height: "100%",
            maxHeight: 150,
            marginBottom: 13,
          }}
        />
      </Box>
      <Typography variant="h5" fontWeight="bold" color="white" align="center">
        {imgTitle}
      </Typography>
      <Box mt={1} textAlign="center">
        {descriptionLines.map((line, lineIndex) => (
          <Typography
            key={lineIndex}
            color="white"
            sx={{
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
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#f9f9f9",
        position: "relative",
      }}
    >
      <Typography variant="h4" fontWeight={750} align="center" color="black" gutterBottom style={{fontWeight:'bold', color: 'black',fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' }}}>
        Why Us?
      </Typography>
         <Typography
          variant="h5"
          align="center"
          color="black"
          paragraph
          sx={{
            display: "block", // Remove line clamping for full text display
            textAlign: "center",
          }}
        >
        Receive fast financial assistance with our rapid approval process, easy repayment choices,<br />
        and clear interest rates. Enjoy a secure and straightforward experience with minimal paperwork. <br />
        Your funds will be available in no time!
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <IconButton
          onClick={() => scrollCarousel("left")}
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
            gap: 2, // Adding gap between cards
            padding: "20px 0", // Padding around the carousel for better spacing
          }}
        >
          {cardDetails.map((item, index) => (
            <Box key={index} sx={{ display: "inline-block" }}>
              <CarouselItemDetail
                imgUrl={item.imgUrl}
                imgTitle={item.title}
                description={item.description}
                index={index}
              />
            </Box>
          ))}
        </Box>
        <IconButton
          onClick={() => scrollCarousel("right")}
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
    </Box>
  );
}

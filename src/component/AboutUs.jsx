import React, { useEffect, useRef,useState } from 'react';
import { Typography, Box ,Paper, Accordion,
  AccordionSummary,
  AccordionDetails, } from '@mui/material';
import VisionImage from '../assets/image/image.png'; // Import your vision image here
import aboutImage from '../assets/image/about us qua (1).webp'; // Correct image path for about us
import WhyChooseUs from './WhyChooseUs';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MissionImage from '../assets/image/image1.png'; // Import your mission image here
import technologyGif from '../assets/image/Repayment (2).gif'; // Importing the GIF


const techSteps = [
  {
    number: "01",
    title: "Quick Credit Assessments",
    description: "Through seamless integration with credit bureaus and bank accounts, our system evaluates your credit profile instantly, enabling quick loan approvals.",
  },
  {
    number: "02",
    title: "User-Friendly Interface",
    description: "Our website and mobile app are designed with the user in mind, ensuring that the loan application, approval, and disbursement process is easy and convenient.",
  },
  {
    number: "03",
    title: "Real-Time Tracking",
    description: "Once your loan application is submitted, you can track its status in real-time via our website or mobile app, making the process transparent and efficient.",
  },
];




const AboutUs = () => {


  const [isVisible, setIsVisible] = useState(false);
  const faqRef = useRef(null);

  useEffect(() => {
      const observer = new IntersectionObserver(
          (entries) => {
              const entry = entries[0];
              if (entry.isIntersecting) {
                  setIsVisible(true);
              } else {
                  setIsVisible(false);
              }
          },
          { threshold: 0.1 }
      );

      if (faqRef.current) {
          observer.observe(faqRef.current);
      }

      return () => {
          if (faqRef.current) {
              observer.unobserve(faqRef.current);
          }
      };
  }, []);

  



  
  return (
    <Box 
        sx={{ 
          background:'#f9f9f9',

          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh', // Adjust height as needed
          padding: '30px',
        }}
      >
   
      {/* Image Section */}
      <Box 
      sx={{ 
        position: 'relative',
        width: '100%',
        height: { xs: '30vh', sm: '60vh', md: '60vh', lg: '110vh' },          
        overflow: 'hidden',
        mb: 2,
      }}
    >
      <Box
        component="img"
        src={aboutImage}
        alt="Contact Us"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          padding: {xs:'1px',md:'10px'},

          border: '2px solid transparent', // Added a solid border for consistency
          borderRadius: '50px',
        }}
      />
    </Box>
    
            <Typography 
          variant="h4" // Heading style
          sx={{
            marginTop: '50px', // Margin on top
            fontFamily: 'Inter',
            fontSize: { xs: '2.4rem', md: '3rem' },
            fontWeight: 700, // Font weight
            lineHeight: '73px', // Line height
            letterSpacing: '-0.408px', // Letter spacing
            textAlign: 'center',
            marginBottom: { xs: '20px', md: '2px' }, // Responsive margin-bottom
          }}
        >
          About Us
        </Typography>

        <Typography 
          variant="body1" 
          sx={{
            paddingLeft: { xs: '20px', sm: '30px', md: '50px' }, // Responsive padding
            paddingRight: { xs: '20px', sm: '30px', md: '50px' }, // Responsive padding
            fontFamily: 'Inter',
            fontSize: { xs: '16px', sm: '18px', md: '22px' }, // Responsive font size
            fontWeight: 500, 
            lineHeight: '40px', 
            letterSpacing: '-0.408px', // Letter spacing
            textAlign: 'center',
            marginBottom: { xs: '40px', md: '20px' }, // Responsive bottom margin
          }}
        >
          Welcome to QUAloan.com, your trusted partner in personal finance solutions. As a premier digital lending platform under Naman Finlease Private Limited, we specialize in providing fast, convenient, and short-term unsecured personal loans to salaried individuals across India. Our mission is to empower our customers with access to credit, simplifying the loan process through innovative technology and tailored solutions that meet your unique financial needs.
        </Typography>

        <Typography 
          variant="body1" 
          sx={{
            paddingLeft: { xs: '20px', sm: '30px', md: '60px' }, // Responsive padding
            paddingRight: { xs: '20px', sm: '30px', md: '50px' }, // Responsive padding
            fontFamily: 'Inter',
            fontSize: { xs: '16px', sm: '18px', md: '22px' }, // Responsive font size
            fontWeight: 500, 
            lineHeight: '40px', 
            letterSpacing: '-0.408px', // Letter spacing
            textAlign: 'center',
            marginBottom: { xs: '40px', md: '60px' }, // Responsive bottom margin
          }}
        >
        At QUAloan.com, we understand that life can be unpredictable whether it’s medical emergencies, wedding expenses, home improvements, we’re here to ensure that financial hurdles don’t hold you back. With our seamless, fully digital platform, you can apply for a loan in minutes, track your application status in real-time, and receive funds directly into your bank account.
      </Typography>
            
      {/* mission & vission */}

            <Box
        sx={{
          marginLeft: { xs: 0, md: '50px' }, // Remove margin for small screens
          marginRight: { xs: 0, md: '50px' },
          marginTop: {xs:'30px',md:"100px"},
          marginBottom: {xs:0,md:'50px'},
          display: 'flex',
          alignItems: 'center',
          flexDirection: { xs: 'column', md: 'column' }, // Keep stacked vertically
          padding: 3,
          position: 'relative', // Maintain zIndex stacking
        }}
      >
        {/* Content Box */}
        <Box
          sx={{
            padding: 3,
            backgroundColor: '#C9DDE4',
            borderRadius: '30px',
            boxShadow: 2,
            textAlign: 'left',
            flex: 1,
            zIndex: 1,
            width: { xs: '100%', md: '100%' }, // Match image width for small screens
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 'bold',
            }}
          >
            Our Mission
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginRight: { xs: 0, md: '400px' }, // No margin on small screens
              fontSize: '20px',
            }}
          >
            Our mission is to make personal loans quick, simple, and accessible for salaried individuals. We believe in
            financial empowerment and are committed to providing easy and affordable access to credit. Through our partnership
            with Naman Finlease Private Limited, an RBI-registered NBFC (Non-Banking Financial Company), we offer loans that
            are secure, transparent, and tailored to meet the needs of today’s modern consumer.
          </Typography>
        </Box>

        {/* Image */}
        <Box
          component="img"
          src={MissionImage}
          alt="Our Mission"
          sx={{
            width: { xs: '110%', md: '33%' }, // Match content box width for small screens
            height: 'auto',
            borderRadius: '8px',
            maxWidth: '60%',
            position: { xs: 'static', md: 'absolute' }, // Absolute position only for larger screens
            left: { md: '78%' },
            transform: { md: 'translate(-50%, -20%)' }, // Apply only on larger screens
            zIndex: 6,
            marginTop: { xs: '20px', md: 4 }, // Add spacing on smaller screens
          }}
        />
      </Box>


      <Box
         sx={{
          marginLeft: { xs: 0, md: '50px' }, // Remove margin for small screens
          marginRight: { xs: 0, md: '50px' },
          marginTop:{xs:'20px',md:'100px'} ,
          marginBottom: '50px',
          display: 'flex',
          alignItems: 'center',
          flexDirection: { xs: 'column', md: 'column' }, // Keep stacked vertically
          padding: 3,
          position: 'relative', // Maintain zIndex stacking
        }}
      >
        {/* Content Box */}
        <Box
          sx={{
            padding: 3,
            backgroundColor: '#DED3EE',
            borderRadius: 2,
            boxShadow: 2,
            textAlign: 'left',
            flex: 1,
            zIndex: 1,
            borderRadius: '30px',

            width: { xs: '90%', md: '100%' }, // Adjust width for smaller screens
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              marginLeft: { xs: 0, md: '400px' }, // Reset margin on smaller screens
              fontWeight: 'bold',
            }}
          >
            Our Vision
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginLeft: { xs: 0, md: '400px'  },
              fontSize:'20px'
              // Reset margin on smaller screens
            }}
          >
            Our vision at QUAloan.com is to redefine how personal loans are accessed by salaried professionals in India. We aim
            to create a transparent, customer-centric lending ecosystem that provides access to credit when it’s needed the
            most. By harnessing cutting-edge technology and leveraging our expertise in financial services, we strive to build
            a future where financial inclusion is a reality for all, regardless of their income or background.
          </Typography>
        </Box>

        {/* Image */}
        <Box
          component="img"
          src={VisionImage}
          alt="Our Vision"
          sx={{
            width: { xs: '100%', md: '33%' }, // Adjust size for smaller screens
            height: 'auto',
            borderRadius: '30px',
            maxWidth: '60%',
            position: { xs: 'static', md: 'absolute' }, // Absolute position only for larger screens
            right: { md: '45%' },
            transform: { md: 'translate(-50%, -20%)' }, // Apply only on larger screens
            zIndex: 6,
            marginTop: { xs: '20px', md: 4 }, // Add spacing on smaller screens
          }}
        />
      </Box>
   
         {/* <Technology/> */}

         
                    <Box
                  sx={{
                    marginTop:15,
                    width: "100%",
                    padding: 4,
                    background:'#D9D9D9',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backdropFilter: "blur(5px)",
                    display: "flex",
                    borderRadius:'30px',
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "left",
                    justifyContent: "space-between",
                    "@media (max-width: 600px)": {
                      padding: 2,
                      margin: 0,
                      backgroundSize: "contain",
                      backgroundPosition: "top center",
                    },
                  }}
                  ref={faqRef}
                >
                  {/* Left Content (Text and Accordion) */}
                  <Box
                    sx={{
                      marginLeft:{xs:0,md:'60px'},
                      flex: 1,
                      textAlign: "left",
                      marginRight: { md: 8 },
                    }}
                  >
            <Typography
              sx={{
                fontWeight: "bold",
                mb: 4,
                fontSize: { xs: "2.4rem", md: "2.5rem" },
                fontFamily: "Arial, sans-serif",
                opacity: isVisible ? 1 : 0,
                transition: "opacity 1s ease-in-out",
                textAlign: "left", // Keeps the text aligned to the left
                width: { xs: "100%", md: "auto" }, // Ensures width is properly adjusted
                margin: { xs: 0, md: "0 auto" }, // Centers the text on larger screens, aligns left on small screens
              }}
            >
              Our Technology
            </Typography>


                    <Typography
                      variant="h5"
                      sx={{
                        maxWidth: { xs: "100%", md: "800px" },
                        fontFamily: "Arial, sans-serif",
                        opacity: isVisible ? 1 : 0,
                        transition: "opacity 1s ease-in-out",
                        mb: 4,
                        lineHeight: 1.6,
                        textAlign: "left ",
                        fontSize:'1.25rem',
                        margin: { xs: 0, md: "0 auto" },
                      }}
                    >
                      QUAloan.com is powered by a state-of-the-art digital platform that simplifies every step of the loan process. We use advanced algorithms to assess your creditworthiness quickly and accurately, ensuring that you get the best possible loan offers.
                    </Typography>

                    {/* Top line above Paper */}
                    <Box
                      sx={{
                        width: "100%",
                        padding: { xs: 0, md: 0 },
                        paddingTop: { xs: 6, md: 2 },
                        opacity: isVisible ? 1 : 0,
                        transition: "opacity 1s ease-in-out",
                      }}
                    >
                      <Paper elevation={0} sx={{ overflow: "hidden", backgroundColor: "transparent" }}>
                        <div>
                          <Box sx={{ width: "100%", borderTop: "2px solid #D9D9D9 ", my: 2 }} />

                          {techItems.map((tech, index) => (
                            <Accordion
                              key={index}
                              sx={{
                                backgroundColor: "transparent",
                                opacity: isVisible ? 1 : 0,
                              }}
                            >
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ color: "black", fontSize: "2.5rem",                                  "&:hover": {
                                  backgroundColor: "black",
                                  color: "white",
                                }, 
                              "&.Mui-expanded": {
                                    backgroundColor: "black",
                                    color: "white",
                                  },}} />}
                                aria-controls={`tech${index}-content`}
                                id={`tech${index}-header`}
                                sx={{
                                  color: "black",
                                  "&:hover": {
                                    backgroundColor: "black",
                                    color: "white",
                                  },
                                  "&.Mui-expanded": {
                                    backgroundColor: "black",
                                    color: "white",
                                  },
                                }}
                              >
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                                  
                                  <Typography sx={{ fontSize: "1.25rem", margin: "0", textAlign: "left", width: "100%" }}>
                                    {tech.title}
                                  </Typography>
                                </Box>
                              </AccordionSummary>

                              <AccordionDetails sx={{ color: "black" }}>
                                <Typography>{tech.description}</Typography>
                              </AccordionDetails>
                            </Accordion>
                          ))}
                        </div>
                        <Box sx={{ width: "100%", borderBottom: "2px solid #D9D9D9", my: 2 }} />
                      </Paper>
                    </Box>
                  </Box>

                 {/* Right GIF */}
              <Box
                sx={{
                  background: '#FFFFFF',
                  flex: 1,
                  borderRadius: '30px',
                  display: 'flex', // Enables flexbox
                  justifyContent: 'center', // Centers horizontally
                  alignItems: 'center', // Centers vertically
                  textAlign: 'center',
                  alignItems: 'center', // Centers vertically

                  maxWidth: { xs: "100%", md: "30%" },
                  height: "100%", // Ensures full height of the container
                }}
              >
                <img
                  src={technologyGif}
                  alt="Technology GIF"
                  style={{
                    margin:45,
          
                    width: "100%",
                    maxWidth: "400px",
                    borderRadius: "10px",
                  }}
                />
              </Box>
              </Box>

                <WhyChooseUs/>


              

        
        </Box>
        
   
  );
};
const techItems = [
  {
      title: ' Quick Credit Assessments',
      description: 'Our advanced algorithms ensure quick and accurate credit assessments, enabling you to get the best loan offers without any delay.'
  },
  {
      title: ' User-Friendly Interface',
      description: 'QUAloan offers an intuitive and easy-to-navigate platform, ensuring a smooth loan application process for all users.'
  },
  {
      title: ' Real-Time Tracking',
      description: 'Track your loan application status in real-time, providing complete transparency and peace of mind throughout the process.'
  },
  {
      title: ' Secure Transactions',
      description: 'We prioritize your security by using encrypted transactions, ensuring your sensitive data remains safe at all times.'
  },
];

export default AboutUs;

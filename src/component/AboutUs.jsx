import React, { useEffect, useRef,useState } from 'react';
import { Typography, Box ,Paper, Accordion,
  AccordionSummary,
  AccordionDetails, } from '@mui/material';
import VisionImage from '../assets/image/image.png'; // Import your vision image here
import aboutImage from '../assets/image/About-Us-QUA.jpg'; // Correct image path for about us
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
      background: '#f9f9f9',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      padding: { xs: '20px', sm: '45px' }, // Adjust padding for small screens
    }}
  >
    {/* Image Section */}
   
      <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '20vh', md: '65vh' },
        overflow: 'hidden',
        borderRadius: '20px',
        mb: 5,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
            <Box
        component="img"
        src={aboutImage}
        alt="Repay Loan"
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
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
          Welcome to QUA Loan, your trusted partner in personal finance solutions. As a premier digital lending platform under Naman Finlease Private Limited, we specialize in providing fast, convenient, and short-term unsecured personal loans to salaried individuals across India. Our mission is to make our customers feel empowered with full access to credit, simplifying the loan process through the use of innovative technology and customized solutions that meet their unique financial needs.
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
        At QUA Loan, we understand that life can be unpredictable when it
comes to the medical emergencies. There comes other sets of expenditures such as
wedding expenses, home improvements, etc. So to cater to every need of an individual,
we’re here to ensure that financial hurdles don’t hold you back. With our fully digital platform services, you can apply for a loan in minutes, track your application status in real-time and receive funds directly into your bank account.
      </Typography>
            
      {/* mission & vission */}
                <Box
                sx={{
                  backgroundColor: '#C9DDE4',
                  borderRadius: "80px",
                  marginLeft: { xs: 0, md: '50px' },
                  marginRight: { xs: 0, md: '50px' },
                  marginTop: { xs: '20px', md: '100px' },
                  marginBottom: '50px',
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  justifyContent: 'space-between',
                  padding: 3,
                  position: 'relative',
                  alignItems: 'center', // Vertically center content and image
                  flexWrap: 'wrap', // Ensures elements wrap on smaller screens
                }}
              >
                {/* Content Box */}
                <Box
                  sx={{
                    border: 'none',
                    padding: 3,
                    textAlign: 'left',
                    flex: 1,
                    zIndex: 1,
                    width: { xs: '100%', md: '50%' },
                    backgroundColor: 'transparent',
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
                      fontSize: '20px',
                    }}
                  >
                    Our mission is to make personal loans quicker, simpler, and easily accessible for salaried
                    individuals. We believe in empowering people on financial grounds and are committed to providing easy and affordable access to credit. Through our partnership
                    with Naman Finlease Private Limited, an RBI-registered NBFC (Non-Banking Financial Company), we offer loans that
                    are secure, transparent, and designed as to meet the needs of today’s modern consumer.
                  </Typography>
                </Box>

                {/* Image Box */}
                <Box
                  component="img"
                  src={MissionImage}
                  alt="Our Mission"
                  sx={{
                    width: { xs: '100%', md: '50%' }, // Set image width based on screen size
                    height: '400px', // Adjust height to prevent overlap and keep the aspect ratio
                    borderRadius: '30px',
                    objectFit: 'cover',
                    marginTop: { xs: '20px', md: '0' }, // Adds margin top for small screens
                    marginLeft: { md: 3 }, // Add spacing between content and image on larger screens
                    marginBottom: { xs: '20px', md: '0' }, // Add margin for small screens
                  }}
                />
              </Box>

              <Box
                sx={{
                  backgroundColor: '#DED3EE',
                  borderRadius: "80px",
                  marginLeft: { xs: 0, md: '50px' },
                  marginRight: { xs: 0, md: '50px' },
                  marginTop: { xs: '20px', md: '100px' },
                  marginBottom: '50px',
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  justifyContent: 'space-between',
                  padding: 3,
                  position: 'relative',
                  alignItems: 'center', // Vertically centers content and image
                  flexWrap: 'wrap', // Ensures elements wrap on smaller screens
                }}
              >
                {/* Image Box */}
                <Box
                  component="img"
                  src={VisionImage}
                  alt="Our Vision"
                  sx={{
                    width: { xs: '100%', md: '50%' }, // Adjust image width for better responsiveness
                    height: '400px', // Prevent image overlap with content
                    borderRadius: '30px',
                    objectFit: 'cover',
                    marginTop: { xs: '20px', md: '0' }, // Adds margin top for small screens
                    marginLeft: { md: 3 },
                    marginBottom: { xs: '20px', md: '0' }, // Adds margin for small screens
                  }}
                />

                {/* Content Box */}
                <Box
                  sx={{
                    border: 'none',
                    padding: 3,
                    textAlign: 'left',
                    flex: 1,
                    zIndex: 1,
                    width: { xs: '100%', md: '50%' },
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
                    Our Vision
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '20px',
                    }}
                  >
                    Our vision at QUA Loan is to redefine how personal loans are accessed by salaried
                    professionals in India. We aim to create a transparent, customer-centric lending
                    ecosystem that provides access to credit when it’s needed the most. By making use of
                    innovative technologies and leveraging our expertise in providing financial services, we strive to build
                    a future where financial inclusion is a reality for all, regardless of their source of income or financial background.
                  </Typography>
                </Box>
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
                      QUA Loan is powered by a  digital platform that simplifies every step of the loan process. We use advanced algorithms to assess your creditworthiness quickly and accurately, ensuring that you get the best possible loan offers.
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
      description: 'QUA Loan offers an intuitive and easy-to-navigate platform, ensuring a smooth loan application process for all users.'
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

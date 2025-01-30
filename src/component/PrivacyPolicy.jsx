import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Divider,
  Slide,
  Fade,
} from "@mui/material";
import privacyImage from "../assets/image/Untitled-1.jpg";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Privacy Policy",
      content: [
        "At QUA Loan, a lending platform under Naman Finlease Private Limited, we prioritize your privacy. This policy explains how we collect, use, and protect your data. By using QUA Loan, you agree to the collection and use of your information as outlined in this Privacy Policy.",
      ],
    },
    {
      title: "1. Information We Collect",
      content: [
        "We collect the following types of information:",
        "• Personal Identification: Full Name, Email, Phone Number, Date of Birth, Address, PAN, Aadhaar, Employment Information, Bank Account Details, and Financial Data.",
        "• Financial Information: Documents such as Bank Statements, Salary Slips, and Consent for Credit Checks are required for loan applications.",
        "• Transactional Information: Details about your loans, repayment schedules, and transaction history are recorded.",
      ],
    },
    {
      title: "2. How We Use Your Information",
      content: [
        "Your information is used for:",
        "• Loan Processing: We assess your loan eligibility, process applications, and manage repayments.",
        "• Service Improvement: We enhance our platform based on user feedback and interactions.",
        "• Communication: We send notifications and respond to inquiries related to our services.",
        "• Compliance: We comply with legal requirements like KYC and AML regulations.",
      ],
    },
    {
      title: "3. Sharing Your Information",
      content: [
        "Your information may be shared with:",
        "• Authorized Third Parties: We work with Credit Bureaus, Payment Gateways, and Verification Agencies to process and verify your information.",
        "• Legal Authorities: We may disclose your information as required by the law, such as for regulatory reporting or fraud investigations.",
        "• Parent Company: We may share your data with our parent company, Naman Finlease Private Limited, for loan processing.",
      ],
    },
    {
      title: "4. Data Security",
      content: [
        "We employ encryption, secure servers, and multi-factor authentication to safeguard your data. However, no system is 100% secure, and we encourage users to proceed with caution.",
      ],
    },
    {
      title: "5. Cookies and Tracking",
      content: [
        "We use cookies and tracking technologies to enhance your browsing experience. You can control cookies through browser settings.",
      ],
    },
    {
      title: "6. Your Rights",
      content: [
        "You have the right to access, correct, delete, or request portability of your data. You can also opt out of marketing communications at any time.",
      ],
    },
    {
      title: "7. Retention of Information",
      content: [
        "We retain your information as long as it is necessary for business or legal reasons, and securely delete it when it is no longer needed.",
      ],
    },
    {
      title: "8. Third-Party Links",
      content: [
        "Our platform may link to third-party websites. We are not responsible for their privacy practices.",
      ],
    },
    {
      title: "9. Children’s Privacy",
      content: [
        "We do not knowingly collect data from children under 18. If we find any, we will delete it.",
      ],
    },
    {
      title: "10. Policy Updates",
      content: [
        "We may update this policy periodically. Check this page for any changes.",
      ],
    },
    {
      title: "11. Contact Us",
      content: [
        "If you have any questions, please contact us at:",
        "• Email: info@qualoan.com",
        "• Phone: +917338437609",
        "• Address:Office No. 229, 2nd Floor, Vipul Agora Mall, MG Road, Gurugram, 122001.",
      ],
    },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const policyRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    });

    if (policyRef.current) observer.observe(policyRef.current);

    return () => {
      if (policyRef.current) observer.unobserve(policyRef.current);
    };
  }, []);

  return (
    <div ref={policyRef}>
      <Box
        sx={{
          minHeight: "100vh",
          padding: "30px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {/* Image Section */}
        <Box
          sx={{
            backgroundColor: "#f9f9f9",

            position: "relative",
            width: "100%",
            height: { xs: "20vh", md: "60vh" },
            overflow: "hidden",
            borderRadius: "50px",
            mb: 5,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Slide direction="left" in={isVisible} timeout={1000}>
            <img
              src={privacyImage}
              alt="Privacy Policy"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius: "50px",
              }}
            />
          </Slide>
        </Box>

        <Container maxWidth="lg">
          {/* Prominent Heading */}
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Fade in={isVisible} timeout={1000}>
              <Typography
                variant="h3"
                gutterBottom
                sx={{
                  color: "#fc8403",
                  fontWeight: "bold",
                  fontSize: "2.8rem",
                  letterSpacing: "0.05em",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                Privacy Policy
              </Typography>
            </Fade>
          </Box>

          {/* Policy Content */}
          <Paper
            elevation={3}
            sx={{
              borderRadius: "30px",
              overflow: "hidden",
              backgroundColor: "transparent",
              padding: { xs: 1, md: 8 },
            }}
          >
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <Box
                  sx={{
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                >
                  <Fade in={isVisible} timeout={1000 + sectionIndex * 500}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: "#fc8403", fontWeight: "bold" }}
                    >
                      {section.title}
                    </Typography>
                  </Fade>
                  {section.content.map((line, lineIndex) => (
                    <Fade
                      in={isVisible}
                      timeout={1200 + sectionIndex * 500 + lineIndex * 500}
                      key={lineIndex}
                    >
                      <Typography>{line}</Typography>
                    </Fade>
                  ))}
                </Box>
                <Divider sx={{ my: 2 }} />
              </div>
            ))}
          </Paper>
        </Container>
      </Box>
    </div>
  );
};

export default PrivacyPolicy;

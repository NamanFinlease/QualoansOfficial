import React, { useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Paper,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { keyframes } from "@mui/system";
import Header from "../navbar/Header";

const FAQs = () => {
  // Animation for lines coming in one by one
  const lineAnimation = keyframes`
        0% {
            opacity: 0;
            transform: translateY(20px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    `;
  useEffect(() => {
    // Schema for structured data (JSON-LD) for FAQPage
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is QUA Loan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "QUA Loan is an online platform offering quick and hassle-free personal loans to salaried individuals. As part of Naman Finlease Private Limited (An RBI registered NBFC), we aim to provide accessible financial solutions to meet your personal needs, whether it's for emergencies, home improvement, or celebrations.",
          },
        },
        {
          "@type": "Question",
          name: "Who is eligible to apply for a personal loan from QUA Loan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "To be eligible for a personal loan, you must be:\n• A salaried individual\n• Aged between 21 and 60 years\n• Employed with a recognized organization for at least 6 months\n• Earning a minimum monthly salary as per our criteria.",
          },
        },
        {
          "@type": "Question",
          name: "What documents are required to apply for a personal loan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You will need to submit the following documents:\n• Proof of identity (Aadhaar, PAN card, passport, etc.)\n• Proof of address (utility bills, Aadhaar, etc.)\n• Salary slips for the last three months\n• Bank statements for the last six months.",
          },
        },
        {
          "@type": "Question",
          name: "How much can I borrow from Qua Loan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Qua Loan offers personal loans ranging from ₹5,000 to ₹1,00,000 depending on your salary, repayment capacity, and credit score.",
          },
        },
        {
          "@type": "Question",
          name: "What is the interest rate on personal loans at Qua Loan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The interest rate varies based on your credit profile, loan amount, and tenure. Typically, our rates are competitive and designed to be affordable for salaried individuals. Contact us to get a personalized quote.",
          },
        },
        {
          "@type": "Question",
          name: "How long does it take to get the loan approved and disbursed?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Once you submit your application and documents, our team processes your request quickly. Loan approval usually takes a few minutes, and funds are disbursed within 5 minutes upon approval.",
          },
        },
        {
          "@type": "Question",
          name: "Can I repay my loan early?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Qua Loan allows early repayment of loans. Please review your loan agreement or contact us for details.",
          },
        },
        {
          "@type": "Question",
          name: "How does Qua Loan assess my creditworthiness?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We assess your loan eligibility based on factors such as your monthly income, credit score, job stability, and repayment history. A good credit score increases your chances of getting approved with a favorable interest rate.",
          },
        },
        {
          "@type": "Question",
          name: "Can I apply for a loan if I have a low credit score?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, you can still apply for a loan with a low credit score. However, the approval decision and interest rate may vary based on your overall financial profile and ability to repay the loan.",
          },
        },
        {
          "@type": "Question",
          name: "How do I repay my loan to Qua Loan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can repay your loan through various payment options such as NACH (National Automated Clearing House), direct debit, or online payments via our website.",
          },
        },
        {
          "@type": "Question",
          name: "Is my personal and financial information safe with Qua Loan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. Qua Loan uses advanced security measures, including encryption and secure servers, to ensure your personal and financial data is protected. We adhere to all data privacy regulations and take confidentiality seriously.",
          },
        },
        {
          "@type": "Question",
          name: "Can I check the status of my loan application?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, you can easily track the status of your loan application through our website by logging into your account. You will also receive updates via email and SMS at each stage of the process.",
          },
        },
        {
          "@type": "Question",
          name: "How can I contact customer support for further assistance?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can reach our customer support team through our website's contact form, by email at support@qualoan.com, or by calling our helpline during business hours. We're here to assist you with any questions or concerns.",
          },
        },
      ],
    };

    // Add the schema to the document's head
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

    // Cleanup function to remove the schema when the component is unmounted
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      {/* <Header/> */}
      <Box
        sx={{
          mt: 5,
          padding: 4,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            padding: "2rem",
            borderRadius: "10px",
            width: "100%",
            maxWidth: "800px",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              color: "navy",
              mb: 4,
              fontSize: "3rem",
              padding: "0.5rem",
              borderRadius: "8px",
              "&:hover": {
                color: "orange",
              },
            }}
          >
            Frequently Asked Questions
          </Typography>
          <Paper
            elevation={6}
            sx={{
              borderRadius: "8px",
              overflow: "hidden",
              backgroundColor: "transparent",
            }}
          >
            <div className="accordion-wrapper">
              {[
                {
                  id: "faq1",
                  question: "1. What is QUA Loan?",
                  answer: `QUA Loan is an online platform offering quick and hassle-free personal loans to salaried individuals. As part of Naman Finlease Private Limited (An RBI registered NBFC), we aim to provide accessible financial solutions to meet your personal needs, whether it's for emergencies, home improvement, or celebrations.`,
                },
                {
                  id: "faq2",
                  question:
                    "2. Who is eligible to apply for a personal loan from QUA Loan?",
                  answer: `To be eligible for a personal loan, you must be:
            • A salaried individual
            • Aged between 21 and 60 years
            • Employed with a recognized organization for at least 6 months
            • Earning a minimum monthly salary as per our criteria`,
                },
                {
                  id: "faq3",
                  question:
                    "3. What documents are required to apply for a personal loan?",
                  answer: `You will need to submit the following documents:
            • Proof of identity (Aadhaar, PAN card, passport, etc.)
            • Proof of address (utility bills, Aadhaar, etc.)
            • Salary slips for the last three months
            • Bank statements for the last six months`,
                },
                {
                  id: "faq4",
                  question: "4. How much can I borrow from Qua Loan?",
                  answer: `Qua Loan offers personal loans ranging from ₹5,000 to ₹1,00,000 depending on your salary, repayment capacity, and credit score.`,
                },
                {
                  id: "faq5",
                  question:
                    "5. What is the interest rate on personal loans at Qua Loan?",
                  answer: `The interest rate varies based on your credit profile, loan amount, and tenure. Typically, our rates are competitive and designed to be affordable for salaried individuals. Contact us to get a personalized quote.`,
                },
                {
                  id: "faq6",
                  question:
                    "6. How long does it take to get the loan approved and disbursed?",
                  answer: `Once you submit your application and documents, our team processes your request quickly. Loan approval usually takes a few minutes, and funds are disbursed within 5 minutes upon approval.`,
                },
                {
                  id: "faq7",
                  question: "7. Can I repay my loan early?",
                  answer: `Yes, Qua Loan allows early repayment of loans. Please review your loan agreement or contact us for details.`,
                },
                {
                  id: "faq8",
                  question: "8. How does Qua Loan assess my creditworthiness?",
                  answer: `We assess your loan eligibility based on factors such as your monthly income, credit score, job stability, and repayment history. A good credit score increases your chances of getting approved with a favorable interest rate.`,
                },
                {
                  id: "faq9",
                  question:
                    "9. Can I apply for a loan if I have a low credit score?",
                  answer: `Yes, you can still apply for a loan with a low credit score. However, the approval decision and interest rate may vary based on your overall financial profile and ability to repay the loan.`,
                },
                {
                  id: "faq10",
                  question: "10. How do I repay my loan to Qua Loan?",
                  answer: `You can repay your loan through various payment options such as NACH (National Automated Clearing House), direct debit, or online payments via our website.`,
                },
                {
                  id: "faq11",
                  question:
                    "11. Is my personal and financial information safe with Qua Loan?",
                  answer: `Absolutely. Qua Loan uses advanced security measures, including encryption and secure servers, to ensure your personal and financial data is protected. We adhere to all data privacy regulations and take confidentiality seriously.`,
                },
                {
                  id: "faq12",
                  question:
                    "12. Can I check the status of my loan application?",
                  answer: `Yes, you can easily track the status of your loan application through our website by logging into your account. You will also receive updates via email and SMS at each stage of the process.`,
                },
                {
                  id: "faq13",
                  question:
                    "13. How can I contact customer support for further assistance?",
                  answer: `You can reach our customer support team through our website's contact form, by email at support@qualoan.com, or by calling our helpline during business hours. We're here to assist you with any questions or concerns.`,
                },
              ].map((faq, index) => (
                <Accordion
                  key={faq.id}
                  sx={{
                    fontFamily: "cursive",
                    marginBottom: "1rem",
                    backgroundColor: "transparent",
                    animation: `${lineAnimation} 0.5s ease-in-out ${
                      index * 0.2
                    }s forwards`,
                    opacity: 0,
                    transform: "translateY(20px)",
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon
                        sx={{
                          color: "black", // Default color is black
                          transition: "color 0.3s ease", // Smooth color transition
                          ".Mui-expanded &": {
                            color: "black", // Change to white when expanded
                          },
                          "&:hover": {
                            color: "white", // White icon on hover
                          },
                        }}
                      />
                    }
                    aria-controls={`${faq.id}-content`}
                    id={`${faq.id}-header`}
                    sx={{
                      color: "black",
                      "&:hover": {
                        backgroundImage:
                          "linear-gradient(270deg, hsla(188, 100%, 59%, 0.163), rgba(102, 0, 255, 0.108), #fff38739)",
                        color: "orange",
                      },
                      "&.Mui-expanded": {
                        backgroundImage:
                          "linear-gradient(270deg, hsla(188, 100%, 59%, 0.163), rgba(102, 0, 255, 0.108), #fff38739)",
                        color: "orange",
                      },
                    }}
                  >
                    <Typography>{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      animation: `${lineAnimation} 0.5s ease-in-out`,
                    }}
                  >
                    <Typography>{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default FAQs;

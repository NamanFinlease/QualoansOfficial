import React, { useEffect } from "react";
import { Box, Typography, Container, Paper, Divider } from "@mui/material";
import { Fade } from "@mui/material";
import Header from "../navbar/Header";

const TermsAndConditions = () => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Terms and Conditions - QUA Loan",
      url: "https://www.qualoan.com/terms-condition",
      description:
        "The Terms and Conditions page of QUA Loan outlines the legal agreement between you and Naman Finlease Private Limited, governing the use of our website and services.",
      mainEntity: {
        "@type": "Article",
        headline: "Terms and Conditions",
        author: {
          "@type": "Organization",
          name: "Qualoan",
        },
        publisher: {
          "@type": "Organization",
          name: "Qualoan",
          url: "https://www.qualoan.com",
          logo: "https://www.qualoan.com/assets/Artboard%201-B9NCLcrg.webp",
        },
        datePublished: "2024-01-01",
        dateModified: "2024-01-01",
        text: "1. Introduction: QUA Loan provides personal loans to salaried individuals under the regulatory oversight of Naman Finlease Private Limited. 2. Eligibility Criteria: Applicants must be 21-60 years old, salaried, meet income criteria, and have a satisfactory credit score. 3. Loan Application Process: Includes registration, document submission, and credit assessment. 4. Loan Terms: Loan amounts, interest rates, and repayment schedules based on the applicant’s profile. 5. Fees and Charges: May include processing fees, late payment charges, and other fees. 6. Loan Disbursement: Upon approval, funds are credited directly to the bank account. 7. Loan Repayment: Repayments via NACH, UPI, or other methods. 8. Default and Consequences: Late payments result in additional fees, negative credit reporting, and legal action. 9. Cancellation of Loan: Loan can be canceled before disbursement. After disbursement, prepayment is allowed with conditions. 10. Data Privacy and Security: We ensure secure handling of your personal and financial information. 11. User Responsibilities: Accurate information must be provided during registration and application. 12. Amendments to Terms: Terms can be modified and will be posted on the website. 13. Dispute Resolution: Disputes resolved under the jurisdiction of Delhi courts. 14. Limitation of Liability: Limited liability for losses except as stated in the loan agreement. 15. Governing Law: These terms are governed by Indian laws.",
      },
      publisher: {
        "@type": "Organization",
        name: "Qualoan",
        url: "https://www.qualoan.com",
        logo: "https://www.qualoan.com/assets/Artboard%201-B9NCLcrg.webp",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+917338437609",
          contactType: "Customer Service",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi", "Kannada"],
          email: "info@qualoan.com",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Office No. 229, 2nd Floor, Vipul Agora Mall, MG Road",
          addressLocality: "Gurugram",
          addressRegion: "Haryana",
          postalCode: "122001",
          addressCountry: "IN",
        },
      },
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
    <div>
      {/* <Header/> */}
      <Box
        sx={{
          mt: { xs: "10%", md: "5%" },
          minHeight: "100vh",
          padding: "30px",
          // backgroundColor: '#f9f9f9',
        }}
      >
        <Container maxWidth="lg">
          {/* Prominent Heading */}
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Fade in timeout={1000}>
              <Typography
                variant="h3"
                gutterBottom
                sx={{
                  color: "navy",
                  fontWeight: "bold",
                  fontSize: "36px",
                  letterSpacing: "0.05em",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": { transform: "scale(1.05)", color: "#fc8403" },
                }}
              >
                Terms and Conditions
              </Typography>
            </Fade>
          </Box>

          {/* Terms and Conditions Content */}
          <Paper
            elevation={3}
            sx={{
              borderRadius: "30px",
              overflow: "hidden",
              backgroundColor: "transparent",
              padding: { xs: 3, md: 8 },
            }}
          >
            <Box
              sx={{
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: "navy",
                  "&:hover": { color: "#fc8403" },
                }}
              >
                Welcome to QUA Loan. By accessing and using this website or
                applying for any of our loan products, you agree to comply with
                the terms and conditions outlined here.
              </Typography>
              <Typography>
                These Terms and Conditions constitute a legal agreement between
                you and Naman Finlease Private Limited (an NBFC registered with
                RBI for lending purposes), which governs your use of our website
                and services. Please read these terms carefully. If you do not
                agree with these terms, you should refrain from using this
                website or applying for loans through QUA Loan.
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "navy",
                  fontWeight: "bold",
                  "&:hover": { color: "#fc8403" },
                }}
              >
                1. Introduction
              </Typography>
              <Typography>
                QUA Loan provides personal loans to salaried individuals under
                the regulatory oversight of Naman Finlease Private Limited, an
                NBFC registered with the RBI. Our primary goal is to provide
                instant, easy, and transparent financial solutions to help
                individuals manage their personal finances.
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "navy",
                  fontWeight: "bold",
                  "&:hover": { color: "#fc8403" },
                }}
              >
                2. Eligibility Criteria
              </Typography>
              <Typography>
                To apply for a personal loan with QUA Loan, you must meet the
                following eligibility requirements:
              </Typography>
              <ul>
                <li>
                  Be at least 21 years old and not older than 60 at the time of
                  loan application.
                </li>
                <li>
                  Be a salaried individual with stable income from a recognized
                  organization.
                </li>
                <li>
                  Meet the minimum monthly income criteria defined by Naman
                  Finlease Private Limited.
                </li>
                <li>
                  Be a resident of India with a satisfactory credit score and
                  financial history.
                </li>
              </ul>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "navy",
                  fontWeight: "bold",
                  "&:hover": { color: "#fc8403" },
                }}
              >
                3. Loan Application Process
              </Typography>
              <Typography>
                The loan application process at QUA Loan includes registration,
                filling out the application form, document submission, and
                credit assessment. Approval of loans is at the sole discretion
                of Naman Finlease Private Limited.
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "navy",
                  fontWeight: "bold",
                  "&:hover": { color: "#fc8403" },
                }}
              >
                4. Loan Terms
              </Typography>
              <Typography>
                Loan amount, interest rates, and repayment schedules are
                determined based on the applicant’s profile. The interest rate
                will remain fixed for the entire loan tenure.
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "navy",
                  fontWeight: "bold",
                  "&:hover": { color: "#fc8403" },
                }}
              >
                5. Fees and Charges
              </Typography>
              <Typography>
                Applicable fees may include a processing fee, late payment
                charges, prepayment penalties, and other fees as outlined in the
                loan agreement.
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "navy",
                  fontWeight: "bold",
                  "&:hover": { color: "#fc8403" },
                }}
              >
                6. Loan Disbursement
              </Typography>
              <Typography>
                Upon approval of your loan application and completion of
                required formalities, the loan amount will be credited directly
                to your bank account. The times of disbursing your loan amount
                may vary depending on internal processes, but QUA Loan strives
                to ensure quick and efficient transfer of funds.
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "navy",
                  fontWeight: "bold",
                  "&:hover": { color: "#fc8403" },
                }}
              >
                7. Loan Repayment
              </Typography>
              <Typography>
                Repayment must be made as per the terms set forth in your loan
                agreement. Loan repayments will be deducted automatically via
                NACH mandate or through other digital methods such as UPI,
                Payment Gateway, etc. Early repayment is allowed; however,
                prepayment penalties may apply.
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "navy",
                  fontWeight: "bold",
                  "&:hover": { color: "#fc8403" },
                }}
              >
                8. Default and Consequences
              </Typography>
              <Typography>
                Failure to repay the loan on time may result in additional late
                payment fees, negative reporting to credit bureaus, and legal
                action to recover outstanding amounts.
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "navy",
                  fontWeight: "bold",
                  "&:hover": { color: "#fc8403" },
                }}
              >
                9. Cancellation of Loan
              </Typography>
              <Typography>
                You may cancel your loan application at any stage before
                disbursement. After disbursement, cancellation is not possible.
                However, prepayment is allowed subject to terms outlined in the
                agreement.
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "navy",
                  fontWeight: "bold",
                  "&:hover": { color: "#fc8403" },
                }}
              >
                10. Data Privacy and Security
              </Typography>
              <Typography>
                We take your privacy seriously. All personal and financial
                information will be securely handled in compliance with data
                protection laws. We collect and use your data for loan
                processing and communication only.
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "navy",
                  fontWeight: "bold",
                  "&:hover": { color: "#fc8403" },
                }}
              >
                11. User Responsibilities
              </Typography>
              <Typography>
                You agree to provide accurate information during registration
                and the loan application process. Misrepresentation may result
                in denial of service or legal action.
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "navy",
                  fontWeight: "bold",
                  "&:hover": { color: "#fc8403" },
                }}
              >
                12. Amendments to Terms
              </Typography>
              <Typography>
                We reserve the right to modify or update these terms and
                conditions at any given time. The updated terms will be posted
                on the website, and it is your responsibility to stay informed.
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "navy",
                  fontWeight: "bold",
                  "&:hover": { color: "#fc8403" },
                }}
              >
                13. Dispute Resolution
              </Typography>
              <Typography>
                In case of any disputes, we will attempt to resolve them
                amicably. If not, the dispute shall be resolved under the
                jurisdiction of the courts in Delhi, India.
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "navy",
                  fontWeight: "bold",
                  "&:hover": { color: "#fc8403" },
                }}
              >
                14. Limitation of Liability
              </Typography>
              <Typography>
                Naman Finlease Private Limited shall not be liable for any loss,
                damage, or inconvenience arising out of the use of this website
                or services, except as expressly stated in the loan agreement.
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "navy",
                  fontWeight: "bold",
                  "&:hover": { color: "#fc8403" },
                }}
              >
                15. Governing Law
              </Typography>
              <Typography>
                These Terms and Conditions shall be governed by and construed in
                accordance with the laws of India.
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </div>
  );
};

export default TermsAndConditions;

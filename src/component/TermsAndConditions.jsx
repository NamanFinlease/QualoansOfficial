import React from 'react';
import { Box, Typography, Container, Paper, Divider } from '@mui/material';
import { Fade } from '@mui/material';
import backgroundImg from '../assets/image/Contact Us Frame 1.png';

const TermsAndConditions = () => {
    return (
        <div>
            <Box 
                sx={{ 
                    background: `url(${backgroundImg}) center/cover no-repeat`,
                    minHeight: '100vh',
                    padding: '30px',
                    backgroundColor: '#f9f9f9',
                }}
            >
                <Container maxWidth="lg">
                    {/* Prominent Heading */}
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                        <Fade in timeout={1000}>
                            <Typography 
                                variant="h3" 
                                gutterBottom 
                                sx={{    
                                    color: 'black', 
                                    fontWeight: 'bold', 
                                    fontSize: '36px', 
                                    letterSpacing: '0.05em',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': { transform: 'scale(1.05)' }
                                }}
                            >
                                Terms and Conditions
                            </Typography>
                        </Fade>
                    </Box>

                    {/* Terms and Conditions Content */}
                    <Paper elevation={3} sx={{ borderRadius: '8px', overflow: 'hidden' ,  backgroundColor: 'transparent',  padding:{xs:1,md:8}}}>
                        <Box sx={{ transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.05)' } }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                Welcome to QUAloan.com. By accessing and using this website or applying for any of our loan products, you agree to comply with the terms and conditions outlined here.
                            </Typography>
                            <Typography>
                                These Terms and Conditions constitute a legal agreement between you and Naman Finlease Private Limited (an NBFC registered with RBI for lending purposes), which governs your use of our website and services. Please read these terms carefully. If you do not agree with these terms, you should refrain from using this website or applying for loans through QUAloan.com.
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.05)' } }}>
                            <Typography variant="h6" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>
                                1. Introduction
                            </Typography>
                            <Typography>
                                QUAloan.com provides personal loans to salaried individuals under the regulatory oversight of Naman Finlease Private Limited, an NBFC registered with the RBI. Our primary goal is to provide seamless, easy, and transparent financial solutions to help individuals manage their personal finances.
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.05)' } }}>
                            <Typography variant="h6" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>
                                2. Eligibility Criteria
                            </Typography>
                            <Typography>
                                To apply for a personal loan with QUAloan.com, you must meet the following eligibility requirements:
                            </Typography>
                            <ul>
                                <li>Be at least 21 years old and not older than 60 at the time of loan application.</li>
                                <li>Be a salaried individual with steady income from a recognized organization.</li>
                                <li>Meet the minimum monthly income criteria defined by Naman Finlease Private Limited.</li>
                                <li>Be a resident of India with a satisfactory credit score and financial history.</li>
                            </ul>
                        </Box>
                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.05)' } }}>
                            <Typography variant="h6" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>
                                3. Loan Application Process
                            </Typography>
                            <Typography>
                                The loan application process at QUAloan.com includes registration, filling out the application form, document submission, and credit assessment. Approval of loans is at the sole discretion of Naman Finlease Private Limited.
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.05)' } }}>
                            <Typography variant="h6" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>
                                4. Loan Terms
                            </Typography>
                            <Typography>
                                Loan amounts, interest rates, and repayment schedules are determined based on the applicant’s profile. The interest rate will remain fixed for the entire loan tenure.
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.05)' } }}>
                            <Typography variant="h6" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>
                                5. Fees and Charges
                            </Typography>
                            <Typography>
                                Applicable fees may include a processing fee, late payment charges, prepayment penalties, and other fees as outlined in the loan agreement.
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.05)' } }}>
                            <Typography variant="h6" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>
                                6. Loan Disbursement
                            </Typography>
                            <Typography>
                                Upon approval of your loan application and completion of required formalities, the loan amount will be credited directly to your bank account. Disbursement times may vary depending on internal processes, but QUAloan.com strives to ensure quick and efficient transfer of funds.
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.05)' } }}>
                            <Typography variant="h6" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>
                                7. Loan Repayment
                            </Typography>
                            <Typography>
                                Repayment must be made as per the terms set forth in your loan agreement. Loan repayments will be deducted automatically via NACH mandate or through other digital methods such as UPI, Payment Gateway, etc. Early repayment is allowed; however, prepayment penalties may apply.
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.05)' } }}>
                            <Typography variant="h6" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>
                                8. Default and Consequences
                            </Typography>
                            <Typography>
                                Failure to repay the loan on time may result in additional late payment fees, negative reporting to credit bureaus, and legal action to recover outstanding amounts.
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.05)' } }}>
                            <Typography variant="h6" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>
                                9. Cancellation of Loan
                            </Typography>
                            <Typography>
                                You may cancel your loan application at any stage before disbursement. After disbursement, cancellation is not possible. However, prepayment is allowed subject to terms outlined in the agreement.
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.05)' } }}>
                            <Typography variant="h6" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>
                                10. Data Privacy and Security
                            </Typography>
                            <Typography>
                                We take your privacy seriously. All personal and financial information will be securely handled in compliance with data protection laws. We collect and use your data for loan processing and communication only.
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.05)' } }}>
                            <Typography variant="h6" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>
                                11. User Responsibilities
                            </Typography>
                            <Typography>
                                You agree to provide accurate information during registration and the loan application process. Misrepresentation may result in denial of service or legal action.
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.05)' } }}>
                            <Typography variant="h6" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>
                                12. Amendments to Terms
                            </Typography>
                            <Typography>
                                We reserve the right to modify or update these terms and conditions at any time. The updated terms will be posted on the website, and it is your responsibility to stay informed.
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.05)' } }}>
                            <Typography variant="h6" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>
                                13. Dispute Resolution
                            </Typography>
                            <Typography>
                                In case of any disputes, we will attempt to resolve them amicably. If not, the dispute shall be resolved under the jurisdiction of the courts in Delhi, India.
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.05)' } }}>
                            <Typography variant="h6" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>
                                14. Limitation of Liability
                            </Typography>
                            <Typography>
                                Naman Finlease Private Limited shall not be liable for any loss, damage, or inconvenience arising out of the use of this website or services, except as expressly stated in the loan agreement.
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.05)' } }}>
                            <Typography variant="h6" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>
                                15. Governing Law
                            </Typography>
                            <Typography>
                                These Terms and Conditions shall be governed by and construed in accordance with the laws of India.
                            </Typography>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </div>
    );
};

export default TermsAndConditions;

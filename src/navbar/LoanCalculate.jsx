import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { useInView } from 'react-intersection-observer';

const LoanCalculate = () => {
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.1,
    });

    return (
        <Box
            sx={{
                overflowY: 'hidden',
                backgroundColor: '#f9f9f9',
                height: 'auto', // Use auto height for responsiveness
                minHeight: '130vh', // Minimum height
                position: 'relative',
                overflow: 'hidden',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'black',
            }}
        >
            <Typography
                variant="h2"
                sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    mb: 4,
                    mt: 10,
                    color:'#fc8403',
                    fontSize: '3rem',
                    '&:hover': {
                        color: 'orange',
                    },
                    '@media (max-width: 600px)': {
                        fontSize: '2rem',
                    },
                }}
            >
                Your Dreams, Our Priority
            </Typography>

            <Grid container spacing={2} ref={ref} sx={{ px: { xs: 1, md: 4 } }}>
                {/* First Column */}
                <Grid item xs={12} md={6}>
                    <Paper
                        elevation={3}
                        sx={{
                            paddingY: 3,
                            paddingX: 6,
                            mt: 2,
                            mb: 4,
                            mx: 2,
                            borderRadius: '40px',
                            backgroundColor: 'rgb(47, 47, 47)',
                            color: 'white',
                            minHeight: '250px', // Set a minimum height for the box
                            height: 'auto', // Auto height to allow for flexibility
                            border: '2px solid white',
                            position: 'relative',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            opacity: inView ? 1 : 0,
                            transform: inView ? 'translateY(0)' : 'translateY(-20px)',
                            animation: inView ? 'slideIn 0.5s forwards' : 'none',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.2)',
                            },
                            '@media (max-width: 600px)': {
                                height: 'auto', // Adjust height for small screens
                                paddingX: 3, // Decrease padding on small screens
                                marginBottom: 2, // Reduce margin on small screens
                            },
                        }}
                    >
                        <Typography variant="h5" fontWeight={550} component="strong" color="white" sx={{ mt: 4 ,'&:hover': {color:'#fc8403',}, }}>
                        Facing Health Concerns ? No Worries Anymore!
                        </Typography>
                        <Typography variant="h6" color="inherit" sx={{ mt: 1 }}>
                            Got hefty medical bills or emergencies? Don’t worry, here to help you take care of your loved ones without having financial worries!
                        </Typography>
                    </Paper>

                    <Paper
                        elevation={3}
                        sx={{
                            paddingY: 3,
                            paddingX: 6,
                            mt: 2,
                            mb: 4,
                            mx: 2,
                            borderRadius: '40px',
                            backgroundColor: 'rgb(47, 47, 47)',
                            color: 'white',
                            minHeight: '250px', // Set a minimum height for the box
                            height: 'auto', // Auto height to allow for flexibility
                            border: '2px solid white',
                            position: 'relative',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            opacity: inView ? 1 : 0,
                            transform: inView ? 'translateY(0)' : 'translateY(-20px)',
                            animation: inView ? 'slideIn 0.5s forwards' : 'none',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.2)',
                            },
                            '@media (max-width: 600px)': {
                                height: 'auto', // Adjust height for small screens
                                paddingX: 3, // Decrease padding on small screens
                                marginBottom: 2, // Reduce margin on small screens
                            },
                        }}
                    >
                         <Typography variant="h5" fontWeight={550} component="strong" color="inherit" sx={{ mt: 4 ,'&:hover': {color:'#fc8403',}, }}>
                         Easy-to-Pay Card Payments          
                                       </Typography>
                        <Typography variant="h6" color="inherit" sx={{ mt: 1 }}>
                        Tired of juggling between multiple credit card payments? No worries, combine them into one easy loan with fixed rates and a clear payback plan. Simplify your payments and pay off faster!                        </Typography>
                    </Paper>
                </Grid>

                {/* Second Column */}
                <Grid item xs={12} md={6}>
                <Paper
                        elevation={3}
                        sx={{
                            paddingY: 3,
                            paddingX: 6,
                            mt: 2,
                            mb: 4,
                            mx: 2,
                            borderRadius: '40px',
                            backgroundColor: 'rgb(47, 47, 47)',
                            color: 'white',
                            minHeight: '250px', // Set a minimum height for the box
                            height: 'auto', // Auto height to allow for flexibility
                            border: '2px solid white',
                            position: 'relative',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            opacity: inView ? 1 : 0,
                            transform: inView ? 'translateY(0)' : 'translateY(-20px)',
                            animation: inView ? 'slideIn 0.5s forwards' : 'none',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.2)',
                            },
                            '@media (max-width: 600px)': {
                                height: 'auto', // Adjust height for small screens
                                paddingX: 3, // Decrease padding on small screens
                                marginBottom: 2, // Reduce margin on small screens
                            },
                        }}
                    >
                         <Typography variant="h5" fontWeight={550} component="strong" color="inherit" sx={{ mt: 4 ,'&:hover': {color:'#fc8403',}, }}>
                        Enjoy Your D-Day With Zero Stress
                        </Typography>
                        <Typography variant="h6" color="inherit" sx={{ mt: 1 }}>
                            Your big day should be the most magical experience ever. That’s why we offer quick loans to make sure your wedding is a stress-free experience for you and your loved ones.
                        </Typography>
                    </Paper>

                    <Paper
                        elevation={3}
                        sx={{
                            paddingY: 3,
                            paddingX: 6,
                            mt: 2,
                            mb: 4,
                            mx: 2,
                            borderRadius: '40px',
                            backgroundColor: 'rgb(47, 47, 47)',
                            color: 'white',
                            minHeight: '250px', // Set a minimum height for the box
                            height: 'auto', // Auto height to allow for flexibility
                            border: '2px solid white',
                            position: 'relative',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            opacity: inView ? 1 : 0,
                            transform: inView ? 'translateY(0)' : 'translateY(-20px)',
                            animation: inView ? 'slideIn 0.5s forwards' : 'none',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.2)',
                            },
                            '@media (max-width: 600px)': {
                                height: 'auto', // Adjust height for small screens
                                paddingX: 3, // Decrease padding on small screens
                                marginBottom: 2, // Reduce margin on small screens
                            },
                        }}
                    >
                        <Typography variant="h5" fontWeight={550} component="strong" color="inherit" sx={{ mt: 4 ,'&:hover': {color:'#fc8403',}, }}>
                        Consolidate Your Debt. Boost Your Score
                        </Typography>
                        <Typography variant="h6" color="inherit" sx={{ mt: 1 }}>
                            Say goodbye to mounting debts. Consolidate your loans into one manageable payment  to enhance your credit score.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LoanCalculate;

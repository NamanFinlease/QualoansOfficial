import { Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "react";

const BlueBoxCard = () => {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });

  return (
    <div ref={ref}>
      <Box
        sx={{
          backgroundColor: "rgb(72, 145, 193)", // Light blue color
          padding: 2,
          borderRadius: 2,
          display: "flex",
          flexDirection: "row",
          gap: 2,
          color: "white",
        }}
      >
        <Box
          sx={{
            padding: 2,
            width: "50%",
            borderRadius: 1,
            textAlign: "center",
          }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={
              inView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }
            }
            transition={{ duration: 1 }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              Instant Cash Loan
            </Typography>
            <Typography>
              Instant cash loans provide quick financial assistance with a short
              processing time. The funds are credited instantly, and repayment
              is done on a daily, weekly, or monthly basis. These loans are
              ideal for urgent financial needs!
            </Typography>
          </motion.div>
        </Box>

        <Box
          sx={{
            padding: 2,
            width: "50%",
            borderRadius: 1,
            textAlign: "center",
          }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={
              inView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }
            }
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              Emergency Loan
            </Typography>
            <Typography>
              An emergency loan is designed to provide quick financial relief
              during unexpected situations. These loans usually come with fixed
              interest rates, structured monthly repayments, and do not require
              collateral. They are ideal for handling urgent expenses with ease!
            </Typography>
          </motion.div>
        </Box>
      </Box>
    </div>
  );
};

export default BlueBoxCard;

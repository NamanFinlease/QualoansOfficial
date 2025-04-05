import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DescriptionIcon from "@mui/icons-material/Description";

const EligibilityCriteria = () => {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div ref={ref}>
      <Box
        sx={{
          backgroundColor: "rgb(72, 145, 193)",
          padding: 3,
          // borderRadius: 2,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
          color: "white",
          boxShadow: 3,
        }}
      >
        {/* Left Box - Eligibility Criteria */}
        <Box
          sx={{ padding: 2, width: isMobile ? "100%" : "50%", borderRadius: 1 }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={
              inView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }
            }
            transition={{ duration: 1 }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mb: 2, textAlign: "left" }}
            >
              ✅ Eligibility Criteria
            </Typography>
            <List>
              {[
                "Should be an Indian Resident",
                "Salaried Employee (Salary must be ≥ ₹35,000)",
                "Above 21 years of age is mandatory",
                "Must have a Salary Bank Account",
              ].map((text, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: "#ffeb3b" }} />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </motion.div>
        </Box>

        {/* Right Box - Documents Required */}
        <Box
          sx={{ padding: 2, width: isMobile ? "100%" : "50%", borderRadius: 1 }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={
              inView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }
            }
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mb: 2, textAlign: "left" }}
            >
              📄 Documents Required
            </Typography>
            <List>
              {[
                "Completed Registration process with a recent photograph",
                "PAN Card and Aadhaar Card required",
                "Residence Proof (Driving License, Voter ID, Passport, Electricity Bills, Postpaid/Landline Bill)",
                "Last 6 months bank statements of the salary account",
                "Last 3 months Salary Slips",
              ].map((text, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <DescriptionIcon sx={{ color: "#ffeb3b" }} />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </motion.div>
        </Box>
      </Box>
    </div>
  );
};

export default EligibilityCriteria;

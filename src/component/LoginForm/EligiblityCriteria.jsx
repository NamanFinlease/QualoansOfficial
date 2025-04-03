import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Icon for eligibility
import DescriptionIcon from "@mui/icons-material/Description"; // Icon for documents

const EligibilityCriteria = () => {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });

  return (
    <div ref={ref}>
      <Box
        sx={{
          backgroundColor: "rgb(72, 145, 193)", // Light blue color
          padding: 3,
          borderRadius: 2,
          display: "flex",
          flexDirection: "row",
          gap: 2,
          color: "white",
          boxShadow: 3,
        }}
      >
        {/* Left Box - Eligibility Criteria */}
        <Box sx={{ padding: 2, width: "50%", borderRadius: 1 }}>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={
              inView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }
            }
            transition={{ duration: 1 }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, mb: 2, textAlign: "left" }}
            >
              ✅ Eligibility Criteria
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon sx={{ color: "#ffeb3b" }} />
                </ListItemIcon>
                <ListItemText primary="Should be an Indian Resident" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon sx={{ color: "#ffeb3b" }} />
                </ListItemIcon>
                <ListItemText primary="Salaried Employee(Salary must =>35000) " />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon sx={{ color: "#ffeb3b" }} />
                </ListItemIcon>
                <ListItemText primary="Above 21 years of age is mandatory" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon sx={{ color: "#ffeb3b" }} />
                </ListItemIcon>
                <ListItemText primary="Must have a Salary Bank Account" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon sx={{ color: "#ffeb3b" }} />
                </ListItemIcon>
                <ListItemText primary="CIBIL Score should be Fair" />
              </ListItem>
            </List>
          </motion.div>
        </Box>

        {/* Right Box - Documents Required */}
        <Box sx={{ padding: 2, width: "50%", borderRadius: 1 }}>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={
              inView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }
            }
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, mb: 2, textAlign: "left" }}
            >
              📄 Documents Required
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <DescriptionIcon sx={{ color: "#ffeb3b" }} />
                </ListItemIcon>
                <ListItemText primary="Completed Registration process with a recent photograph" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DescriptionIcon sx={{ color: "#ffeb3b" }} />
                </ListItemIcon>
                <ListItemText primary="PAN Card and Aadhaar Card required" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DescriptionIcon sx={{ color: "#ffeb3b" }} />
                </ListItemIcon>
                <ListItemText primary="Residence Proof (Driving License, Voter ID, Passport, Electricity Bills, Postpaid/Landline Bill)" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DescriptionIcon sx={{ color: "#ffeb3b" }} />
                </ListItemIcon>
                <ListItemText primary="Last 6  months bank statements of the salary account" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DescriptionIcon sx={{ color: "#ffeb3b" }} />
                </ListItemIcon>
                <ListItemText primary="Last 3 months Salary Slips" />
              </ListItem>
            </List>
          </motion.div>
        </Box>
      </Box>
    </div>
  );
};

export default EligibilityCriteria;

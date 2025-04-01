import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  CircularProgress,
  Chip,
  useMediaQuery,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import WorkIcon from "@mui/icons-material/Work";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import Dashboard from "../Dashboard";
import UserProfile from "./UserProfile";
import BasicInformation from "./BasicInformation";
import ResidentialAddress from "./ResidentialAddress";
import IncomeInformation from "./IncomeInformation";
import LoanDetails from "./LoanDetails";
import EmploymentInformation from "./EmploymentInformation";
import DisbursalBankDetails from "./DisbursalBankDetails";
import DocumentUploadDetails from "./DocumentUploadDetails";
import { useSidebar } from "../../context/SidebarContext";

const items = [
  { label: "User Profile", value: "user-profile", icon: <AccountCircleIcon /> },
  {
    label: "Basic Information",
    value: "basic-information",
    icon: <InfoIcon />,
  },
  {
    label: "Residential Address",
    value: "residential-address",
    icon: <HomeIcon />,
  },
  {
    label: "Income Details",
    value: "income-details",
    icon: <span style={{ fontSize: "1.5rem" }}>₹</span>,
  },
  { label: "Loan Details", value: "loan-details", icon: <DescriptionIcon /> },
  {
    label: "Employment Information",
    value: "employment-information",
    icon: <WorkIcon />,
  },
  {
    label: "Disbursal Bank Details",
    value: "disbursal-bank-details",
    icon: <AccountBalanceIcon />,
  },
  { label: "Documents", value: "documents", icon: <DescriptionIcon /> },
];

export default function UserPreview() {
  const [activeComponent, setActiveComponent] = useState("user-profile");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { sidebarOpen, sidebarExpanded } = useSidebar();
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const renderComponent = () => {
    switch (activeComponent) {
      case "user-profile":
        return <UserProfile />;
      case "basic-information":
        return <BasicInformation />;
      case "residential-address":
        return <ResidentialAddress />;
      case "income-details":
        return <IncomeInformation />;
      case "loan-details":
        return <LoanDetails />;
      case "employment-information":
        return <EmploymentInformation />;
      case "disbursal-bank-details":
        return <DisbursalBankDetails />;
      case "documents":
        return <DocumentUploadDetails />;
    }
  };

  return (
    <>
      <Dashboard />
      {isSmallScreen && (
        <FormControl
          variant="outlined"
          sx={{
            mt: 4,
            width: `calc(90% - ${
              sidebarOpen ? (sidebarExpanded ? 240 : 70) : 0
            }px)`,
            marginLeft: `${sidebarOpen ? (sidebarExpanded ? 240 : 90) : 0}px`,
            transition: "width 0.3s ease, margin-left 0.3s ease",
            backgroundColor: "rgb(72, 145, 193)",
            borderRadius: 1,
          }}
        >
          <InputLabel
            id="component-select-label"
            sx={{
              color: "#1c1c1c", // Default color
              paddingX: 1,
              "&.Mui-focused": {
                color: "#1c1c1c", // Ensures the color remains #1c1c1c when focused
              },
              "&.MuiFormLabel-root.MuiInputLabel-shrink": {
                marginTop: 1, // Removes the margin when the label shrinks
                color: "white", // Ensures the color remains #1c1c1c when the label shrinks
              },
            }}
          >
            Application Progress
          </InputLabel>
          <Select
            labelId="component-select-label"
            value={activeComponent}
            onChange={(e) => setActiveComponent(e.target.value)}
            label="Select Component"
            sx={{
              backgroundColor: "rgb(72, 145, 193)",
              color: "#fff", // Ensures the text color is white
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "#fff",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#fff",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#fff",
              },
              ".MuiSvgIcon-root": {
                color: "#fff",
              },
            }}
          >
            {items.map((item) => (
              <MenuItem
                key={item.value}
                value={item.value}
                sx={{
                  backgroundColor:
                    activeComponent === item.value ? "#1c1c1c" : "#f26722", // Applies selected color
                  color: activeComponent === item.value ? "#fff" : "#fff", // Ensures text is readable
                  "&:hover": {
                    backgroundColor: "#e05c1a", // Slightly darker on hover
                  },
                  "&.Mui-selected": {
                    backgroundColor: "#1c1c1c !important", // Overrides Material-UI default selected color
                    color: "#fff", // Ensures text remains visible
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "#e05c1a", // Hover effect for selected item
                  },
                }}
              >
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          minHeight: "80vh",
          backgroundColor: "#fff",
          p: 3,
          pt: 4,
          width: `calc(100% - ${
            sidebarOpen ? (sidebarExpanded ? 240 : 70) : 0
          }px)`,
          marginLeft: `${sidebarOpen ? (sidebarExpanded ? 240 : 70) : 0}px`,
          transition: "width 0.3s ease, margin-left 0.3s ease",
        }}
      >
        {/* Sidebar */}
        {!isSmallScreen && (
          <Paper
            elevation={0}
            sx={{
              width: isSmallScreen ? "100%" : 320,
              background: "rgb(72, 145, 193)",
              position: isSmallScreen ? "relative" : "sticky",
              top: 20,
              height: isSmallScreen ? "auto" : "80vh",
              overflowY: "auto",
              mb: isSmallScreen ? 2 : 0,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#fff",
                p: 3,
                pb: 2,
                fontWeight: "500",
              }}
            >
              Application Progress
            </Typography>

            <List sx={{ p: 2 }}>
              {items.map((item, index) => {
                return (
                  <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                    <ListItemButton
                      onClick={() => setActiveComponent(item.value)}
                      sx={{
                        backgroundColor:
                          activeComponent === item.value
                            ? "rgba(255,255,255,0.1)"
                            : "transparent",
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255,0.15)",
                        },
                      }}
                    >
                      <ListItemIcon sx={{ color: "#fff" }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        sx={{ color: "#fff" }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        )}

        {/* Main Content */}
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            backgroundColor: "#fff",
            height: isSmallScreen ? "auto" : "80vh",
            position: "relative",
            // overflow: "hidden",
          }}
        >
          {loading ? (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(255,255,255,0.8)",
                zIndex: 1,
              }}
            >
              <CircularProgress
                size={60}
                thickness={4}
                sx={{
                  color: "#F26722",
                }}
              />
            </Box>
          ) : (
            <Box sx={{ height: "100%" }}>{renderComponent()}</Box>
          )}
        </Paper>
      </Box>
    </>
  );
}

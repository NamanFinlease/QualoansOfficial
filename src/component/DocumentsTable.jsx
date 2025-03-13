import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Button,
  Box,
  useTheme,
} from "@mui/material";
// import { tokens } from '../theme';
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import { useLazyGetLeadDocsQuery } from '../Service/Query';
import Swal from "sweetalert2";
import { BASE_URL } from "../baseURL";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";

const DocumentsTable = ({ uploadedDocs, remarks }) => {
  // const [getLeadDocs, { data, isSuccess, isError, error }] = useLazyGetLeadDocsQuery();

  // Color theme
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const MySwal = withReactContent(Swal);

  const viewFile = (doc) => {
    let docType = "";
    if (doc.type) {
      docType = doc.type;
    } else {
      docType = doc.url.split("/")[1];
    }

    getLeadDocs({ id: leadData._id, docType, docId: doc._id });
  };

  const handlePreview = async (docId, docType) => {
    console.log("Previewing document:", docId, docType);
    // const docType = "salarySlip";
    const apiUrl = `${BASE_URL}/documentPreview?docType=${docType}&docId=${docId}`;
    try {
      const response = await axios.get(apiUrl, { withCredentials: true });
      console.log("Preview data:", response.data);
      if (response.data && response.data.url) {
        // Redirect to the URL
        // window.location.href = response.data.url;
        window.open(response.data.url, "_blank");
      } else {
        throw new Error("URL not found in the response");
      }
    } catch (error) {
      console.error("Error fetching document preview:", error);
      MySwal.fire({
        icon: "error",
        title: "Failed to load document preview",
        text: error.response?.data?.message || "Something went wrong",
      });
    }
  };

 
  return (
    <Box sx={{ overflowX: "auto", width: "100%" }}>
      <TableContainer
        component={Box}
        sx={{
          marginTop: 6,
          borderRadius: "20px",
          border: `1px solid #F26722`,
          overflow: "hidden",
          width: {
            xs: "100%", // full width on mobile
            sm: "90%", // 90% width on tablet
            md: "80%", // 80% width on desktop
            lg: "70%", // 70% width on larger screens
          },
          mx: "auto", // center the table
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#F26722",
                color: "#fff",
              }}
            >
              <TableCell sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                S.N
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                Remark
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                View
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {uploadedDocs?.map((doc, index) => (
              <TableRow key={doc?.id}>
                <TableCell sx={{ color: "#00000" }}>{index + 1}</TableCell>
                <TableCell sx={{ color: "#00000" }}>{doc?.name}</TableCell>
                <TableCell sx={{ color: "#00000" }}>
                  {(doc?.remarks && doc.remarks.trim()) || "No remarks"}
                </TableCell>
                {/* <TableCell sx={{ color: "#00000" }}>{doc?.remarks}</TableCell> */}

                <TableCell>
                  <IconButton
                    color="primary"
                    component="a"
                    onClick={() => handlePreview(doc.id, doc.type)}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: "#F26722" }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DocumentsTable;

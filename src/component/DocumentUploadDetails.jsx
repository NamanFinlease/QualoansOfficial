import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import { BASE_URL } from "../baseURL";

const DocumentUploadDetails = () => {
  const [singleDocuments, setSingleDocuments] = useState([]);
  const [multipleDocuments, setMultipleDocuments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocumentStatus = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/loanApplication/getDocumentStatus`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch document data");
        }

        const data = await response.json();

        setSingleDocuments(data.singleDocumentsStatus || []);
        setMultipleDocuments(data.multipleDocumentsStatus || {});
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentStatus();
  }, []);

  if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" align="center" color="error">{error}</Typography>;
  }

  return (
    <Box
      sx={{
        padding: 3,
        background: "linear-gradient(90deg, #4D4D4E, orange)",
        boxShadow: 3,
        ml: { xs: 0, sm: 10 },
        borderRadius: 3,
        width: { xs: "80%", sm: "53%", md: "60%" },
        height: "auto",
        maxWidth: "400px",
        margin: "auto",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ mb: 3, color: "white" }}
      >
        Document Upload Status
      </Typography>

      <Divider sx={{ marginBottom: 2 }} />

      <Grid container direction="column" spacing={2}>
        {/* Single Documents */}
        {singleDocuments.map((doc, index) => (
          <Grid item key={index}>
            <Typography sx={{ color: "white" }}>
              {doc.type}:{" "}
              {doc.status === "Uploaded" ? (
                <CheckCircleIcon sx={{ color: "green" }} />
              ) : (
                <CloseIcon sx={{ color: "red" }} />
              )}
            </Typography>
          </Grid>
        ))}

        {/* Multiple Documents */}
        {Object.entries(multipleDocuments).map(([docType, status], index) => (
          
          
          <>
          {docType!=="sanctionLetter" &&(
            
        
          <Grid item key={index}>
            <Typography sx={{ color: "white" }}>

              {docType}:{" "}
              {status === "Uploaded" ? (
                <CheckCircleIcon sx={{ color: "green" }} />
              ) : (
                <CloseIcon sx={{ color: "red" }} />
              )}
            </Typography>
          </Grid>
           ) }
            </>
        ))}
      </Grid>
    </Box>
  );
};

export default DocumentUploadDetails;

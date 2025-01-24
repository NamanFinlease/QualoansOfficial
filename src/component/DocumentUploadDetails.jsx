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
import { sharedStyles } from "./shared/styles";

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
<Box sx={sharedStyles.containerBox}>
            <Typography variant="h4" sx={sharedStyles.title}> 
                  Document Upload Status
      </Typography>

        <Divider sx={sharedStyles.divider} />

        <Box sx={{ maxHeight: "600px", overflowY: "auto", padding: 2,  borderRadius: "8px" }}>
        <Grid container sx={sharedStyles.gridContainer} spacing={2}>
          {/* Single Documents */}
          {singleDocuments.map((doc, index) => (
            <Grid item xs={12} key={index}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography sx={sharedStyles.fieldLabel}>
                  {doc.type}
                </Typography>
                <Typography sx={sharedStyles.fieldValue}>
                  {doc.status === "Uploaded" ? (
                    <CheckCircleIcon sx={{ color: "green" }} />
                  ) : (
                    <CloseIcon sx={{ color: "red" }} />
                  )}
                </Typography>
              </Box>
            </Grid>
          ))}

          {/* Multiple Documents */}
          {Object.entries(multipleDocuments).map(([docType, status], index) => (
            docType !== "sanctionLetter" && (
              <Grid item xs={12} key={index}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography sx={sharedStyles.fieldLabel}>
                    {docType}
                  </Typography>
                  <Typography sx={sharedStyles.fieldValue}>
                    {status === "Uploaded" ? (
                      <CheckCircleIcon sx={{ color: "green" }} />
                    ) : (
                      <CloseIcon sx={{ color: "red" }} />
                    )}
                  </Typography>
                </Box>
              </Grid>
            )
          ))}
        </Grid>
        </Box>


    </Box>
  );
};

export default DocumentUploadDetails;

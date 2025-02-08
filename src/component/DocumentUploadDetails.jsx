import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Divider } from "@mui/material";
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
        const response = await fetch(
          `${BASE_URL}/getDocumentStatus`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

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
    return (
      <Typography variant="h6" align="center">
        Loading...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" align="center" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={sharedStyles.containerBox}>
      <Typography variant="h4" sx={sharedStyles.title}>
        Document Upload Status
      </Typography>

      <Divider sx={sharedStyles.divider} />

      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "50%",
            maxHeight: "600px",
            overflowY: "auto",
            padding: 2,
            borderRadius: "8px",
            backgroundColor: "white",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "white",
            }}
          >
            <tbody>
              {/* Single Documents */}
              {singleDocuments.map((doc, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #e0e0e0" }}>
                  <td
                    style={{
                      padding: "16px",
                      fontWeight: "bold",
                      width: "70%",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    {doc.type}
                  </td>
                  <td
                    style={{
                      padding: "16px",
                      textAlign: "center",
                      color: doc.status === "Uploaded" ? "green" : "red",
                    }}
                  >
                    {doc.status === "Uploaded" ? (
                      <CheckCircleIcon />
                    ) : (
                      <CloseIcon />
                    )}
                  </td>
                </tr>
              ))}

              {/* Multiple Documents */}
              {Object.entries(multipleDocuments).map(
                ([docType, status], index) =>
                  docType !== "sanctionLetter" && (
                    <tr
                      key={index}
                      style={{ borderBottom: "1px solid #e0e0e0" }}
                    >
                      <td
                        style={{
                          padding: "16px",
                          fontWeight: "bold",
                          width: "70%",
                          backgroundColor: "#f5f5f5",
                        }}
                      >
                        {docType}
                      </td>
                      <td
                        style={{
                          padding: "16px",
                          textAlign: "center",
                          color: status === "Uploaded" ? "green" : "red",
                        }}
                      >
                        {status === "Uploaded" ? (
                          <CheckCircleIcon />
                        ) : (
                          <CloseIcon />
                        )}
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </Box>
      </div>
    </Box>
  );
};

export default DocumentUploadDetails;

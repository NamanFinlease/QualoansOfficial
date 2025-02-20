import { Box } from "@mui/material";
import HDFCQR from "../assets/image/HDFC_QR.jpg";

const HDFC_QR = () => {
  return (
    <img
      src={HDFCQR}
      alt="HDFC QR Code"
      style={{
        height: "33rem",
        width: "18rem",
        borderRadius: "12px",
      }}
    />
  );
};

export default HDFC_QR;

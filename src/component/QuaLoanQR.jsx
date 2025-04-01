import { Box } from "@mui/material";
import HDFCQR from "../assets/image/QR Standee (NAMAN FINLEASE PRIVATE LIMITED) 3_page-0001.jpg";

const QuaLoanQR = () => {
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

export default QuaLoanQR;

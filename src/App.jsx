import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Header from "./navbar/Header";
import Footer from "./component/Footer";
import AboutUs from "./component/AboutUs";
import MainContent from "./navbar/MainContent";
import ContactUs from "./component/ContactUs";
import ApplyNow from "./component/ApplyNow";
import PrivacyPolicy from "./component/PrivacyPolicy";
import TermsAndConditions from "./component/TermsAndConditions";
import RepaymentLoan from "./component/RepaymentLoan";
import FAQs from "./component/FAQs";
import LoanCalculator from "./component/LoanCalculator";
import VerifyRepayment from "./component/VerifyRepayment";
import LandingPage from "./component/LandingPage";
import SuccessPage from "./component/SuccessPage";

// Layout component to conditionally show Header and Footer
const Layout = () => {
  const location = useLocation();
  const hideHeaderFooterRoutes = ["/landing-page", "/success"];

  return (
    <>
      {/* Conditionally render Header */}
      {!hideHeaderFooterRoutes.includes(location.pathname) && <Header />}

      {/* Render matched child route */}
      <Outlet />

      {/* Conditionally render Footer */}
      {!hideHeaderFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes without Header and Footer */}
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/success" element={<SuccessPage />} />

        {/* Routes with Header and Footer using the Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<MainContent />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/apply-now" element={<ApplyNow />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-condition" element={<TermsAndConditions />} />
          <Route path="/repay-now" element={<RepaymentLoan />} />
          <Route path="/fqa" element={<FAQs />} />
          <Route path="/calculator" element={<LoanCalculator />} />
          <Route path="/verify-repayment" element={<VerifyRepayment />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

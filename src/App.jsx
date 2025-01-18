import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Header from "./navbar/Header";
import Footer from "./component/Footer";
import MainContent from "./navbar/MainContent";
import AboutUs from "./component/AboutUs";
import ContactUs from "./component/ContactUs";
import ApplyNow from "./component/ApplyNow";
import PrivacyPolicy from "./component/PrivacyPolicy";
import TermsAndConditions from "./component/TermsAndConditions";
import FAQs from "./component/FAQs";
import Dashboard from "./component/Dashboard";
import RegistrationSteps from "./component/RegistrationSteps";
import LoanApplication from "./component/LoanApplication";
import Calculator from "./component/loan-application/CalculateLoan";
import OurJourney from "./component/OurJourney";
import UserPreview from "./component/UserPreview";
import LoanRepaymentComponent from "./component/LoanRepaymentComponent";
import LoanDetailsTable from "./component/LoanDetailsTable";
import LoanStatus from "./component/LoanStatus";
import PaymentOptions from "./component/PaymentOptions";
import LoanCalculator from "./component/LoanCalculator";
import LoginForm from "./component/LoginForm";
import RepayLoan from "./component/RepayLoan";

// Minimal Layout for specific components
const MinimalLayout = ({ children }) => {
  return <div>{children}</div>;
};

function App() {
  const location = useLocation();

  // Routes where Header and Footer should appear
  const routesWithHeaderFooter = [
    "/",
    "/about-us",
    "/contact-us",
    "/apply-now",
    "/privacy-policy",
    "/repay-now",
    "/terms-condition",
    "/faq",
    "/calculator",
    "/login-form"

  ];

  const showHeaderFooter = routesWithHeaderFooter.includes(location.pathname);

  return (
    <div>
      {showHeaderFooter && <Header />}
      <Routes>
        {/* Routes with Header and Footer */}
        <Route path="/" element={<MainContent />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/apply-now" element={<ApplyNow />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/repay-now" element={<RepayLoan/>}/>
        <Route path="/terms-condition" element={<TermsAndConditions />} />
        <Route path="/calculator" element={<LoanCalculator />}/>
        <Route path="/faq" element={<FAQs/>}/>
        <Route path="/login-form"element={<LoginForm/>}/>
        {/* Routes with Minimal Layout */}
       
        <Route
          path="/dashboard"
          element={
            <MinimalLayout>
              <Dashboard />
            </MinimalLayout>
          }
        />
        <Route
          path="/registration"
          element={
            <MinimalLayout>
              <RegistrationSteps />
            </MinimalLayout>
          }
        />
        <Route
          path="/loan-application"
          element={
            <MinimalLayout>
              <LoanApplication />
            </MinimalLayout>
          }
        />
        <Route
          path="/calculator-loan"
          element={
            <MinimalLayout>
              <Calculator />
            </MinimalLayout>
          }
        />
        <Route
          path="/ourjourney"
          element={
            <MinimalLayout>
              <OurJourney />
            </MinimalLayout>
          }
        />
        <Route
          path="/user-preview"
          element={
            <MinimalLayout>
              <UserPreview />
            </MinimalLayout>
          }
        />
        <Route
          path="/loanRepayent"
          element={
            <MinimalLayout>
              <LoanRepaymentComponent />
            </MinimalLayout>
          }
        />
        <Route
          path="/loandetailstable"
          element={
            <MinimalLayout>
              <LoanDetailsTable />
            </MinimalLayout>
          }
        />
        <Route
          path="/loanstatus"
          element={
            <MinimalLayout>
              <LoanStatus />
            </MinimalLayout>
          }
        />
        <Route
          path="/payment-option"
          element={
            <MinimalLayout>
              <PaymentOptions />
            </MinimalLayout>
          }
        />
        <Route
          path="/calculator"
          element={
            <MinimalLayout>
              <LoanCalculator />
            </MinimalLayout>
          }
        />
        {/* <Route
          path="/login-form"
          element={
            <MinimalLayout>
              <LoginForm />
            </MinimalLayout>
          }
        /> */}
      </Routes>
      {showHeaderFooter && <Footer />}
    </div>
  );
}

export default App;

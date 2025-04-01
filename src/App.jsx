import { Routes, Route, useLocation } from "react-router-dom";
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
import RegistrationSteps from "./component/registration/RegistrationSteps";
import LoanApplication from "./component/loan-application/LoanApplication";
import Calculator from "./component/loan-application/CalculateLoan";
import OurJourney from "./component/OurJourney";
import UserPreview from "./component/ApplicationProgress/UserPreview";
// import LoanRepaymentComponent from "./component/LoanRepaymentComponent";
// import LoanDetailsTable from "./component/LoanDetailsTable";
// import LoanStatus from "./component/LoanStatus";
// import PaymentOptions from "./component/PaymentOptions";
// import LoanCalculator from "./component/LoanCalculator";
import LoginForm from "./component/LoginForm";
import RepayLoan from "./component/RepayLoan";
import ProtectedRoute from "./ProtectedRoute";
import { SidebarProvider } from "./context/SidebarContext";
import LandingPage from "./component/LandingPage";
import UploadDocuments from "./component/loan-application/UploadDocuments";
import LoanTable from "./component/LoanTable";
import VerifyRepayment from "./component/VerifyRepayment";
import SuccessPage from "./component/SuccessPage";
import RepaymentLoan from "./component/RepaymentLoan";
import UserDetails from "./component/registration/UserDetails";
import LoanCalculator from "./navbar/LoanCalculator";
import PersonalInfo from "./component/registration/PersonalInfo";

const MinimalLayout = ({ children }) => <div>{children}</div>;

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
    "/login-form",
  ];

  const showHeaderFooter = routesWithHeaderFooter.includes(location.pathname);

  return (
    <SidebarProvider>
      <div>
        {/* <video className="bg-video" src={myVideo} autoPlay loop muted></video> */}

        {showHeaderFooter && <Header />}
        {/* {showHeaderFooter && <Navbar />} */}

        <Routes>
          {/* Routes with Header and Footer */}

          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/" element={<MainContent />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          {/* <Route path="/apply-now" element={<ApplyNow />} /> */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/repay-now" element={<RepaymentLoan />} />
          <Route path="/terms-condition" element={<TermsAndConditions />} />
          <Route path="/calculator" element={<LoanCalculator />} />
          <Route path="/faq" element={<FAQs />} />
          <Route path="/login-form" element={<LoginForm />} />
          {/* <Route path="/login-form" element={<LoanApplication />} /> */}
          <Route path="/upload-document" element={<UploadDocuments />} />
          <Route path="/verify-repayment" element={<VerifyRepayment />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiresLogin={true}>
                <MinimalLayout>
                  <Dashboard />
                </MinimalLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/registration"
            element={
              <ProtectedRoute requiresLogin={true}>
                <MinimalLayout>
                  <RegistrationSteps />
                </MinimalLayout>
              </ProtectedRoute>
            }
          />

          {/* <Route
            path="/detailsForm"
            element={
              <ProtectedRoute requiresLogin={true}>
                <MinimalLayout>
                  <UserDetails />
                </MinimalLayout>
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/loan-application"
            element={
              <ProtectedRoute requiresLogin={true}>
                <MinimalLayout>
                  <LoanApplication />
                  {/* <RegistrationSteps /> */}
                </MinimalLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload-document"
            element={
              <ProtectedRoute requiresLogin={true}>
                <MinimalLayout>
                  <UploadDocuments />
                </MinimalLayout>
              </ProtectedRoute>
            }
          />

          {/* <Route
            path="/personal-info"
            element={
              <ProtectedRoute>
                <MinimalLayout>
                  <PersonalInfo />
                </MinimalLayout>
              </ProtectedRoute>
            }
          /> */}

          <Route
            path="/manage-repayments"
            element={
              <ProtectedRoute requiresLogin={true}>
                <MinimalLayout>
                  <LoanTable />
                </MinimalLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/ourjourney"
            element={
              <ProtectedRoute requiresLogin={true}>
                <MinimalLayout>
                  <OurJourney />
                </MinimalLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/user-preview"
            element={
              <ProtectedRoute requiresLogin={true}>
                <MinimalLayout>
                  <UserPreview />
                </MinimalLayout>
              </ProtectedRoute>
            }
          />

          {/* <Route
            path="/loanRepayment"
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
          /> */}
        </Routes>
        {showHeaderFooter && <Footer />}
      </div>
    </SidebarProvider>
  );
}

export default App;

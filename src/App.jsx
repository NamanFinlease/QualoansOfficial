import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Header from "./navbar/Header"; // This should be included if you want it in every route
import AboutUs from "./component/AboutUs";
import MainContent from "./navbar/MainContent";
import ContactUs from "./component/ContactUs";
import ApplyNow from "./component/ApplyNow";
import PrivacyPolicy from "./component/PrivacyPolicy";
import TermsAndConditions from "./component/TermsAndConditions";
import RepayLoan from "./component/RepayLoan";
import Footer from "./component/Footer";
import FAQs from "./component/FAQs";
import LoanCalculator from "./component/LoanCalculator";
import LoginForm from "./component/LoginForm";
import Dashboard from "./component/Dashboard";
import RegistrationSteps from "./component/RegistrationSteps";
import PersonalInfoPage from "./component/PersonalInfoPage";
import LoanApplication from "./component/LoanApplication";
import Calculator from "./component/Calculator";
import OurJourney from "./component/OurJourney";
import UserPreview from "./component/UserPreview";
// import Navbar from "./navbar/NavBar"

function App() {
  return (
    <Router>
      {/* <Navbar /> */}

      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/apply-now" element={<ApplyNow />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-condition" element={<TermsAndConditions />} />
        <Route path="/repay-now" element={<RepayLoan />} />
        <Route path="/fqa" element={<FAQs />} />
        <Route path="/calculator" element={<LoanCalculator />} />
        <Route path="/login-form" element={<LoginForm />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/registration" element={<RegistrationSteps />} />
        <Route path="/personal-info" element={<PersonalInfoPage />} />
        <Route path="/loan-application" element={<LoanApplication />} />
        <Route path="/calculator-loan" element={<Calculator />} />
        <Route path="/ourjourney" element={<OurJourney />} />
        <Route path="/user-preview" element={<UserPreview />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

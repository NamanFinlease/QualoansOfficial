import React from "react";

// import LoanCalculator from "../component/LoanCalculator";
import LoanCalculate from "./LoanCalculate";
import SortFAQ from "./SortFAQ";
import WhoWeAre from "../component/WhoWeAre";
import { OurApp } from "../component/OurApp";
import { HomepageInfo } from "./HomepageInfo";
import LoanCalculator from "./LoanCalculator";
import Whywe from "./Whywe";
function MainContent() {
  return (
    <div>
      {/* <Header /> If you want Header to be shown on all pages */}
      <HomepageInfo />
      {/* <FrontPage /> */}
      <WhoWeAre />
      <LoanCalculator />

      <OurApp />
      {/* <AutoplayCarousel /> */}
      <Whywe />

      <LoanCalculate />

      <SortFAQ />
    </div>
  );
}

export default MainContent;

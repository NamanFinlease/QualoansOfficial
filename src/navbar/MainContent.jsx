import React from "react";

// import LoanCalculator from "../component/LoanCalculator";
import LoanCalculate from "./LoanCalculate";
import SortFAQ from "./SortFAQ";
import FrontPage from "../component/FrontPage";
import WhoWeAre from "../component/WhoWeAre";
import AutoplayCarousel from "../component/CarouselItemDetail";
import Header from "./Header";
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

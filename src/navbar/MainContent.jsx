import React, { useEffect } from "react";

// import LoanCalculator from "../component/LoanCalculator";
import LoanCalculate from "./LoanCalculate";
import SortFAQ from "./SortFAQ";
import WhoWeAre from "../component/WhoWeAre";
import { OurApp } from "../component/OurApp";
import { HomepageInfo } from "./HomepageInfo";
import LoanCalculator from "./LoanCalculator";
import Whywe from "./Whywe";
function MainContent() {
  useEffect(() => {
    // Schema for structured data (JSON-LD) for an Organization
    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Qualoan",
      url: "https://www.qualoan.com",
      logo: "https://www.qualoan.com/assets/Artboard%201-B9NCLcrg.webp",
      description:
        "Qualoan provides hassle-free online loans with quick approval and easy repayment options.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Office No. 229, 2nd Floor, Vipul Agora Mall, MG Road",
        addressLocality: "Gurugram",
        postalCode: "122001",
        addressCountry: "IN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+917338437609",
        contactType: "customer service",
        email: "info@qualoan.com",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Kannada"],
      },
      sameAs: [
        "https://www.facebook.com/profile.php?id=61570006966590",
        "https://x.com/info826568",
        "https://www.instagram.com/qualoan/",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.7",
        reviewCount: "1250",
      },
      review: [
        {
          "@type": "Review",
          author: {
            "@type": "Person",
            name: "Ravi Sharma",
          },
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
          },
          reviewBody: "Great service with quick loan approval process!",
        },
        {
          "@type": "Review",
          author: {
            "@type": "Person",
            name: "Priya Desai",
          },
          reviewRating: {
            "@type": "Rating",
            ratingValue: "4.5",
          },
          reviewBody: "Easy repayment options.",
        },
      ],
    };

    // Add the schema to the document's head
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

    // Cleanup function to remove the schema when the component is unmounted
    return () => {
      document.head.removeChild(script);
    };
  }, []);

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

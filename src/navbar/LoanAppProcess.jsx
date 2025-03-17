import React from 'react'
import './LoanAppProcess.css';
import { Link } from "react-router-dom";

export const LoanAppProcess = () => {
  return (
    <>
        <div className='LoanAppProcess'>
            <div className="hero2">
              <div className="hero2-content1">
                <h4>Our Loan Application Process</h4>
                <p>Applying does NOT affect your FICO® credit score.</p>
              </div>

              <div className='hero2-content2'>
                  <div className="step-box">
                    <div className='step-icon'>
                      <h1>1</h1>
                    </div>
                    <h3>Tell Us About Yourself</h3>
                    <p>Fill out our fast and easy online loan application.</p>
                  </div>
                  <div className="step-box">
                    <div className="step-icon">
                      <h1>2</h1>
                    </div>
                    <h3>Get Verify Your Income</h3>
                    <p>Securely connect your bank account.</p>
                  </div>
                  <div className="step-box">
                    <div className="step-icon">
                      <h1>3</h1>
                    </div>
                    <h3>Get a Quick Decision</h3>
                    <p>We’ll use the information you provide to see if we can find you a match.</p>
                  </div>
                  <div className="step-box">
                    <div className="step-icon">
                      <h1>4</h1>
                    </div>
                    <h3>Same-Day Funding Available</h3>
                    <p>If approved, you may receive money in your account as soon as the same business day!</p>
                  </div>
              </div>
              <div className="hero2-content3">
              <Link to="/applypage"><button>Apply Now</button></Link>
              </div>
            </div>
        </div>
    </>
    )
}
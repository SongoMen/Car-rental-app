import React from "react";

import { ReactComponent as Browser } from "../../icons/browser.svg";
import { ReactComponent as Date } from "../../icons/event.svg";
import { ReactComponent as Pay } from "../../icons/payment.svg";

const HowTo = () => {
  return (
    <div className="HowTo">
      <h2 className="HowTo__title">Rent a car in 3 easy steps.</h2>
      <div className="HowTo__icons">
        <div className="HowTo__option">
          <Browser />
          <h3>Step 1.</h3>
          <h4>Choose a car.</h4>
        </div>
        <div className="HowTo__option">
          <Date />
          <h3>Step 2.</h3>
          <h4>Set the details.</h4>
        </div>
        <div className="HowTo__option">
          <Pay />
          <h3>Step 3.</h3>
          <h4>Make a payment.</h4>
        </div>
      </div>
    </div>
  );
};

export default HowTo;

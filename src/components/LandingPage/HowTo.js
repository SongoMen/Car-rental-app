import React from "react";

import { ReactComponent as Browser } from "../../icons/browser.svg";
import { ReactComponent as Date } from "../../icons/event.svg";
import { ReactComponent as Pay } from "../../icons/payment.svg";

const HowTo = () => {
  return (
    <div className="HowTo">
      <h2 className="HowTo__title">Wypożycz samochód w 3 prostych krokach.</h2>
      <div className="HowTo__icons">
        <div className="HowTo__option">
          <Browser />
          <h3>Krok 1.</h3>
          <h4>Wybierz samochód z listy.</h4>
        </div>
        <div className="HowTo__option">
          <Date />
          <h3>Krok 2.</h3>
          <h4>Ustal szczegóły.</h4>
        </div>
        <div className="HowTo__option">
          <Pay />
          <h3>Krok 3.</h3>
          <h4>Dokonaj płatności.</h4>
        </div>
      </div>
    </div>
  );
};

export default HowTo;

import React from "react";

import Header from "../LandingPage/Header";

const About = () => {
  return (
    <div className="About">
      <Header />
      <div className="About__content">
        <h1>O nas</h1>
        <p>
          Posiadamy ogromne doświadczenie w motoryzacji. Zajmujemy się importem
          samochodów z zagranicy. Posiadamy szeroki wybór samochodów. Zarówno
          przystępnych cenowo, jak i marki bardziej luksuwowe z bogato
          wyposażonym wnętrzem. Każdy znajdzie u nas coś dla siebie. Wszystkie
          posiadane przez nas samochody są w doskonałym stanie i każdy posiada
          ważny przegląd techniczny oraz wszelką niezbędną dokumentację.
          Zapraszamy do zapoznania się z szerokim wachlarzem samochodów
          dostępnym na naszej stronie internetowej.
        </p>
      </div>
    </div>
  );
};

export default About;

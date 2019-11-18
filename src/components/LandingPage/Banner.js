import React from "react";

import { ReactComponent as Search } from "../../icons/search.svg";

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner__title">
        <h1>Wypożyczalnia samochodów za najniższą cenę. Zacznij od dziś !</h1>
        <p>
          <span className="color"> iles</span> samochodów w{" "}
          <span className="color"> iles</span> lokalizacjach
        </p>
      </div>
      <div className="banner__search">
        <div className="banner__input">
          <label htmlFor="city">Gdzie chcesz odebrać samochód ?</label>
          <div className="banner__bottom">
            <input
              autoComplete="off"
              placeholder="Wpisz miasto"
              type="text"
              className="input"
              name="city"
            />
            <button className="btn">
              <Search /> Szukaj
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

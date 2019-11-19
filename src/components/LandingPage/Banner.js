import React from "react";

import { ReactComponent as Search } from "../../icons/search.svg";

const Banner = () => {
  function searchStocks(e) {
    document.getElementById("results").innerHTML = "";
    let b = 0;
    let filter = document.getElementById("searchBar").value.toUpperCase();
    if (e.key === "Enter") {
      window.location = "/stocks/" + filter;
    }
    if (filter.length === 0) {
      document.getElementById("results").innerHTML = "";
      document.getElementById("results").style.display = "none";
    } else {
      for (let i = 0; i < allSymbols.length; i++) {
        let splitSymbol = allSymbols[parseInt(i)].symbol.split("");
        let splitFilter = filter.split("");
        for (let a = 0; a < splitFilter.length; a++) {
          if (
            allSymbols[parseInt(i)].symbol.indexOf(filter) > -1 &&
            splitSymbol[parseInt(a)] === splitFilter[parseInt(a)]
          ) {
            if (a === 0) {
              document.getElementById("results").style.display = "flex";
              $("#results").append(
                `<li><a href="/stocks/${allSymbols[parseInt(i)].symbol}"><h4>${
                  allSymbols[parseInt(i)].symbol
                }</h4><h6>${allSymbols[parseInt(i)].name}</h6></a></li>`
              );
              b++;
            }
          }
        }
        if (b === 10) {
          break;
        }
      }
    }
  }
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

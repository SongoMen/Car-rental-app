import React, { useEffect, useState } from "react";
import { numberOfCars } from "../../auth";

import { ReactComponent as Search } from "../../icons/search.svg";
var Typeahead = require("react-typeahead").Typeahead;
let cities = ["Lublin", "Warszawa"];

export default class Banner extends React.Component {
  _isMounted;

  constructor() {
    super();
    this.state = {
      numberOfCars: 0,
      localizations: 0
    };
  }

  searchCities(e) {
    document.getElementById("results").innerHTML = "";
    let b = 0;
    let filter = document.getElementById("search").value.toLowerCase();
    if (e.key === "Enter") {
      window.location = "/stocks/" + filter;
    }
    if (filter.length === 0) {
      document.getElementById("results").innerHTML = "";
      document.getElementById("results").style.display = "none";
    } else {
      for (let i = 0; i < cities.length; i++) {
        console.log(cities[parseInt(i)]);
        let spliting = cities[parseInt(i)].toLowerCase().split("");
        let splitFilter = filter.split("");
        for (let a = 0; a < splitFilter.length; a++) {
          console.log(
            cities[parseInt(i)].toLowerCase().indexOf(filter),
            " ",
            spliting[parseInt(a)],
            " ",
            splitFilter[parseInt(a)]
          );
          if (
            cities[parseInt(i)].indexOf(filter) > -1 &&
            spliting[parseInt(a)] === splitFilter[parseInt(a)]
          ) {
            if (a === 0) {
              document.getElementById("results").style.display = "flex";
              $("#results").append(
                `<li><a href="/samochody/${cities[parseInt(i)]}"><h4>${
                  cities[parseInt(i)]
                }</h4></a></li>`
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

  componentDidMount() {
    this._isMounted = true;
    numberOfCars()
      .then(res => {
        if (typeof String(res).length !== "undefined" && this._isMounted)
          this.setState({
            numberOfCars: res.cars,
            localizations: res.localization
          });
      })
      .catch(err => {
        console.log(err);
      });
  }
  componentWillUnMount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="banner">
        <div className="banner__title">
          <h1>Wypożyczalnia samochodów za najniższą cenę. Zacznij od dziś !</h1>
          <p>
            <span className="color"> {this.state.numberOfCars}</span> samochody
            w <span className="color"> {this.state.localizations}</span>{" "}
            lokalizacjach
          </p>
        </div>
        <div className="banner__search">
          <div className="banner__input">
            <label htmlFor="city">Gdzie chcesz odebrać samochód ?</label>
            <div className="banner__bottom">
              <div>
                <Typeahead options={["Lublin", "Warszawa"]} maxVisible={2} />

                <ul className="banner__results" id="results" />
              </div>
              <button className="btn">
                <Search /> Szukaj
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

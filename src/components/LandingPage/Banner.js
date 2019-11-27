import React from "react";
import { numberOfCars, getLocalizations } from "../../auth";
import { withRouter } from "react-router";

import { ReactComponent as Search } from "../../icons/search.svg";
var Typeahead = require("react-typeahead").Typeahead;

class Banner extends React.Component {
  _isMounted;

  constructor() {
    super();
    this.state = {
      numberOfCars: 0,
      localizations: 0,
      cities: []
    };
    this.searchCars = this.searchCars.bind(this);
  }

  fetchCars() {
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

  fetchLocalizations() {
    getLocalizations().then(res => {
      for (let i = 0; i < res.localizations.length; i++) {
        if (this._isMounted) {
          this.setState({
            cities: [...this.state.cities, res.localizations[i]]
          });
        }
      }
    });
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchCars();
    this.fetchLocalizations();
    setTimeout(() => {
      if (this.state.numberOfCars === 0) {
        this.fetchCars();
      }
    }, 5000);
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  searchCars() {
    const value = document.querySelector(".typeahead input").value;
    this.props.history.push({
      pathname: "/samochody",
      search: `?localization=${value}`
    });
  }

  render() {
    return (
      <div className="banner">
        <div className="banner__title">
          <h1>Wypożyczalnia samochodów za najniższą cenę. Zacznij od dziś !</h1>
          <p>
            <span className="color"> {this.state.numberOfCars}</span> samochodów
            w <span className="color"> {this.state.localizations}</span>{" "}
            lokalizacjach
          </p>
        </div>
        <div className="banner__search">
          <div className="banner__input">
            <label htmlFor="city">Gdzie chcesz odebrać samochód ?</label>
            <div className="banner__bottom">
              <div>
                <Typeahead options={this.state.cities} maxVisible={2} />
                <ul className="banner__results" id="results" />
              </div>
              <button className="btn" onClick={this.searchCars}>
                <Search /> Szukaj
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Banner);

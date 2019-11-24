import React from "react";
import { numberOfCars } from "../../auth";
import { withRouter } from "react-router";

import { ReactComponent as Search } from "../../icons/search.svg";
var Typeahead = require("react-typeahead").Typeahead;

let cities = ["Lublin", "Warszawa"];

class Banner extends React.Component {
  _isMounted;

  constructor() {
    super();
    this.state = {
      numberOfCars: 0,
      localizations: 0
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

  componentDidMount() {
    this._isMounted = true;
    this.fetchCars();
    setTimeout(() => {
      if (this.state.numberOfCars === 0) {
        this.fetchCars();
      }
    }, 5000);
  }
  componentWillUnMount() {
    this._isMounted = false;
  }

  searchCars() {
    this.props.history.push({
      pathname: "/samochody",
      search: "?localization=Lublin"
    });
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
                <Typeahead options={cities} maxVisible={2} />
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

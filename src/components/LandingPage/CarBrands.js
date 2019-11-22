import React from "react";
import { getBrands, getCars } from "../../auth";
import Loader from "../elements/Loader";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import DisplayCars from "./DisplayCars";

let brands = {
  names: [],
  logo: [],
  num: ""
};

let cars = {
  models: [],
  images: [],
  dates: [],
  localizations: []
};

export default class CarBrands extends React.Component {
  _isMounted;

  constructor() {
    super();
    this.state = {
      numberOfCars: 0,
      localizations: 0,
      loader: true,
      carLoader: true,
      canSelect: true
    };
    this.handleChangeBrand = this.handleChangeBrand.bind(this);
  }

  handleChangeBrand(el) {
    if (
      !el.target.classList.contains("active") &&
      "." + el.target.classList.value.replace(" ", ".") !== "." &&
      this.state.canSelect
    ) {
      this.fetchCars(el.target.getAttribute("name"));
      var elemsActive = document.querySelectorAll(
        "." + el.target.classList.value.replace(" ", ".")
      );
      var elems = document.querySelectorAll(".Brands__option");
      [].forEach.call(elems, function(el) {
        el.classList.remove("active");
      });
      [].forEach.call(elemsActive, function(el) {
        el.classList.add("active");
      });
    }
  }

  fetchCars(brand) {
    cars.models = [];
    cars.dates = [];
    cars.images = [];
    cars.localizations = [];
    if (this._isMounted) {
      this.setState({
        carLoader: true
      });
    }
    getCars(brand)
      .then(res => {
        for (let i = 0; i < res.model.length; i++) {
          cars.models.push(res.model[i]);
          cars.images.push(res.image[i]);
          cars.localizations.push(res.localization[i]);
          cars.dates.push(res.date[i]);
        }
      })
      .then(() => {
        if (this._isMounted) {
          setTimeout(() => {
            this.setState({
              carLoader: false,
              canSelect: true
            });
          }, 500);
        }
      });
  }

  fetchBrands() {
    getBrands()
      .then(res => {
        for (let i = 0; i < res.names.length; i++) {
          brands.names.push(res.names[i]);
          brands.logo.push(res.logo[i]);
          brands.num = res.number;
        }
      })
      .then(() => {
        if (this._isMounted) {
          this.setState({
            loader: false
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchBrands();
    this.fetchCars("BMW");
  }
  componentWillUnMount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="Brands">
        <h1>Nasze samochody</h1>
        {this.state.laoder && <Loader />}
        <div className="Brands__options">
          {!this.state.loader &&
            brands.names.map((val, indx) => {
              return (
                <div
                  onClick={this.handleChangeBrand}
                  name={val}
                  className={
                    "Brands__option number" +
                    String(indx) +
                    " " +
                    (indx === 0 ? "active" : "")
                  }
                  key={indx}
                >
                  {parse(String(brands.logo[indx]))}
                  {val}
                </div>
              );
            })}
          {!this.state.loader && (
            <Link to="/samochody">
              <div className="Brands__option">
                <span className="color">{brands.num - 5}+ </span>&nbsp; More
              </div>
            </Link>
          )}
        </div>
        {!this.state.carLoader ? (
          <div className="Brands__cars">
            {cars.models.map((val, indx) => {
              return (
                <DisplayCars key={indx} show={!this.state.carLoader}>
                  <div key={indx} className="Brands__car">
                    <img src={cars.images[indx]} alt={val} />
                    <div className="Brands__bottom">
                      <h4>{cars.dates[indx] + " " + val}</h4>
                      <p>Lokalizacja: {cars.localizations[indx]}</p>
                    </div>
                  </div>
                </DisplayCars>
              );
            })}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

import React from "react";
import { getBrands, getCars } from "../../auth";
import Loader from "../elements/Loader";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import DisplayCars from "./DisplayCars";
import { withRouter } from "react-router";

let brands = {
  names: [],
  logo: [],
  num: ""
};

let cars = {
  models: [],
  images: [],
  dates: [],
  localizations: [],
  brand: ""
};

class CarBrands extends React.Component {
  _isMounted;

  constructor() {
    super();
    this.state = {
      numberOfCars: 0,
      localizations: 0,
      loader: true,
      carLoader: true,
      canSelect: true,
      loadImage: false
    };
    this.handleChangeBrand = this.handleChangeBrand.bind(this);
    this.handleOnLoad = this.handleOnLoad.bind(this);
  }

  handleChangeBrand(el) {
    if (
      !el.target.classList.contains("active") &&
      "." + el.target.classList.value.replace(" ", ".") !== "." &&
      this.state.canSelect &&
      this._isMounted
    ) {
      if (this._isMounted) {
        this.setState({
          loadImage: false
        });
      }
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

  handleSearchCar(value) {
    this.props.history.push({
      pathname: "/samochody",
      search: `?name=${value}`
    });
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
        cars.brand = brand;
        for (let i = 0; i < res.model.length; i++) {
          cars.models.push(res.model[i]);
          cars.images.push(res.image[i]);
          cars.localizations.push(res.localization[i]);
          cars.dates.push(res.date[i]);
        }
      })
      .then(() => {
        setTimeout(() => {
          if (this._isMounted) {
            this.setState({
              carLoader: false,
              canSelect: true
            });
          }
        }, 500);
      });
  }

  fetchBrands() {
    if (brands.names.length === 0) {
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
  }

  handleOnLoad() {
    setTimeout(() => {
      if (this._isMounted) {
        this.setState({ loadImage: true });
      }
    }, 500);
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchBrands();
    this.fetchCars("BMW");
    setTimeout(() => {
      if (brands.names.length === 0) {
        this.fetchBrands();
      }
    }, 2000);
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
                <span className="color">{brands.num - 5}+ </span>
              </div>
            </Link>
          )}
        </div>
        {!this.state.carLoader ? (
          <div className="Brands__cars">
            {cars.models.map((val, indx) => {
              return (
                <DisplayCars key={indx} show={!this.state.carLoader}>
                  <div
                    onClick={() => this.handleSearchCar(cars.brand + " " + val)}
                    key={indx}
                    className="Brands__car"
                  >
                    <img
                      style={
                        this.state.loadImage
                          ? { display: "flex" }
                          : { display: "none" }
                      }
                      onLoad={() => this.handleOnLoad()}
                      src={cars.images[indx]}
                      alt={val}
                    />
                    {!this.state.loadImage && <Loader />}
                    <div className="Brands__bottom">
                      <h4>{cars.dates[indx] + " " + cars.brand + " " + val}</h4>
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

export default withRouter(CarBrands);

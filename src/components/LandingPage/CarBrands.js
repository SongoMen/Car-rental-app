import React, { useEffect, useState } from "react";
import { getBrands } from "../../auth";
import Loader from "../elements/Loader";
import parse from "html-react-parser";

import { ReactComponent as Search } from "../../icons/search.svg";
var Typeahead = require("react-typeahead").Typeahead;

let brands = {
  names: [],
  logo: []
};

export default class Banner extends React.Component {
  _isMounted;

  constructor() {
    super();
    this.state = {
      numberOfCars: 0,
      localizations: 0,
      loader: true
    };
  }

  handleChangeBrand(el) {
    console.log(el.target.classList.value.replace(" ", "."));
    var elemsActive = document.querySelectorAll(
      el.target.classList.value.replace(" ", ".")
    );
    console.log(elemsActive);

    var elems = document.querySelectorAll(".Brands__option");
    [].forEach.call(elems, function(el) {
      el.classList.remove("active");
    });
    [].forEach.call(elemsActive, function(el) {
      console.log();
      el.classList.add("active");
    });
  }

  componentDidMount() {
    this._isMounted = true;
    getBrands()
      .then(res => {
        for (let i = 0; i < res.names.length; i++) {
          brands.names.push(res.names[i]);
          brands.logo.push(res.logo[i]);
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
  componentWillUnMount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="Brands">
        {this.state.laoder && <Loader />}
        <div className="Brands__options">
          {!this.state.loader &&
            brands.names.map((val, indx) => {
              return (
                <div
                  onClick={this.handleChangeBrand}
                  className={
                    "Brands__option " +
                    String(indx) +
                    " " +
                    (indx === 0 ? "active" : "")
                  }
                  key={indx}
                >
                  {console.log(String(indx))}

                  {parse(String(brands.logo[indx]))}
                  {val}
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

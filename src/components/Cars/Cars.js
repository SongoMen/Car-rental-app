import React from "react";
import { logout, getAllCars } from "../../auth";
import { connect } from "react-redux";
import { changeLeftBar, changeContent } from "../../actions/actions";
import Leftbar from "./Leftbar";
import HideLeftbar from "./HideLeftbar";
import Input from "../elements/Input";
import DisplayCars from "../LandingPage/DisplayCars";
import Loader from "../elements/Loader";
import queryString from "query-string";

import { ReactComponent as Tag } from "../../icons/tag.svg";

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  changeLeftBar: () => dispatch(changeLeftBar(status)),
  changeContent: () => dispatch(changeContent(content))
});

let status = true;
let content = {};
let holdPrices = [];
let holdIndex = [];
let params;

class Cars extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      nameSearch: "",
      selectValue: "",
      loadImage: false,
      localizationSearch: "",
      localization: [],
      model: [],
      name: [],
      image: [],
      brand: [],
      indexes: [],
      date: [],
      price: []
    };
    this.leftBarChange = this.leftBarChange.bind(this);
    this.checkParams = this.checkParams.bind(this);
    this.sortByPriceLower = this.sortByPriceLower.bind(this);
  }

  leftBarChange(brand, model, img, date, localization, price) {
    status = this.props.leftbar ? false : true;
    if (status === true) {
      content.brand = brand;
      content.image = img;
      content.model = model;
      content.date = date;
      content.localization = localization;
      content.price = price;
      this.props.changeContent();
    }
    this.props.changeLeftBar();
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchAllCars();
    this.checkParams();
  }

  sortByBrand() {
    if (this._isMounted) {
      this.setState({
        indexes: holdIndex
      });
    }
  }

  fetchAllCars() {
    getAllCars()
      .then(res => {
        for (let i = 0; i < res.model.length; i++) {
          this.setState({
            model: [...this.state.model, res.model[parseInt(i)]],
            image: [...this.state.image, res.image[parseInt(i)]],
            localization: [...this.state.localization, res.localization[parseInt(i)]],
            brand: [...this.state.brand, res.brand[parseInt(i)]],
            name: [...this.state.name, res.brand[parseInt(i)] + " " + res.model[parseInt(i)]],
            date: [...this.state.date, res.date[parseInt(i)]],
            indexes: [...this.state.indexes, i],
            price: [...this.state.price, Number(res.price[parseInt(i)])]
          });
          holdIndex.push(i);
          holdPrices.push(res.price[parseInt(i)]);
        }
      })
      .then(() => {
        if (this._isMounted) {
          this.setState({
            loader: false
          });
        }
      });
  }

  checkParams() {
    params = queryString.parse(this.props.location.search);
    if (typeof params.localization !== "undefined" && this._isMounted) {
      if (this._isMounted) {
        this.setState(
          {
            loader: true,
            localizationSearch: params.localization
          },
          () => {
            this.setState({
              localizationSearch: params.localization
            });
          }
        );
      }
      setTimeout(() => {
        this.filterListLocation(params.localization);
      }, 500);
    }
    if (typeof params.name !== "undefined" && this._isMounted) {
      if (this._isMounted) {
        this.setState(
          {
            loader: true,
            nameSearch: params.name
          },
          () => {
            this.setState({
              nameSearch: params.name
            });
          }
        );
      }
      setTimeout(() => {
        this.filterListName(params.name);
      }, 500);
    }
  }
  sortWithIndeces(toSort) {
    for (var i = 0; i < toSort.length; i++) {
      toSort[parseInt(i)] = [toSort[parseInt(i)], i];
    }
    toSort.sort(function(left, right) {
      return left[0] < right[0] ? -1 : 1;
    });
    toSort.sortIndices = [];
    for (var j = 0; j < toSort.length; j++) {
      toSort.sortIndices.push(toSort[j][1]);
      toSort[j] = toSort[j][0];
    }
    return toSort;
  }

  sortByPriceLower() {
    var test = this.state.price.slice();
    this.sortWithIndeces(test);
    this.setState({
      indexes: test.sortIndices
    });
  }

  sortWithIndeces2(toSort) {
    for (var i = 0; i < toSort.length; i++) {
      toSort[parseInt(i)] = [toSort[parseInt(i)], i];
    }
    toSort.sort(function(left, right) {
      return left[0] > right[0] ? -1 : 1;
    });
    toSort.sortIndices = [];
    for (var j = 0; j < toSort.length; j++) {
      toSort.sortIndices.push(toSort[j][1]);
      toSort[j] = toSort[j][0];
    }
    return toSort;
  }

  sortByPriceHigher() {
    var test = this.state.price.slice();
    this.sortWithIndeces2(test);
    this.setState({
      indexes: test.sortIndices
    });
  }

  filterListLocation(event) {
    let list = [];
    for (let i = 0; i < this.state.localization.length; i++) {
      if (
        this.state.localization[parseInt(i)].toLowerCase().search(event.toLowerCase()) !==
        -1
      ) {
        if (this.state.nameSearch === "") {
          list.push(i);
        } else {
          if (
            this.state.name[parseInt(i)]
              .toLowerCase()
              .search(this.state.nameSearch.toLowerCase()) !== -1
          ) {
            list.push(i);
          }
        }
      }
    }
    this.setState({ indexes: list, selectValue: "Sortuj wedlug marki" });
  }

  filterListName(event) {
    let list = [];
    for (let i = 0; i < this.state.name.length; i++) {
      if (this.state.name[parseInt(i)].toLowerCase().search(event.toLowerCase()) !== -1) {
        if (this.state.localizationSearch === "") {
          list.push(i);
        } else {
          if (
            this.state.localization[parseInt(i)]
              .toLowerCase()
              .search(this.state.localizationSearch.toLowerCase()) !== -1
          ) {
            list.push(i);
          }
        }
      }
    }
    this.setState({ indexes: list, selectValue: "Sortuj wedlug marki" });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleLogout() {
    logout();
  }

  handleRefName = ref => {
    this.setState({
      nameSearch: ref
    });
    this.filterListName(ref);
  };

  handleRefLoc = ref => {
    this.setState({
      localizationSearch: ref
    });
    this.filterListLocation(ref);
  };

  handleChange(event) {
    if (this._isMounted) {
      this.setState({ selectValue: event.target.value }, () => {
        if (this.state.selectValue === "cena od najniższej") {
          this.sortByPriceLower();
        } else if (this.state.selectValue === "cena od najwyższej") {
          this.sortByPriceHigher();
        } else if (this.state.selectValue === "Sortuj wedlug marki") {
          this.sortByBrand();
        }
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

  render() {
    document.title = "CarBook - Katalog";
    return (
      <div className="Cars">
        <h3>Filters</h3>
        <div className="Cars__filters">
          <div>
            <label htmlFor="brand">Car name:</label>
            <Input
              type="text"
              name="brand"
              placeholder="e.g. BMW M5"
              handleRef={this.handleRefName}
              value={this.state.nameSearch}
            />
          </div>
          <div>
            <label htmlFor="brand">Localization:</label>
            <Input
              type="text"
              name="brand"
              placeholder="e.g. Warsaw"
              handleRef={this.handleRefLoc}
              value={this.state.localizationSearch}
            />
          </div>
          <select
            value={this.state.selectValue}
            onChange={this.handleChange.bind(this)}
          >
            <option>Sort by brand</option>
            <option>Sort from lower price</option>
            <option>Sort from higher price</option>
          </select>
        </div>
        {!this.state.loader ? (
          <div className="Cars__list">
            {this.state.indexes.map((val, indx) => {
              const {
                model,
                brand,
                date,
                localization,
                image,
                price
              } = this.state;
              /*if (
                this.state.brand[parseInt(indx)] !== this.state.brand[indx - 1] &&
                typeof this.state.brand[indx + 1] !== "undefined"
              ) {
                return (
                  <div className="Cars__brandName">
                    <h3>{this.state.brand[parseInt(indx)]}</h3>
                  </div>
                );
              }*/
              return (
                <DisplayCars key={val} show={!this.state.loader}>
                  <div
                    onClick={() =>
                      this.leftBarChange(
                        brand[parseInt(val)],
                        model[parseInt(val)],
                        image[parseInt(val)],
                        date[parseInt(val)],
                        localization[parseInt(val)],
                        price[parseInt(val)]
                      )
                    }
                    key={val}
                    className="Cars__car"
                  >
                    <h6 className="Cars__text">RENT NOW</h6>
                    <img
                      style={
                        this.state.loadImage
                          ? { display: "flex" }
                          : { display: "none" }
                      }
                      onLoad={() => this.handleOnLoad()}
                      src={image[parseInt(val)]}
                      alt={val}
                    />
                    {!this.state.loadImage && <Loader />}
                    <div className="Cars__bottom">
                      <h4 className="Cars__desc">
                        {date[parseInt(val)] + " " + brand[parseInt(val)] + " " + model[parseInt(val)]}
                      </h4>
                      <p>Lokalizacja: {localization[parseInt(val)]}</p>
                      <div className="Cars__price">
                        <Tag />
                        <h6>${price[parseInt(val)]}/24h</h6>
                      </div>
                    </div>
                  </div>
                </DisplayCars>
              );
            })}
          </div>
        ) : (
          <Loader />
        )}
        <HideLeftbar show={this.props.leftbar}>
          <Leftbar />
        </HideLeftbar>
        {this.props.leftbar && (
          <div className="bg" onClick={this.leftBarChange} />
        )}
        <div className="result" />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cars);

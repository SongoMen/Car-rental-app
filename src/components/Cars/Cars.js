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

let list = [];
let list1 = [];

let cars = {
  models: [],
  images: [],
  dates: [],
  localizations: [],
  brands: []
};

let filters = {
  name: [],
  localization: []
};

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
      date: []
    };
    this.leftBarChange = this.leftBarChange.bind(this);
    this.checkParams = this.checkParams.bind(this);
  }

  leftBarChange(brand, model, img, date, localization) {
    status = this.props.leftbar ? false : true;
    if (status === true) {
      content.brand = brand;
      content.image = img;
      content.model = model;
      content.date = date;
      content.localization = localization;

      this.props.changeContent();
    }
    this.props.changeLeftBar();
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchAllCars();
    this.checkParams();
  }

  fetchAllCars() {
    getAllCars()
      .then(res => {
        cars.models = [];
        cars.images = [];
        cars.localizations = [];
        cars.dates = [];
        cars.brands = [];
        filters.name = [];
        filters.localization = [];
        for (let i = 0; i < res.model.length; i++) {
          this.setState({
            model: [...this.state.model, res.model[i]],
            image: [...this.state.image, res.image[i]],
            localization: [...this.state.localization, res.localization[i]],
            brand: [...this.state.brand, res.brand[i]],
            name: [...this.state.name, res.brand[i] + " " + res.model[i]],
            date: [...this.state.date, res.date[i]],
            indexes: [...this.state.indexes, i]
          });
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
        this.setState({
          loader: true
        });
      }
      this.filterListLocation(params.localization);
      console.log("xx");
    }
  }

  filterListLocation(event) {
    let list = [];
    for (let i = 0; i < this.state.localization.length; i++) {
      if (
        this.state.localization[i].toLowerCase().search(event.toLowerCase()) !==
        -1
      ) {
        list.push(i);
      }
    }
    this.setState({ indexes: list });
  }

  filterListName(event) {
    let list = [];
    for (let i = 0; i < this.state.name.length; i++) {
      if (this.state.name[i].toLowerCase().search(event.toLowerCase()) !== -1) {
        list.push(i);
      }
    }
    this.setState({ indexes: list });
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
      this.setState({ selectValue: event.target.value });
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
    return (
      <div className="Cars">
        <h3>Filtry</h3>
        <div className="Cars__filters">
          <div>
            <label htmlFor="brand">Nazwa samochodu:</label>
            <Input
              type="text"
              name="brand"
              placeholder="np. BMW M5"
              handleRef={this.handleRefName}
              value={this.state.nameSearch}
            />
          </div>
          <div>
            <label htmlFor="brand">Lokalizacja:</label>
            <Input
              type="text"
              name="brand"
              placeholder="np. Warszawa"
              handleRef={this.handleRefLoc}
              value={this.state.localizationSearch}
            />
          </div>
          <select
            value={this.state.selectValue}
            onChange={this.handleChange.bind(this)}
          >
            <option>Sortuj według marek</option>
            <option>A-Z</option>
            <option>Z-A</option>
            <option>cena od najniższej</option>
            <option>cena od najwyższej</option>
          </select>
        </div>
        {!this.state.loader ? (
          <div className="Cars__list">
            {this.state.indexes.map((val, indx) => {
              const { model, brand, date, localization, image } = this.state;
              return (
                <DisplayCars key={val} show={!this.state.loader}>
                  <div
                    onClick={() =>
                      this.leftBarChange(
                        brand[val],
                        model[val],
                        image[val],
                        date[val],
                        localization[val]
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
                      src={image[val]}
                      alt={val}
                    />
                    {!this.state.loadImage && <Loader />}
                    <div className="Cars__bottom">
                      <h4 className="Cars__desc">
                        {date[val] + " " + brand[val] + " " + val}
                      </h4>
                      <p>Lokalizacja: {localization[val]}</p>
                      <div className="Cars__price">
                        <Tag />
                        <h4>cena</h4>
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

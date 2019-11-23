import React from "react";
import { logout, getAllCars } from "../../auth";
import { connect } from "react-redux";
import { changeLeftBar } from "../../actions/actions";
import Leftbar from "./Leftbar";
import HideLeftbar from "./HideLeftbar";
import Input from "../elements/Input";
import DisplayCars from "../LandingPage/DisplayCars";
import Loader from "../elements/Loader";

let status = true;

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  changeLeftBar: () => dispatch(changeLeftBar(status))
});

let cars = {
  models: [],
  images: [],
  dates: [],
  localizations: [],
  brands: []
};

class Cars extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      brand: "",
      name: "",
      selectValue: "",
      loadImage: false
    };
    this.leftBarChange = this.leftBarChange.bind(this);
  }

  leftBarChange(brand, model, img, date, localization) {
    console.log(arguments);
    status = this.props.leftbar ? false : true;
    this.props.changeLeftBar();
  }

  componentDidMount() {
    this._isMounted = true;
    getAllCars()
      .then(res => {
        cars.models = [];
        cars.images = [];
        cars.localizations = [];
        cars.dates = [];
        cars.brands = [];
        for (let i = 0; i < res.model.length; i++) {
          cars.models.push(res.model[i]);
          cars.images.push(res.image[i]);
          cars.localizations.push(res.localization[i]);
          cars.dates.push(res.date[i]);
          cars.brands.push(res.brand[i]);
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

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleLogout() {
    logout();
  }

  handleRefName = ref => {
    this.setState({
      name: ref
    });
  };

  handleChange(event) {
    console.log(event.target.value);
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
            {cars.models.map((val, indx) => {
              const { brands, dates, localizations, images } = cars;
              return (
                <DisplayCars key={indx} show={!this.state.loader}>
                  <div
                    onClick={() =>
                      this.leftBarChange(
                        brands[indx],
                        val,
                        images[indx],
                        dates[indx],
                        localizations[indx]
                      )
                    }
                    key={indx}
                    className="Cars__car"
                  >
                    <img
                      style={
                        this.state.loadImage
                          ? { display: "flex" }
                          : { display: "none" }
                      }
                      onLoad={() => this.handleOnLoad()}
                      src={images[indx]}
                      alt={val}
                    />
                    {!this.state.loadImage && <Loader />}
                    <div className="Cars__bottom">
                      <h4 className="Cars__desc">
                        {dates[indx] + " " + brands[indx] + " " + val}
                      </h4>
                      <p>Lokalizacja: {localizations[indx]}</p>
                      <div className="Cars__price">
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
        {this.props.leftbar && <div className="bg" />}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cars);

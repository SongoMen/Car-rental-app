import React from "react";
import { logout, getAllCars } from "../../auth";
import { connect } from "react-redux";
import { changeLeftBar } from "../../actions/actions";
import Leftbar from "./Leftbar";
import HideLeftbar from "./HideLeftbar";
import Input from "../elements/Input";
import DisplayCars from "../LandingPage/DisplayCars";

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
  brands: ""
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

  leftBarChange() {
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
          cars.brands.push(res.model[i]);
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
    this.setState({ loadImage: true });
  }

  render() {
    return (
      <div className="Cars">
        <button onClick={this.leftBarChange}>dsadsa</button>
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
        {!this.state.loader && (
          <div className="Cars__list">
            {cars.models.map((val, indx) => {
              return (
                <DisplayCars key={indx} show={!this.state.loader}>
                  <div key={indx} className="Cars__car">
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
                    <div className="Cars__bottom">
                      <h4>{cars.dates[indx] + " " + cars.brand + " " + val}</h4>
                      <p>Lokalizacja: {cars.localizations[indx]}</p>
                    </div>
                  </div>
                </DisplayCars>
              );
            })}
          </div>
        )}
        <HideLeftbar show={this.props.leftbar}>
          <Leftbar />
        </HideLeftbar>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cars);

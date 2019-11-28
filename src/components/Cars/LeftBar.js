import React from "react";
import { connect } from "react-redux";
import { changeLeftBar } from "../../actions/actions";
import Loader from "../elements/Loader";
import { checkIfLoggedIn, rentCar } from "../../auth";
import DatePicker, { registerLocale } from "react-datepicker";
import { Link } from "react-router-dom";

import pl from "date-fns/locale/pl";
import "react-datepicker/dist/react-datepicker.css";

import { ReactComponent as X } from "../../icons/x.svg";

registerLocale("pl", pl);

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  changeLeftBar: () => dispatch(changeLeftBar(false))
});

class LeftBar extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      startDate: "",
      endDate: "",
      length: "",
      loadLength: false,
      msg: ""
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleRent = this.handleRent.bind(this);
  }

  handleClose() {
    this.props.changeLeftBar();
  }

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.setState({ isLogged: checkIfLoggedIn() });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange = date => {
    let today = new Date();
    if (
      this.state.endDate &&
      this.state.endDate.getTime() > date.getTime() &&
      today.getTime() <= date.getTime()
    ) {
      if (this._isMounted) {
        this.setState({
          startDate: date
        });
      }
    } else if (!this.state.endDate && today.getTime() <= date.getTime()) {
      if (this._isMounted) {
        this.setState({
          startDate: date
        });
      }
    }
    this.checkDifference();
  };
  handleChange2 = date => {
    let today = new Date();
    if (
      this.state.startDate &&
      this.state.startDate.getTime() < date.getTime() &&
      today.getTime() <= date.getTime()
    ) {
      if (this._isMounted) {
        this.setState({
          endDate: date
        });
      }
    } else if (!this.state.startDate && today.getTime() <= date.getTime()) {
      if (this._isMounted) {
        this.setState({
          endDate: date
        });
      }
    }
    this.checkDifference();
  };

  handleRent() {
    const { brand, model, price } = this.props.content;
    rentCar(
      this.formatDate(this.state.startDate),
      this.formatDate(this.state.endDate),
      brand,
      model,
      price
    ).then(res => {
      console.log(res);
      if (this._isMounted) {
        this.setState({
          msg: res.message
        });
      }
    });
  }

  formatDate(date) {
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + "/" + monthIndex + 1 + "/" + year;
  }

  checkDifference() {
    setTimeout(() => {
      this.setState({ loadLength: true });
      if (this.state.endDate && this.state.startDate) {
        let diff =
          this.state.startDate.getTime() - this.state.endDate.getTime();
        let diff2 = Math.round(diff / (1000 * 3600 * 24));
        if (this._isMounted) {
          this.setState({
            length: String(diff2).replace("-", "")
          });
        }
      }
      setTimeout(() => {
        if (this._isMounted) {
          this.setState({ loadLength: false });
        }
      }, 500);
    }, 1000);
  }

  render() {
    const { image, brand, model, localization, price } = this.props.content;
    return (
      <div className="Leftbar">
        {this.props.content.length === 0 ? (
          <Loader />
        ) : (
          <div className="Leftbar__content">
            <X onClick={this.handleClose} />
            <img src={image} alt={brand} />
            <div className="Leftbar__info">
              <h2>{brand + " " + model}</h2>
              <h5>Lokalizacja: {localization}</h5>
            </div>
            <div className="Leftbar__rent">
              <div>
                <label>Wybierz datę początkową wypożyczenia</label>
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleChange}
                  locale="pl"
                  dateFormat="d/M/yyyy"
                />
              </div>
              <div>
                <label>Wybierz datę końcową wypożyczenia</label>
                <DatePicker
                  selected={this.state.endDate}
                  onChange={this.handleChange2}
                  locale="pl"
                  dateFormat="d/M/yyyy"
                />
              </div>
              {!this.state.loadLength && this.state.length !== "" && (
                <h4 className="Leftbar__days">
                  Ilość dni: {this.state.length}
                  <br />
                  Koszt: {this.state.length * price} zł
                </h4>
              )}
              {!this.state.loadLength &&
                this.state.length !== "" &&
                this.state.isLogged && (
                  <button className="btn" onClick={this.handleRent}>
                    Wypożycz teraz
                  </button>
                )}
              {!this.state.loadLength &&
                this.state.length !== "" &&
                !this.state.isLogged && (
                  <Link to="/login">
                    <button className="btn inactive">
                      Zaloguj się aby wypożyczyć
                    </button>
                  </Link>
                )}
              {this.state.loadLength && <Loader />}
              {this.state.msg}
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftBar);

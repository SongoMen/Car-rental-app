import React from "react";
import Loader from "../elements/Loader";
import { getAllCars, removeCar } from "../../auth";

export default class AddUser extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      cars: [],
      selected: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    getAllCars()
      .then(res => {
        for (let i = 0; i < res.brand.length; i++) {
          if (this._isMounted) {
            this.setState({
              cars: [...this.state.cars, `${res.brand[i]} ${res.model[i]}`]
            });
          }
        }
      })
      .then(() => {
        if (this._isMounted) {
          this.setState({
            loading: false
          });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleOnChange(ref) {
    if (this._isMounted) {
      this.setState({
        selected: ref.target.value
      });
    }
  }

  handleClick() {
    removeCar(
      this.state.selected.split(" ")[0],
      this.state.selected.split(" ")[1]
    ).then(res => {
      console.log(res);
      if (this._isMounted) {
        this.setState({
          msg: res.message
        });
      }
    });
  }

  render() {
    return (
      <div className="RemoveCar">
        <h1>Usuń samochód</h1>
        {this.state.loading && <Loader />}
        {!this.state.loading && (
          <select value={this.state.selected} onChange={this.handleOnChange}>
            {this.state.cars.map((val, indx) => {
              return <option key={indx}>{val}</option>;
            })}
          </select>
        )}
        {!this.state.loading && (
          <button className="btn" onClick={this.handleClick}>
            USUŃ
          </button>
        )}
        <h4>{this.state.msg}</h4>
      </div>
    );
  }
}

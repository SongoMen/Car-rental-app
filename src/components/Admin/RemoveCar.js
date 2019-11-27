import React from "react";
import Loader from "../elements/Loader";
import { getAllCars } from "../../auth";

export default class AddUser extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      cars: [],
      selected: ""
    };
  }

  componentDidMount() {
    this._isMounted = true;
    getAllCars().then(res => {
      for (let i = 0; i < res.brand.length; i++) {
        if (this._isMounted) {
          this.setState({
            cars: [...this.state.cars, `${res.brand[i]} ${res.model[i]}`]
          });
        }
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

  render() {
    return (
      <div className="RemoveCar">
        <h1>Usuń samochód</h1>
        <select value={this.state.selected} onChange={this.handleOnChange}>
          {this.state.cars.map((val, indx) => {
            return <option key={indx}>{val}</option>;
          })}
        </select>
      </div>
    );
  }
}

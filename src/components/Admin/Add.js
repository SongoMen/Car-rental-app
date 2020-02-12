import React from "react";
import { addCar, getBrands } from "../../auth";
import Loader from "../elements/Loader";
import Input from "../elements/Input";

export default class Add extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      msg: "",
      selected: "",
      brand: "",
      model: "",
      date: "",
      image: "",
      localization: "",
      price: "",
      brands: []
    };
    this.changeSection = this.changeSection.bind(this);
    this.addCarFunc = this.addCarFunc.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    getBrands()
      .then(res => {
        if (this._isMounted) {
          this.setState({
            brands: res.names
          });
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

  addCarFunc(e) {
    e.preventDefault();
    const { model, date, image, localization, price } = this.state;
    if (
      model.length > 0 &&
      date.length > 0 &&
      image.length > 0 &&
      localization.length > 0 &&
      price.length > 0
    ) {
      console.log("x");
      addCar(this.state.selected, model, date, image, localization, price).then(
        res => {
          if (this._isMounted) {
            this.setState({
              msg: res.data
            });
          }
        }
      );
    }
  }

  changeSection(el) {
    if (this._isMounted) {
      this.setState({
        section: el
      });
    }
  }

  handleRefBrand = ref => {
    if (this._isMounted) {
      this.setState({
        brand: ref
      });
    }
  };

  handleRefModel = ref => {
    if (this._isMounted) {
      this.setState({
        model: ref
      });
    }
  };

  handleRefDate = ref => {
    if (this._isMounted) {
      this.setState({
        date: ref
      });
    }
  };

  handleRefImage = ref => {
    if (this._isMounted) {
      this.setState({
        image: ref
      });
    }
  };

  handleRefLocalization = ref => {
    if (this._isMounted) {
      this.setState({
        localization: ref
      });
    }
  };

  handleRefPrice = ref => {
    if (this._isMounted) {
      this.setState({
        price: ref
      });
    }
  };

  handleOnChange(ref) {
    if (this._isMounted) {
      this.setState({
        selected: ref.target.value
      });
    }
  }

  render() {
    return (
      <div className="Add">
        <h1>Add car</h1>
        {this.state.loading && <Loader />}
        {!this.state.loading && (
          <form>
            <table>
              <tbody>
                <tr>
                  <td>
                    <b>Marka</b>
                  </td>
                  <td>
                    <select
                      value={this.state.selected}
                      onChange={this.handleOnChange}
                    >
                      {this.state.brands.map((val, indx) => {
                        return <option key={indx}>{val}</option>;
                      })}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Model</b>
                  </td>
                  <td>
                    <Input
                      handleRef={this.handleRefModel}
                      type="text"
                      placeholder="Model"
                      value={this.state.model}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Rok produkcji</b>
                  </td>
                  <td>
                    <Input
                      handleRef={this.handleRefDate}
                      type="number"
                      placeholder="Rok"
                      value={this.state.date}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Zdjęcie</b>
                  </td>
                  <td>
                    <Input
                      handleRef={this.handleRefImage}
                      type="text"
                      placeholder="Zdjecie"
                      value={this.state.image}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Lokalizacja</b>
                  </td>
                  <td>
                    <Input
                      handleRef={this.handleRefLocalization}
                      type="text"
                      placeholder="Lokalizacja"
                      value={this.state.localization}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Cena</b>
                  </td>
                  <td>
                    <Input
                      handleRef={this.handleRefPrice}
                      type="number"
                      placeholder="Cena"
                      value={this.state.price}
                    />
                  </td>
                </tr>
                <tr>
                  <td />
                  <td>
                    <input
                      className="btn"
                      onClick={this.addCarFunc}
                      type="submit"
                      value="Add"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        )}
        {this.state.msg}
      </div>
    );
  }
}

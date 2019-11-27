import React from "react";
import Loader from "../elements/Loader";
import Input from "../elements/Input";
import { getAllCars, update } from "../../auth";

export default class EditCar extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      brand: [],
      date: [],
      image: [],
      localization: [],
      model: [],
      price: [],
      selected: ""
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    getAllCars()
      .then(res => {
        if (this._isMounted) {
          this.setState({
            loading: true
          });
        }
        for (let i = 0; i < res.brand.length; i++) {
          if (this._isMounted) {
            this.setState({
              brand: [...this.state.brand, res.brand[i]],
              date: [...this.state.date, res.date[i]],
              image: [...this.state.image, res.image[i]],
              localization: [...this.state.localization, res.localization[i]],
              model: [...this.state.model, res.model[i]],
              price: [...this.state.price, res.price[i]]
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

  handleRefFirst_name = ref => {
    if (this._isMounted) {
      this.setState({
        first_name: ref
      });
    }
  };

  handleRefImage = ref => {
    if (this._isMounted) {
      this.setState({
        imageInput: ref
      });
    }
  };

  handleRefModel = ref => {
    if (this._isMounted) {
      this.setState({
        modelInput: ref
      });
    }
  };

  handleRefLocalization = ref => {
    if (this._isMounted) {
      this.setState({
        localizationInput: ref
      });
    }
  };

  handleRefDate = ref => {
    if (this._isMounted) {
      this.setState({
        dateInput: ref
      });
    }
  };

  handleRefPrice = ref => {
    if (this._isMounted) {
      this.setState({
        prcieInput: ref
      });
    }
  };
  handleOnChange(ref) {
    let indx = this.state.model.indexOf(ref.target.value.split(" ")[1]);
    if (this._isMounted) {
      this.setState({
        selected: ref.target.value,
        prcieInput: this.state.price[indx],
        imageInput: this.state.image[indx],
        modelInput: this.state.model[indx],
        dateInput: this.state.date[indx],
        localizationInput: this.state.localization[indx]
      });
    }
  }

  handleClick(e) {
    e.preventDefault();
    const {
      selected,
      dateInput,
      imageInput,
      prcieInput,
      localizationInput
    } = this.state;
    update(
      selected.split(" ")[1],
      dateInput,
      imageInput,
      localizationInput,
      prcieInput
    ).then(res => {
      if (this._isMounted) {
        this.setState({
          msg: res.data
        });
      }
    });
  }

  render() {
    return (
      <div className="EditCar">
        <h1>Edytuj samochód</h1>
        {this.state.loading && <Loader />}
        {!this.state.loading && (
          <select value={this.state.selected} onChange={this.handleOnChange}>
            {this.state.model.map((val, indx) => {
              return (
                <option name={indx} key={indx}>
                  {this.state.brand[indx] + " " + val}{" "}
                </option>
              );
            })}
          </select>
        )}
        {!this.state.loading && (
          <form>
            <table>
              <tbody>
                <tr>
                  <td>
                    <b>Model</b>
                  </td>
                  <td>
                    <Input
                      handleRef={this.handleRefModel}
                      type="text"
                      placeholder="Model"
                      value={this.state.modelInput}
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
                      type="text"
                      placeholder="Rok produkcji"
                      value={this.state.dateInput}
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
                      placeholder="Zdjęcie"
                      value={this.state.imageInput}
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
                      value={this.state.localizationInput}
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
                      type="text"
                      placeholder="Cena"
                      value={this.state.prcieInput}
                    />
                  </td>
                </tr>
                <tr>
                  <td />
                  <td>
                    <input
                      className="btn"
                      onClick={this.handleClick}
                      type="submit"
                      value="Aktualizuj"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        )}
      </div>
    );
  }
}

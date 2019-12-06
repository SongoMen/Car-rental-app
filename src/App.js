import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch
} from "react-router-dom";
import Cookies from "universal-cookie";

import Loader from "./components/elements/Loader";
import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/LoginPage/Login";
import Register from "./components/RegisterPage/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import About from "./components/subpages/about";
import Cars from "./components/Cars/Cars";
import Header from "./components/LandingPage/Header";
import Footer from "./components/LandingPage/Footer";
import Contact from "./components/subpages/contact";
import Admin from "./components/Admin/Admin";

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

function PublicRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/dashboard" />
        )
      }
    />
  );
}

class App extends React.Component {
  _isMounted = false;
  state = {
    authed: false,
    loading: true,
    theme: ""
  };
  componentDidMount() {
    const cookies = new Cookies();
    this._isMounted = true;
    if (cookies.get("name")) {
      this.setState({
        authed: true,
        loading: false
      });
    } else {
      this.setState({
        authed: false,
        loading: false
      });
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return this.state.loading ? (
      <Loader />
    ) : (
      <Router>
        <div className="container">
          <Header />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/admin" component={Admin} />
            <PublicRoute
              authed={this.state.authed}
              path="/login"
              component={Login}
            />
            <PublicRoute
              authed={this.state.authed}
              path="/register"
              component={Register}
            />
            <Route path="/about" component={About} />
            <Route path="/cars" component={Cars} />

            <PrivateRoute
              authed={this.state.authed}
              path="/dashboard"
              component={Dashboard}
            />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;

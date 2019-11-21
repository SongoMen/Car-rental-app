import axios from "axios";
import Cookies from "universal-cookie";

const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
};

const cookies = new Cookies();

export function checkIfLoggedIn() {
  if (cookies.get("name") && cookies.get("token")) {
    return true;
  } else {
    return false;
  }
}

//https://backab.000webhostapp.com

export function numberOfCars() {
  const params = new URLSearchParams();
  params.append("first_name", "X");

  return axios
    .post("https://backendba.000webhostapp.com/api/info.php", params, config)
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      return error;
    });
}

export function getBrands() {
  const params = new URLSearchParams();
  params.append("first_name", "X");

  return axios
    .post("https://backendba.000webhostapp.com/api/brands.php", params, config)
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      return error;
    });
}

export function register(first_name, last_name, name, email, password) {
  const params = new URLSearchParams();
  params.append("first_name", first_name);
  params.append("last_name", last_name);
  params.append("username", name);
  params.append("email", email);
  params.append("password", password);
  return axios
    .post(
      "https://backendba.000webhostapp.com/api/register.php",
      params,
      config
    )
    .catch(function(error) {
      return error;
    });
}

export function login(email, password) {
  const params = new URLSearchParams();
  params.append("email", email);
  params.append("password", password);
  return axios
    .post("https://backendba.000webhostapp.com/api/login.php", params, config)
    .then(function(response) {
      console.log(response.data);
      cookies.set("name", response.data.name, { path: "/" });
      cookies.set("token", response.data.jwt, { path: "/" });
      window.location.reload(false);
    });
}

export function logout() {
  cookies.remove("name", { path: "/" });
  cookies.remove("token", { path: "/" });
  window.location.reload(false);
}

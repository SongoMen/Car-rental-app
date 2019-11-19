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

export function register(first_name, last_name, name, email, password) {
  const params = new URLSearchParams();
  params.append("first_name", first_name);
  params.append("last_name", last_name);
  params.append("username", name);
  params.append("email", email);
  params.append("password", password);
  axios
    .post(
      "https://backendba.000webhostapp.com/api/register.php",
      params,
      config
    )
    .then(function(response) {
      console.log(response);
      return response.data.message;
    })
    .catch(function(error) {
      return error;
    });
}

export function login(email, password) {
  const params = new URLSearchParams();
  params.append("email", email);
  params.append("password", password);
  axios
    .post("https://backendba.000webhostapp.com/api/login.php", params, config)
    .then(function(response) {
      console.log(response.data);
      cookies.set("name", response.data.name, { path: "/" });
      cookies.set("token", response.data.jwt, { path: "/" });
      window.location.reload(false);
    })
    .catch(function(error) {
      console.log("error", error);
    });
}

export function logout() {
  cookies.remove("name", { path: "/" });
  cookies.remove("token", { path: "/" });
  window.location.reload(false);
}

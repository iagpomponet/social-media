import axios from "axios";

const baseURL = "http://localhost:8000";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.response.use(
  function (response) {
    // Do something before request is sent

    return response;
  },
  function (error) {
    // Do something with request error

    //if receive the error that says that the jwt is missing redirect user to login page and change state to not logged
    if (error?.response?.data?.error_data?.name === "JsonWebTokenError") {
      window.location.href = "/login";
      document.cookie = "socialMediaIsLogged=false";
    }
    return Promise.reject(error);
  }
);

export default api;

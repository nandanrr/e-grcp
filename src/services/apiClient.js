import axios from "axios";

const apiClient = axios.create({

  baseURL: "https://jsonplaceholder.typicode.com",

  timeout: 10000,

  headers: {
    "Content-Type": "application/json",
  },

});

/* Request Interceptor */

apiClient.interceptors.request.use(

  (config) => {

    const token = localStorage.getItem("token");

    if (token) {

      config.headers.Authorization = `Bearer ${token}`;

    }

    return config;

  },

  (error) => {

    return Promise.reject(error);

  }

);

/* Response Interceptor */

apiClient.interceptors.response.use(

  (response) => {

    return response;

  },

  (error) => {

    if (error.response) {

      switch (error.response.status) {

        case 400:
          console.error("Bad Request");
          break;

        case 401:
          localStorage.removeItem("token");
          window.location.href = "/session-expired";
          break;

        case 403:
          console.error("Access Denied");
          break;

        case 404:
          console.error("Resource Not Found");
          break;

        case 500:
          console.error("Internal Server Error");
          break;

        default:
          console.error("Something went wrong");
          break;

      }

    } else if (error.request) {

      alert(
    "Network Error. Please check your internet connection."
  );

    } else {

      console.error(error.message);

    }

    return Promise.reject(error);

  }

);

export default apiClient;
import axios from "axios";
import { getUserFromLocalStorage } from "./localstorage";

const customFetch = axios.create({
  baseURL: "https://api-find-job-production.up.railway.app/api/v1/",
});

customFetch.interceptors.request.use(
  (config) => {
    console.log(config);
    const user = getUserFromLocalStorage();
    if (user) {
      const { token } = user;

      config.headers["Authorization"] = `${user.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default customFetch;

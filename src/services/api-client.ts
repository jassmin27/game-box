import axios, { type AxiosRequestConfig } from "axios";
import type { FetchResponse } from "../types";

const axiosInstance = axios.create({
  baseURL: "https://api.rawg.io/api/",
  params: {
    key: "622efa9eb209447d841785bc25446477",
  },
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  /** Normal methods lose `this` when passed as references, 
   * but arrow functions keep `this` safe to pass around, 
   * hence getAll is defined as an arrow function
  */
  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  }
}

export default APIClient;

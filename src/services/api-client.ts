import axios, { type AxiosRequestConfig } from "axios";
import type { FetchResponse } from "../types";

const axiosInstance = axios.create({
  baseURL: "https://api.rawg.io/api/",
  params: {
    key: import.meta.env.VITE_RAWG_API_KEY,
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
  };

  get = (id: number | string, config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<T>(`${this.endpoint}/${id}`, config)
      .then((res) => res.data);
  };
}

export default APIClient;

import axios from "axios";

export const ApiUrl = axios.create({
  baseURL: "http://localhost:9090/api/v1"
});
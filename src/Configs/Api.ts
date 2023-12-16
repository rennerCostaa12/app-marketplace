import axios from "axios";

export const Api = axios.create({
  baseURL: "http://192.168.1.108:3000/",
});

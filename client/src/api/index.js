import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

// export const signIn = (data) => API.post("/users/login", data);
// export const testGet = () => API.get("/");

class APIRequests {
  static async signIn(data) {
    return await API.post("/auth/login", data);
  }

  static async testGet() {
    return await API.get("/users");
  }

  static async explore(address) {
    return await API.get(`/api/explore/${address}`);
  }

  static async getRisk(address) {
    return await API.get(`/api/explore/risk/${address}`);
  }

  static async changeTitle(address, data) {
    return await API.post(`/api/explore/title/${address}`, data);
  }

}

export default APIRequests;

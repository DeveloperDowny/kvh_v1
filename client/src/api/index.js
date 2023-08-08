import axios from "axios";

const API = axios.create({
  baseURL: "https://kvh.serveo.net/",
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
  static async signUp(data) {
    return await API.post("/auth/register", data);
  }

  static async signUp(data) {
    return await API.post("/auth/register", data);
  }

  static async testGet() {
    return await API.get("/users");
  }

  static async getRoomData(gameID, userID) {
    return await API.post("/auth/getRoomDetails", {
      gameID,
      userID,
    });
  }

  static async createRoom(userID) {
    return await API.post("/auth/createGameRoom", {
      uid: userID,
    });
  }

  static async joinRoom(userID, gameID) {
    return await API.post("/auth/joinGameRoom", {
      _id: userID,
      gameID: gameID,
    });
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

  static async getExchangeRate(from_currency, to_currency) {
    return await API.get(
      `/api/explore/exchange/${from_currency}/${to_currency}`
    );
  }
}

export default APIRequests;

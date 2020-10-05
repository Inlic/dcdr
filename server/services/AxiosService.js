import Axios from "axios";

export const steamApi = Axios.create({
  baseURL: "http://api.steampowered.com/IPlayerService/",
  timeout: 3000,
})

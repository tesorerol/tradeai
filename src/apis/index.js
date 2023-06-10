import Axios from "axios";
import ENV from "../utils/env";

export const axios = Axios.create({
  baseURL: ENV.baseURL,
});

axios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return error?.data || error;
  }
);

class APIService {
  checkWhiteList = async (owner) => axios.get(`check-whitelist/${owner}`);

  checkEntry = async (owner) => axios.get(`entry/${owner}`);

  listIdle = (owner) => axios.get(`list-stake/${owner}`);

  listActive = (owner) => axios.get(`list-unstake/${owner}`);

  stakeInfo = (owner) => axios.get(`stake-info/${owner}`);
}

const apiService = new APIService();

export { apiService };

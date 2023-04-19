import axiosClient from "./axiosClient";

const userApi = {
  signup(data) {
    const url = "/signup";
    return axiosClient.post(url, data);
  },
  login(data) {
    const url = "/login";
    return axiosClient.post(url, data);
  },
  logout() {
    const url = "/logout";
    return axiosClient.get(url);
  },
};
export default userApi;

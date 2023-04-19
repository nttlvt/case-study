import axios from "axios";
const axiosClient = axios.create({
    baseURL: "http://localhost:5000/",
    headers: {
        "Content-Type": "application/JSON",
    },
    //   withCredentials: true,
});
axiosClient.interceptors.request.use(
    function (config) {

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
axiosClient.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        const { config, status, data } = error.response;
        if (
            (status === 500) ||
            status == 400 ||
            status == 401 ||
            status == 404 ||
            status == 403
        ) {
            throw new Error(data.message);
        }
        return Promise.reject(error);
    }
);
export default axiosClient;
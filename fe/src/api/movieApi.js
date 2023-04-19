import axiosClient from "./axiosClient";

const movieApi = {
  getAllMovies(query) {
    const url = `/movies?${query}`;
    return axiosClient.get(url);
  },
  getMovieByID(id) {
    const url = `/movies/${id}`;
    return axiosClient.get(url);
  },
  getSimilarMovie(query) {
    const url = `/movies?${query}`;
    return axiosClient.get(url);
  },
  addMovie(data) {
    const url = `/movies/add`;
    return axiosClient.post(url, data);
  },
  updateMovie(id, data) {
    const url = `/movies/${id}`;
    return axiosClient.put(url, data);
  },
  deleteMovie(data) {
    const url = `/movies`;
    return axiosClient.delete(url, data);
  },
};
export default movieApi;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import movieApi from "../../api/movieApi";

const initialState = {
  movies: [],
  movieID: {},
  similar: [],
  myMovies: [],
  error: null,
  isLoading: false,
  total: 0,
};

export const getAllMovies = createAsyncThunk(
  "user/getAllMovies",
  async (payload) => {
    let query = `q=${payload.filter}&_page=${payload.page}&_limit=${payload.limit}&_total=1`;
    const response = await movieApi.getAllMovies(query);
    return {
      movies: response.data,
      total: response.headers.get("X-Total-Count"),
    };
  }
);

export const getMovieByID = createAsyncThunk(
  "user/getMovieByID",
  async (payload) => {
    const response = await movieApi.getMovieByID(payload.id);
    return response.data;
  }
);
export const getMyMovies = createAsyncThunk(
  "user/getMyMovie",
  async (payload) => {
    let query = `username=${payload.username}`;
    const response = await movieApi.getAllMovies(query);
    return response.data;
  }
);
export const getSimilarMovie = createAsyncThunk(
  "user/getSimilarMovie",
  async (payload) => {
    let query = `genres_in=${payload.genres}&_page=1&_limit=10`;
    const response = await movieApi.getSimilarMovie(query);
    return response.data;
  }
);
export const addMovie = createAsyncThunk("user/addMovie", async (payload) => {
  const response = await movieApi.addMovie(payload);
  return response.data.movie;
});
export const deleteMovie = createAsyncThunk(
  "user/deleteMovie",
  async (payload) => {
    const data = payload.data;
    console.log(data);
    const response = await movieApi.deleteMovie(payload);
    return response.data.movies;
  }
);
export const updateMovie = createAsyncThunk(
  "user/updateMovie",
  async (payload) => {
    const data = payload.data;
    const id = payload.id;
    const response = await movieApi.updateMovie(id, data);
    console.log(response);
    return response.data.movie;
  }
);
const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllMovies.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllMovies.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.total = action.payload.total;
      state.movies = action.payload.movies;
    },
    [getAllMovies.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [getMovieByID.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getMovieByID.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.movieID = action.payload;
    },
    [getMovieByID.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [getSimilarMovie.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getSimilarMovie.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.similar = action.payload;
    },
    [getSimilarMovie.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [getMyMovies.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getMyMovies.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.myMovies = action.payload;
    },
    [getMyMovies.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },

    [addMovie.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addMovie.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.myMovies.push(action.payload);
    },
    [addMovie.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [updateMovie.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateMovie.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [updateMovie.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [deleteMovie.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteMovie.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.movies = action.payload;
    },
    [deleteMovie.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
  },
});
const { actions, reducer } = movieSlice;
export default reducer;

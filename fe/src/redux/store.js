import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/auth/userSlice";
import movieReducer from "../redux/movies/movieSlice";

const rootReducer = {
  user: userReducer,
  movie: movieReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;

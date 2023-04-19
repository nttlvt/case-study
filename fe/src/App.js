import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./components/layout/Main";
import HomePage from "./page/HomePage";
import Banner from "./components/banner/Banner";
import MoviePage from "./page/MoviePage";
import MovieDetailsPage from "./page/MovieDetailsPage";
import LoginPage from "./page/LoginPage";
import SignupPage from "./page/SignupPage";
import ManageMoviePage from "./page/ManageMoviePage.js";
import useRouteElement from "./useRouteElement";

function App() {
  const routeElements = useRouteElement();

  return <Fragment>{routeElements}</Fragment>;
}

export default App;

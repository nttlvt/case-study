import { Navigate, Outlet, useRoutes } from "react-router-dom";
import Main from "./components/layout/Main";
import HomePage from "./page/HomePage";
import Banner from "./components/banner/Banner";
import MoviePage from "./page/MoviePage";
import MovieDetailsPage from "./page/MovieDetailsPage";
import LoginPage from "./page/LoginPage";
import SignupPage from "./page/SignupPage";
import ManageMoviePage from "./page/ManageMoviePage.js";
import { useSelector } from "react-redux";

function ProtectedRoute() {
  const isAuthentication = useSelector((state) => state.user.isAuthen);
  return isAuthentication ? <Outlet /> : <Navigate to="/" />;
}
const useRouteElement = () => {
  const routeElements = useRoutes([
    {
      path: "",
      element: <Main />,
      children: [
        {
          path: "",
          element: (
            <>
              <Banner />
              <HomePage />
            </>
          ),
        },
        {
          path: "/movies",
          element: <MoviePage />,
        },
        {
          path: "/movie/:movieId",
          element: <MovieDetailsPage />,
        },
        {
          path: "/my-movies",
          element: <ProtectedRoute />,
          children: [
            {
              path: "",
              element: <ManageMoviePage />,
            },
          ],
        },
      ],
    },

    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
  ]);
  return routeElements;
};
export default useRouteElement;

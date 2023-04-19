import React, { Fragment } from "react";
import MovieList from "../components/movie/MovieList";
const HomePage = () => {
  return (
    <Fragment>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">
          Now Playing
        </h2>
        <MovieList />
      </section>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">
          Top Rated
        </h2>
        <MovieList type="vote_rate" />
      </section>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">
          Top Trending
        </h2>
        <MovieList type="vote_count" />
      </section>
    </Fragment>
  );
};

export default HomePage;

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieByID, getSimilarMovie } from "../redux/movies/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import MovieVideos from "../components/MovieDetail/MovieVideos";
import MovieCreadits from "../components/MovieDetail/MovieCreadits";
import MovieSimilar from "../components/MovieDetail/MovieSimilar";
const MovieDetailsPage = () => {
  const dispatch = useDispatch();
  const movieState = useSelector((state) => state.movie);
  const movie = movieState.movieID;

  const { movieId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const action = getMovieByID({ id: movieId });
        await dispatch(action);
      } catch (error) {
        console.log(error);
      }
    };
    window.scrollTo(0, 0);
    fetchData();
  }, [movieId]);

  const { cast, videos, backdrop_path, poster_path, title, genres, overview } =
    movie;
  useEffect(() => {
    const fetchData = async () => {
      if (genres) {
        try {
          const strGenres = genres.toString();
          const action = getSimilarMovie({ genres: strGenres });
          await dispatch(action);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [genres]);
  const movieSimilar = movieState.similar;
  const loading = movieState.isLoading;

  return (
    <div className="py-10">
      <div className="w-full h-[600px] relative">
        <div className="absolute inset-0 bg-block bg-opacity-70"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          alt=""
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <h1 className="text-center text-4xl font-bold text-white mb-10">
        {title}
      </h1>
      {genres?.length > 0 && (
        <div className="flex items-center gap-x-5 mb-10 justify-center">
          {genres.map((item, index) => (
            <span
              key={index}
              className="py-2 px-4 border-primary text-primary border rounded"
            >
              {item}
            </span>
          ))}
        </div>
      )}
      <p className="text-center text-sm leading-relaxed max-w-[600px] mx-auto mb-10">
        {overview}
      </p>
      <MovieCreadits cast={cast} />
      <MovieVideos videos={videos} />
      <MovieSimilar movies={movieSimilar} loading={loading} />
    </div>
  );
};

export default MovieDetailsPage;

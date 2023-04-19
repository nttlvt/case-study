import React, { useEffect, useState } from "react";
import MovieCard from "../components/movie/MovieCard";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
import { getAllMovies } from "../redux/movies/movieSlice";
import { useDispatch, useSelector } from "react-redux";

const itemsPerPage = 8;
const MoviePage = () => {
  const dispatch = useDispatch();
  const movieState = useSelector((state) => state.movie);
  const movies = movieState.movies;
  const total = movieState.total;
  const loading = movieState.isLoading;
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const filterDebounce = useDebounce(filter, 1000);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const action = getAllMovies({ page, filter, limit: itemsPerPage });
        await dispatch(action);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [filterDebounce, page]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    if (!movies) return;
    // const totalPage = Math.ceil(parseInt(total) / itemsPerPage);
    // setPageCount(totalPage === 0 ? 1 : totalPage);
    setPageCount(Math.ceil(parseInt(total) / itemsPerPage));
  }, [filter, movies]);

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  return (
    <div className="py-10 page-container">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 bg-slate-800 outline-none text-white"
            placeholder="Type here to search ..."
            onChange={handleFilterChange}
          />
        </div>
        <button className="p-4 bg-primary text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin"></div>
      )}
      <div className="grid grid-cols-4 gap-10">
        {!loading &&
          movies?.length > 0 &&
          movies?.map((item) => <MovieCard key={item.id} item={item} />)}
      </div>
      {!loading && movies?.length === 0 && (
        <div className="flex flex-col h-[500px] bg-white items-center justify-center rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="black"
            className="bg-transparent w-16 h-16 animate-ping"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <h1 className="mt-10 text-3xl font-bold text-black">
            No Movie Found
          </h1>
        </div>
      )}
      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< Previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
    </div>
  );
};

export default MoviePage;

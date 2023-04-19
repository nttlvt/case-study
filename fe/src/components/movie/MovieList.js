import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import MovieCard from "./MovieCard";
import axios from "axios";
const MovieList = ({ type = "release_date" }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const movies = await axios.get(
        `http://localhost:5000/movies?_sort=${type}&_order=desc&_page=1&_limit=10`
      );
      setData(movies.data);
    };
    fetchData();
  }, []);
  return (
    <div className="movie-list">
      <Swiper grabCursor={"true"} spaceBetween={27} slidesPerView={"auto"}>
        {data.length > 0 &&
          data.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;

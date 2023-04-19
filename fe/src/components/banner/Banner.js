import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import BannerItem from "./BannerItem";
import axios from "axios";

const Banner = () => {
  const [data, setData] = useState(null);
  // const { data, error } = useSWR(
  //   "https://api.themoviedb.org/3/movie/upcoming?api_key=95f2419536f533cdaa1dadf83c606027",
  //   fetcher
  // );
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:5000/movies?_sort=release_date&_order=desc&_page=1&_limit=10"
      );
      setData(response.data);
    };
    fetchData();
  }, []);
  return (
    <section className="banner h-[500px] bg-white page-container mb-20 overflow-hidden rounded-lg">
      <Swiper grabCursor={"true"} slidesPerView={"auto"}>
        {data?.length > 0 &&
          data?.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};
export default Banner;

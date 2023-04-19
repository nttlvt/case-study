import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";

const BannerItem = ({ item }) => {
  const { title, poster_path, id, genres } = item;
  const navigate = useNavigate();
  return (
    <div className="w-full h-full relative">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)]"></div>
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt=""
        className="w-full h-full object-cover"
      />
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-3xl mb-5">{title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          {genres?.map((value, index) => (
            <span
              key={index}
              className="py-2 px-4 border border-white rounded-md"
            >
              {value}
            </span>
          ))}
        </div>
        <Button onCLick={() => navigate(`/movie/${id}`)}>Watch now</Button>
      </div>
    </div>
  );
};

export default BannerItem;

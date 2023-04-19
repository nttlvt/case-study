function MovieVideos({ videos }) {
  return (
    <div className="py-10">
      <div className="flex flex-col gap-10">
        {videos?.map((item) => (
          <div className="" key={item.id}>
            <h3 className="mb-5 text-xl font-medium p-3 bg-secondary inline-block">
              {item.name}
            </h3>
            <div key={item.id} className="w-full aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${item.key}`}
                title={item.key}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-fill"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MovieVideos;

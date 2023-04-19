const jsonServer = require("json-server");
const server = jsonServer.create();
const cors = require("cors");
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);
// API login
server.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = router.db.get("users").find({ username }).value();
  if (!user) {
    res.status(401).json({ message: "Invalid username or password" });
  } else if (password != user.password) {
    res.status(401).json({ message: "Invalid username or password" });
  } else {
    res.json({ message: "Login success", user });
  }
});

// API register
server.post("/signup", (req, res) => {
  try {
    const { name, username, password } = req.body;
    const user = router.db.get("users").find({ username }).value();
    if (user) {
      res.status(401).json({ message: "username has already exist" });
    } else {
      const id = Date.now();
      router.db.get("users").push({ id, name, username, password }).write();
      res.json({
        message: "Signup success",
        user: { name, username, password },
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// API add movie
server.post("/movies/add", (req, res) => {
  try {
    const id = Date.now();
    const movie = { ...req.body, id };
    router.db.get("movies").push(movie).write();
    res.json({
      message: "add movie success",
      movie,
    });
  } catch (error) {
    console.log(error);
  }
});
server.put("/movies/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const movie = router.db.get("movies").find({ id }).value();
    if (movie) {
      if (req.body.genres) {
        if (!movie.genres) movie.genres = [];
        movie?.genres.push(req.body.genres.genres);
      }
      if (req.body.cast) {
        if (!movie.cast) movie.cast = [];
        movie?.cast.push(req.body.cast);
      }
      if (req.body.video) {
        if (!movie.videos) movie.videos = [];
        movie?.videos.push(req.body.video);
      }
      router.db.get("movies").find({ id }).assign(movie).write();
      res.status(200).json({
        message: "update movie success",
        movie,
      });
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    console.log(error);
  }
});
server.delete("/movies", async (req, res) => {
  try {
    console.log(req.body);
    const arr_movie = req.body.movie;
    let movies = router.db.get("movies").value();
    for (const movieId of arr_movie) {
      const index = await movies.findIndex(
        (movie) => movie.id === parseInt(movieId)
      );
      movies.splice(index, 1);
    }
    router.db.set("movies", movies).write();

    res.status(204).json({
      message: "Xóa phim thành công",
      movies,
    });
  } catch (error) {
    console.log(error);
  }
});
server.use(router);
const port = 5000;
server.listen(port, () => {
  console.log(`JSON Server is running at ${port}`);
});

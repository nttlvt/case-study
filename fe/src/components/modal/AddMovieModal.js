import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addMovie } from "../../redux/movies/movieSlice";
import LoadingButton from "../button/LoadingButton";
const schema = yup.object().shape({
  title: yup.string().required(),
  poster_path: yup.string().required(),
  backdrop_path: yup.string().required(),
  vote_count: yup.string().required(),
  vote_average: yup.string().required(),
  overview: yup.string().required(),
});

export default function AddMovieModal({ open, handleClose }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const movieState = useSelector((state) => state.movie);
  const loading = movieState.isLoading;
  const closeModal = () => {
    reset();
    handleClose();
  };
  const onSubmit = async (data) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const action = addMovie({ ...data, username: user.username });
      await dispatch(action);
      toast.dismiss();
      toast.success("Thêm mới phim thành công !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog fullWidth open={open} onClose={closeModal}>
      <DialogTitle>Add Movie</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box mb={2}>
            <TextField
              style={{ width: "100%" }}
              label="Title"
              {...register("title")}
              error={errors.name ? true : false}
              helperText={errors.name && errors.name.message}
            />
          </Box>
          <Box mb={2}>
            <TextField
              style={{ width: "100%" }}
              label="Poster Path"
              {...register("poster_path")}
              error={errors.poster_path ? true : false}
              helperText={errors.poster_path && errors.poster_path.message}
            />
          </Box>
          <Box mb={2}>
            <TextField
              style={{ width: "100%" }}
              label="Backdrop Path"
              {...register("backdrop_path")}
              error={errors.backdrop_path ? true : false}
              helperText={errors.backdrop_path && errors.backdrop_path.message}
            />
          </Box>
          <Box mb={2}>
            <TextField
              style={{ width: "100%" }}
              type="date"
              label="Release Date"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("release_date")}
              error={errors.release_date ? true : false}
              helperText={errors.release_date && errors.release_date.message}
            />
          </Box>
          <Box mb={2}>
            <TextField
              style={{ width: "100%" }}
              type="number"
              inputProps={{ min: 0, step: 1 }}
              label="Vote Count"
              {...register("vote_count")}
              error={errors.vote_count ? true : false}
              helperText={errors.vote_count && errors.vote_count.message}
            />
          </Box>
          <Box mb={2}>
            <TextField
              style={{ width: "100%" }}
              type="number"
              inputProps={{ min: 0, max: 10, step: 0.001 }}
              label="Vote Average"
              {...register("vote_average")}
              error={errors.vote_average ? true : false}
              helperText={errors.vote_average && errors.vote_average.message}
            />
          </Box>
          <Box mb={2}>
            <TextField
              style={{ width: "100%" }}
              multiline
              rows={4}
              label="Overview"
              {...register("overview")}
              error={errors.overview ? true : false}
              helperText={errors.overview && errors.overview.message}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          {loading ? <LoadingButton /> : <Button type="submit">Add</Button>}
        </DialogActions>
      </form>
    </Dialog>
  );
}

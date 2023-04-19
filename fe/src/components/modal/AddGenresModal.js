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
import { updateMovie } from "../../redux/movies/movieSlice";
import LoadingButton from "../button/LoadingButton";
const schema = yup.object().shape({
  genres: yup.string().required(),
});

export default function AddGenresModal({ id, open, handleClose }) {
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
      const action = updateMovie({ id, data: { genres: data } });
      await dispatch(action);
      toast.dismiss();
      toast.success("Thêm thể loại thành công !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog fullWidth open={open} onClose={closeModal}>
      <DialogTitle>Add Cast</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box mb={2}>
            <TextField
              style={{ width: "100%" }}
              label="Genres"
              {...register("genres")}
              error={errors.genres ? true : false}
              helperText={errors.genres && errors.genres.message}
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

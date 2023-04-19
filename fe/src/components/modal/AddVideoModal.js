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
  id: yup.string().required(),
  key: yup.string().required(),
});

export default function AddVideoModal({ id, open, handleClose }) {
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
      const action = updateMovie({ id, data: { video: data } });
      await dispatch(action);
      toast.dismiss();
      toast.success("Thêm link phim thành công !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog fullWidth open={open} onClose={closeModal}>
      <DialogTitle>Add Video</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box mb={2}>
            <TextField
              style={{ width: "100%" }}
              label="Id"
              {...register("id")}
              error={errors.id ? true : false}
              helperText={errors.id && errors.id.message}
            />
          </Box>
          <Box mb={2}>
            <TextField
              style={{ width: "100%" }}
              label="Key"
              {...register("key")}
              error={errors.key ? true : false}
              helperText={errors.key && errors.key.message}
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

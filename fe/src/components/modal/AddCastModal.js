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
  profile_path: yup.string().required(),
  name: yup.string().required(),
});

export default function AddCastModal({ id, open, handleClose }) {
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
      const action = updateMovie({ id, data: { cast: data } });
      await dispatch(action);
      toast.dismiss();
      toast.success("Thêm diễn viên thành công !", {
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
              label="Id"
              {...register("id")}
              error={errors.id ? true : false}
              helperText={errors.id && errors.id.message}
            />
          </Box>
          <Box mb={2}>
            <TextField
              style={{ width: "100%" }}
              label="Profile Path"
              {...register("profile_path")}
              error={errors.profile_path ? true : false}
              helperText={errors.profile_path && errors.profile_path.message}
            />
          </Box>
          <Box mb={2}>
            <TextField
              style={{ width: "100%" }}
              label="Name"
              {...register("name")}
              error={errors.name ? true : false}
              helperText={errors.name && errors.name.message}
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

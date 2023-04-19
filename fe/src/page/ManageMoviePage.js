import { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteMovie, getMyMovies } from "../redux/movies/movieSlice";
import AddMovieModal from "../components/modal/AddMovieModal";
import AddCastModal from "../components/modal/AddCastModal";
import AddGenresModal from "../components/modal/AddGenresModal";
import AddVideoModal from "../components/modal/AddVideoModal";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function ManageMoviePage() {
  const dispatch = useDispatch();
  const movieState = useSelector((state) => state.movie);
  const movies = movieState.myMovies;
  const [reset, setReset] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const action = getMyMovies({
          username: JSON.parse(localStorage.getItem("user")).username,
        });
        await dispatch(action);
        setReset(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [reset]);

  const [isAddMovieOpen, setIsAddMovieOpen] = useState(false);
  const [isAddCastOpen, setIsAddCastOpen] = useState(false);
  const [isAddGenresOpen, setIsAddGenresOpen] = useState(false);
  const [isAddVideoOpen, setIsAddVideoOpen] = useState(false);
  const [index, setIndex] = useState();

  const handleAddMovieOpen = () => {
    setIsAddMovieOpen(true);
  };

  const handleAddMovieClose = () => {
    setIsAddMovieOpen(false);
  };
  const handleAddCastOpen = (id) => {
    setIndex(id);
    setIsAddCastOpen(true);
  };

  const handleAddCastClose = () => {
    setIsAddCastOpen(false);
  };
  const handleAddGenresOpen = (id) => {
    setIndex(id);
    setIsAddGenresOpen(true);
  };

  const handleAddGenresClose = () => {
    setIsAddGenresOpen(false);
  };
  const handleAddVideoOpen = (id) => {
    setIndex(id);
    setIsAddVideoOpen(true);
  };

  const handleAddVideoClose = () => {
    setIsAddVideoOpen(false);
  };
  const columns = [
    {
      name: "id",
      label: "Id",
      options: {
        customBodyRender: (value) => (
          <Link to={`/movie/${value}`} className="hover:text-blue-500">
            {value}
          </Link>
        ),
      },
    },
    {
      name: "poster_path",
      label: "POSTER",
      options: {
        sort: false,
        customBodyRender: (value) => (
          <img
            src={`https://image.tmdb.org/t/p/w500/${value}`}
            width="80px"
            height="50px"
            alt=""
          />
        ),
      },
    },
    {
      name: "title",
      label: "title",
    },
    {
      name: "release_date",
      label: "Release",
    },
    {
      name: "ACTION",
      options: {
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <Button
                variant="outlined"
                color="secondary"
                style={{ marginRight: "10px" }}
                onClick={() => handleAddCastOpen(tableMeta.rowData[0])}
              >
                Add Cast
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                style={{ marginRight: "10px" }}
                onClick={() => handleAddGenresOpen(tableMeta.rowData[0])}
              >
                Add Genres
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleAddVideoOpen(tableMeta.rowData[0])}
              >
                Add Video
              </Button>
            </>
          );
        },
      },
    },

    // {
    //   name: "Health",
    //   options: {
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       if (value === "OK")
    //         return (
    //           <Tooltip title="OK">
    //             <Done color="primary" />
    //           </Tooltip>
    //         );
    //       else
    //         return (
    //           <Tooltip title="Failing">
    //             <Error color="error" />
    //           </Tooltip>
    //         );
    //     },
    //   },
    // },
  ];

  const options = {
    // filterType: "dropdown",
    filter: false,
    responsive: "simple",
    selectableRows: "multiple",
    viewColumns: false,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 15, 20, 50],
    customToolbarSelect: (selectedRows, displayData) => (
      <Tooltip title="Delete">
        <IconButton
          style={{
            marginRight: "24px",
            height: "48px",
            top: "50%",
            display: "block",
            position: "relative",
          }}
          onClick={async () => {
            const arrItemSelect = await selectedRows?.data.map(
              (item) => displayData[item.index].data[0]
            );
            const action = deleteMovie({ data: { movie: arrItemSelect } });
            await dispatch(action);
            toast.dismiss();
            toast.success("Xóa phim thành công !", {
              position: toast.POSITION.TOP_RIGHT,
            });
            setReset(true);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    ),
    customToolbar: ({ displayData }) => {
      return (
        <Button variant="outlined" color="primary" onClick={handleAddMovieOpen}>
          Add Movie
        </Button>
      );
    },

    // onRowsSelect: (currentRowsSelected, allRowsSelected) => {
    //   console.log(data[allRowsSelected[0].index]);
    // },

    // onRowsDelete: (rowsDeleted, data) => {
    //   console.log(rowsDeleted, data);
    // },
  };

  return (
    <div className="page-container pb-10">
      <MUIDataTable
        title={"Manage My Movies"}
        options={options}
        data={movies}
        columns={columns}
      />
      <AddMovieModal open={isAddMovieOpen} handleClose={handleAddMovieClose} />
      <AddCastModal
        id={index}
        open={isAddCastOpen}
        handleClose={handleAddCastClose}
      />
      <AddGenresModal
        id={index}
        open={isAddGenresOpen}
        handleClose={handleAddGenresClose}
      />
      <AddVideoModal
        id={index}
        open={isAddVideoOpen}
        handleClose={handleAddVideoClose}
      />
    </div>
  );
}

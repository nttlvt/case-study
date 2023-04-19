import React, { useState } from "react";
import { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { useSelector, useDispatch } from "react-redux";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { logout } from "../../redux/auth/userSlice";
import { toast } from "react-toastify";
const Header = () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  useOnClickOutside(ref, () => {
    setOpen(false);
  });
  const handleLogout = () => {
    try {
      dispatch(logout());
      toast.dismiss();
      toast.success("Đăng xuất thành công !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {}
  };
  return (
    <header className="header relative page-container flex items-center justify-center gap-x-5 text-white py-10 mb-5">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        Movies
      </NavLink>
      {user.isAuthen ? (
        <button
          ref={ref}
          className="py-3 bg-secondary rounded-lg absolute right-0 px-6"
          onClick={() => setOpen(!open)}
        >
          {
            <div className="relative">
              <div> {user.user.name}</div>
              {open && (
                <div className="bg-indigo-400 py-2 w-36 shadow-lg absolute z-50 -left-5 top-9 rounded-lg">
                  <ul className="text-left">
                    <li
                      className="hover:bg-indigo-300 rounded-lg px-4 py-1"
                      onClick={() => navigate("/my-movies")}
                    >
                      My Movie
                    </li>
                    <li
                      className="hover:bg-indigo-300 rounded-lg px-4 py-1 "
                      onClick={handleLogout}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          }
        </button>
      ) : (
        <Button
          bgColor="secondary"
          className="absolute right-0"
          onCLick={() => navigate("/login")}
        >
          Login
        </Button>
      )}
    </header>
  );
};

export default Header;

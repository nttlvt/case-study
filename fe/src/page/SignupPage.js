import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/button/Button";
import { signup } from "../redux/auth/userSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const action = signup(data);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      reset({
        name: "",
        username: "",
        password: "",
      });
      if (user) navigate("/login");
      toast.dismiss();
      toast.success("Đăng ký tài khoản thành công !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.log(error);
      setError("username", {
        type: "manual",
        message: error.message,
      });
    }
  };

  return (
    <Fragment>
      <div className="flex justify-center items-center h-screen bg-indigo-600">
        <div className="w-96 p-6 shadow-lg bg-white rounded-md relative">
          <h1 className="text-3xl block text-center font-semibold text-indigo-800">
            Signup Page
          </h1>
          <Button
            className={"absolute right-3 top-5 px-1 py-1"}
            onCLick={() => navigate("/")}
          >
            Back
          </Button>
          <hr className="mt-3" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-1">
              <label htmlFor="name" className="text-black block text-base mb-2">
                Name
              </label>
              <input
                type="name"
                id="name"
                className="border rounded-md w-full text-base text-blue-600 px-2 py-3 focus:outline-none focus:ring-0 focus:border-blue-600"
                placeholder="Enter Your Name..."
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className="mt-2 text-red-600">{errors.name.message}</span>
              )}
            </div>

            <div className="mt-3">
              <label
                htmlFor="username"
                className="text-black block text-base mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="border rounded-md w-full text-base px-2 py-3 text-blue-600 focus:outline-none focus:ring-0 focus:border-blue-600"
                placeholder="Enter Username..."
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <span className="mt-2 text-red-600">
                  {errors.username.message}
                </span>
              )}
            </div>
            <div className="mt-3">
              <label
                htmlFor="password"
                className="text-black block text-base mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="border rounded-md w-full text-base text-blue-600 px-2 py-3 focus:outline-none focus:ring-0 focus:border-blue-600"
                placeholder="Enter Password..."
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <span className="mt-2 text-red-600">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-indigo-800 italic">
                Already have an account
              </span>
              <Link
                to="/login"
                className="text-indigo-800 font-semibold underline"
              >
                Login here
              </Link>
            </div>
            <div className="mt-5">
              <button
                type="submit"
                className="border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
              >
                &nbsp;&nbsp;Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default SignupPage;

import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((res) => {
        const user = res.user;
        if (user) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        navigate(from);
      })
      .catch((error) => {
        if (error) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Something went wrong!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-5xl font-bold">Login now!</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-600">Email is required</p>
          )}

          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-600">password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-600">
              password must be 6 character or longer
            </p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-primary text-black text-lg mt-4">
            Login
          </button>
        </form>
        <p>
          <small>
            Don't have any account?
            <Link className="btn btn-link" to="/register">
              Register
            </Link>
          </small>
        </p>

        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Login;

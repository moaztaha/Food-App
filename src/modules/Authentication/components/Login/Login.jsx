import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { CiLock } from "react-icons/ci";
import { CiMobile1 } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Login",
        data,
      );
      localStorage.setItem("token", response.data.token);
      toast.success("Login Successfully");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <div className="title mb-4">
        <h3 className="h5">Log In</h3>
        <span className="text-muted">
          Welcome Back! Please enter your details
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group   ">
          <span className="input-group-text">
            <CiMobile1 className="text-muted" />
          </span>
          <input
            {...register("email", {
              required: "field is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email is not valid",
              },
            })}
            type="email"
            placeholder="enter your email"
            className="form-control "
            style={{ backgroundColor: "#F7F7F7" }}
          />
        </div>
        {errors.email && (
          <span className="text-danger">{errors.email.message}</span>
        )}

        <div className="input-group mt-3 ">
          <span className="input-group-text">
            <CiLock className="text-muted" />
          </span>
          <input
            {...register("password", {
              required: "field is required",
            })}
            type="password"
            placeholder="enter your password"
            className="form-control"
            style={{ backgroundColor: "#F7F7F7" }}
          />
        </div>
        {errors.password && (
          <span className="text-danger">{errors.password.message}</span>
        )}
        <div className="links d-flex justify-content-between mt-4">
          <Link to="/register" className="text-muted text-decoration-none">
            Register Now?
          </Link>
          <Link
            to="/forget-pass"
            className="text-decoration-none link-success ">
            Forgot Password?
          </Link>
        </div>

        <button className="btn btn-success w-100 rounded rounded-2 text-white my-3">
          Login
        </button>
      </form>
    </div>
  );
}

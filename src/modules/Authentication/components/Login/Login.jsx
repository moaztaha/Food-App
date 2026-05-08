import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authAPI } from "../../../../api";
import { AuthContext } from "../../../../context/AuthContext";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { saveLoginData } = useContext(AuthContext);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await authAPI.Login(data);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
      saveLoginData();
      toast.success("Login Successfully");
    } catch (error) {
      toast.error(error.response?.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="title mb-4">
        <h3 className="h4 fw-bold auth-header">Log In</h3>
        <span className=" auth-p">Welcome Back! Please enter your details</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group   ">
          <span className="input-group-text with-border  ">
            <i className="fa-solid fa-envelope  "></i>
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
            className="form-control custom-input "
          />
        </div>
        {errors.email && (
          <span className="text-danger">{errors.email.message}</span>
        )}

        <div className="input-group mt-4">
          <span className="input-group-text ">
            <i className="fa-solid fa-lock "></i>
          </span>
          <input
            {...register("password", {
              required: "field is required",
            })}
            type={showPassword ? "text" : "password"}
            placeholder="enter your password"
            className="form-control custom-input "
          />
          <span
            onClick={togglePassword}
            className="input-group-text no-border ">
            <i
              className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} `}></i>
          </span>
        </div>
        {errors.password && (
          <span className="text-danger">{errors.password.message}</span>
        )}
        <div className="links d-flex justify-content-between my-2">
          <Link to="/register" className="text-muted text-decoration-none">
            Register Now?
          </Link>
          <Link to="/forget-pass" className="text-decoration-none main-color ">
            Forgot Password?
          </Link>
        </div>

        <button
          disabled={loading}
          className=" w-100 rounded rounded-2 auth-btn  text-white my-4">
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}

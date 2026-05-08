import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../../../../api";
import { toast } from "react-toastify";
export default function Register() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await authAPI.Register(data);
      navigate("/verify-account");
      toast.success("Succesfully register");
      console.log(response.data.email);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="title mb-5">
        <h3 className="h5">Register</h3>
        <span className="text-muted">
          Welcome Back! Please enter your details
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex gap-3">
          <div className="w-50">
            <div className="input-group my-3">
              <span className="input-group-text">
                <i className="fa-solid fa-user  "></i>
              </span>
              <input
                {...register("userName", {
                  required: "field is required",
                  pattern: {
                    value: /^[a-zA-Z]+[0-9]+$/,
                    message: "must start with letters and end with numbers",
                  },
                })}
                type="text"
                placeholder="UserName"
                className="form-control custom-input"
              />
            </div>
            {errors.userName && (
              <span className="text-danger">{errors.userName.message}</span>
            )}

            <div className="input-group my-3   ">
              <span className="input-group-text">
                <i className="fa-solid fa-earth-europe "></i>
              </span>
              <input
                {...register("country", {
                  required: "field is required",
                })}
                type="text"
                placeholder="Country"
                className="form-control custom-input"
              />
            </div>
            {errors.country && (
              <span className="text-danger">{errors.country.message}</span>
            )}

            <div className="input-group   my-3">
              <span className="input-group-text">
                <i className="fa-solid fa-lock  "></i>
              </span>
              <input
                {...register("password", {
                  required: "field is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must be at least 8 characters, include uppercase, lowercase, number and special character",
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="form-control custom-input"
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
          </div>

          <div className="w-50">
            <div className="input-group my-3   ">
              <span className="input-group-text">
                <i className="fa-solid fa-envelope  "></i>
              </span>
              <input
                {...register("email", {
                  required: "field is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "email is not valid",
                  },
                })}
                type="email"
                placeholder="Enter your E-mail"
                className="form-control custom-input"
              />
            </div>
            {errors.email && (
              <span className="text-danger">{errors.email.message}</span>
            )}

            <div className="input-group my-3  ">
              <span className="input-group-text">
                <i className="fa-solid fa-mobile "></i>
              </span>
              <input
                {...register("phoneNumber", {
                  required: "field is required",
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Invalid phone number",
                  },
                })}
                type="text"
                placeholder="phoneNumber"
                className="form-control custom-input"
              />
            </div>
            {errors.phoneNumber && (
              <span className="text-danger">{errors.phoneNumber.message}</span>
            )}

            <div className="input-group my-3  ">
              <span className="input-group-text">
                <i className="fa-solid fa-lock  "></i>
              </span>
              <input
                {...register("confirmPassword", {
                  required: "field is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="confirm-password"
                className="form-control custom-input"
              />
              <span
                onClick={toggleConfirmPassword}
                className="input-group-text no-border ">
                <i
                  className={`fa-solid ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} `}></i>
              </span>
            </div>
            {errors.confirmPassword && (
              <span className="text-danger">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <Link className="main-color" to="/login">
            Login now?
          </Link>
        </div>

        <button
          disabled={loading}
          className="auth-btn  w-100 rounded rounded-2 text-white mt-5">
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}

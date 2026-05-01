import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../../../../api";

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
      const response = await authAPI.Register(data);
      navigate("/login");
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
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa-solid fa-user  "></i>
              </span>
              <input
                {...register("userName", {
                  required: "field is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "userName is not valid",
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

            <div className="input-group   ">
              <span className="input-group-text">
                <i class="fa-solid fa-earth-europe "></i>
              </span>
              <input
                {...register("country", {
                  required: "field is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "country is not valid",
                  },
                })}
                type="text"
                placeholder="Country"
                className="form-control custom-input"
              />
            </div>
            {errors.counrty && (
              <span className="text-danger">{errors.counrty.message}</span>
            )}

            <div className="input-group   ">
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
            <div className="input-group   ">
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

            <div className="input-group   ">
              <span className="input-group-text">
                <i class="fa-solid fa-mobile "></i>
              </span>
              <input
                {...register("phoneNumber", {
                  required: "field is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "phoneNumber is not valid",
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

            <div className="input-group   ">
              <span className="input-group-text">
                <i className="fa-solid fa-lock  "></i>
              </span>
              <input
                {...register("confirmPassword", {
                  required: "field is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Not the same",
                  },
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

        <button
          disabled={loading}
          className="auth-btn  w-100 rounded rounded-2 text-white mt-5">
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}

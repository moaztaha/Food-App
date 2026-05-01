import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authAPI } from "../../../../api";

export default function ResetPass() {
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
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await authAPI.ResetPass(data);

      toast.success("Password Reset Successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="title mb-4">
        <h3 className="h5">Reset Password</h3>
        <span className="text-muted">
          Please Enter Your Otp or Check Your Inbox
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div className="input-group">
          <span className="input-group-text">
            <i className="fa-solid fa-envelope  "></i>
          </span>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email is not valid",
              },
            })}
            type="email"
            placeholder="Enter your email"
            className="form-control custom-input"
          />
        </div>
        {errors.email && (
          <p className="text-danger small">{errors.email.message}</p>
        )}

        <div className="input-group mt-3">
          <span className="input-group-text">
            <i className="fa-solid fa-lock  "></i>
          </span>
          <input
            {...register("seed", {
              required: "OTP is required",
            })}
            type="text"
            placeholder="OTP"
            className="form-control custom-input"
          />
        </div>
        {errors.seed && (
          <p className="text-danger small">{errors.seed.message}</p>
        )}

        {/* Password */}
        <div className="input-group mt-3">
          <span className="input-group-text">
            <i className="fa-solid fa-lock  "></i>
          </span>
          <input
            {...register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must be at least 8 characters, include uppercase, lowercase, number and special character",
              },
            })}
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
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
          <p className="text-danger small">{errors.password.message}</p>
        )}

        {/* Confirm Password */}
        <div className="input-group mt-3">
          <span className="input-group-text">
            <i className="fa-solid fa-lock  "></i>
          </span>
          <input
            {...register("confirmPassword", {
              required: "Confirmation password is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must be at least 8 characters, include uppercase, lowercase, number and special character",
              },
              validate: (value) =>
                value === watch("password") || "Passwords don't match",
            })}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm New Password"
            className="form-control custom-input "
          />
          <span
            onClick={toggleConfirmPassword}
            className="input-group-text no-border ">
            <i
              className={`fa-solid ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} `}></i>
          </span>
        </div>
        {errors.confirmPassword && (
          <p className="text-danger small">{errors.confirmPassword.message}</p>
        )}

        <button
          disabled={loading}
          className=" auth-btn w-100 rounded-2 text-white my-3 ">
          {loading ? "Loading..." : "ٌRese tPassword"}
        </button>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import { authAPI } from "../../../../api";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import logo from "../../../../assets/images/logo.png";

export default function ChangePass({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmNEwPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  let {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await authAPI.ChangePassword(data);
      toast.success("Password changed successfully");
      onClose();
    } catch (error) {
      toast.error("Feild to change password");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="p-3">
        <img src={logo} className="w-75 mb-4 text-center" alt="logo" />
        <div className="title mb-4">
          <h3 className="h5">Change Your Password</h3>
          <span className="text-muted">Enter your details below</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* old password */}
          <div className="input-group mt-3">
            <span className="input-group-text">
              <i className="fa-solid fa-lock  "></i>
            </span>
            <input
              {...register("oldPassword", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must be at least 8 characters, include uppercase, lowercase, number and special character",
                },
              })}
              type={showOldPassword ? "text" : "password"}
              placeholder="Old Password"
              className="form-control custom-input"
            />
            <span
              onClick={toggleOldPassword}
              className="input-group-text no-border ">
              <i
                className={`fa-solid ${showOldPassword ? "fa-eye-slash" : "fa-eye"} `}></i>
            </span>
          </div>
          {errors.oldPassword && (
            <p className="text-danger small">{errors.oldPassword.message}</p>
          )}

          {/* new password */}
          <div className="input-group mt-3">
            <span className="input-group-text">
              <i className="fa-solid fa-lock  "></i>
            </span>
            <input
              {...register("newPassword", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must be at least 8 characters, include uppercase, lowercase, number and special character",
                },
              })}
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              className="form-control custom-input"
            />
            <span
              onClick={toggleNewPassword}
              className="input-group-text no-border ">
              <i
                className={`fa-solid ${showNewPassword ? "fa-eye-slash" : "fa-eye"} `}></i>
            </span>
          </div>
          {errors.newPassword && (
            <p className="text-danger small">{errors.newPassword.message}</p>
          )}

          {/* confirm new Password */}
          <div className="input-group mt-3">
            <span className="input-group-text">
              <i className="fa-solid fa-lock  "></i>
            </span>
            <input
              {...register("confirmNewPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="confirm new password"
              className="form-control custom-input"
            />
            <span
              onClick={toggleConfirmNEwPassword}
              className="input-group-text no-border ">
              <i
                className={`fa-solid ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} `}></i>
            </span>
          </div>
          {errors.confirmNewPassword && (
            <p className="text-danger small">
              {errors.confirmNewPassword.message}
            </p>
          )}

          <button
            disabled={loading}
            className=" auth-btn w-100 rounded-2 text-white mt-5 ">
            {loading ? "Loading..." : "Change Password"}
          </button>
        </form>
      </div>
    </>
  );
}

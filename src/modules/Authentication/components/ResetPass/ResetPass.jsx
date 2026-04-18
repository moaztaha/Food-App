
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { CiLock, CiMobile1 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 

export default function ResetPass() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch, 
  } = useForm();
  
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset",
        data
      );
  
      toast.success("Password Reset Successfully");
      navigate("/login");
    } catch (error) {

      toast.error( "Something went wrong");
    }
  };

  return (
    <div>
      <div className="title mb-4">
        <h3 className="h5">Reset Password</h3>
        <span className="text-muted">Please Enter Your Otp or Check Your Inbox</span>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div className="input-group">
          <span className="input-group-text"><CiMobile1 className="text-muted" /></span>
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
            className="form-control"
            style={{ backgroundColor: "#F7F7F7" }}
          />
        </div>
        {errors.email && <p className="text-danger small">{errors.email.message}</p>}


        <div className="input-group mt-3">
          <span className="input-group-text"><CiLock className="text-muted" /></span>
          <input
            {...register("seed", { 
              required: "OTP is required",
            })}
            type="text"
            placeholder="OTP"
            className="form-control"
            style={{ backgroundColor: "#F7F7F7" }}
          />
        </div>
        {errors.seed && <p className="text-danger small">{errors.seed.message}</p>}

        {/* Password */}
        <div className="input-group mt-3">
          <span className="input-group-text"><CiLock className="text-muted" /></span>
          <input
            {...register("password", {
              required: "Password is required",
            })}
            type="password"
            placeholder="New Password"
            className="form-control"
            style={{ backgroundColor: "#F7F7F7" }}
          />
        </div>
        {errors.password && <p className="text-danger small">{errors.password.message}</p>}

        {/* Confirm Password */}
        <div className="input-group mt-3">
          <span className="input-group-text"><CiLock className="text-muted" /></span>
          <input
            {...register("confirmPassword", {
              required: "Confirmation is required",
              validate: (value) => value === watch("password") || "Passwords don't match"
            })}
            type="password"
            placeholder="Confirm New Password"
            className="form-control"
            style={{ backgroundColor: "#F7F7F7" }}
          />
        </div>
        {errors.confirmPassword && <p className="text-danger small">{errors.confirmPassword.message}</p>}

        <button className="btn btn-success w-100 rounded-2 text-white my-3">
          Reset Password
        </button>
      </form>
    </div>
  );
}

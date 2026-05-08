import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authAPI } from "../../../../api";


export default function VerifyAccount() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await authAPI.VerifyAccount(data);
      navigate("/login");
toast.success("Account verified successfully");    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="title mb-4">
        <h3 className="h5"> Verify Account</h3>
        <span className="text-muted">
          Please Enter Your Otp or Check Your Inbox
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group ">
          <span className="input-group-text ">
            <i className="fa-solid fa-envelope"></i>
          </span>
          <input
            {...register("email", {
              required: "field is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email is not valid",
              },
            })}
            type="text"
            placeholder="enter your email"
            className="form-control custom-input "
          />
        </div>
        {errors.email && (
          <span className="text-danger">{errors.email.message}</span>
        )}

        <div className="input-group my-3 ">
          <span className="input-group-text">
            <i className="fa-solid fa-lock     "></i>
          </span>
          <input
            {...register("code", {
              required: "field is required",
            })}
            type="text"
            placeholder="OTP"
            className="form-control custom-input"
          />
        </div>
        {errors.code && (
          <span className="text-danger">{errors.code.message}</span>
        )}
        <button
          disabled={loading}
          className="auth-btn w-100 rounded rounded-2 text-white my-3">
          {loading ? "Loading..." : "Send"}
        </button>
      </form>
    </div>
  );
}

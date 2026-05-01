import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../../../../api";

export default function ForgetPass() {
  const [loading, setLoading] = useState(false);
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
      const response = await authAPI.Forgetpass(data);

      localStorage.setItem("token", response.data.token);
      navigate("/reset-pass");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="title mb-5">
        <h3 className="h5">Forgot Your Password?</h3>
        <span className="text-muted">
          No worries! Please enter your email and we will send a password reset
          link
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group   ">
          <span className="input-group-text">
            <i className="fa-solid fa-envelope "></i>
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
            className="form-control custom-input"
            style={{ backgroundColor: "#F7F7F7" }}
          />
        </div>
        {errors.email && (
          <span className="text-danger">{errors.email.message}</span>
        )}

        <button
          disabled={loading}
          className="auth-btn  w-100 rounded rounded-2 text-white mt-5">
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

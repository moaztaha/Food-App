import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { CiLock } from "react-icons/ci";
import { CiMobile1 } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

export default function ForgetPass() {
  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request",
        data,
      );
      console.log(response);
      localStorage.setItem("token", response.data.token);
      navigate("/reset-pass");
    } catch (error) {
      console.log(error);
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

        <button className="btn btn-success w-100 rounded rounded-2 text-white mt-5">
          Submit
        </button>
      </form>
    </div>
  );
}

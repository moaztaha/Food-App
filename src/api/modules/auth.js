import axiosClient from "../axiosClient";

export const Register = (data) => {
  return axiosClient.post("/Users/Register", data);
};

export const Login = (data) => {
  return axiosClient.post("/Users/Login", data);
};

export const Forgetpass = (data) => {
  return axiosClient.post("/Users/Reset/Request", data);
};

export const ResetPass = (data) => {
  return axiosClient.post("/Users/Reset", data);
};

export const VerifyAccount = (data) => {
  return axiosClient.put("/Users/verify", data);
};

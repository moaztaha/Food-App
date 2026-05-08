import axiosClient from "../axiosClient";

export const GetUsers = (params) => {
  return axiosClient.get("/Users", { params });
};

export const DeleteuserById = (id) => {
  return axiosClient.delete(`/Users/${id}`);
};

import axiosClient from "../axiosClient";

export const GetUsers = () => {
  return axiosClient.get("/Users");
};

export const DeleteuserById = (id) => {
  return axiosClient.delete(`/Users/${id}`);
};

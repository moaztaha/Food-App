import axiosClient from "../axiosClient";

export const GetCategories = (params) => {
  return axiosClient.get("/Category", {
    params,
  });
};

export const GetCategoryById = (id) => {
  return axiosClient.get(`/Category/${id}`);
};

export const CreatCategory = (data) => {
  return axiosClient.post("/Category",data);
};

export const UpdateCategoryById = (id, data) => {
  return axiosClient.put(`/Category/${id}`,data);
};

export const DeleteCategoryById = (id) => {
  return axiosClient.delete(`/Category/${id}`);
};

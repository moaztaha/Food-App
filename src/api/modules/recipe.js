import axiosClient from "../axiosClient";


export const GetRecipe = (params) => {
  return axiosClient.get("/Recipe", {
    params,
  });
};

export const CreateRecipe = (data) => {
  return axiosClient.post("/Recipe", data);
};

export const GetRecipeById = (id) => {
  return axiosClient.get(`/Recipe/${id}`);
};

export const UpdateRecipeById = (id, data) => {
  return axiosClient.put(`/Recipe/${id}`, data);
};

export const DeleteRecipeById = (id) => {
  return axiosClient.delete(`/Recipe/${id}`);
};

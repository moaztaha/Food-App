import axiosClient from "../axiosClient";

export const GetFavRecipes = () => {
  return axiosClient.get("/userRecipe");
};

export const FavRecipes = (data) => {
  return axiosClient.post("/userRecipe", data);
};

export const DeleteFavRecipesById = (id,data) => {
  return axiosClient.delete(`/userRecipe/${id}`, data);
};



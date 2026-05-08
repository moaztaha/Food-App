import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetCategories } from "../../../../api/modules/category";
import { GetTags } from "../../../../api/modules/tags";
import { useForm } from "react-hook-form";
import {
  CreateRecipe,
  GetRecipeById,
  UpdateRecipeById,
} from "../../../../api/modules/recipe";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
export default function RecipeData() {
  const [categoryList, setCategoryList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const navigate = useNavigate();
  const { recipeId } = useParams();

  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("tagId", data.tagId);
    formData.append("price", data.price);
    formData.append("categoriesIds", data.categoriesIds);
    formData.append("description", data.description);
    formData.append("recipeImage", data.recipeImage[0]);

    return formData;
  };

  const getCategories = async () => {
    try {
      const response = await GetCategories();
      setCategoryList(response.data.data);
    } catch (error) {
      toast.error("Unable to fetch data from API");
    }
  };

  const getTags = async () => {
    try {
      const response = await GetTags();
      setTagsList(response.data);
    } catch (error) {
      toast.error("Unable to fetch data from API");
    }
  };

  const getRecipeDetails = async () => {
    try {
      const response = await GetRecipeById(recipeId);
      const recipe = response.data;

      reset({
        name: recipe.name,
        description: recipe.description,
        price: recipe.price,
        tagId: recipe.tag.id,
        categoriesIds: recipe.category[0].id,
      });
    } catch (error) {
      toast.error("Error loading recipe");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const isUpdate = !!recipeId;

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("tagId", data.tagId);
    formData.append("price", data.price);
    formData.append("categoriesIds", data.categoriesIds);
    formData.append("description", data.description);

    if (data.recipeImage && data.recipeImage.length > 0) {
      formData.append("recipeImage", data.recipeImage[0]);
    }

    try {
      if (isUpdate) {
        await UpdateRecipeById(recipeId, formData);
        toast.success("Updated recipe successfully");
      } else {
        await CreateRecipe(formData);
        toast.success("Created recipe successfully");
      }

      navigate("/dashboard/recipes");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getCategories();
    getTags();

    if (isUpdate) {
      getRecipeDetails();
    }
  }, [recipeId, isUpdate]);

  return (
    <div className="p-4 ">
      <div className="container-fluid">
        <div className="row justify-content-between align-items-center recipe-header p-5">
          <div className="col-md-8 ">
            <h3>
              Fill the <span className="recipe-title">Recipes</span> !
            </h3>
            <p className="mt-3">
              you can now fill the meals easily using the table and form,
              <br />
              click here and sill it with the table !
            </p>
          </div>
          <div className="col-md-4 text-end">
            <button
              onClick={() => navigate("/dashboard/recipes")}
              className=" section-btn px-lg-5 py-2 rounded rounded-2 ">
              All recipe <i className="fa-solid fa-arrow-right mx-2"></i>
            </button>
          </div>
        </div>
      </div>

      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" w-75 m-auto mt-5 p-3">
          <div className=" input-group my-2">
            <input
              {...register("name", { required: "Field is required" })}
              className="custom-input form-control"
              type="text"
              placeholder="Recipe Name"
            />
          </div>
          {errors.name && <p className="text-danger ">{errors.name.message}</p>}

          <div className=" input-group my-2 ">
            <select
              {...register("tagId", { required: "Field is required" })}
              className="form-control custom-input">
              {tagsList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          {errors.tagId && (
            <p className="text-danger ">{errors.tagId.message}</p>
          )}

          <div className=" input-group my-2 d-flex justify-content-between align-items-center">
            <input
              {...register("price", { required: "Field is required" })}
              className="custom-input form-control"
              type="number"
              placeholder="price"
            />
          </div>
          {errors.price && (
            <p className="text-danger ">{errors.price.message}</p>
          )}

          <div className=" input-group my-2 ">
            <select
              {...register("categoriesIds")}
              className=" custom-input form-control">
              {categoryList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className=" input-group  my-2 ">
            <textarea
              {...register("description", { required: "Field is required" })}
              placeholder=" Description"
              className="form-control custom-input"
            />
          </div>
          {errors.description && (
            <p className="text-danger ">{errors.description.message}</p>
          )}

          <div className=" uploade-box rounded-3 py-2  my-2">
            <input
              {...register("recipeImage")}
              type="file"
              className="d-none"
              id="fileUpload"
            />

            <label htmlFor="fileUpload" className="upload-label">
              <i className="fa-solid fa-cloud-arrow-up upload-icon"></i>
              <p className="mb-0 ">
                Drag & Drop or
                <span className="img-span mx-1">Choose a Item Image </span> to
                Upload
              </p>
            </label>
          </div>

          <div className="btns d-flex justify-content-end mt-5 ">
            <button
              onClick={() => navigate("/dashboard/recipes")}
              type="button"
              className="outline mx-3">
              Cancel
            </button>
            <button className="">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

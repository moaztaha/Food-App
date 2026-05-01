import React, { useEffect, useState } from "react";
import headerImg from "../../../../assets/images/header.png";
import Header from "../../../Shared/components/Header/Header";
import NoData from "../../../Shared/components/NoData/NoData";
import { DeleteRecipeById, GetRecipe } from "../../../../api/modules/recipe";
import { DeleteCategoryById } from "../../../../api/modules/category";
import { toast } from "react-toastify";

export default function RecipesList() {
  const [recipeList, setRecipeList] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getList = async () => {
    try {
      const response = await GetRecipe();
      setRecipeList(response.data.data);
    } catch (error) {
      toast.error("Unable to fetch data from API");
    }
  };

  const deleteCategory = async (id) => {
    try {
      const response = await DeleteRecipeById(id);
      setRecipeList((prev) => prev.filter((item) => item.id !== id));
      toast.success("Deleted Successfully");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    getList();
  }, []);
  return (
    <>
      <Header
        title={"Recipes Items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={headerImg}
      />
      <div className=" d-flex justify-content-between align-items-center p-5   ">
        <div>
          <h3 className="mb-0">Recipe Table Details</h3>
          <span>You can check all details</span>
        </div>
        <button className=" category-btn px-lg-5 py-2 rounded rounded-2">
          Add New Item
        </button>
      </div>
      <div className="px-5  ">
        {recipeList.length > 0 ? (
          <table className=" table custom-table ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Item Name</th>
                <th scope="col">Image</th>
                <th scope="col">Price</th>
                <th scope="col">Description</th>
                <th scope="col">Tag</th>
                <th scope="col">Category</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>

            <tbody>
              {recipeList.map((item) => (
                <tr className="p-4" key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>
                    <img
                      className="table-img"
                      src={`https://upskilling-egypt.com:3006/${item.imagePath}`}
                      alt=""
                    />
                  </td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>{item.tag?.name}</td>
                  <td>{item.category[0]?.name}</td>
                  <td>
                    <i className="fa-solid fa-pen-to-square mx-3 table-icon"></i>
                    <i
                      onClick={() => deleteCategory(item.id)}
                      className="fa-solid fa-trash-can  table-icon"></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import Header from "../../../Shared/components/Header/Header";
import headerImg from "../../../../assets/images/header.png";
import axiosClient from "../../../../api/axiosClient";
import {
  DeleteCategoryById,
  GetCategories,
} from "../../../../api/modules/category";
import NoData from "../../../Shared/components/NoData/NoData";
import { toast } from "react-toastify";

export default function CategoriesList() {
  const [categoryList, setCategoryList] = useState([]);

  const getList = async () => {
    try {
      const response = await GetCategories();
      setCategoryList(response.data.data);
    } catch (error) {
      toast.error("Unable to fetch data from API");
    }
  };

  const deleteCategory = async (id) => {
    try {
      const response = await DeleteCategoryById(id);
      setCategoryList((prev) => prev.filter((item) => item.id !== id));
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
        title={"Categories Items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={headerImg}
      />
      <div className=" d-flex justify-content-between align-items-center p-5   ">
        <div>
          <h3 className="mb-0">Categories Table Details</h3>
          <span>You can check all details</span>
        </div>
        <button className=" category-btn px-lg-5 py-2 rounded rounded-2">
          Add New Category
        </button>
      </div>

      <div className="px-5 ">
        {categoryList.length > 0 ? (
          <table className=" table custom-table ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Creation Data</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categoryList.map((item) => (
                <tr className="p-4" key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.creationDate}</td>
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

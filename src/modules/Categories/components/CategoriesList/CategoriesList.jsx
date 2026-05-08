import React, { useContext, useEffect, useState } from "react";
import Header from "../../../Shared/components/Header/Header";
import headerImg from "../../../../assets/images/header.png";
import {
  CreatCategory,
  DeleteCategoryById,
  GetCategories,
  GetCategoryById,
  UpdateCategoryById,
} from "../../../../api/modules/category";
import NoData from "../../../Shared/components/NoData/NoData";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaGlassWater } from "react-icons/fa6";
import { Form } from "react-bootstrap";
import DeleteConfirmation from "../../../Shared/components/DeleteConfirmation/DeleteConfirmation";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../context/AuthContext";

export default function CategoriesList() {
  const [categoryList, setCategoryList] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const { loginData } = useContext(AuthContext);

    const [pageNumber, setPageNumber] = useState(1);

    const [searchName, setSearchName] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(5);

    // Pagenation
    const getPages = () => {
      const pages = [];

      const start = Math.max(1, pageNumber - 1);
      const end = Math.min(totalPages, pageNumber + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      return pages;
    };

    // Delete Modal Data
    const [showDelete, setShowDelete] = useState(false);
    const handleDeleteClose = () => {
      setShowDelete(false);
    };
    const handleDeleteShow = (item) => {
      setCategoryId(item.id);
      setCategoryName(item.name);
      setShowDelete(true);
    };
    // Add Modal
    const [showAdd, setShowAdd] = useState(false);
    const handleAddClose = () => {
      setShowAdd(false);
      resetAdd();
    };
    const handleAddShow = () => setShowAdd(true);

    // Update Modal
    const [showUpdate, setShowUpdate] = useState(false);
    const [updateCategory, setUpdateCategory] = useState();
    const handleUpdateClose = () => {
      setShowUpdate(false);
      // resetUpdate();
    };
    const handleUpdateShow = (item) => {
      setUpdateCategory(item.id);
      resetUpdate({ name: item.name });
      setShowUpdate(true);
    };

    const {
      register: registerAdd,
      handleSubmit: handleSubmitAdd,
      formState: { errors: errorsAdd },
      reset: resetAdd,
    } = useForm();

    const {
      register: registerUpdate,
      handleSubmit: handleSubmitUpdate,
      formState: { errors: errorsUpdate },
      reset: resetUpdate,
    } = useForm();

    const onAddSubmit = async (data) => {
      try {
        const response = await CreatCategory(data);
        handleAddClose();
        getCategoryList();
        toast.success("Successfully Add Category");
      } catch (error) {
        toast.error("Add failed");
      }
    };

    const onUpdateSubmit = async (data) => {
      try {
        await UpdateCategoryById(updateCategory, data);
        handleUpdateClose();
        getCategoryList();
        toast.success("Updated successfully");
      } catch (error) {
        toast.error("Update failed");
      }
    };

    const getCategoryList = async () => {
      try {
        const response = await GetCategories({
          name: searchName,
          pageSize,
          pageNumber,
        });
        setCategoryList(response.data.data);
        setTotalPages(response.data.totalNumberOfPages);
      } catch (error) {
        toast.error("Unable to fetch data from API");
      }
    };

    const deleteCategory = async () => {
      try {
        const response = await DeleteCategoryById(categoryId);
        handleDeleteClose();
        getCategoryList();
        toast.success(`Successfully Delete ${categoryName}`);
      } catch (error) {
        toast.error("Delete failed");
      }
    };

    useEffect(() => {
      const delay = setTimeout(() => {
        getCategoryList();
      }, 400);

      return () => clearTimeout(delay);
    }, [searchName, pageNumber, pageSize]);
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
          {loginData?.userGroup !== "SystemUser" && (
            <button
              onClick={handleAddShow}
              className="section-btn px-lg-5 py-2 rounded rounded-2">
              Add New category
            </button>
          )}
        </div>
        <div className="px-4 mb-3 position-relative input-search ">
          <input
            type="text"
            placeholder="Search by category name"
            className="form-control"
            value={searchName}
            onChange={(e) => {
              setSearchName(e.target.value);
              setPageNumber(1);
            }}
          />
        </div>

        {/* Add Modal */}
        <Modal show={showAdd} onHide={handleAddClose}>
          <Modal.Header closeButton>
            <Modal.Title className="modal-title px-4 ">
              Add Category
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmitAdd(onAddSubmit)}>
              <div className=" input-group my-5 px-4 ">
                <input
                  {...registerAdd("name", { required: "Name is required" })}
                  className="custom-input form-control"
                  type="text"
                  placeholder="Category Name"
                />
              </div>
              {errorsAdd.name && (
                <p className="text-danger ">{errorsAdd.name.message}</p>
              )}
              <button className="modal-btn ms-auto d-block px-4 py-2 text-white  rounded-1   ">
                Save
              </button>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Update Modal */}
        <Modal show={showUpdate} onHide={handleUpdateClose}>
          <Modal.Header closeButton>
            <Modal.Title className="modal-title px-4 ">
              Update Category
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmitUpdate(onUpdateSubmit)}>
              <div className=" input-group my-5 px-4 ">
                <input
                  {...registerUpdate("name", { required: "Name is required" })}
                  className="custom-input form-control"
                  type="text"
                  placeholder="Category Name"
                />
              </div>
              {errorsUpdate.name && (
                <p className="text-danger ">{errorsUpdate.name.message}</p>
              )}
              <button className="modal-btn ms-auto d-block px-4 py-2 text-white  rounded-1   ">
                Update
              </button>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Delete Modal */}
        <Modal show={showDelete} onHide={handleDeleteClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="text-center px-5 ">
            <DeleteConfirmation
              deleteItem={"Category"}
              itemName={categoryName}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={deleteCategory}>
              Delete this item
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="px-4 ">
          {categoryList.length > 0 ? (
            <table className=" table custom-table  ">
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
                    <td>
                      {new Date(item?.creationDate).toLocaleDateString("en-GB")}
                    </td>
                    <td>
                      {loginData?.userGroup !== "SystemUser" ? (
                        <>
                          <i
                            onClick={() => handleUpdateShow(item)}
                            className="fa-solid fa-pen-to-square mx-3 table-icon"></i>
                          <i
                            onClick={() => handleDeleteShow(item)}
                            className="fa-solid fa-trash-can table-icon"></i>
                        </>
                      ) : (
                        <i className="fa-solid fa-eye table-icon"></i>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <NoData />
          )}
          <div className="d-flex justify-content-center align-items-center gap-2 my-4">
            <button
              className="pagination-btn"
              disabled={pageNumber === 1}
              onClick={() => setPageNumber((prev) => prev - 1)}>
              Prev
            </button>

            {pageNumber > 2 && (
              <>
                <button
                  className="pagination-btn"
                  onClick={() => setPageNumber(1)}>
                  1
                </button>

                {pageNumber > 3 && <span>...</span>}
              </>
            )}

            {getPages().map((page) => (
              <button
                key={page}
                onClick={() => setPageNumber(page)}
                className={`pagination-btn ${pageNumber === page ? "active" : ""}`}>
                {page}
              </button>
            ))}

            {pageNumber < totalPages - 1 && (
              <>
                {pageNumber < totalPages - 2 && <span>...</span>}

                <button
                  className="pagination-btn"
                  onClick={() => setPageNumber(totalPages)}>
                  {totalPages}
                </button>
              </>
            )}

            {/* Next */}
            <button
              className="pagination-btn"
              disabled={pageNumber === totalPages}
              onClick={() => setPageNumber((prev) => prev + 1)}>
              Next
            </button>
          </div>
        </div>
      </>
    );
}

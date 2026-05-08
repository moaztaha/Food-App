import React, { useContext, useEffect, useState } from "react";
import headerImg from "../../../../assets/images/header.png";
import Header from "../../../Shared/components/Header/Header";
import NoData from "../../../Shared/components/NoData/NoData";
import { DeleteRecipeById, GetRecipe } from "../../../../api/modules/recipe";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import noDataImg from "../../../../assets/images/no-data.png";
import { Button } from "react-bootstrap";
import DeleteConfirmation from "../../../Shared/components/DeleteConfirmation/DeleteConfirmation";
import { useNavigate } from "react-router-dom";
import { FavRecipes } from "../../../../api/modules/fav";
import { AuthContext } from "../../../../context/AuthContext";
import { GetCategories } from "../../../../api/modules/category";
import { GetTags } from "../../../../api/modules/tags";

export default function RecipesList() {
  const [recipeList, setRecipeList] = useState([]);
  const [recipeId, setRecipeId] = useState(0);
  const [recipeName, setRecipeName] = useState("");
  // Pagination
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  // Filteration
  const [searchName, setSearchName] = useState("");
  const [tagId, setTagId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const getFiltersData = async () => {
    try {
      const [catRes, tagRes] = await Promise.all([
        GetCategories({ pageSize: 1000, pageNumber: 1 }),
        GetTags(),
      ]);

      setCategories(catRes.data.data);
      setTags(tagRes.data);
    } catch (error) {
      console.log(error);
    }
  };
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

  useEffect(() => {
    getFiltersData();
  }, []);

  const navigate = useNavigate();
  const { loginData } = useContext(AuthContext);

  // View Modal
  const [showView, setShowView] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Delete Modal
  const [showDelete, setShowDelete] = useState(false);
  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = (item) => {
    setRecipeId(item.id);
    setRecipeName(item.name);
    setShowDelete(true);
  };

  // Update Modal
  const [showUpdate, setShowUpdate] = useState(false);
  const handleUpdateClose = () => setShowUpdate(false);
  const handleUpdateShow = (item) => {
    setRecipeId(item.id);
    setRecipeName(item.name);
    setShowUpdate(true);
  };

  const getRecipeList = async () => {
    try {
      const response = await GetRecipe({
        name: searchName,
        tagId: tagId,
        categoryId: categoryId,
        pageSize: 5,
        pageNumber,
      });

      setRecipeList(response.data.data);
      setTotalPages(response.data.totalNumberOfPages);
    } catch (error) {
      toast.error("Unable to fetch recipes");
    }
  };
  const deleteRecipe = async () => {
    try {
      const response = await DeleteRecipeById(recipeId);
      handleDeleteClose();
      getRecipeList();
      toast.success(`Successfully Delete ${recipeName}`);
    } catch (error) {
      toast.error(`failed to Delete ${recipeName} `);
    }
  };
  const handleUpdateNavigate = (id) => {
    navigate(`/dashboard/recipe-data/${id}`);
  };

  // Add To Fav
  const addToFav = async (recipeId) => {
    try {
      await FavRecipes({ recipeId });
      setShowView(false);
      toast.success("Added to favorites");
    } catch (error) {
      toast.error("Failed to add favorite");
    }
  };

  const openViewModal = (item) => {
    setSelectedRecipe(item);
    setShowView(true);
  };
  useEffect(() => {
    const delay = setTimeout(() => {
      getRecipeList();
    }, 400);

    return () => clearTimeout(delay);
  }, [searchName, tagId, categoryId, pageNumber]);

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
        {loginData?.userGroup !== "SystemUser" && (
          <button
            onClick={() => navigate("/dashboard/recipe-data")}
            className="section-btn px-lg-5 py-2 rounded rounded-2">
            Add New recipe
          </button>
        )}
      </div>

      <div className="px-4 mb-2 d-flex gap-4 position-relative input-search ">
        <input
          type="text"
          placeholder="Search recipe name"
          className="form-control w-50"
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value);
            setPageNumber(1);
          }}
        />
        <select
          className="form-control  w-25"
          value={tagId}
          onChange={(e) => {
            setTagId(e.target.value);
            setPageNumber(1);
          }}>
          <option value="">All Tags</option>

          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
        <select
          className="form-control w-25"
          value={categoryId}
          onChange={(e) => {
            setCategoryId(e.target.value);
            setPageNumber(1);
          }}>
          <option value="">All Categories</option>

          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      {/* Delete Modal */}
      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton></Modal.Header>

        <Modal.Body className="text-center px-5 ">
          <DeleteConfirmation deleteItem={"Recipe"} itemName={recipeName} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteRecipe}>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>

      {/* View Modal user */}
      <Modal
        show={showView}
        onHide={() => setShowView(false)}
        size="md"
        centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="px-3 fs-5 text-muted">
            Recipe Details
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="px-4 pb-4">
          {selectedRecipe && (
            <div className="recipe-card-detail text-center">
              <div className="image-container mb-4">
                <img
                  src={`https://upskilling-egypt.com:3006/${selectedRecipe.imagePath}`}
                  alt={selectedRecipe.name}
                  className="rounded-4 shadow-sm"
                  style={{
                    width: "100%",
                    maxHeight: "250px",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div className="content-container text-start px-2">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h3 className="fw-bold mb-0 text-success">
                    {selectedRecipe.name}
                  </h3>
                  <span className="badge bg-warning text-dark fs-6">
                    {selectedRecipe.price} EGP
                  </span>
                </div>

                <hr className="my-3 opacity-25" />

                <p
                  className="text-muted"
                  style={{ lineHeight: "1.6", fontSize: "0.95rem" }}>
                  {selectedRecipe.description}
                </p>
              </div>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer className="border-0 d-flex justify-content-center pb-4">
          <button
            onClick={() => addToFav(selectedRecipe.id)}
            className="btn btn-outline-danger d-flex align-items-center gap-2 px-4 rounded-pill shadow-sm">
            <i className="fa-solid fa-heart"></i>
            <span>Add to Favorites</span>
          </button>
        </Modal.Footer>
      </Modal>

      <div className="px-4  ">
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
                    {item.imagePath ? (
                      <img
                        className="table-img"
                        src={`https://upskilling-egypt.com:3006/${item.imagePath}`}
                        alt=""
                      />
                    ) : (
                      <img src={noDataImg} className="table-img" alt="" />
                    )}
                  </td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>{item.tag?.name}</td>
                  <td>{item.category[0]?.name}</td>
                  <td>
                    {loginData?.userGroup !== "SystemUser" ? (
                      <>
                        <i
                          onClick={() => handleUpdateNavigate(item.id)}
                          className="fa-solid fa-pen-to-square mx-3 table-icon"></i>
                        <i
                          onClick={() => handleDeleteShow(item)}
                          className="fa-solid fa-trash-can table-icon"></i>
                      </>
                    ) : (
                      <>
                        <i
                          onClick={() => openViewModal(item)}
                          className="fa-solid fa-eye table-icon"></i>
                      </>
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

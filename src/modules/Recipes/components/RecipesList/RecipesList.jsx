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

export default function RecipesList() {
  const [recipeList, setRecipeList] = useState([]);
  const [recipeId, setRecipeId] = useState(0);
  const [recipeName, setRecipeName] = useState("");
  const [searchName, setSearchName] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredRecipes = recipeList.filter((item) => {
    const name = item.name.toLowerCase().includes(searchName.toLowerCase());

    const tag = selectedTag === "all" || item.tag?.name === selectedTag;

    const category =
      selectedCategory === "all" ||
      item.category?.[0]?.name === selectedCategory;

    return name && tag && category;
  });

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
      const response = await GetRecipe();
      setRecipeList(response.data.data);
    } catch (error) {
      toast.error("Unable to fetch data from API");
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
    getRecipeList();
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
          className="form-control w-50"
          placeholder="Search recipe..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <select
          className="form-select w-25"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}>
          <option value="all">All Tags</option>
          {[...new Set(recipeList.map((r) => r.tag?.name))].map((tag, i) => (
            <option key={i} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        <select
          className="form-select w-25"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {[...new Set(recipeList.map((r) => r.category?.[0]?.name))].map(
            (cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ),
          )}
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

      {/* View Modal */}
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
              {filteredRecipes.map((item) => (
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
                          onClick={() => handleUpdateShow(item)}
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
      </div>
    </>
  );
}

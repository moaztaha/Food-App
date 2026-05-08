import React, { useEffect, useState } from "react";
import Header from "../../../Shared/components/Header/Header";
import headerImg from "../../../../assets/images/header.png";
import {
  DeleteFavRecipesById,
  GetFavRecipes,
} from "../../../../api/modules/fav";
import { toast } from "react-toastify";

export default function FavouritesList() {
  const [favList, setFavList] = useState([]);

  const getFavList = async () => {
    try {
      const response = await GetFavRecipes();
      console.log(response.data.data);
      setFavList(response.data.data);
    } catch (error) {
      toast.error("Unable to fetch data from API");
    }
  };

  const removeFav = async (id) => {
    try {
      const response = await DeleteFavRecipesById(id);
      getFavList();
      toast.success("Successfully Delete");
    } catch (error) {
      console.error("Error details:", error.response);
      toast.error("failed to Delete");
    }
  };

  useEffect(() => {
    getFavList();
  }, []);

  return (
    <>
      <Header
        title={"Favorite Items"}
        description={"You can now view your favorite recipes"}
        imgUrl={headerImg}
      />

      <div className="row g-3 px-2 mt-4 justify-content-center">
        {favList.map((fav) => (
          <div key={fav.id} className="col-lg-2 col-md-6 p-5">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden position-relative h-100">
              <div
                onClick={() => removeFav(fav.id)}
                className=" remove-btn position-absolute top-0 end-0 m-3 d-flex align-items-center justify-content-center shadow-sm">
                <i
                  className="fa-solid fa-heart text-white"
                  style={{ fontSize: "0.8rem" }}></i>
              </div>

              <div className="p-2">
                <img
                  src={`https://upskilling-egypt.com:3006/${fav.recipe.imagePath}`}
                  className="w-100 rounded-4"
                  style={{ height: "180px", objectFit: "cover" }}
                  alt={fav.recipe.name}
                />
              </div>

              <div className="card-body px-3 pt-0 pb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <h6
                    className="fw-bold mb-0 text-success text-truncate"
                    style={{ maxWidth: "70%" }}>
                    {fav.recipe.name}
                  </h6>
                  <span
                    className="badge bg-warning text-dark p-1 px-2 rounded-2"
                    style={{ fontSize: "0.7rem" }}>
                    {fav.recipe.price} EGP
                  </span>
                </div>

                <p
                  className="text-muted mb-0"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    fontSize: "0.8rem",
                    lineHeight: "1.4",
                  }}>
                  {fav.recipe.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

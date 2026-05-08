import React, { useContext } from 'react'
import Header from "../../../Shared/components/Header/Header";
import headerImg from "../../../../assets/images/header-girl.png"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const {loginData} = useContext(AuthContext)

  return (
    <>
      <Header
        
        title={`Welcome ${loginData?.userName}`}
        description={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
        imgUrl={headerImg}
      />
      <div className='p-4'>

        <div className=" container-fluid recipe-header ">
          <div className="row justify-content-between align-items-center bg-recipe p-5">
            <div className="col-md-8 ">
              <h3>
                Fill the <span className="recipe-title">Recipes</span> !
              </h3>
              <p className="mt-3">
                you can now fill the meals easily using the table and form ,
                <br />
                click here and sill it with the table !
              </p>
            </div>
            <div className="col-md-4 text-end">
              <button
                onClick={() => navigate("/dashboard/recipes")}
                className=" section-btn px-lg-5 py-2 rounded rounded-2 ">
                Fill Recipe <i className="fa-solid fa-arrow-right mx-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

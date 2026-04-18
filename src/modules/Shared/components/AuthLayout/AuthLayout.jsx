import React from "react";
import logo from "../../../../assets/images/png.png";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="auth-container ">
      <div className="container-fluid bg-overlay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-lg-4 col-md-6  bg-white rounded rounded-2 px-5 py-3  ">
            <div className="logo-container text-center  ">
              <img className="w-75 my-3 " src={logo} alt="logo" />
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

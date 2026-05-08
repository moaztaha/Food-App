import React from "react";
import NotFoundImg from "../../../../assets/images/not-found-bg.png";
import logo from "../../../../assets/images/logo.png";

export default function NotFound() {
  return (
    <div className="vh-100 w-100 d-flex overflow-hidden">
      <div className="w-35 p-5 d-flex flex-column">
        <img src={logo}  alt="logo" />

        <div className="mt-5 p-5 not-found">
          <h2 className="fw-bold fs-1 mb-0 ">Oops!</h2>
          <p className=" ">Page not found</p>
          <p className="my-4 disc">
            This Page doesn’t exist or was removed! We suggest you back to home.
          </p>
          <button> <i class="fa-solid fa-arrow-left "></i> Back To<br/>Home</button>

        </div>
      </div>

      <div className="w-100 h-100">
        <img
          src={NotFoundImg}
          alt="not-found"
          className="w-100 h-100"
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
}

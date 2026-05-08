import React from "react";

export default function Header({ title, description, imgUrl }) {
  return (
    <div className=" bg-header mx-3 p-4 rounded-4 text-white">
      <div className="container-fluid">
        <div className="row d-flex align-items-center ">
          <div className="col-md-8">
            <h3 className="fs-1">{title}</h3>

            <p>{description}</p>
          </div>

          <div className="col-md-4 text-end">
            <img className="w-auto " src={imgUrl} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
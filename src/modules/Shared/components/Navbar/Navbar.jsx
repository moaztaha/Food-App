import React from 'react'
import avatar from "../../../../assets/images/avatar.png";

export default function Navbar({ loginData }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 py-3 rounded-4 m-3">
        <div className="container-fluid">
          <div className="ms-auto d-flex align-items-center gap-5 ">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item d-flex align-items-center">
                <img src={avatar} alt="avatar"  />
                <a className="nav-link active" aria-current="page" href="#">
                  {loginData?.userName}{" "}
                </a>
              </li>
            </ul>
            <i className="fa-solid fa-chevron-down "></i>
            <i className="fa-solid fa-bell"></i>
          </div>
        </div>
      </nav>
    </>
  );
}

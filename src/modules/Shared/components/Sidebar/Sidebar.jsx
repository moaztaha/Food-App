import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import logo from "../../../../assets/images/3.png";
import { Modal } from "react-bootstrap";
import ChangePass from "../../../Authentication/components/ChangePass/ChangePass";
import { AuthContext } from "../../../../context/authContext";

export default function SideBar() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const {loginData} = useContext(AuthContext)

  const isAdmin = loginData?.userGroup !== "SystemUser";

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="sidebar-container">
      <Sidebar collapsed={isCollapsed}>
        <div onClick={() => toggleCollapse()} className="my-4  ">
          <img className="img-fluid" src={logo} alt="logo" />
        </div>

        <Menu>
          <MenuItem
            icon={<i className="fa-solid fa-house"></i>}
            component={<Link to="/dashboard" />}>
            Home
          </MenuItem>

          {isAdmin && (
            <MenuItem
              icon={<i className="fa-solid fa-users"></i>}
              component={<Link to="/dashboard/users" />}>
              Users
            </MenuItem>
          )}

          <MenuItem
            icon={<i className="fa-solid fa-kitchen-set"></i>}
            component={<Link to="/dashboard/recipes" />}>
            Recipes
          </MenuItem>

          <MenuItem
            icon={<i className="fa-solid fa-list"></i>}
            component={<Link to="/dashboard/categories" />}>
            Categories
          </MenuItem>

          {!isAdmin && (
            <MenuItem
              icon={<i className="fa-solid fa-heart"></i>}
              component={<Link to="/dashboard/favourites" />}>
              Favourites
            </MenuItem>
          )}

          <MenuItem
            onClick={() => setShowChangePass(true)}
            icon={<i className="fa-solid fa-lock-open"></i>}>
            Change Password
          </MenuItem>

          <MenuItem
            icon={<i className="fa-solid fa-arrow-right-from-bracket"></i>}
            onClick={() => logout()}
            className="bg-danger rounded-2 text-white mt-2 ">
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
      <Modal
        show={showChangePass}
        onHide={() => setShowChangePass(false)}
        centered>
        <Modal.Body>
          <ChangePass onClose={() => setShowChangePass(false)} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

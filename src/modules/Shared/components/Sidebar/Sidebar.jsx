import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import logo from "../../../../assets/images/3.png";

export default function SideBar() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="sidebar-container">
      <Sidebar  collapsed={isCollapsed}>
        <div onClick={() => toggleCollapse()} className="my-4  ">
          <img className="img-fluid" src={logo} alt="logo"   />
        </div>

        <Menu>
          <MenuItem
            icon={<i className="fa-solid fa-house"></i>}
            component={<Link to="/dashboard" />}>
            Home
          </MenuItem>
          <MenuItem
            icon={<i className="fa-solid fa-users"></i>}
            component={<Link to="/dashboard/users" />}>
            Users
          </MenuItem>
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
          <MenuItem
            icon={<i className="fa-solid fa-heart"></i>}
            component={<Link to="/dashboard/favourites" />}>
            Favourites
          </MenuItem>
          <MenuItem icon={<i className="fa-solid fa-lock-open"></i>}>
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
    </div>
  );
}

import React, { useContext } from "react";
import { Navigate, replace } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
export default function ProtectedRoute({ children }) {
  const { loginData } = useContext(AuthContext);
  if (localStorage.getItem("token") || loginData) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

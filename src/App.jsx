import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthLayout from "./modules/Shared/components/AuthLayout/AuthLayout";
import NotFound from "./modules/Shared/components/NotFound/NotFound";
import Login from "./modules/Authentication/components/Login/Login";
import Register from "./modules/Authentication/components/Register/Register";
import ForgetPass from "./modules/Authentication/components/ForgetPass/ForgetPass";
import ResetPass from "./modules/Authentication/components/ResetPass/ResetPass";
import MasterLayout from "./modules/Shared/components/MasterLayout/MasterLayout";
import Dashboard from "./modules/Dashboard/components/Dashboard/Dashboard";
import RecipesList from "./modules/Recipes/components/RecipesList/RecipesList";
import RecipeData from "./modules/Recipes/components/RecipeData/RecipeData";
import CategoriesList from "./modules/Categories/components/CategoriesList/CategoriesList";
import UsersList from "./modules/UsersList/components/UsersList/UsersList";
import FavouritesList from "./modules/Favourites/components/FavList/FavList";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./modules/Shared/components/protectedRout/ProtectedRoute";
import VerifyAccount from "./modules/Authentication/components/Verify-account/Verify-account";

function App() {

  let [loginData, setLoginData] = useState(null);

  const saveLoginData = () => {
    let encoddedToken = localStorage.getItem("token");
    let decoddedToken = jwtDecode(encoddedToken);
    setLoginData(decoddedToken);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) saveLoginData();
  }, []);
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveLoginData={saveLoginData} /> },
        { path: "login", element: <Login saveLoginData={saveLoginData} /> },
        { path: "register", element: <Register /> },
        { path: "verify-account", element: <VerifyAccount /> },
        { path: "forget-pass", element: <ForgetPass /> },
        { path: "reset-pass", element: <ResetPass /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout loginData={loginData} />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "", element: <Dashboard /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "recipes-data", element: <RecipeData /> },
        { path: "categories", element: <CategoriesList /> },
        { path: "users", element: <UsersList /> },
        { path: "favourites", element: <FavouritesList /> },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;

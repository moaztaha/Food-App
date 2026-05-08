import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthContextProvider = (props) => {
  let [loginData, setLoginData] = useState(null);

  const saveLoginData = () => {
    let encoddedToken = localStorage.getItem("token");
    let decoddedToken = jwtDecode(encoddedToken);
    setLoginData(decoddedToken);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) saveLoginData();
  }, []);

  return (
    <AuthContext.Provider value={{ loginData, saveLoginData }}>
      {props.children}
    </AuthContext.Provider>
  );
};

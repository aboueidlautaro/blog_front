import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { Navigate, Outlet, useParams } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const CapaRequireAuth = () => {
  let { id } = useParams();
  const { authState } = useContext(AuthContext);
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios
      .get(`https://blog-jwt.herokuapp.com/auth/basicinfo/${id}`)
      .then((response) => {
        setUsername(response.username);
      });
  }, []);

  if (!username) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default CapaRequireAuth;

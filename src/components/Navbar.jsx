import "../App.css";
import { Route, NavLink, Navigate, Routes } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import { AuthContext } from "../helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };

  return (
    <div className="navbar">
      <div className="links">
        {!authState.status ? (
          <>
            <span id="logo">INFSA</span>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login">Iniciar sesión</NavLink>
            <NavLink to="/registration">Registrarse</NavLink>
          </>
        ) : (
          <>
            <span>INFSA</span>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/createpost">Crear publicación</NavLink>
          </>
        )}
      </div>

      {authState.status ? (
        <div className="loggedInContainer">
          <NavLink to={"/profile/" + authState.id} className="titleUserNavbar">
            {authState.username}
            <FontAwesomeIcon className="iconoFontAwesome" icon={faCaretDown} />
          </NavLink>
          <button onClick={logout}>Cerrar sesión</button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default Navbar;

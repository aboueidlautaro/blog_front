import "../App.css";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const [authState, setAuthState] = useState({
    username: "",
    autor: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("https://blog-jwt.herokuapp.com/auth/auth", {
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
            autor: response.data.autor,
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
    <>
      <div className="navbar-main">
        <div className="navbar2">
          <div className="links2 width-box-navbar-items">
            {!authState.status ? (
              <>
                <div className="menubar2">
                  <div className="">
                    <NavLink to="/">Home</NavLink>
                  </div>
                  <div className="">
                    <span id="logo2">INFSA</span>
                  </div>
                  <div className="">
                    <NavLink to="/login">Iniciar sesión</NavLink>
                    <NavLink to="/registration">Registrarse</NavLink>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="menubar width-box-navbar-items">
                  <NavLink className="btnActionsBar" to="/">
                    Home
                  </NavLink>
                  <NavLink to="/createpost">Publicar</NavLink>
                </div>
              </>
            )}
          </div>
          {authState.status ? (
            <div className="width-box-navbar-items">
              <span id="logo2">INFSA</span>
            </div>
          ) : (
            <></>
          )}
          {authState.status ? (
            <div className="loggedInContainer2 width-box-navbar-items">
              <NavLink
                to={"/profile/" + authState.id}
                className="titleUserNavbar2"
              >
                <span>
                  {authState.autor}
                  <FontAwesomeIcon
                    className="iconoFontAwesome"
                    icon={faCaretDown}
                  />
                </span>
                <small>{authState.username}</small>
              </NavLink>
              <button onClick={logout}>Cerrar sesión</button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
export default Navbar;

import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messageForm, setMessageForm] = useState("");

  const { setAuthState } = useContext(AuthContext);

  const login = () => {
    const data = { username: username, password: password };
    axios.post("https://blog-jwt.herokuapp.com/auth/login", data).then((response) => {
      if (response.data.error) {
        setMessageForm("Contraseña incorrecta");
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        window.location.assign("/");
      }
    });
  };
  return (
    <div className="formContainer">
      <label>Usuario: </label>
      <input
        id="inputCreatePost"
        type="text"
        placeholder="Ingrese su usuario"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label>Contraseña: </label>
      <small className="messageForm">{messageForm}</small>
      <input
        id="inputCreatePost"
        type="password"
        placeholder="Ingrese su contraseña"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={login}> Login </button>
    </div>
  );
}

export default Login;

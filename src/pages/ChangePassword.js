import React, { useState } from "react";
import axios from "axios";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const changePassword = () => {
    axios
      .put(
        "http://localhost:3001/auth/changepassword",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        }
      });
  };

  return (
    <div className="formNewPassword">
      <h1>Cambiar contraseña</h1>
      <input
        type="text"
        placeholder="Contraseña actual"
        onChange={(event) => {
          setOldPassword(event.target.value);
        }}
      />
      <input
        id="inputCreatePost"
        placeholder="Nueva contraseña"
        onChange={(event) => {
          setNewPassword(event.target.value);
        }}
      />
      <button onClick={changePassword}>Guardar cambios</button>
    </div>
  );
}

export default ChangePassword;

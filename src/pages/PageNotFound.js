import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div>
      <h1>Página no encontrada. Intente nuevamente o vuelva al inicio.</h1>
      <h3>
        Volver al inicio <Link to="/">Home</Link>
      </h3>
    </div>
  );
}

export default PageNotFound;

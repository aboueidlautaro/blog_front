import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import "../styles/dollarbar.css";

function DollarBar() {
  const url = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";
  const [dolar, setDolar] = useState();
  const fetchApi = async () => {
    const response = await fetch(url);
    const responseJSON = await response.json();
    setDolar(responseJSON);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div id="contain">
      <div className="container-container-dolar">
        {!dolar
          ? "Cargando cotizaciones de dolar"
          : dolar.map((item, index) => {
              return (
                <div className="container-dolar" key={index}>
                  <div>
                    <h2>{item.casa.nombre}</h2>
                    <p id="agencia">Agencia: {item.casa.agencia}</p>
                  </div>
                  <div className="container-dolar-casa">
                    <div className="compra">
                      <p className="label">Compra</p>
                      {(() => {
                        if (item.casa.compra === "No Cotiza") {
                          return (
                            <p className="label-value">{item.casa.compra}</p>
                          );
                        } else {
                          return (
                            <p className="label-value">${item.casa.compra}</p>
                          );
                        }
                      })()}
                    </div>
                    <div className="venta">
                      <p className="label">Venta</p>
                      <p className="label-value">${item.casa.venta}</p>
                    </div>
                  </div>
                  <p></p>
                </div>
              );
            })}
      </div>
    </div>
  );
}
export default DollarBar;

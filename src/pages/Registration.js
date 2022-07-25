import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Registration() {
  const initialValues = {
    autor: "",
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    autor: Yup.string()
      .min(4, "El nombre debe contener 4 caracteres como minimo")
      .max(50)
      .required("El nombre es obligatorio"),
    username: Yup.string()
      .min(4, "El usuario debe contener 4 caracteres como minimo")
      .max(15)
      .required("Ingrese un usuario correcto"),
    password: Yup.string()
      .min(8, "La contraseña debe contener 8 caracteres como mínimo")
      .max(20)
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Debe contener una mayúscula, una minúcula, un número y un caracter especial."
      )
      .required("Introduzca una contraseña"),
  });

  const onSubmit = (data) => {
    axios
      .post("https://blog-jwt.herokuapp.com/auth", data)
      .then(() => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <div id="container-form">
          <Form id="formContainer" className="formContainer">
            <label>Nombre completo: </label>
            <ErrorMessage
              className="errorMessage"
              name="autor"
              component="span"
            />
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="autor"
              placeholder="Ingrese su nombre"
            />

            <label>Usuario: </label>
            <ErrorMessage
              className="errorMessage"
              name="username"
              component="span"
            />
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="username"
              placeholder="Ingresa un usuario"
            />

            <label>Contraseña: </label>
            <ErrorMessage
              className="errorMessage"
              name="password"
              component="span"
            />
            <Field
              autoComplete="off"
              type="password"
              id="inputCreatePost"
              name="password"
              placeholder="Ingresa una contraseña"
            />

            <button type="submit">Registrarme</button>
          </Form>
        </div>
      </Formik>
    </div>
  );
}

export default Registration;

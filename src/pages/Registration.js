import React from "react";
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
    autor: Yup.string().min(3).max(50).required(),
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    axios.post("https://blog-jwt.herokuapp.com/auth", data).then(() => {
      console.log(data);
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
          <Form className="formContainer">
            <label>Nombre completo: </label>
            <ErrorMessage name="autor" component="span" />
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="autor"
              placeholder="Ingrese su nombre"
            />

            <label>Usuario: </label>
            <ErrorMessage name="username" component="span" />
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="username"
              placeholder="Ingresa un usuario"
            />

            <label>Contraseña: </label>
            <ErrorMessage name="password" component="span" />
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

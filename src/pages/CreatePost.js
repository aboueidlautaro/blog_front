import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();
  const initialValues = {
    title: "",
    postText: "",
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Ingresa un título"),
    postText: Yup.string().required("Ingresa una descripción"),
  });

  const onSubmit = (data) => {
    axios
      .post("https://blog-jwt.herokuapp.com/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        navigate("/");
      });
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form id="formContainer2" className="formContainer">
          <label>Título: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="Título de publicación"
          />
          <label>Previsualización </label>
          <ErrorMessage name="postText" component="span" />
          <Field
            as="textarea"
            autoComplete="off"
            id="inputCreatePost"
            name="postText"
            placeholder="Ingrese una descripción corta"
          />

          <div id="btnCreate">
            <button type="submit">Crear noticia</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;

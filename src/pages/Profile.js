import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../helpers/AuthContext";
import "../App.css";
import "moment/locale/es";

function Profile() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [autor, setAutor] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`https://blog-jwt.herokuapp.com/auth/basicinfo/${id}`)
      .then((response) => {
        setUsername(response.data.username);
        setAutor(response.data.autor);
      });

    axios
      .get(`https://blog-jwt.herokuapp.com/posts/byuserId/${id}`)
      .then((response) => {
        setListOfPosts(response.data);
      });
  }, []);

  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        {" "}
        <div className="organizedInfo">
          <p>
            Visualizando: <span> {autor}.</span>
          </p>
          <p>
            Registrado como:
            <span> {username}.</span>
          </p>
        </div>
        {authState.username === username && (
          <button
            onClick={() => {
              navigate("/changepassword");
            }}
          >
            {" "}
            Cambiar contraseña
          </button>
        )}
      </div>
      <h2>Lista de publicaciones</h2>
      <div className="container-posts">
        {listOfPosts.map((value, key) => {
          return (
            <div key={key} className="column post">
              <div className="title"> {value.title} </div>
              <div
                className="body"
                onClick={() => {
                  navigate(`/post/${value.id}`);
                }}
              >
                {value.postText}
              </div>
              <div className="footer">
                <p>{moment(value.createdAt).format("LL")}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;

import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import portada from "../static/image/estadio.jpeg";

import "../App.css";
import DollarBar from "../components/DollarBar";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [search, setSearch] = useState("");
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://blog-jwt.herokuapp.com/posts", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setListOfPosts(response.data.listOfPosts);
        console.log(response.data.listOfPosts);
      });
  }, []);

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  let results = [];

  if (!search) {
    results = listOfPosts;
  } else {
    results = listOfPosts.filter((dato) =>
      dato.title.toLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  return (
    <>
      <div className="grid">
        <section className="left-column">
          <div className="searcher-div">
            <input
              id="searcher"
              placeholder="Buscar"
              type="text"
              value={search}
              onChange={searcher}
            />
          </div>
          <div className="container-posts ">
            {results.map((value, key) => {
              return (
                <div key={key} className="column post">
                  <div className="title"> {value.title} </div>

                  <div
                    className="body phrase-short"
                    onClick={() => {
                      navigate(`/post/${value.id}`);
                    }}
                  >
                    {value.postText}
                  </div>
                  <div className="footer">
                    <div className="username">
                      <Link to={`/profile/${value.UserId}`}>{value.autor}</Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <article className="right-column">
          <DollarBar />
        </article>
      </div>
    </>
  );
}

export default Home;

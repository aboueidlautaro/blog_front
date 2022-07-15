import React, { useEffect, useState, useContext } from "react";
import { useParams, Routes, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../helpers/AuthContext";
import "moment/locale/es";

function Post() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`https://blog-jwt.herokuapp.com/posts/byId/${id}`)
      .then((response) => {
        setPostObject(response.data);
      });
    axios
      .get(`https://blog-jwt.herokuapp.com/comments/${id}`)
      .then((response) => {
        setComments(response.data);
      });
  }, []);

  const addComment = () => {
    axios
      .post(
        "https://blog-jwt.herokuapp.com/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const deleteComment = (id) => {
    axios
      .delete(`https://blog-jwt.herokuapp.com/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setComments(
          comments.filter((val) => {
            return val.id !== id;
          })
        );
      });
  };

  const deletePost = (id) => {
    axios
      .delete(`https://blog-jwt.herokuapp.com/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        navigate("/");
      });
  };

  const editPost = (option) => {
    if (option === "title") {
      let newTitle = prompt("Ingresa el nuevo título:");
      axios.put(
        "https://blog-jwt.herokuapp.com/posts/title",
        {
          newTitle: newTitle,
          id: id,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );

      setPostObject({ ...postObject, title: newTitle });
    } else {
      let newPostText = prompt("Ingresa el nuevo preview:");
      axios.put(
        "https://blog-jwt.herokuapp.com/posts/postText",
        {
          newText: newPostText,
          id: id,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );

      setPostObject({ ...postObject, postText: newPostText });
    }
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post " id="individual">
          <p>{postObject.autor}</p>
          <div
            className="title"
            onClick={() => {
              if (authState.username === postObject.username) {
                editPost("title");
              }
            }}
          >
            {postObject.title}
          </div>
          <div
            className="body "
            onClick={() => {
              if (authState.username === postObject.username) {
                editPost("body");
              }
            }}
          >
            <div className="body-description">{postObject.postText}</div>
          </div>

          <p>{moment(postObject.createdAt).format("LL")}</p>
          <div className="footer">
            {authState.username === postObject.username && (
              <button
                onClick={() => {
                  deletePost(postObject.id);
                }}
              >
                {" "}
                Eliminar publicación
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <div>
            <input
              type="text"
              placeholder="Añadir comentario"
              autoComplete="off"
              value={newComment}
              onChange={(event) => {
                setNewComment(event.target.value);
              }}
            />
          </div>
          <button onClick={addComment}>Publicar</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                <label>{comment.username}: </label>
                {comment.commentBody}
                {authState.username === comment.username && (
                  <button
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                    Eliminar
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;

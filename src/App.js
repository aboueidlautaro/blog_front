import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Navigate,
  Routes,
} from "react-router-dom";
import axios from "axios";
import { useContext } from "react";

import { Outlet, useParams } from "react-router-dom";

import Home from "./pages/Home";

import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";

import ChangePassword from "./pages/ChangePassword";

import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";

function App() {
  const [username, setUsername] = useState("");
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };

  return (
    <>
      <div className="App">
        <AuthContext.Provider value={{ authState, setAuthState }}>
          <Router>
            <Navbar />

            <Routes>
              <Route path="/">
                <Route index element={<Home />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="changepassword" element={<ChangePassword />} />
              </Route>
              <Route path="/">
                <Route path="/createpost" element={<CreatePost />} />
                <Route path="/post/:id" element={<Post />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/login" element={<Login />} />
              </Route>
              <Route path="*" element={PageNotFound} />
            </Routes>
          </Router>
        </AuthContext.Provider>
      </div>
    </>
  );
}

export default App;

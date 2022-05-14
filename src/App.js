import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "./components/Header/Header";
import "./css/App.css";
import "./css/CommonClasses.css";
import "./css/styles/flex.scss";
import "./css/styles/typography.scss";
import "./css/styles/template.scss";

function App() {
  // TODO: figure out how to update component
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function checkIfLoggedIn() {
    fetch("/api/is-logged-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!(data.response === "y")) navigate("/login");
        else {
          setLogin(data.login);
          setIsLoggedIn(true);
        }
      });
  }

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  return (
    <div className="outer-container">
      <Header login={login} isLoggedIn={isLoggedIn} />
      <main className="container-1344">
        <Outlet />
      </main>
    </div>
  );
}

export default App;

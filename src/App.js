import React, { useEffect } from "react";
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

  function checkIfLoggedIn() {
    fetch("/api/is-logged-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!(data.response === "y")) navigate("/login");
      });
  }

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  return (
    <div className="outer-container">
      <Header />
      <main className="container-1344">
        <Outlet />
      </main>
    </div>
  );
}

export default App;

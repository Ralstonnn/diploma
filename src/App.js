import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { LoadingPage } from "./components/LoadingPage/LoadingPage";
import "./css/App.css";
import "./css/CommonClasses.css";
import "./css/styles/flex.scss";
import "./css/styles/typography.scss";
import "./css/styles/template.scss";

function App() {
  // TODO: figure out how to update component
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  function checkIfLoggedIn() {
    fetch("/api/is-logged-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!(data.response === "y")) navigate("/login");
        else {
          setTimeout(() => {
            sessionStorage.setItem("isLoading", "n");
            sessionStorage.setItem("isLoggedIn", "y");
            sessionStorage.setItem("login", data.login);

            setIsLoading(false);
          }, 3000);
        }
      });
  }

  useEffect(() => {
    sessionStorage.setItem("isLoading", "y");
    sessionStorage.setItem("isLoggedIn", "n");
    checkIfLoggedIn();
  }, []);

  if (isLoading) return <LoadingPage />;
  else return <MainPage />;
}

function MainPage({ login }) {
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

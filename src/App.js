import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { LoadingPage } from "./components/LoadingPage/LoadingPage";
import { AddWords } from "./components/AddWords/AddWords";
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
          sessionStorage.setItem("isLoading", "n");
          sessionStorage.setItem("isLoggedIn", "y");
          sessionStorage.setItem("login", data.login);

          setIsLoading(false);
        }
      });
  }

  useEffect(() => {
    sessionStorage.setItem("isLoading", "y");
    sessionStorage.setItem("isLoggedIn", "n");
    checkIfLoggedIn();
  }, []);

  if (!isLoading) return <MainPage />;
  return <LoadingPage />;
}

function MainPage() {
  return (
    <div className="outer-container">
      <Header />
      <main className="container-1344 flex">
        <Outlet />
      </main>

      {/* <AddWords style={{ display: "none" }} /> */}
    </div>
  );
}

export default App;

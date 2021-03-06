import React, { useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { LoadingPage } from "./components/LoadingPage/LoadingPage";
import { AddWords } from "./components/AddWords/AddWords";
import "./css/App.css";
import "./css/styles/flex.scss";
import "./css/styles/typography.scss";
import "./css/styles/template.scss";

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const checkIfLoggedIn = useCallback(() => {
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
  }, [navigate]);

  useEffect(() => {
    sessionStorage.setItem("isLoading", "y");
    sessionStorage.setItem("isLoggedIn", "n");
    checkIfLoggedIn();
  }, [checkIfLoggedIn]);

  if (!isLoading) return <MainPage />;
  return <LoadingPage />;
}

function MainPage() {
  const [showAddWords, setShowAddWords] = useState(false);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  return (
    <div className="container-main-100" id="app-content-container">
      <Header setShowAddWords={(value) => setShowAddWords(value)} />
      <main className="container-1344 flex">
        <Outlet />
      </main>

      {showAddWords && (
        <AddWords
          updateState={forceUpdate}
          closeBtnClick={() => {
            setShowAddWords(false);
          }}
        />
      )}
    </div>
  );
}

export default App;

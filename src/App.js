import React from "react";
// import reactDom from "react-dom";
// import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { Header } from "./components/Header/Header";
// import { AuthorizationForm } from "./components/AuthorizationForm/AuthorizationForm";
import "./css/App.css";
import "./css/CommonClasses.css";
import "./css/styles/flex.scss";
import "./css/styles/typography.scss";
import "./css/styles/template.scss";
// import {
//   TrainingPage,
//   LearnWords,
// } from "./components/TrainingPage/TrainingPage";

function App() {
  // TODO: figure out how to update component
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const navigate = useNavigate();

  // function checkIfLoggedIn() {
  //   fetch("/api/is-logged-in", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       let result = data.response === "y";
  //       setIsLoggedIn(result);
  //     });
  // }

  // useEffect(() => {
  // checkIfLoggedIn();
  // }, []);

  return (
    <main className="container-1344">
      <h1 className="container-1344">Home</h1>
    </main>
  );
}

export default App;

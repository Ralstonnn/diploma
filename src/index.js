import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TrainingPage } from "./components/TrainingPage/TrainingPage";
import { LearnWords } from "./components/Trainings/LearnWords/LearnWords";
import { AuthorizationForm } from "./components/AuthorizationForm/AuthorizationForm";
import { RegistrationForm } from "./components/RegistrationForm/RegistrationForm";

// TODO: Add a way to add words to dictionary

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <div className="outer-container">
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="training" element={<TrainingPage />} />
          <Route path="/training/learn-words" element={<LearnWords />} />
        </Route>
        {sessionStorage.getItem("isLoggedIn") === "n" && (
          <Route path="/login" element={<AuthorizationForm />} />
        )}
        {sessionStorage.getItem("isLoggedIn") === "n" && (
          <Route path="/registration" element={<RegistrationForm />} />
        )}
      </Routes>
    </div>
  </BrowserRouter>
);

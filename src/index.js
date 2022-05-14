import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom";
import App from "./App";
import { TrainingPage } from "./components/TrainingPage/TrainingPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <div id="outer-container">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/trainings" element={<TrainingPage />} />
        <Route path="/trainings/" element={<TrainingPage />} />
      </Routes>
    </div>
  </BrowserRouter>
);

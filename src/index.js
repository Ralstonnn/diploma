import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TrainingPage } from "./components/TrainingPage/TrainingPage";
import { LearnWords } from "./components/Trainings/LearnWords/LearnWords";
import { AuthorizationForm } from "./components/AuthorizationForm/AuthorizationForm";
import { RegistrationForm } from "./components/RegistrationForm/RegistrationForm";
import { Dictionary } from "./components/Dictionary/Dictionary";
import { RepeatWords } from "./components/Trainings/RepeatWords/RepeatWords";
import { SpellCheck } from "./components/Trainings/SpellCheck/SpellCheck";
import { ChooseWordByDef } from "./components/Trainings/ChooseDefinition/ChooseWordByDef";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <div className="outer-container">
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="training" element={<TrainingPage />} />
          <Route path="/training/learn-words" element={<LearnWords />} />
          <Route path="/training/repeat-words" element={<RepeatWords />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/training/spell-check" element={<SpellCheck />} />
          <Route
            path="/training/choose-word-by-definition"
            element={<ChooseWordByDef />}
          />
        </Route>
      </Routes>
      <LoginRoutes />
    </div>
  </BrowserRouter>
);

function LoginRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    setIsLoggedIn(sessionStorage.getItem("isLoggedIn") === "y");
  }, []);

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<AuthorizationForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
      </Routes>
    );
  }
}

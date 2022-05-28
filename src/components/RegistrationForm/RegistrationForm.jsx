import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export function RegistrationForm() {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const postHandler = (e) => {
    e.preventDefault();

    const formData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        login,
        password,
      }),
    };

    fetch("/api/register", formData)
      .then((res) => res.json())
      .then((data) => {
        if (data.response === "y") {
          fetch("/api/login", formData)
            .then((logRes) => logRes.json())
            .then((logData) => {
              if (logData.response === "y") navigate("/");
            });
        }
      });
  };

  return (
    <div className="auth-form-wrapper flex flex-a-center flex-j-center">
      <form
        className="auth-form flex flex-o-vertical p-40 
        border-round-tiny bg-prm flex-j-space-evenly"
        onSubmit={postHandler}
      >
        <input
          className="flex-item"
          type="text"
          placeholder="Login"
          required
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          className="flex-item m-v-20"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex flex-o-vertical">
          <button
            type="submit"
            className="flex-item bg-prm-d bg-prm-b-hover text-color-main-b 
            text-color-main-d-hover"
          >
            Registration
          </button>
          <Link to="/login" className="m-t-10 text-align-center">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

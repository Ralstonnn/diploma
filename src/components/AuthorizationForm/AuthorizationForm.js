import "./style.scss";
import { useState } from "react";

export function AuthorizationForm(isLoggedIn) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

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

    fetch("/api/login", formData)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data.response);

        isLoggedIn();
        setLoggedIn(data.response === "y");
      });

    console.log("test");
  };

  return (
    <div className="auth-form-wrapper flex flex-a-center flex-j-center">
      <form
        className="flex flex-o-vertical p-40 bg-main-b border-round-tiny"
        onSubmit={postHandler}
      >
        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          className="m-v-20"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

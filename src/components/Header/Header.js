import { Link, useNavigate } from "react-router-dom";
import "./style.scss";

export function Header() {
  return (
    <header className="flex">
      <h1 className="p-h-40">EngSite</h1>
      <HeaderButton to="/" text="Home" />
      <HeaderButton to="/training" text="Training" />
      <HeaderButton to="/dictionary" text="Dictionary" />
      {/* TODO: Add ability to add words */}
      <HeaderButton to="/add-words" text="AddWords" />

      <div className="flex-item"></div>

      <h1 className="p-h-20">{sessionStorage.getItem("login")}</h1>
      <LogoutButton />
    </header>
  );
}

function LogoutButton() {
  const navigate = useNavigate();

  const Logout = (e) => {
    e.preventDefault();

    sessionStorage.setItem("isLoggedIn", "n");
    sessionStorage.setItem("isLoading", "y");

    const formData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };

    fetch("/api/logout", formData)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.response === "y") navigate("/login");
      });
  };

  return (
    <form onSubmit={Logout}>
      <button className="header-btn bg-main-sd p-h-40" type="submit">
        Logout
      </button>
    </form>
  );
}

function HeaderButton({ to, text }) {
  return (
    <Link to={to} className="header-btn">
      {text}
    </Link>
  );
}

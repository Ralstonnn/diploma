import { Link, useNavigate } from "react-router-dom";
import "./style.scss";

export function Header({ setShowAddWords }) {
  return (
    <header className="flex bg-prm-d">
      <h1 className="p-h-40">EngSite</h1>
      <HeaderButton to="/" text="Home" onClick={() => setShowAddWords(false)} />
      <HeaderButton
        to="/training"
        text="Training"
        onClick={() => setShowAddWords(false)}
      />
      <HeaderButton
        to="/dictionary"
        text="Dictionary"
        onClick={() => setShowAddWords(false)}
      />

      <div className="flex-item"></div>

      {/* TODO: Add ability to add words */}
      <div
        className="header-add-words-btn bg-prm-d bg-prm-hover p-40"
        onClick={() => setShowAddWords(true)}
      >
        <div className="header-add-words-btn-icon">
          <div></div>
        </div>
      </div>

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
      <button className="header-btn bg-prm-d bg-prm-hover p-h-40" type="submit">
        Logout
      </button>
    </form>
  );
}

function HeaderButton({ to, text, onClick }) {
  return (
    <Link
      to={to}
      className="header-btn bg-prm-d bg-prm-hover"
      onClick={onClick}
    >
      {text}
    </Link>
  );
}

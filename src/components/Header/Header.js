import { Link } from "react-router-dom";
import "./style.scss";

export function Header() {
  const Logout = (e) => {
    sessionStorage.setItem("isLoggedIn", "n");

    const formData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };

    fetch("/api/logout", formData);
  };

  return (
    <header className="flex">
      <h1 className="p-h-40">EngSite</h1>
      <HeaderButton href="/" text="Home" />
      <HeaderButton href="/training" text="Training" className="flex" />
      <div className="flex-item"></div>
      <h1 className="p-h-20">{sessionStorage.getItem("login")}</h1>
      {sessionStorage.getItem("isLoggedIn") ? (
        <LoginButton text="Logout" PostHandler={Logout} />
      ) : (
        <LoginButton text="Login" />
      )}
    </header>
  );
}

function LoginButton({ PostHandler, text }) {
  return (
    <form onSubmit={PostHandler}>
      <button className="header-btn bg-main-sd p-h-40" type="submit">
        {text}
      </button>
    </form>
  );
}

function HeaderButton({ href, text }) {
  return (
    <Link to={href} className="header-btn">
      {text}
    </Link>
  );
}

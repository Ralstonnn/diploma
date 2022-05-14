import { Link } from "react-router-dom";
import "./style.scss";

export function Header({ login, isLoggedIn }) {
  return (
    <header className="flex">
      <h1 className="p-h-40">EngSite</h1>
      <HeaderButton href="/" text="Home" />
      <HeaderButton href="/training" text="Training" className="flex" />
      <div className="flex-item"></div>
      <h1>{login}</h1>
      {isLoggedIn ? (
        <LoginButton text="Logout" />
      ) : (
        <LoginButton text="Login" />
      )}
    </header>
  );
}

function LoginButton({ callback, text }) {
  return <button className="header-btn bg-main-sd p-h-40">{text}</button>;
}

function HeaderButton({ href, text }) {
  return (
    <Link to={href} className="header-btn">
      {text}
    </Link>
  );
}

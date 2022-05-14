import { Link } from "react-router-dom";
import "./style.scss";

export function Header() {
  return (
    <header className="flex">
      <h1 className="p-h-40">EngSite</h1>
      <HeaderButton href="/" text="Home" />
      <HeaderButton href="/training" text="Training" className="flex" />
      <div className="flex-item"></div>
      <LoginButton />
    </header>
  );
}

function LoginButton({ callback }) {
  return <button className="header-btn bg-main-sd p-h-40">Login</button>;
}

function HeaderButton({ href, text }) {
  return (
    <Link to={href} className="header-btn">
      {text}
    </Link>
  );
}

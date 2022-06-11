import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss";

export function Header({ setShowAddWords }) {
  const humburgerBtnContainer = useRef(null);
  const menu = useRef(null);

  const mobileMenuBtnClick = () => {
    if (humburgerBtnContainer.current.dataset.checked === "true") {
      humburgerBtnContainer.current.dataset.checked = "false";
      menu.current.dataset.show = "false";
      return;
    }

    menu.current.dataset.show = "true";
    humburgerBtnContainer.current.dataset.checked = "true";
  };

  return (
    <header className="flex flex-a-center flex-wrap bg-prm-d">
      <div
        className="header-mobile-menu-container flex-item flex-item-1 flex
          flex-a-center"
      >
        <h3 className="header-mobile-menu-site-name p-h-40">EngSite</h3>
        <div
          className="header-mobile-menu-hamburger-btn-container flex-item
            flex-item-j-self-end bg-prm-hover"
          ref={humburgerBtnContainer}
          data-checked="false"
          onClick={mobileMenuBtnClick}
        >
          <div className="header-mobile-menu-hamburger-btn"></div>
        </div>
      </div>

      <div
        className="header-wrapper flex-item flex-item-1 flex flex-a-center flex-1024-wrap"
        ref={menu}
        data-show="false"
      >
        <h3 className="header-menu-site-name p-h-40">EngSite</h3>
        <HeaderButton
          to="/"
          text="Home"
          onClick={() => {
            setShowAddWords(false);
            mobileMenuBtnClick();
          }}
        />
        <HeaderButton
          to="/training"
          text="Training"
          onClick={() => {
            setShowAddWords(false);
            mobileMenuBtnClick();
          }}
        />
        <HeaderButton
          to="/dictionary"
          text="Dictionary"
          onClick={() => {
            setShowAddWords(false);
            mobileMenuBtnClick();
          }}
        />

        <div className="header-separator flex-item flex-item-1"></div>

        <div
          className="header-add-words-btn-mobile flex-item flex-item-1 
            bg-prm-d bg-prm-hover text-s4 text-align-center p-20"
          onClick={() => {
            setShowAddWords(true);
            mobileMenuBtnClick();
          }}
        >
          Add Words
        </div>

        <div
          className="header-add-words-btn bg-prm-d bg-prm-hover p-40"
          onClick={() => setShowAddWords(true)}
        >
          <div className="header-add-words-btn-icon">
            <div></div>
          </div>
        </div>

        <h3 className="header-login-text p-h-20">
          {sessionStorage.getItem("login")}
        </h3>
        <LogoutButton />
      </div>
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
    <form className="flex-item flex-item-1024-1 flex" onSubmit={Logout}>
      <button
        className="flex-item flex-item-1024-1 header-btn bg-prm-d bg-prm-hover p-h-40"
        type="submit"
      >
        Logout
      </button>
    </form>
  );
}

function HeaderButton({ to, text, onClick }) {
  return (
    <Link
      to={to}
      className="header-btn flex-item flex-item-1024-1 bg-prm-d bg-prm-hover"
      onClick={onClick}
    >
      {text}
    </Link>
  );
}

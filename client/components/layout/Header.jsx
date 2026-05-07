import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const { pathname } = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => pathname === path;

  const closeMenu = () => {
    setMobileOpen(false);
  };

  return (
    <header className="main-header">

      {/* TOP BAR */}
      <div className="header-top">

        {/* LEFT */}
        <div className="h-logo">
          <img src="/logo.jpg" alt="logo" />

          <div className="h-div"></div>

          <div className="h-sub">
            <strong>Espace Collaborateurs</strong>
            MP Renov · Home Design · Media4
          </div>
        </div>

        {/* BURGER */}
        <button
          className={`burger ${mobileOpen ? "open" : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* NAV */}
      <nav className={`main-nav ${mobileOpen ? "open" : ""}`}>

        <Link
          to="/"
          onClick={closeMenu}
          className={isActive("/") ? "active" : ""}
        >
          Actualités
        </Link>

        <Link
          to="/groupe"
          onClick={closeMenu}
          className={isActive("/groupe") ? "active" : ""}
        >
          Le Groupe
        </Link>

        <Link
          to="/organisation"
          onClick={closeMenu}
          className={isActive("/organisation") ? "active" : ""}
        >
          Organisation
        </Link>

        <Link
          to="/contact"
          onClick={closeMenu}
          className={isActive("/contact") ? "active" : ""}
        >
          Contact
        </Link>

        <Link
          to="/admin"
          onClick={closeMenu}
          className="nav-admin"
        >
          Admin
        </Link>

      </nav>
    </header>
  );
}

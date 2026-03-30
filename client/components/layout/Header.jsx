import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();

  const isActive = (path) => pathname === path;

  return (
    <header>
      {/* LEFT */}
      <div className="h-logo">
        <img src="/logo.jpg" alt="logo" />  

        <div className="h-div"></div>

        <div className="h-sub">
          <strong>Espace Collaborateurs</strong>
          MP Renov · Home Design · Media4
        </div>
      </div>

      {/* NAV */}
      <nav>
        <Link
          to="/"
          className={isActive("/") ? "active" : ""}
        >
          📢 Actualités
        </Link>

        <Link
          to="/groupe"
          className={isActive("/groupe") ? "active" : ""}
        >
          🌐 Le Groupe
        </Link>

        <Link
          to="/organisation"
          className={isActive("/organisation") ? "active" : ""}
        >
          🏢 Organisation
        </Link>

        <Link
          to="/contact"
          className={isActive("/contact") ? "active" : ""}
        >
          💬 Contact
        </Link>

        <Link
          to="/admin"
          className="nav-admin"
        >
          ⚙️ Admin
        </Link>
      </nav>
    </header>
  );
}

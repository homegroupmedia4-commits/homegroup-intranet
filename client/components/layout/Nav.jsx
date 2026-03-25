import { NavLink } from "react-router-dom";

export default function Nav() {
  const linkClass =
    "px-3 py-2 rounded hover:bg-gray-200";

  const activeClass = "bg-gray-300";

  return (
    <nav className="bg-gray-100 px-6 py-3 flex gap-3">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${linkClass} ${isActive ? activeClass : ""}`
        }
      >
        Actualités
      </NavLink>

      <NavLink to="/groupe" className={linkClass}>
        Groupe
      </NavLink>

      <NavLink to="/organisation" className={linkClass}>
        Organisation
      </NavLink>

      <NavLink to="/contact" className={linkClass}>
        Contact
      </NavLink>

      <NavLink to="/admin" className={linkClass}>
        Admin
      </NavLink>
    </nav>
  );
}
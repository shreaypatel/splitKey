import { NavLink } from "react-router-dom";
import "./SiteNav.css";

export function SiteNav() {
  return (
    <header className="site-nav-wrap">
      <nav className="site-nav" aria-label="Main">
        <NavLink to="/lessons" className="site-nav__brand">
          Ataraxia
        </NavLink>
        <div className="site-nav__links">
          <NavLink
            to="/lessons"
            className={({ isActive }) =>
              `site-nav__link${isActive ? " site-nav__link--active" : ""}`
            }
          >
            Lessons
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

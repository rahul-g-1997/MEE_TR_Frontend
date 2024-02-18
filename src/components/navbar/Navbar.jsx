import { useState } from "react";
import { NavLink } from "react-router-dom";
import style from "./navbar.module.css";

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <nav className={style.navbar}>
      <div className={style.container}>
        <NavLink to="/" className={style.logo}>
          <h1>LOGO</h1>
        </NavLink>
        <div className={style.menuicon} onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div
          className={`${style.navelements} ${showNavbar ? style.active : ""}`}
        >
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? style.active : "")}
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? style.active : "")}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                className={({ isActive }) => (isActive ? style.active : "")}
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/projects"
                className={({ isActive }) => (isActive ? style.active : "")}
              >
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? style.active : "")}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

const Hamburger = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="52"
    height="24"
    viewBox="0 0 52 24"
  >
    <g id="Group_9" data-name="Group 9" transform="translate(-294 -47)">
      <rect
        id="Rectangle_3"
        data-name="Rectangle 3"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 47)"
        fill="#ffffff"
      />
      <rect
        id="Rectangle_5"
        data-name="Rectangle 5"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 67)"
        fill="#ffffff"
      />
      <rect
        id="Rectangle_4"
        data-name="Rectangle 4"
        width="52"
        height="4"
        rx="2"
        transform="translate(294 57)"
        fill="#ffffff"
      />
    </g>
  </svg>
);

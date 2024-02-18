import  { useState } from "react";
import "./sidebar.css"; // Importing CSS file

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false); // State to manage sidebar collapse

const handleExpandClick = () => {
  setCollapsed((prevCollapsed) => !prevCollapsed); // Toggle sidebar collapse state
};


  // const handleLinkClick = (e) => {
  //   const clickedLink = e.target;
  //   const allLinks = document.querySelectorAll(".sidebar-links a");
  //   allLinks.forEach((link) => {
  //     if (link === clickedLink) {
  //       link.classList.add("active");
  //     } else {
  //       link.classList.remove("active");
  //     }
  //   });
  // };

  return (
    <div className="contaner">
      <nav className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-top-wrapper">
          <div className="sidebar-top">
            {/* <a href="#" className="logo__wrapper">
              <img src="assets/logo.svg" alt="Logo" className="logo-small" />
              <span className="hide company-name">HUGE iCONS</span>
            </a> */}
          </div>
          <button
            className="expand-btn"
            type="button"
            onClick={handleExpandClick}
          >
          </button>
        </div>
        {/* <div className="sidebar-links-wrapper">
          <div className="sidebar-links">
            <ul>
              <li>
                <a
                  href="#dashboard"
                  title="Dashboard"
                  className="tooltip"
                  onClick={handleLinkClick}
                >
                  <span className="link hide">Dashboard</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="sidebar__profile">
          <div className="avatar__wrapper">
            <img
              className="avatar"
              src="assets/logo.svg"
              alt="Joe Doe Picture"
            />
            <div className="online__status"></div>
          </div>
          <div className="avatar__name hide">
            <div className="user-name">Hugeicons Pro</div>
            <div className="email">@huge_icons</div>
          </div>
        </div> */}
      </nav>
    </div>
  );
}

import style from "./sidebar.module.css"
export default function Sidebar() {
    function toggleSidebar() {
      var sidebar = document.getElementById("sidebar");
      sidebar.classList.toggle("expanded");
    }
  return (
      <div className={style.sidebar} id="sidebar">
          <div className={style.logo} onClick={toggleSidebar()}>
        Logo
      </div>
          <ul className={style.menu}>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Services</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
    </div>
  );
}

import style from "./usernav.module.css";
import profileLogo from "../../assets/user.png"
export default function Usernav() {
  return (
    <nav className={style.navbar}>
      <div className={style.container}>
        <div className={style.logo}>
          <h1>LOGO</h1>
        </div>
        <div>
          <img
            src={profileLogo}
            alt="Girl in a jacket"
            width="50"
            height="50"
          />
        </div>
      </div>
    </nav>
  );
}

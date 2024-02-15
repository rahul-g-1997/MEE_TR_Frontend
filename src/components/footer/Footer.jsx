import style from "./footer.module.css";

export default function Footer() {
  return (
    <div className={style.footer}>
      <strong>
        <p>
          © {new Date().getFullYear()}{" "}
          <a
            href="https://data-engine.co/"
            target="_blank"
            rel="noopener noreferrer"
          >
            DataEngine Pvt. Ltd.
          </a>
          &nbsp;&nbsp;All Rights Reserved.
        </p>
      </strong>
    </div>
  );
}

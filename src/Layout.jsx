import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Footer, Navbar, Usernav } from "./components";
import upArrowIcon from "./assets/up-arrow.png";

const Layout = () => {
  const isLogin = useSelector((state) => state.login.isLogin);

  return (
    <div>
      <Container style={{ margin: 0, padding: 0 }}>
        <Box style={{ width: "100vw" }}>
          {!isLogin && <Navbar />}
          <Outlet />
          <Footer />
        </Box>
        {/* 👇️ scroll to top on button click */}
        <div>
          <img
            src={upArrowIcon}
            alt="Scroll to top"
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
            style={{
              backgroundColor: "white",
              position: "fixed",
              bottom: "20px",
              right: "20px",
              color: "#fff",
              textAlign: "center",
              borderRadius: "50%",
              boxShadow: "4px 4px 4px rgba(0, 0, 0, 1)",
              transition: "transform 0.2s ease",
            }}
            className="hover-scale"
            onMouseEnter={() => {
              document.querySelector(".hover-scale").style.transform =
                "scale(1.1)";
            }}
            onMouseLeave={() => {
              document.querySelector(".hover-scale").style.transform =
                "scale(1)";
            }}
          />
        </div>
      </Container>
    </div>
  );
};

export default Layout;

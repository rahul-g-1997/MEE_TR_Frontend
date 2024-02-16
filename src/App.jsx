import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home, About, Contacts, Error } from "./pages/index";
import { Navbar, Footer, Usernav, Sidebar } from "./components/index";
import upArrowIcon from "./assets/arrow.png";
import { useState, useEffect } from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import { checkLogin } from "./auth/index";

function App() {
  const [islogin, setIslogin] = useState(true);
  useEffect(() => {
    if (checkLogin()) {
      setIslogin(true);
    }
  }, []);

  return (
    <Router>
      <div>
        {!islogin ? <Navbar /> : <Usernav />}
        {/* {!islogin && <Sidebar/>} */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contacts />} />
          {islogin && (
            <Route path="/user">
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          )}
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </div>
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
            document.querySelector(".hover-scale").style.transform = "scale(1)";
          }}
        />
      </div>
    </Router>
  );
}

export default App;

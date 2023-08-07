import "bootstrap/dist/css/bootstrap.css";
import "./bootstrap.scss";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Main from "./pages/main/Main";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
import Caption from "./pages/caption/Caption";
import Footer from "./components/footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

import { createContext, useEffect, useState } from "react";

// import "./lib/wow/wow.min.js";
// import "./lib/easing/easing.min.js";
// import "./lib/waypoints/waypoints.min.js";
// import "./lib/counterup/counterup.min.js";
// import "./lib/owlcarousel/owl.carousel.min.js";
// import "./lib/tempusdominus/js/moment.min.js";
// import "./lib/tempusdominus/js/moment-timezone.min.js";
// import "./lib/tempusdominus/js/tempusdominus-bootstrap-4.min.js";
// import "./lib/main.js";

export const userContext = createContext();

function App() {
  const [usm, setUsm] = useState("");
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <userContext.Provider value={{ usm, setUsm }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/signin" element={<Signin />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/caption" element={<Caption />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </userContext.Provider>
    </>
  );
}

export default App;

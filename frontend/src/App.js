import "bootstrap/dist/css/bootstrap.css";
import "./bootstrap.scss";
// import "./lib/animate/animate.min.css";
// import "./lib/owlcarousel/assets/owl.carousel.min.css";
// import "./lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css";
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
import { createContext, useState } from "react";

export const userContext = createContext();

function App() {
  const [usm, setUsm] = useState("");

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

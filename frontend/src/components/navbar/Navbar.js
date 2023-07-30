import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../App";

function Navbar() {
  const { usm, setUsm } = useContext(userContext);

  const signOut = () => {
    const ans = window.confirm("Are You Sure You Want To Sign Out?");
    if (ans) {
      setUsm("");
    }
  };

  useEffect(() => {}, [usm]);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-white navbar-light sticky-top py-lg-0 px-lg-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <Link to="/" className="navbar-brand ms-4 ms-lg-0">
          <h1 className="text-primary m-0">CAP-I</h1>
        </Link>
        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <Link to="/" className="nav-item nav-link">
              Home
            </Link>
            <Link to="/about" className="nav-item nav-link">
              About
            </Link>
            <Link to="/contact" className="nav-item nav-link">
              Contact
            </Link>

            {usm !== "" ? (
              <>
                <Link to="/caption" className="nav-item nav-link">
                  Caption
                </Link>
                <div
                  to="/signup"
                  className="btn btn-primary my-4 py-1 px-3 d-none d-lg-block"
                  onClick={signOut}
                >
                  SIGN OUT
                </div>
              </>
            ) : (
              <>
                <Link to="/signin" className="nav-item nav-link">
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-primary my-4 py-1 px-3 d-none d-lg-block"
                >
                  SIGN UP
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

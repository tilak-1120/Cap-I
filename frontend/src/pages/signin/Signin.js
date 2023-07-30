import React, { useContext, useEffect, useRef } from "react";
import "./signin.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../../App";

function Signin() {
  const username = useRef();
  const password = useRef();
  const { usm, setUsm } = useContext(userContext);
  const navigate = useNavigate();

  const signInUser = async () => {
    try {
      const userSignIn = await axios.post("/api/v1/signin", {
        username: username.current.value,
        password: password.current.value,
      });

      if (userSignIn) {
        setUsm(username.current.value);
        navigate("/");
      }
    } catch (err) {
      alert("Invalid Credentials");
      console.log(err);
    }
  };

  const signInClick = (e) => {
    e.preventDefault();
    signInUser();
  };

  useEffect(() => {
    if (usm !== "") {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (usm !== "") {
      navigate("/");
    }
  }, [usm, setUsm, navigate]);

  return (
    <>
      {/* Page Header Start  */}
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container py-5">
          <h1 className="display-1 text-white animated slideInDown">Sign In</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb text-uppercase mb-0">
              <li className="breadcrumb-item">
                <Link to="/" className="text-white">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/" className="text-white" href="#">
                  Pages
                </Link>
              </li>
              <li
                className="breadcrumb-item text-primary active"
                aria-current="page"
              >
                Sign In
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End  */}

      {/*  Input Start  */}
      <div className="container-xxl py-5">
        <div className="container">
          <div
            className="text-center mx-auto mb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ width: "600px" }}
          >
            <h4 className="section-title">Welcome Back</h4>
            <h1 className="display-5 mb-4">
              Nice To See You Again
              <br /> Enjoy Captioning...
            </h1>
          </div>
          <div className="row g-5 justify-content-center align-items-center">
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
              <form className="my-3" method="POST" onSubmit={signInClick}>
                <div className="row g-3">
                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                        ref={username}
                        minLength={3}
                        maxLength={20}
                        required
                      />
                      <label for="name">Username</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control"
                        id="subject"
                        placeholder="Subject"
                        ref={password}
                        required
                      />
                      <label for="subject">Password</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Input End  */}
    </>
  );
}

export default Signin;

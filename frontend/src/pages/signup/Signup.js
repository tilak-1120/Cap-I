import React, { useContext, useEffect, useRef } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../../App";

function Signup() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const cpassword = useRef();
  const { usm, setUsm } = useContext(userContext);
  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      if (password.current.value !== cpassword.current.value) {
        return alert("Password and Confirm Password doesn't match");
      }

      try {
        const userExists = await axios.get(
          "/api/v1/usercheck/" + username.current.value
        );
      } catch (err) {
        alert("Username already exists");
        console.log(err);
      }

      const registerUser = await axios.post("/api/v1/register", {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      });

      if (registerUser) {
        alert("Signed Up Succesfully");
        navigate("/signin");
        console.log(registerUser);
      }
    } catch (err) {
      alert("Please enter valid email address or try a new one");
      console.log(err);
    }
  };

  const signUpClick = (e) => {
    e.preventDefault();
    registerUser();
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
  }, [usm, setUsm, navigate, registerUser]);

  return (
    <>
      {/* Page Header Start  */}
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-aos="fade-down"
        data-aos-delay="500"
      >
        <div className="container py-5">
          <h1 className="display-1 text-white animated slideInDown">Sign Up</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb text-uppercase mb-0">
              <li className="breadcrumb-item">
                <Link to="/" className="text-white">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/" className="text-white">
                  Pages
                </Link>
              </li>
              <li
                className="breadcrumb-item text-primary active"
                aria-current="page"
              >
                Sign Up
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End  */}

      {/* Input Start  */}
      <div className="container-xxl py-5">
        <div className="container">
          <div
            className="text-center mx-auto mb-5 wow fadeInUp"
            data-aos="flip-up"
            data-aos-delay="500"
            style={{ width: "600px" }}
          >
            <h4 className="section-title">Create an account</h4>
            <h1 className="display-5 mb-4">
              We Are Waiting For You <br /> Join Us Now!
            </h1>
          </div>
          <div className="row g-5">
            <div
              className="col-lg-6 wow fadeInUp"
              data-aos="flip-left"
              data-aos-delay="500"
            >
              <div className="d-flex flex-column justify-content-between h-100">
                <div className="bg-light d-flex align-items-center w-100 p-4 mb-4">
                  <div className="ms-4">
                    <p className="mb-2">Step - 1</p>
                    <h3 className="mb-0">Create An Account</h3>
                  </div>
                </div>
                <div className="bg-light d-flex align-items-center w-100 p-4 mb-4">
                  <div className="ms-4">
                    <p className="mb-2">Step - 2</p>
                    <h3 className="mb-0">Upload Image</h3>
                  </div>
                </div>
                <div className="bg-light d-flex align-items-center w-100 p-4">
                  <div className="ms-4">
                    <p className="mb-2">Step - 3</p>
                    <h3 className="mb-0">Get Your Caption Ready!!</h3>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-6 wow fadeInUp"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <form method="POST" className="my-3" onSubmit={signUpClick}>
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
                        autoComplete="off"
                      />
                      <label for="name">Username</label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Your Email"
                        ref={email}
                        maxLength={50}
                        required
                        autoComplete="off"
                      />
                      <label for="email">Email</label>
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
                        minLength={6}
                        required
                        autoComplete="off"
                      />
                      <label for="subject">Password</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control"
                        id="subject"
                        placeholder="Subject"
                        ref={cpassword}
                        minLength={6}
                        required
                        autoComplete="off"
                      />
                      <label for="subject">Confirm Password</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="submit"
                    >
                      Sign Up
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

export default Signup;

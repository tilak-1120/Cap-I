import React, { useContext, useEffect, useRef, useState } from "react";
import "./signin.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../../App";
import { useCookies } from "react-cookie";

function Signin() {
  const username = useRef();
  const password = useRef();
  const newusername = useRef();
  const newpassword = useRef();
  const oldpassword = useRef();
  const { usm, setUsm } = useContext(userContext);
  const navigate = useNavigate();
  const [isPassChange, setIsPassChange] = useState(false);

  const [cookie, setCookie] = useCookies(["UserAuth"]);

  const signInUser = async () => {
    try {
      const userSignIn = await axios.post("/api/v1/signin", {
        username: username.current.value,
        password: password.current.value,
      });

      if (userSignIn) {
        setCookie("UserAuth", username.current.value, {
          expires: new Date(Date.now() + 1800000),
        });

        console.log(`Cookie Set ${cookie}`);

        setUsm(username.current.value);
        navigate("/");
      }
    } catch (err) {
      alert("Invalid Credentials");
      console.log(err);
    }
  };

  const updatePassword = async () => {
    try {
      const updatePass = await axios.put(
        "/api/v1/updatepassword/" + newusername.current.value,
        {
          password: oldpassword.current.value,
          newpassword: newpassword.current.value,
        }
      );

      if (updatePass) {
        // console.log(updatePass);
        alert("Password Updated");
        newusername.current.value = "";
        oldpassword.current.value = "";
        newpassword.current.value = "";
        setIsPassChange(false);
      }
    } catch (err) {
      alert("Invalid Credentials");
      newusername.current.value = "";
      oldpassword.current.value = "";
      newpassword.current.value = "";
      console.log(err);
    }
  };

  const signInClick = (e) => {
    e.preventDefault();
    signInUser();
  };

  const updatePassClick = (e) => {
    e.preventDefault();
    updatePassword();
  };

  useEffect(() => {
    if (cookie.UserAuth && usm !== "") {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (cookie.UserAuth && usm !== "") {
      navigate("/");
    }
  }, [usm, setUsm, navigate, cookie]);

  return (
    <>
      {/* Page Header Start  */}
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-aos="fade-down"
        data-aos-delay="500"
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
            data-aos="flip-up"
            data-aos-delay="500"
            style={{ width: "600px" }}
          >
            <h4 className="section-title">Welcome Back</h4>
            <h1 className="display-5 mb-4">
              Nice To See You Again
              <br /> Enjoy Captioning...
            </h1>
          </div>

          {!isPassChange ? (
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
                          autoComplete="off"
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
                          minLength={6}
                          required
                          autoComplete="off"
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
                    <div className="col-12 d-flex justify-content-center align-items-center">
                      <h4
                        className="updateLink section-title"
                        onClick={() => {
                          setIsPassChange(true);
                        }}
                      >
                        Update Password?
                      </h4>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="row g-5 justify-content-center align-items-center">
              <div className="col-lg-6 wow fadeInUp">
                <form className="my-3" method="POST" onSubmit={updatePassClick}>
                  <div className="row g-3">
                    <div className="col-md-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Your Name"
                          ref={newusername}
                          minLength={3}
                          maxLength={20}
                          required
                          autoComplete="off"
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
                          ref={oldpassword}
                          minLength={6}
                          required
                          autoComplete="off"
                        />
                        <label for="subject">Current Password</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="password"
                          className="form-control"
                          id="subject"
                          placeholder="Subject"
                          ref={newpassword}
                          minLength={6}
                          required
                          autoComplete="off"
                        />
                        <label for="subject">New Password</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100 py-3"
                        type="submit"
                      >
                        Update Password
                      </button>
                    </div>
                    <div className="col-12 d-flex justify-content-center align-items-center">
                      <h4
                        className="updateLink section-title"
                        onClick={() => {
                          setIsPassChange(false);
                        }}
                      >
                        Sign In
                      </h4>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Input End  */}
    </>
  );
}

export default Signin;

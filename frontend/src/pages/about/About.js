import React, { useContext, useEffect, useState } from "react";
import "./about.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { userContext } from "../../App";
import { useCookies } from "react-cookie";

function About() {
  const [users, setUsers] = useState();
  const { usm } = useContext(userContext);
  const [cookie] = useCookies(["UserAuth"]);

  const getAllUsers = async () => {
    try {
      const getUsers = await axios.get("/api/v1/getallusers");
      setUsers(getUsers.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {}, [usm, cookie]);

  return (
    <>
      {/* Page Header Start  */}
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-aos="fade-down"
        data-aos-delay="500"
      >
        <div className="container py-5">
          <h1 className="display-1 text-white animated slideInDown">
            About Us
          </h1>
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
                About
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End  */}

      {/* About Start  */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div
              className="col-lg-6 wow fadeIn"
              data-aos="flip-up"
              data-aos-delay="500"
            >
              <div className="about-img">
                <img className="img-fluid" src="img/aboutus-1.jpg" alt="" />
                <img className="img-fluid" src="img/aboutus-2.jpg" alt="" />
              </div>
            </div>
            <div
              className="col-lg-6 wow fadeIn"
              data-aos="flip-up"
              data-aos-delay="500"
            >
              <h4 className="section-title">About Us</h4>
              <h1 className="display-5 mb-4">
                A Creative Machine Learning Team Making Your Life Simple
              </h1>
              <p>
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                sed stet lorem sit clita duo justo magna dolore erat amet
              </p>
              <p className="mb-4">
                Stet no et lorem dolor et diam, amet duo ut dolore vero eos. No
                stet est diam rebum amet diam ipsum. Clita clita labore, dolor
                duo nonumy clita sit at, sed sit sanctus dolor eos.
              </p>
              <div className="d-flex align-items-center mb-5">
                <div
                  className="d-flex flex-shrink-0 align-items-center justify-content-center border border-5 border-primary"
                  style={{ width: "120px", height: "120px" }}
                >
                  <h1 className="display-1 mb-n2" data-toggle="counter-up">
                    {users}
                  </h1>
                  <h1>+</h1>
                </div>
                <div className="ps-4">
                  <h3>Users</h3>
                  <h3>Choosed us</h3>
                  <h3 className="mb-0"></h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About End  */}

      {/* Feature Start  */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div
              className="col-lg-6 wow fadeInUp"
              data-aos="flip-left"
              data-aos-delay="500"
            >
              <h4 className="section-title">Who We Are!</h4>
              <h1 className="display-5 mb-4">
                Why You Should Join Us? Learn More About Us!
              </h1>
              <p className="mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
                quaerat ipsam beatae, temporibus animi suscipit? Maiores
                necessitatibus earum omnis blanditiis expedita laborum ipsam
                nisi porro.
              </p>
              <div
                className="row g-4"
                data-aos="flip-right"
                data-aos-delay="500"
              >
                <div className="col-12">
                  <div className="d-flex align-items-start">
                    <img
                      className="flex-shrink-0"
                      src="img/icons/icon-2.png"
                      alt="Icon"
                    />
                    <div className="ms-4">
                      <h3>Model Approach</h3>
                      <p className="mb-0">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Numquam, voluptatibus.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-flex align-items-start">
                    <img
                      className="flex-shrink-0"
                      src="img/icons/icon-3.png"
                      alt="Icon"
                    />
                    <div className="ms-4">
                      <h3>Innovative Ideas</h3>
                      <p className="mb-0">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Similique, in?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-flex align-items-start">
                    <img
                      className="flex-shrink-0"
                      src="img/icons/icon-4.png"
                      alt="Icon"
                    />
                    <div className="ms-4">
                      <h3>Project Management</h3>
                      <p className="mb-0">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Suscipit, facilis.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-6 wow fadeInUp"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="feature-img">
                <img className="img-fluid" src="img/aboutus-3.jpg" alt="" />
                <img className="img-fluid" src="img/aboutus-4.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Feature End */}
    </>
  );
}

export default About;

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../App";
import axios from "axios";

function Main() {
  const { usm } = useContext(userContext);
  const [users, setUsers] = useState();

  const getAllUsers = async () => {
    try {
      const getUsers = await axios.get("/api/v1/getallusers");
      if (getUsers) {
        setUsers(getUsers.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      {/* Carousel Start  */}
      <div
        className="container-fluid p-0 pb-5 wow fadeIn"
        data-aos="fade-down"
        data-aos-delay="500"
      >
        <div className="owl-carousel header-carousel position-relative">
          <div
            className="owl-carousel-item position-relative"
            data-dot="<img src='img/slider-2.jpg'>"
          >
            <img className="img-fluid" src="img/slider-2.jpg" alt="" />
            <div className="owl-carousel-inner">
              <div className="container">
                <div className="row justify-content-start">
                  <div className="col-10 col-lg-8">
                    <h1 className="display-1 text-white animated slideInDown">
                      Welcome to Caption-it!!
                    </h1>
                    <p className="fs-5 fw-medium text-white mb-4 pb-3">
                      Get started by registering youself and generate captions. Our goal is to provide accurate caption for images. 
                    </p>
                    <Link
                      to={usm ? "/caption" : "/signup"}
                      className="btn btn-primary py-3 px-5 animated slideInLeft"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Carousel End  */}
      {/* Facts Start */}
      <div className="container-xxl py-5">
        <div className="container pt-5">
          <div className="row g-4" data-aos="flip-up" data-aos-delay="500">
            <div className="col-lg-4 col-md-6 wow fadeInUp">
              <div className="fact-item text-center bg-light h-100 p-5 pt-0">
                <div className="fact-icon">
                  <img src="img/icons/icon-2.png" alt="Icon" />
                </div>
                <h3 className="mb-3">Model Approach</h3>
                <p className="mb-0">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                  aut fugit nulla itaque illum placeat excepturi minus et at
                  dolore.
                </p>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="fact-item text-center bg-light h-100 p-5 pt-0">
                <div className="fact-icon">
                  <img src="img/icons/icon-3.png" alt="Icon" />
                </div>
                <h3 className="mb-3">Innovative Ideas</h3>
                <p className="mb-0">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. A
                  corrupti sapiente similique harum, atque quae fuga neque quos
                  reiciendis nesciunt.
                </p>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="fact-item text-center bg-light h-100 p-5 pt-0">
                <div className="fact-icon">
                  <img src="img/icons/icon-4.png" alt="Icon" />
                </div>
                <h3 className="mb-3">Project Management</h3>
                <p className="mb-0">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
                  placeat modi eligendi aspernatur corrupti consequuntur
                  similique voluptatum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Facts End  */}
      {/* About Start  */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div
              className="col-lg-6 wow fadeIn"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="about-img">
                <img className="img-fluid" src="img/aboutus-1.jpg" alt="" />
                <img className="img-fluid" src="img/aboutus-2.jpg" alt="" />
              </div>
            </div>
            <div
              className="col-lg-6 wow fadeIn"
              data-aos="flip-right"
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
              <Link to="/about" className="btn btn-primary py-3 px-5">
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* About End  */}
      {/* Reviews Start  */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div
              className="col-lg-12 wow fadeInUp"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <h4 className="section-title">Contact Us</h4>
              <h1 className="display-5 mb-4">
                Give it a call and we'll find the best way to improve
              </h1>
              <p className="mb-4">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias
                eius magni ratione a debitis nostrum nemo, inventore nulla
                labore voluptas.Lorem ipsum dolor, sit amet consectetur
                adipisicing elit. Alias eius magni ratione a debitis nostrum
                nemo, inventore nulla labore voluptas.Lorem ipsum dolor, sit
                amet consectetur adipisicing elit. Alias eius magni ratione a
                debitis nostrum nemo, inventore nulla labore voluptas.
              </p>
              <div className="row g-4">
                <div className="col-12">
                  <div className="d-flex">
                    <div
                      className="d-flex flex-shrink-0 align-items-center justify-content-center bg-light"
                      style={{ width: "65px;", height: "65px;" }}
                    >
                      <i className="fa fa-2x fa-phone-alt text-primary"></i>
                    </div>
                    <div className="ms-4">
                      <p className="mb-2">Call Us</p>
                      <h3 className="mb-0">+91 98765 43210</h3>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-flex">
                    <div
                      className="d-flex flex-shrink-0 align-items-center justify-content-center bg-light"
                      style={{ width: "65px;", height: "65px;" }}
                    >
                      <i className="fa fa-2x fa-envelope-open text-primary"></i>
                    </div>
                    <div className="ms-4">
                      <p className="mb-2">Mail Us</p>
                      <h3 className="mb-0">capi@gmail.com</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Reviews End  */}
    </>
  );
}

export default Main;

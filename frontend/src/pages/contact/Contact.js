import React, { useContext, useEffect, useRef } from "react";
import "./contact.css";
import { Link } from "react-router-dom";
import { userContext } from "../../App";
import axios from "axios";

function Contact() {
  const { usm } = useContext(userContext);
  const subject = useRef();
  const message = useRef();

  const submitFeedback = async () => {
    try {
      const submitFeedback = await axios.post("/api/v1/feedback", {
        username: usm,
        subject: subject.current.value,
        message: message.current.value,
      });

      if (submitFeedback) {
        alert("Feedback Submitted");
        subject.current.value = "";
        message.current.value = "";
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFormClick = (e) => {
    e.preventDefault();
    submitFeedback();
  };

  useEffect(() => {}, [usm]);

  return (
    <>
      {/* Page Header Start */}
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container py-5">
          <h1 className="display-1 text-white animated slideInDown">
            Contact Us
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
                Contact Us
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}

      {/* Contact Start  */}
      <div className="container-xxl py-5">
        <div className="container">
          <div
            className="text-center mx-auto mb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ width: "600px" }}
          >
            <h4 className="section-title">Contact Us</h4>
            <h1 className="display-5 mb-4">
              Have A Query? <br />
              We Are Here For You
            </h1>
          </div>
          <div className="row g-5">
            <div
              className={
                usm ? "col-lg-6 wow fadeInUp" : "col-lg-12 wow fadeInUp"
              }
              data-wow-delay="0.1s"
            >
              <div className="d-flex flex-column justify-content-center align-items-center h-100">
                <div className="bg-light d-flex align-items-center w-100 p-4 mb-4">
                  <div
                    className="d-flex flex-shrink-0 align-items-center justify-content-center bg-dark"
                    style={{ width: "55px", height: "55px" }}
                  >
                    <i className="fa fa-map-marker-alt text-primary"></i>
                  </div>
                  <div className="ms-4">
                    <p className="mb-2">Address</p>
                    <h3 className="mb-0">
                      Mota Bazaar, Vallabh Vidyanagar, Gujarat, India
                    </h3>
                  </div>
                </div>
                <div className="bg-light d-flex align-items-center w-100 p-4 mb-4">
                  <div
                    className="d-flex flex-shrink-0 align-items-center justify-content-center bg-dark"
                    style={{ width: "55px", height: "55px" }}
                  >
                    <i className="fa fa-phone-alt text-primary"></i>
                  </div>
                  <div className="ms-4">
                    <p className="mb-2">Call Us Now</p>
                    <h3 className="mb-0">+91 98765 43210</h3>
                  </div>
                </div>
                <div className="bg-light d-flex align-items-center w-100 p-4">
                  <div
                    className="d-flex flex-shrink-0 align-items-center justify-content-center bg-dark"
                    style={{ width: "55px", height: "55px" }}
                  >
                    <i className="fa fa-envelope-open text-primary"></i>
                  </div>
                  <div className="ms-4">
                    <p className="mb-2">Mail Us Now</p>
                    <h3 className="mb-0">capi@gmail.com</h3>
                  </div>
                </div>
              </div>
            </div>
            {usm ? (
              <>
                <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                  <form className="my-5" onSubmit={handleFormClick}>
                    <div className="row g-3">
                      <div className="col-12">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="subject"
                            placeholder="Subject"
                            ref={subject}
                            minLength={5}
                            maxLength={20}
                          />
                          <label for="subject">Subject</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            placeholder="Leave a message here"
                            id="message"
                            style={{ height: "150px" }}
                            ref={message}
                            minLength={10}
                            maxLength={50}
                          ></textarea>
                          <label for="message">Message</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <button
                          className="btn btn-primary w-100 py-3"
                          type="submit"
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      {/* Contact End  */}
    </>
  );
}

export default Contact;

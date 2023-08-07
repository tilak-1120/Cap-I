import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      {/* Footer Start */}
      <div
        className="container-fluid bg-dark text-body footer mt-5 pt-5 px-0 wow fadeIn"
        data-aos="flip-down"
        data-aos-delay="500"
      >
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-6 col-md-6">
              <h3 className="text-light mb-4">Address</h3>
              <p className="mb-2">
                <i className="fa fa-map-marker-alt text-primary me-3"></i>Mota
                Bazaar, Vallabh Vidyanagar, Gujarat, India
              </p>
              <p className="mb-2">
                <i className="fa fa-phone-alt text-primary me-3"></i>+91 98765
                43210
              </p>
              <p className="mb-2">
                <i className="fa fa-envelope text-primary me-3"></i>
                capi@gmail.com
              </p>
            </div>
            <div className="col-lg-3 col-md-6">
              <h3 className="text-light mb-4">Quick Links</h3>
              <Link to="/about" className="btn btn-link">
                About Us
              </Link>
              <Link to="/contact" className="btn btn-link">
                Contact Us
              </Link>
              <Link to="/signup" className="btn btn-link">
                Sign Up
              </Link>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex flex-column">
                <Link
                  to="/"
                  className="btn btn-square btn-outline-body ms-auto"
                  href=""
                >
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link
                  to="/"
                  className="btn btn-square btn-outline-body mt-2 ms-auto"
                >
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link
                  to="/"
                  className="btn btn-square btn-outline-body mt-2 ms-auto"
                >
                  <i className="fab fa-youtube"></i>
                </Link>
                <Link
                  to="/"
                  className="btn btn-square btn-outline-body mt-2 ms-auto"
                >
                  <i className="fab fa-linkedin-in"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid copyright">
          <div className="container">
            <div className="col-lg-12 col-md-12 text-lg-center text-md-center mb-md-0">
              &copy; <Link to="/">Cap-I</Link>, All Right Reserved.
            </div>
          </div>
        </div>
      </div>
      {/* Footer End  */}
    </>
  );
}

export default Footer;

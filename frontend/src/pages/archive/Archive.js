import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import axios from "axios";
import "./archive.css";
// import Carousel from "react-bootstrap/Carousel";
// import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";

function Archive() {
  const { usm } = useContext(userContext);
  const [recentImages, setRecentImages] = useState([]);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [isDivisible, setIsDivisible] = useState(false);
  const len = Math.floor(recentImages.length / 10) + 1;
  console.log(len, recentImages.length);

  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= len && selectedPage !== page) {
      setPage(selectedPage);
    }
  };

  const getImages = async () => {
    try {
      const getUser = await axios.get("/api/v1/getuser/" + usm);

      let lastImages = getUser.data.captionedImages;
      // console.log(lastImages);
      setRecentImages(lastImages);
      if (lastImages.length % 10 === 0) {
        setIsDivisible(true);
      }
      // console.log(recentImages.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (usm === "") {
      navigate("/");
    }
    getImages();
  }, []);

  useEffect(() => {
    if (usm === "") {
      navigate("/");
    }
  }, [usm, navigate]);

  return (
    <>
      <div>
        <div
          className="container-fluid page-header py-5 mb-5 wow fadeIn"
          data-aos="fade-down"
          data-aos-delay="500"
        >
          <div className="container py-5">
            <h1 className="display-1 text-white animated slideInDown">
              Archive
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
                  Archive
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <div>
        {recentImages.length > 0 && isDivisible === true ? (
          <div className="products">
            {recentImages.slice(page * 10 - 10, page * 10).map((key, index) => {
              return (
                <span className="products__single" key={index}>
                  <img src={key.path} alt="Page Image" />
                  <span>{key.caption}</span>
                </span>
              );
            })}
          </div>
        ) : (
          <div className="products">
            {recentImages
              .slice(
                page * len - len,
                page * 10 > recentImages.length
                  ? recentImages.length
                  : page * 10
              )
              .map((key, index) => {
                return (
                  <span className="products__single" key={index}>
                    <img src={key.path} alt="Page Image" />
                    <span>{key.caption}</span>
                  </span>
                );
              })}
          </div>
        )}

        {recentImages.length > 0 && isDivisible === true ? (
          <div className="pagination">
            <span
              onClick={() => selectPageHandler(page - 1)}
              className={page > 1 ? "" : "pagination__disable"}
            >
              ◀
            </span>

            {[...Array(recentImages.length / 10)].map((_, i) => {
              return (
                <span
                  key={i}
                  className={page === i + 1 ? "pagination__selected" : ""}
                  onClick={() => selectPageHandler(i + 1)}
                >
                  {i + 1}
                </span>
              );
            })}

            <span
              onClick={() => selectPageHandler(page + 1)}
              className={
                page < recentImages.length / 10 ? "" : "pagination__disable"
              }
            >
              ▶
            </span>
          </div>
        ) : (
          <div className="pagination">
            <span
              onClick={() => selectPageHandler(page - 1)}
              className={page > 1 ? "" : "pagination__disable"}
            >
              ◀
            </span>

            {[...Array(len)].map((_, i) => {
              return (
                <span
                  key={i}
                  className={page === i + 1 ? "pagination__selected" : ""}
                  onClick={() => selectPageHandler(i + 1)}
                >
                  {i + 1}
                </span>
              );
            })}

            <span
              onClick={() => selectPageHandler(page + 1)}
              className={
                page < recentImages.length / 10 ? "" : "pagination__disable"
              }
            >
              ▶
            </span>
          </div>
        )}
      </div>
    </>
  );
}

export default Archive;

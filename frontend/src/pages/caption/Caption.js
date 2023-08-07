import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./caption.css";

function Caption() {
  const { usm } = useContext(userContext);
  const navigate = useNavigate();
  const [files, setFiles] = useState();
  const [isGenerated, setIsGenerated] = useState(false);
  const [images, setImages] = useState();
  const [recentImages, setRecentImages] = useState([]);

  const uploadImage = async () => {
    try {
      const caption = "A girl";
      const formdata = new FormData();
      formdata.append("photo", files);
      formdata.append("username", usm);
      formdata.append("caption", caption);

      // console.log(formdata);
      // console.log(caption);

      const newImage = await axios.post("/api/v1/upload", formdata);

      if (newImage) {
        // console.log(formdata);
        // console.log(files);
        console.log(newImage);
      }

      setFiles("");
      setIsGenerated(true);
    } catch (err) {
      alert("Please Select An Image");
      console.log(err);
    }
  };

  const getImages = async () => {
    try {
      const getUser = await axios.get("/api/v1/getuser/" + usm);

      if (getUser) {
        let uploadedImage =
          getUser.data.captionedImages[getUser.data.captionedImages.length - 1];
        // console.log(uploadedImage);
        setImages(uploadedImage);

        let lastImages = getUser.data.captionedImages.filter((val, indx) => {
          if (getUser.data.captionedImages.length > 6) {
            return indx > getUser.data.captionedImages.length - 6 ? val : "";
          } else {
            return val;
          }
        });
        // console.log(lastImages);
        setRecentImages(lastImages);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    uploadImage();
    getImages();
  };

  useEffect(() => {
    if (usm === "") {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (usm === "") {
      navigate("/");
    }
  }, [usm]);

  useEffect(() => {
    getImages();
    // console.log(images);
  }, [isGenerated]);

  return (
    <>
      {/* Page Header Start */}
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container py-5">
          <h1 className="display-1 text-white animated slideInDown">
            Caption Image
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
                Caption Image
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}
      {/* Caption Start  */}
      <div className="container-xxl py-5">
        <div className="container">
          <div
            className="text-center mx-auto mb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ width: "600px" }}
          >
            {isGenerated ? (
              <>
                <h4 className="section-title">Your Caption For</h4>
                <h1 className="display-5 mb-4">
                  Following Image <br />
                  Is Few Seconds Away From You!!
                </h1>

                <img
                  src={images.path}
                  alt="Uploaded image"
                  className="uploadedImg m-5 mx-auto"
                />
                <div className="col-lg-12 wow fadeInUp" data-wow-delay="0.1s">
                  <div className="captionDiv d-flex justify-content-center align-items-center w-100 mb-4">
                    <div className="ms-0">
                      <p className="mb-2">Your Caption</p>
                      <h3 className="mb-1">{images.caption}</h3>
                    </div>
                  </div>
                </div>
                <button
                  className="btn btn-primary w-50 p-3 mb-3"
                  onClick={() => {
                    setIsGenerated(false);
                  }}
                >
                  Generate another caption
                </button>

                <h4 className="section-title mt-5">
                  Your Recently Captioned Images
                </h4>
                <h1 className="display-5 mb-4">
                  Last Few Images <br />
                  That You Recently Shared With Us!!
                </h1>

                <div
                  className="col-lg-12 wow fadeInUp d-flex flex-column-reverse"
                  data-wow-delay="0.1s"
                >
                  {recentImages.length >= 1
                    ? recentImages.map((key) => {
                        return (
                          <>
                            <div>
                              <div className="d-flex justify-content-center align-items-center w-100">
                                <img
                                  src={key.path}
                                  alt="Uploaded image"
                                  className="uploadedImg m-5 mx-auto"
                                />
                              </div>
                              <div
                                className="col-lg-12 wow fadeInUp"
                                data-wow-delay="0.1s"
                              >
                                <div className="captionDiv d-flex justify-content-center align-items-center w-100 mb-4">
                                  <div className="ms-0">
                                    <h3 className="mb-1">{key.caption}</h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })
                    : ""}
                </div>
              </>
            ) : (
              <>
                <h4 className="section-title">Get A Caption For Your Image</h4>
                <h1 className="display-5 mb-4">
                  Just Upload A File <br />
                  And You're Done!
                </h1>
                <div className="col-12 d-flex flex-row justify-content-around">
                  <input
                    className="inputTag w-50 p-3"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    placeholder="Choose Image"
                    name="image"
                    onChange={(e) => {
                      setFiles(e.target.files[0]);
                    }}
                  />
                  <button className="submitBtn" onClick={handleSubmitClick}>
                    Submit
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Caption End  */}
    </>
  );
}

export default Caption;

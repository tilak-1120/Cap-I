import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./caption.css";
import { useCookies } from "react-cookie";

function Caption() {
  const { usm } = useContext(userContext);
  const navigate = useNavigate();
  const [files, setFiles] = useState();
  const [isGenerated, setIsGenerated] = useState(false);
  const [images, setImages] = useState();
  const [recentImages, setRecentImages] = useState([]);
  const [cookie] = useCookies(["UserAuth"]);

  const uploadImage = async () => {
    try {
      // const caption = "Dummy Caption";
      const formdata = new FormData();
      formdata.append("photo", files);
      formdata.append("username", usm);

      // console.log(formdata);
      // console.log(caption);
      console.log(files);

      const caption = await axios.post(
        "http://localhost:5000/upload",
        formdata
      );
      console.log(caption);
      formdata.append("caption", caption.data.caption);

      const newImage = await axios.post(
        "http://localhost:8000/api/v1/upload",
        formdata
      );

      if (newImage) {
        // console.log(formdata);
        // console.log(files);
        console.log(newImage);
      }

      setFiles("");
      // setIsGenerated(true);
    } catch (err) {
      alert("Please Select An Image");
      console.log(err);
    }
  };

  const getImages = async () => {
    try {
      const getUser = await axios.get("/api/v1/getuser/" + usm);

      if (getUser) {
        // console.log(getUser);

        if (getUser.data.captionedImages.length !== 0) {
          let uploadedImage =
            getUser.data.captionedImages[
              getUser.data.captionedImages.length - 1
            ];
          // console.log(uploadedImage);
          setImages(uploadedImage);
        } else {
          let uploadedImage = getUser.data.captionedImages[0];
          // console.log(uploadedImage);
          setImages(uploadedImage);
        }

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

  const dataFunc = async () => {
    await uploadImage();
    await getImages();
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    dataFunc();
    setIsGenerated(true);
  };

  useEffect(() => {
    if (cookie.UserAuth && usm === "") {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (cookie.UserAuth && usm === "") {
      navigate("/");
    }
  }, [usm, cookie]);

  useEffect(() => {
    getImages();
    // console.log(images);
  }, [isGenerated]);

  return (
    <>
      {/* Page Header Start */}
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-aos="fade-in"
        data-aos-delay="500"
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
            data-aos="fade-up"
            data-aos-delay="500"
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
                      <p className="mb-2 yrCap">Your Caption</p>
                      <h3 className="mb-1 genCap">{images.caption}</h3>
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

                {/* <h4 className="section-title mt-5">
                  Your Recently Captioned Images
                </h4>
                <h1 className="display-5 mb-4">
                  Last Few Images <br />
                  That You Recently Shared With Us!!
                </h1>

                <div
                  className="col-lg-12 wow fadeInUp d-flex flex-column-reverse"
                  data-aos="flip-up"
                  data-aos-delay="500"
                >
                  {recentImages.length >= 2
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
                </div> */}
              </>
            ) : (
              <>
                <div data-aos="flip-left" data-aos-delay="500">
                  <h4 className="section-title">
                    Get A Caption For Your Image
                  </h4>
                  <h1 className="display-5 mb-4">
                    Just Upload A File <br />
                    And You're Done!
                  </h1>
                </div>
                <div
                  className="col-12 d-flex flex-row justify-content-around"
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  <input
                    className="inputTag w-50 p-3"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    placeholder="Choose Image"
                    name="image"
                    onChange={(e) => {
                      setFiles(e.target.files[0]);
                      // handleChangeClick();
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

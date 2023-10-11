<div>
        <Carousel interval={2000}>
          {/* {console.log(Array.isArray(recentImages), recentImages)} */}
          {recentImages.map((key, index) => {
            return (
              <>
                <Carousel.Item key={index} src={key.path}>
                  <img className="carouselImage" src={key.path} />
                  <Carousel.Caption>
                    <h3 className="imageCaption">{key.caption}</h3>
                  </Carousel.Caption>
                </Carousel.Item>
                {console.log(key, index)}
              </>
            );
          })}
        </Carousel>
      </div>

      <div>
        <MDBCarousel showControls showIndicators>
          {/* {console.log(Array.isArray(recentImages), recentImages)} */}
          {recentImages.map((key, index) => {
            return (
              <>
                <MDBCarouselItem
                  className="carouselImage"
                  itemId={index}
                  src={key.path}
                  alt="Carousel Image"
                >
                  <h5 className="imageCaption">{key.caption}</h5>
                </MDBCarouselItem>
              </>
            );
          })}
        </MDBCarousel>
      </div>

      {/* <div className="container-xxl py-5">
        <div className="container">
          <div
            className="text-center mx-auto mb-5"
            data-aos="fade-up"
            data-aos-delay="500"
            style={{ width: "600px" }}
          >
            {recentImages.length !== 0 ? (
              <>
                <h4 className="section-title mt-5">
                  Your Recently Captioned Images
                </h4>
                <h1 className="display-5 mb-4">
                  Last Few Images <br />
                  That You Recently Shared With Us!!
                </h1>
              </>
            ) : (
              <>
                <h4 className="section-title mt-5">
                  Currently you don't have any previous images
                </h4>
                <h1 className="display-5 mb-4">
                  Caption an image <br />
                  To view your own captioned images archive...!!!
                </h1>
              </>
            )}

            <div
              className="col-lg-12 d-flex flex-column-reverse"
              data-aos="flip-up"
              data-aos-delay="500"
            >
              <div className="d-flex flex-row col-lg-12">
                {recentImages.length >= 2
                  ? recentImages.map((key) => {
                      return (
                        <>
                          <div className="m-3 col-lg-12">
                            <div className="d-flex uploadedImg">
                              <img
                                src={key.path}
                                alt="Uploaded image"
                                className="m-5 mx-auto"
                              />
                            </div>
                            <div className="col-lg-6" data-wow-delay="0.1s">
                              <div className="captionDiv d-flex justify-content-center align-items-center w-100 mb-4">
                                <div className="ms-0">
                                  <h3 className="">{key.caption}</h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div> */}
      

      {/* <Carousel.Item>
          <img
            className="carouselImage"
            src="https://images.pexels.com/photos/9638689/pexels-photo-9638689.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Image #1"
          />
          <Carousel.Caption>
            <h3 className="imageCaption">First slide label</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carouselImage"
            src="https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Image #2"
          />
          <Carousel.Caption>
            <h3 className="imageCaption">Second slide label</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carouselImage"
            src="https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Image #3"
          />
          <Carousel.Caption>
            <h3 className="imageCaption">Third slide label</h3>
          </Carousel.Caption>
        </Carousel.Item> */}
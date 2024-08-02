import React from "react";
import image1 from "../components/carouselimages/cr-1.jpg";
import image2 from "../components/carouselimages/cr-2.avif";
import image3 from "../components/carouselimages/cr-2.webp";
import image4 from "../components/carouselimages/cr-3.webp";
import image5 from "../components/carouselimages/cr-4.webp";

const Carousel = () => {
  return (
    <div className=" w-100 h-100">
      {/**carousels */}
      <div>
        <div  className="container">
          <div
            id="carouselExampleAutoplaying"
            className="carousel slide "
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src={image1}
                  className="d-block w-100 h-50 object-fit-cover"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src={image2}
                  className="d-block w-100  object-fit-contain h-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src={image5}
                  className="d-block w-100 h-50 object-fit-cover"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src={image3}
                  className="d-block w-100 h-50 object-fit-cover"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src={image4}
                  className="d-block w-100 object-fit-cover"
                  alt="..."
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;

import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const Slideshow = ({ slideImages }) => {
  return (
    <div className="slide-container">
      <Slide>
        {slideImages.map((slideImage, index) => (
          <div key={index} className="flex items-center justify-center">
            <div
              className="w-full h-64 md:h-96 bg-cover bg-center"
              style={{ backgroundImage: `url(${slideImage})` }}
            />
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Slideshow;

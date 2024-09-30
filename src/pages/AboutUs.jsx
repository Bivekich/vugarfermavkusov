import React, { useEffect, useState } from "react";
import { getAboutus } from "../sanityclient"; // Ensure this function fetches the about us content
import "../styles/AboutUs.css"; // Link to the CSS file for About Us

const AboutUs = () => {
  const [aboutContent, setAboutContent] = useState([]);

  useEffect(() => {
    const fetchAboutContent = async () => {
      const aboutus = await getAboutus();
      setAboutContent(aboutus);
    };

    fetchAboutContent();
  }, []);

  console.log(aboutContent);

  return (
    <section className="aboutus-section">
      <div className="aboutus-container">
        <h1 className="aboutus-title">{aboutContent.title}</h1>

        <div className="aboutus-content">
          <p className="aboutus-text">{aboutContent.text}</p>

          {aboutContent.image && (
            <img
              src={aboutContent.image}
              alt={aboutContent.title}
              className="aboutus-image"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

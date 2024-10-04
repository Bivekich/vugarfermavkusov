import React, { useEffect, useState } from "react";
import { getAboutus } from "../sanityclient"; // Ensure this function fetches the about us content

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

  /*
  image
  title = About us
  p1
  p2
  p3
  image1
  image2
  p4
  p5
  image3
  p6
  p7
  title1
  image6
  p8
  */

  return (
    <>
      <main className="relative flex-grow">
        <div
          className="flex justify-center h-[250px] lg:h-96 2xl:h-[500px] w-full bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: `url("${aboutContent.image}")` }}
        ></div>
        <div className="py-8 lg:py-16 2xl:py-20">
          <div className="mx-auto max-w-[1920px] px-4 md:px-6 lg:px-8 2xl:px-10">
            <div className="flex flex-col w-full mx-auto max-w-[1200px]">
              <h2 className="text-lg md:text-xl lg:text-[24px] text-brand-dark font-semibold mb-4 lg:mb-7">
                {aboutContent.title}
              </h2>
              <div className="text-sm text-start leading-7 text-brand-dark opacity-70 lg:text-15px lg:leading-loose">
                <p>{aboutContent.p1}</p>
                <p>{aboutContent.p2}</p>
                <p>{aboutContent.p3}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 my-8 lg:my-14">
                <img
                  alt="text-map"
                  loading="lazy"
                  width="590"
                  height="400"
                  decoding="async"
                  data-nimg="1"
                  className="ltr:mr-5 rtl:ml-5"
                  src={aboutContent.image1}
                  style={{ color: "transparent" }}
                />
                <img
                  alt="text-map"
                  loading="lazy"
                  width="590"
                  height="400"
                  decoding="async"
                  data-nimg="1"
                  className=""
                  src={aboutContent.image2}
                  style={{ color: "transparent" }}
                />
              </div>
              <div className="text-sm text-start leading-7 text-brand-dark opacity-70 lg:text-15px lg:leading-loose">
                <p>{aboutContent.p4}</p>

                <p>{aboutContent.p5}</p>
              </div>
              <div className="flex flex-col grid-cols-3 gap-4 my-8 lg:my-14 sm:grid">
                <img
                  alt="text-map"
                  loading="lazy"
                  width="390"
                  height="270"
                  decoding="async"
                  data-nimg="1"
                  className="ltr:mr-4 rtl:ml-4"
                  src={aboutContent.image3}
                  style={{ color: "transparent" }}
                />
                <img
                  alt="text-map"
                  loading="lazy"
                  width="390"
                  height="270"
                  decoding="async"
                  data-nimg="1"
                  className="ltr:mr-4 rtl:ml-4"
                  src={aboutContent.image4}
                  style={{ color: "transparent" }}
                />
                <img
                  alt="text-map"
                  loading="lazy"
                  width="390"
                  height="270"
                  decoding="async"
                  data-nimg="1"
                  className=""
                  src={aboutContent.image5}
                  style={{ color: "transparent" }}
                />
              </div>
              <div className="text-sm text-start leading-7 text-brand-dark opacity-70 lg:text-15px lg:leading-loose">
                <p>{aboutContent.p6}</p>

                <p>{aboutContent.p7}</p>
              </div>
              <div className="flex mt-8 mb-6 lg:mt-14 lg:mb-10">
                <img
                  alt="text-map"
                  loading="lazy"
                  width="1200"
                  height="400"
                  decoding="async"
                  data-nimg="1"
                  className="ltr:mr-4 rtl:ml-4"
                  src={aboutContent.image6}
                  style={{ color: "transparent" }}
                />
              </div>
              <h2 className="text-lg md:text-xl lg:text-[24px] text-brand-dark font-semibold mb-4 lg:mb-7">
                {aboutContent.title1}
              </h2>
              <div className="text-sm text-start leading-7 text-brand-dark opacity-70 lg:text-15px lg:leading-loose">
                <p>{aboutContent.p8}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AboutUs;

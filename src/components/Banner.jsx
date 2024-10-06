import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBanner } from "../sanityclient";
const Banner = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [banner, setBanner] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const banner_info = await getBanner();
      setBanner(banner_info);
    };

    fetchData();
  }, []);

  console.log(banner);

  return (
    <div
      className="w-full bg-cover bg-center min-h-[400px] md:min-h-[460px] lg:min-h-[500px] xl:min-h-[650px] bg-no-repeat mb-5 flex items-center justify-center"
      style={{ backgroundImage: "url('banner.webp')" }}
    >
      <div className="flex items-center justify-center h-full">
        <div className="max-w-2xl text-center px-6">
          <h2 className="text-3xl font-extrabold text-teal-600 mb-3">
            {banner.title}
          </h2>
          <p className="text-base text-gray-800 mb-6">{banner.undertitle}</p>
          <div className="hidden md:block max-w-lg mx-auto">
            <div className="relative">
              <input
                id="hero-search"
                className="w-full h-14 pl-4 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal-400"
                placeholder="Что вы хотите найти..."
                aria-label="Search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Link
                to={`/search/?search=${searchQuery}`}
                title="Search"
                className="absolute right-0 top-0 flex items-center justify-center w-14 h-full text-gray-400 hover:text-gray-600"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M19.0144 17.9256L13.759 12.6703C14.777 11.4129 15.3899 9.81507 15.3899 8.07486C15.3899 4.04156 12.1081 0.759766 8.07483 0.759766C4.04152 0.759766 0.759766 4.04152 0.759766 8.07483C0.759766 12.1081 4.04156 15.3899 8.07486 15.3899C9.81507 15.3899 11.4129 14.777 12.6703 13.759L17.9256 19.0144C18.0757 19.1645 18.2728 19.24 18.47 19.24C18.6671 19.24 18.8642 19.1645 19.0144 19.0144C19.3155 18.7133 19.3155 18.2266 19.0144 17.9256ZM8.07486 13.8499C4.89009 13.8499 2.2998 11.2596 2.2998 8.07483C2.2998 4.89006 4.89009 2.29976 8.07486 2.29976C11.2596 2.29976 13.8499 4.89006 13.8499 8.07483C13.8499 11.2596 11.2596 13.8499 8.07486 13.8499Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

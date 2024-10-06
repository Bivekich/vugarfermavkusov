// import "../styles/Search.css";
import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import ProductDetail from "../components/ProductDelail"; // Assuming you have a ProductDetail component
import { getCategories, getPosts, searchPosts } from "../sanityclient";
import { Link, useSearchParams } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie

const Search = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null); // State to control selected product
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [cookieData, setCookieData] = useState(Cookies.get("cart") || ""); // State to store cookie data
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || null;
  const search = searchParams.get("search") || null;

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const categories_ = await getCategories();
      setCategories(categories_);
    };

    fetchCategories();
  }, []);

  // Fetch products based on category
  useEffect(() => {
    const fetchProducts = async () => {
      const posts = await getPosts(category);
      setProducts(posts);
    };

    fetchProducts();
  }, [category]);

  // Fetch products based on search
  useEffect(() => {
    const fetchProducts = async () => {
      if (search) {
        const posts = await searchPosts(search);
        setProducts(posts);
      }
    };

    fetchProducts();
  }, [search]);

  // Track cookie changes
  useEffect(() => {
    const handleCookieChange = () => {
      const updatedCookie = Cookies.get("cart") || "";
      setCookieData(updatedCookie); // Update state with new cookie value
    };

    // Listen for cookie changes every 2 seconds (since JS doesn't have a native cookie change listener)
    const intervalId = setInterval(() => {
      handleCookieChange();
    }, 2000);

    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, []);

  // Function to handle showing the modal
  const showModal = (id) => {
    setSelectedProductId(id);
    setIsModalOpen(true); // Open the modal
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <>
      <div className="flex pb-16 pt-7 lg:pt-7 lg:pb-20">
        {/* Sidebar */}
        <div className="sticky hidden h-full lg:pt-4 shrink-0 ltr:pr-8 rtl:pl-8 xl:ltr:pr-16 xl:rtl:pl-16 lg:block w-70 top-16">
          <div
            data-overlayscrollbars-contents=""
            data-overlayscrollbars-viewport="scrollbarHidden overflowXHidden overflowYHidden"
            tabindex="-1"
            style={{
              marginRight: "0px",
              marginBottom: "0px",
              marginLeft: "0px",
              top: "0px",
              right: "auto",
              left: "0px",
              width: "calc(100% + 0px)",
              padding: "0px",
            }}
          >
            <ul className="">
              {categories.map((categoryItem) => (
                <li
                  key={categoryItem._id}
                  className="flex justify-between items-center transition text-sm md:text-15px hover:bg-fill-base border-t border-border-base first:border-t-0 px-3.5 2xl:px-4 py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3"
                >
                  <Link
                    to={`/search/?category=${categoryItem._id}`}
                    className="flex items-center w-full ltr:text-left rtl:text-right cursor-pointer group gap-3"
                  >
                    <div className="inline-flex shrink-0 2xl:w-12 2xl:h-12 3xl:w-auto 3xl:h-auto ltr:mr-2.5 rtl:ml-2.5 md:ltr:mr-4 md:rtl:ml-4 2xl:ltr:mr-3 2xl:rtl:ml-3 3xl:ltr:mr-4 3xl:rtl:ml-4">
                      <img
                        alt={categoryItem.title}
                        loading="lazy"
                        width="40"
                        height="40"
                        decoding="async"
                        data-nimg="1"
                        src={categoryItem.imageSrc}
                        className=" rounded-full"
                        style={{ color: "transparent", width: "40px" }}
                      />
                    </div>
                    <span className="text-brand-dark capitalize py-0.5">
                      {categoryItem.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full mx-2 lg:pt-4 lg:ltr:-ml-4 lg:rtl:-mr-2 xl:ltr:-ml-8 xl:rtl:-mr-8 lg:-mt-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-3 md:gap-4 2xl:gap-5">
            {products.map((product) => (
              <Card
                key={product._id}
                title={product.title}
                price={product.price}
                image={product.mainImageSrc}
                per={product.per}
                id={product._id}
                onClick={() => showModal(product._id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100] w-full overflow-auto">
          <div className="bg-white p-5 rounded-md relative w-full max-w-[90%] md:max-w-4xl lg:max-w-[1800px] mx-auto my-10 max-h-[90%] overflow-y-auto">
            <button
              className="absolute top-2 right-2 bg-transparent border-none text-3xl cursor-pointer text-gray-800 hover:text-gray-600 transition duration-300"
              onClick={closeModal}
            >
              &times; {/* Close Button */}
            </button>
            <ProductDetail id={selectedProductId} />
          </div>
        </div>
      )}

      {/* Display Cookie Data for Testing */}
      {/* <div className="cookie-data">
        <h4>Cart Cookie Data:</h4>
        <pre>{cookieData ? cookieData : "No cart data"}</pre>
      </div> */}
    </>
  );
};

export default Search;

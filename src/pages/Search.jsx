import "../styles/Search.css";
import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import ProductDetail from "../components/ProductDelail"; // Assuming you have a ProductDetail component
import { getCategories, getPosts } from "../sanityclient";
import { Link, useSearchParams } from "react-router-dom";

const Search = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null); // State to control selected product
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || null;

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
      <div className="search-page">
        {/* Sidebar */}
        <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          <h3 className="sidebar-title">Категории</h3>
          <ul className="category-list">
            {categories.map((categoryItem) => (
              <li key={categoryItem._id} className="category-item">
                <Link
                  to={`/search/?category=${categoryItem._id}`}
                  className="category-link"
                >
                  <div className="category-icon">
                    <img
                      src={categoryItem.imageSrc}
                      alt={categoryItem.title}
                      width="60"
                    />
                  </div>
                  <span className="category-name">{categoryItem.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="product-grid-search">
          <div className="products">
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
        </main>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              &times; {/* Close Button */}
            </button>
            <ProductDetail id={selectedProductId} />
          </div>
        </div>
      )}
    </>
  );
};

export default Search;

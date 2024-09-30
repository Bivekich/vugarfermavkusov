import "../styles/ProductDetail.css";
import React, { useEffect, useState } from "react";
import { getPost } from "../sanityclient"; // Function to fetch product data
import Cookies from "js-cookie";

const ProductDetail = ({ id }) => {
  const [product, setProduct] = useState(null); // State to hold product data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error handling state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getPost(id); // Fetch product data by ID
        setProduct(productData); // Set product state
      } catch (err) {
        setError("Failed to load product data."); // Set error state
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>; // Show loading indicator
  }

  if (error) {
    return <div className="error">{error}</div>; // Show error message
  }

  if (!product) {
    return <div className="not-found">Product not found.</div>; // Handle case where product is not found
  }

  const addToCart = () => {
    const cart = Cookies.get("cart");
    const cartItems = cart ? JSON.parse(cart) : [];

    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product._id
    );

    if (existingItemIndex >= 0) {
      // Update quantity if product is already in the cart
      cartItems[existingItemIndex].quantity += 1;
    } else {
      // Add new product to cart
      cartItems.push({
        id: product._id,
        title: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    Cookies.set("cart", JSON.stringify(cartItems), { expires: 7 });
  };
  return (
    <div className="product-detail">
      <div className="image-container">
        {product.mainImageSrc && (
          <img
            className="product-image"
            src={product.mainImageSrc}
            alt={product.title}
          />
        )}
      </div>
      <div className="info-container">
        <h1 className="product-title">{product.title}</h1>
        <p className="product-description">{product.description}</p>
        <p className="product-price">
          Цена: <span>{product.price}₽</span> за <span>{product.per}</span>
        </p>
        <button className="add-to-cart" onClick={addToCart}>
          Добавить в корзину
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;

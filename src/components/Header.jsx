import "../styles/Header.css";
import { useEffect, useState } from "react";
import { getCategories } from "../sanityclient";
import { Link } from "react-router-dom";
import Cookies from "js-cookie"; // For handling cookies

const Header = () => {
  const [categories, setCategories] = useState([]); // State to hold categories
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control menu visibility
  const [isCartOpen, setIsCartOpen] = useState(false); // State to control cart visibility
  const [cartItems, setCartItems] = useState([]); // State to hold cart items

  useEffect(() => {
    const fetchCategories = async () => {
      const categories_ = await getCategories(); // Fetch categories
      setCategories(categories_); // Set categories state
    };

    fetchCategories();
    loadCart(); // Load the cart from cookies when component mounts
  }, []);

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Toggle cart visibility
  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  // Load cart data from cookies
  const loadCart = () => {
    const cart = Cookies.get("cart"); // Read the cart cookie
    if (cart) {
      setCartItems(JSON.parse(cart)); // Parse the cookie and set cart items
    }
  };

  // Clear cart cookie (for demo purposes)
  const clearCart = () => {
    Cookies.remove("cart");
    setCartItems([]); // Clear cart state
  };

  return (
    <>
      <header id="siteHeader">
        <div className="header-container">
          <div className="logo">
            <Link to="/">
              <img src="/favicon.png" alt="BoroBazar" width="30" height="30" />
            </Link>
          </div>

          <nav className={`nav-menu ${isMenuOpen ? "open" : ""}`}>
            <ul>
              <li>
                <Link to="/search">Категории</Link>
                <ul className="dropdown">
                  {categories.map((item) => (
                    <li key={item._id}>
                      <Link to={`/search/?category=${item._id}`}>
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <Link to="/aboutus">О нас</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
            </ul>
          </nav>

          <div className="buttons">
            <div className="search-container-header">
              <input
                type="text"
                placeholder="Поиск..."
                className="search-input"
                aria-label="Search"
              />
            </div>
            <div className="cart-btn">
              <button onClick={toggleCart} aria-label="Cart">
                🛒 Cart ({cartItems.length})
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Sidebar */}
      <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Корзина</h2>
          <button onClick={clearCart} className="clear-cart">
            Очистить корзину
          </button>
        </div>
        {cartItems.length > 0 ? (
          <ul className="cart-items">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <div className="cart-item-info">
                  <p>{item.title}</p>
                  <p>
                    {item.price} x {item.quantity}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-cart">Корзина пуста</p>
        )}
      </div>
      {isCartOpen && <div className="cart-backdrop" onClick={toggleCart}></div>}
    </>
  );
};

export default Header;

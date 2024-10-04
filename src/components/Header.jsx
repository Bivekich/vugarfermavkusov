import { useEffect, useState } from "react";
import { getCategories } from "../sanityclient";
import {
  getCart,
  updateItemQuantity,
  removeItemFromCart,
  clearCart,
} from "../utils/cartUtils";
import { Link, useSearchParams } from "react-router-dom";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || ""
  );
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories_ = await getCategories();
      setCategories(categories_);
    };

    fetchCategories();
    setInterval(() => {
      setCartItems(getCart());
    }, 1000);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const handleQuantityUpdate = (itemId, newQuantity) => {
    updateItemQuantity(itemId, newQuantity);
    setCartItems(getCart());
  };

  const handleRemoveFromCart = (itemId) => {
    removeItemFromCart(itemId);
    setCartItems(getCart());
  };

  const handleClearCart = () => {
    clearCart();
    setCartItems([]);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="logo">
            <Link to="/">
              <img src="/favicon.png" alt="BoroBazar" width="30" height="30" />
            </Link>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="lg:hidden">
            <button
              className="menu-btn text-gray-600 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex bg-white">
            <ul className="flex items-center px-4 space-x-6">
              <li className="relative">
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="text-gray-700 focus:outline-none bg-transparent"
                >
                  Категории
                </button>
                {isCategoriesOpen && (
                  <ul className="absolute top-full left-0 mt-2 w-48 bg-white shadow-md border rounded-md">
                    {categories.map((category) => (
                      <li key={category._id}>
                        <Link
                          to={`/search/?category=${category._id}`}
                          className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                        >
                          {category.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li>
                <Link
                  to="/aboutus"
                  className="block text-gray-700 focus:outline-none px-[1.2em] py-[0.6em] bg-transparent rounded-[8px]"
                >
                  О нас
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="block text-gray-700 focus:outline-none px-[1.2em] py-[0.6em] bg-transparent rounded-[8px]"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </nav>
          <div className="hidden lg:flex flex-row gap-5">
            {/* Search Bar */}
            <div className="hidden lg:flex items-center space-x-4 flex-grow">
              <input
                type="text"
                placeholder="Поиск..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-200"
                aria-label="Search"
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
              />
              <Link
                to={`/search/?search=${searchInput}`}
                className="bg-brand text-white px-4 py-2 rounded-md"
              >
                Найти
              </Link>
            </div>

            {/* Cart Button */}
            <div className="hidden lg:flex items-center">
              <button
                onClick={toggleCart}
                aria-label="Cart"
                className="relative"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ltr:mr-3 rtl:ml-3"
                >
                  <g clipPath="url(#clip0)">
                    <path
                      d="M19.7999 19.0172L18.5402 4.8319C18.5132 4.51697 18.2478 4.27853 17.9374 4.27853H15.3459C15.31 1.91207 13.3754 0 10.9999 0C8.62447 0 6.68991 1.91207 6.65392 4.27853H4.06251C3.74758 4.27853 3.48664 4.51697 3.45965 4.8319L2.19993 19.0172C2.19993 19.0352 2.19543 19.0532 2.19543 19.0712C2.19543 20.6863 3.6756 22 5.49768 22H16.5022C18.3243 22 19.8044 20.6863 19.8044 19.0712C19.8044 19.0532 19.8044 19.0352 19.7999 19.0172ZM10.9999 1.21472C12.705 1.21472 14.0952 2.58241 14.1312 4.27853H7.86864C7.90464 2.58241 9.29482 1.21472 10.9999 1.21472ZM16.5022 20.7853H5.49768C4.35494 20.7853 3.42815 20.0294 3.41016 19.0982L4.61588 5.49775H6.64942V7.34233C6.64942 7.67975 6.91936 7.94969 7.25678 7.94969C7.59421 7.94969 7.86415 7.67975 7.86415 7.34233V5.49775H14.1312V7.34233C14.1312 7.67975 14.4012 7.94969 14.7386 7.94969C15.076 7.94969 15.3459 7.67975 15.3459 7.34233V5.49775H17.3795L18.5897 19.0982C18.5717 20.0294 17.6404 20.7853 16.5022 20.7853Z"
                      fill="#000000"
                      stroke="#000000"
                      strokeWidth="0.1"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="22" height="22" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden bg-white shadow-md pb-4">
            <ul className="flex flex-col items-start px-4 py-3 space-y-3">
              <li>
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="block text-gray-700 focus:outline-none"
                >
                  Категории
                </button>
                {isCategoriesOpen && (
                  <ul className="pt-3 pl-4 flex flex-col gap-2">
                    {categories.map((category) => (
                      <li key={category._id}>
                        <Link
                          to={`/search/?category=${category._id}`}
                          className="block text-gray-600 px-[1.2em] py-[0.6em] bg-[#f9f9f9] rounded-[8px] w-full"
                        >
                          - {category.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li>
                <Link
                  to="/aboutus"
                  className="block text-gray-700 focus:outline-none px-[1.2em] py-[0.6em] bg-[#f9f9f9] rounded-[8px]"
                >
                  О нас
                </Link>
              </li>

              <li>
                <Link
                  to="/faq"
                  className="block text-gray-700 focus:outline-none px-[1.2em] py-[0.6em] bg-[#f9f9f9] rounded-[8px]"
                >
                  FAQ
                </Link>
              </li>
            </ul>
            <div className="flex flex-row gap-4 px-4">
              {/* Search Bar */}
              <div className="flex lg:hidden items-center space-x-4 flex-grow">
                <input
                  type="text"
                  placeholder="Поиск..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-200"
                  aria-label="Search"
                  onChange={(e) => setSearchInput(e.target.value)}
                  value={searchInput}
                />
                <Link
                  to={`/search/?search=${searchInput}`}
                  className="bg-brand text-white px-4 py-2 rounded-md"
                >
                  Найти
                </Link>
              </div>

              {/* Cart Button */}
              <div className="flex lg:hidden items-center">
                <button
                  onClick={toggleCart}
                  aria-label="Cart"
                  className="relative"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ltr:mr-3 rtl:ml-3"
                  >
                    <g clipPath="url(#clip0)">
                      <path
                        d="M19.7999 19.0172L18.5402 4.8319C18.5132 4.51697 18.2478 4.27853 17.9374 4.27853H15.3459C15.31 1.91207 13.3754 0 10.9999 0C8.62447 0 6.68991 1.91207 6.65392 4.27853H4.06251C3.74758 4.27853 3.48664 4.51697 3.45965 4.8319L2.19993 19.0172C2.19993 19.0352 2.19543 19.0532 2.19543 19.0712C2.19543 20.6863 3.6756 22 5.49768 22H16.5022C18.3243 22 19.8044 20.6863 19.8044 19.0712C19.8044 19.0532 19.8044 19.0352 19.7999 19.0172ZM10.9999 1.21472C12.705 1.21472 14.0952 2.58241 14.1312 4.27853H7.86864C7.90464 2.58241 9.29482 1.21472 10.9999 1.21472ZM16.5022 20.7853H5.49768C4.35494 20.7853 3.42815 20.0294 3.41016 19.0982L4.61588 5.49775H6.64942V7.34233C6.64942 7.67975 6.91936 7.94969 7.25678 7.94969C7.59421 7.94969 7.86415 7.67975 7.86415 7.34233V5.49775H14.1312V7.34233C14.1312 7.67975 14.4012 7.94969 14.7386 7.94969C15.076 7.94969 15.3459 7.67975 15.3459 7.34233V5.49775H17.3795L18.5897 19.0982C18.5717 20.0294 17.6404 20.7853 16.5022 20.7853Z"
                        fill="#000000"
                        stroke="#000000"
                        strokeWidth="0.1"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect width="22" height="22" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItems.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </span>
                </button>
              </div>
            </div>
          </nav>
        )}

        {/* Cart Drawer */}
        {isCartOpen && (
          <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold">Корзина</h2>
              <div class="flex items-center">
                <button
                  class="flex flex-shrink items-center text-15px transition duration-150 ease-in focus:outline-none text-brand-dark opacity-50 hover:opacity-100 ltr:-mr-1.5 rtl:-ml-1.5 gap-1"
                  aria-label="Clear All"
                  onClick={() => clearCart()}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0)">
                      <path
                        d="M14.3546 3.46335L13.207 16.5406H4.79372L3.64636 3.46335L2.1925 3.59079L3.36082 16.9052C3.42231 17.5189 3.95478 18 4.57336 18H13.4274C14.0458 18 14.5784 17.5191 14.6409 16.8964L15.8085 3.59079L14.3546 3.46335Z"
                        fill="black"
                      ></path>
                      <path
                        d="M11.6758 0H6.32445C5.65381 0 5.10822 0.54559 5.10822 1.21623V3.52705H6.56766V1.45944H11.4325V3.52702H12.8919V1.2162C12.892 0.54559 12.3464 0 11.6758 0Z"
                        fill="black"
                      ></path>
                      <path
                        d="M16.7838 2.79724H1.21625C0.813183 2.79724 0.486511 3.12391 0.486511 3.52698C0.486511 3.93005 0.813183 4.25672 1.21625 4.25672H16.7838C17.1869 4.25672 17.5136 3.93005 17.5136 3.52698C17.5136 3.12391 17.1869 2.79724 16.7838 2.79724Z"
                        fill="black"
                      ></path>
                    </g>
                  </svg>
                  <span class="ltr:pl-1 lg:rtl:pr-1">Очистить</span>
                </button>
                <button
                  class="flex items-center justify-center px-4 py-6 text-2xl transition-opacity md:px-6 lg:py-7 focus:outline-none text-brand-dark hover:opacity-60"
                  aria-label="close"
                  onClick={toggleCart}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="w-full px-5 md:px-7 h-[calc(100vh_-_300px)]">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="group w-full h-auto flex justify-start items-center text-brand-light py-4 md:py-7 border-b border-border-one border-opacity-70 relative last:border-b-0"
                  >
                    <div className="relative flex rounded overflow-hidden shrink-0 cursor-pointer w-[90px] md:w-[100px] h-[90px] md:h-[100px]">
                      <img
                        alt="Organic Girl Lettuce"
                        loading="eager"
                        width="100"
                        height="100"
                        decoding="async"
                        data-nimg="1"
                        src={item.image}
                        class="object-cover bg-fill-thumbnail"
                        style={{ color: "transparent", width: "auto" }}
                      />
                      <div
                        class="absolute top-0 flex items-center justify-center w-full h-full transition duration-200 ease-in-out bg-black ltr:left-0 rtl:right-0 bg-opacity-30 md:bg-opacity-0 md:group-hover:bg-opacity-30"
                        role="button"
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 512 512"
                          class="relative text-2xl text-white transition duration-300 ease-in-out transform md:scale-0 md:opacity-0 md:group-hover:scale-100 md:group-hover:opacity-100"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm52.7 283.3L256 278.6l-52.7 52.7c-6.2 6.2-16.4 6.2-22.6 0-3.1-3.1-4.7-7.2-4.7-11.3 0-4.1 1.6-8.2 4.7-11.3l52.7-52.7-52.7-52.7c-3.1-3.1-4.7-7.2-4.7-11.3 0-4.1 1.6-8.2 4.7-11.3 6.2-6.2 16.4-6.2 22.6 0l52.7 52.7 52.7-52.7c6.2-6.2 16.4-6.2 22.6 0 6.2 6.2 6.2 16.4 0 22.6L278.6 256l52.7 52.7c6.2 6.2 6.2 16.4 0 22.6-6.2 6.3-16.4 6.3-22.6 0z"></path>
                        </svg>
                      </div>
                    </div>
                    <div class="flex items-start justify-between w-full overflow-hidden">
                      <div class="ltr:pl-3 rtl:pr-3 md:ltr:pl-4 md:rtl:pr-4">
                        <a
                          class="block leading-5 transition-all text-brand-dark text-13px sm:text-sm lg:text-15px hover:text-brand"
                          href="/en/products/gourmet-garden-lightly-dried-cilantro"
                        >
                          {item.title}
                        </a>
                        <div class="text-13px sm:text-sm text-brand-muted mt-1.5 block mb-2">
                          {item.price}₽ X {item.quantity}
                        </div>
                        <div class="flex items-center justify-between rounded overflow-hidden shrink-0 p-1 inline-flex">
                          <button
                            class="flex items-center p-0 justify-center shrink-0 h-full transition-all ease-in-out duration-300 focus:outline-none focus-visible:outline-none !w-6 !h-6 pr-0 border border-border-three hover:bg-brand text-brand-muted hover:border-brand rounded-full hover:text-brand-light"
                            type="button"
                            onClick={(e) =>
                              handleQuantityUpdate(item.id, item.quantity - 1)
                            }
                          >
                            <span class="font-2xl text-black">-</span>
                          </button>
                          <span class="font-semibold text-brand-dark flex items-center justify-center h-full transition-colors duration-250 ease-in-out cursor-default shrink-0 text-15px w-9">
                            {item.quantity}
                          </span>
                          <button
                            class="group flex items-center p-0 justify-center h-full shrink-0 transition-all ease-in-out duration-300 focus:outline-none focus-visible:outline-none pr-2 !w-6 !h-6 border text-brand-muted border-border-three hover:bg-brand hover:border-brand rounded-full hover:text-brand-light !pr-0"
                            type="button"
                            onClick={(e) =>
                              handleQuantityUpdate(item.id, item.quantity + 1)
                            }
                          >
                            <span class="font-2xl text-black">+</span>
                          </button>
                        </div>
                      </div>
                      <div class="flex font-semibold text-sm md:text-base text-brand-dark leading-5 shrink-0 justify-end font-4xl">
                        {item.price}₽
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">Ваша корзина пуста</p>
              )}
            </div>
            <div className="p-4 border-t">
              {cartItems.length > 0 && (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-md font-semibold">Итого:</h4>
                    <p className="text-lg font-bold">
                      {cartItems
                        .reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                      ₽
                    </p>
                  </div>
                  <Link
                    to="/order"
                    className="block w-full bg-brand text-white py-2 rounded-md hover:bg-brand"
                  >
                    Оформить заказ
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;

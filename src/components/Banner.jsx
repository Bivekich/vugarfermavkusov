import "../styles/Banner.css";
const Banner = () => {
  return (
    <>
      <div className="hero-banner">
        <div className="hero-content">
          <h2 className="hero-title">
            Полезные овощи, который вы заслуживаете есть свежими
          </h2>
          <p className="hero-description">
            Мы поставляем и продаем самую лучшую говядину, баранину и свинину,
            полученную с величайшей заботой от фермера.
          </p>
          <div className="search-container">
            <form className="search-form" role="search" novalidate>
              <label for="hero-search" className="search-label">
                <input
                  id="hero-search"
                  className="search-input"
                  placeholder="Что вы хотите найти..."
                  aria-label="Search"
                  autocomplete="off"
                  type="text"
                />
              </label>
              <button type="submit" title="Search" className="search-button">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="search-icon"
                >
                  <path
                    d="M19.0144 17.9256L13.759 12.6703C14.777 11.4129 15.3899 9.81507 15.3899 8.07486C15.3899 4.04156 12.1081 0.759766 8.07483 0.759766C4.04152 0.759766 0.759766 4.04152 0.759766 8.07483C0.759766 12.1081 4.04156 15.3899 8.07486 15.3899C9.81507 15.3899 11.4129 14.777 12.6703 13.759L17.9256 19.0144C18.0757 19.1645 18.2728 19.24 18.47 19.24C18.6671 19.24 18.8642 19.1645 19.0144 19.0144C19.3155 18.7133 19.3155 18.2266 19.0144 17.9256ZM8.07486 13.8499C4.89009 13.8499 2.2998 11.2596 2.2998 8.07483C2.2998 4.89006 4.89009 2.29976 8.07486 2.29976C11.2596 2.29976 13.8499 4.89006 13.8499 8.07483C13.8499 11.2596 11.2596 13.8499 8.07486 13.8499Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Banner;

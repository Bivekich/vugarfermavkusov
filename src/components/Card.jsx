import "../styles/Card.css";
import { Link } from "react-router-dom";

const Card = ({ id, title, price, image, per, onClick }) => {
  return (
    <article className="product-card" title={title}>
      <div className="product-image-wrapper">
        <div className="product-image-container">
          <img
            alt={title}
            className="product-image"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={image}
          />
        </div>
        <div className="product-action">
          <div className="action-button-container">
            <button
              onClick={onClick}
              className="action-button"
              aria-label={`View details of ${title}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width="17"
                height="17"
                opacity="1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="product-info">
        <div className="product-price">
          <span className="price">{price}₽</span>
        </div>
        <h2 className="product-title">{title}</h2>
        <div className="product-unit">Цена за {per}</div>
      </div>
    </article>
  );
};

export default Card;

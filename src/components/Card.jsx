import "../styles/Card.css";

const Card = ({ title, price, image }) => {
  return (
    <>
      <article class="product-card" title="Fresh Organic Broccoli">
        <div class="product-image-wrapper">
          <div class="product-image-container">
            <img
              alt="Fresh Organic Broccoli"
              class="product-image"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={image}
            />
          </div>
          <div class="product-action">
            <div class="action-button-container">
              <button class="action-button" aria-label="Count Button">
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="product-info">
          <div class="product-price">
            <span class="price">{price}₽</span>
          </div>
          <h2 class="product-title">{title}</h2>
          {/* <div class="product-unit">1 each</div> */}
        </div>
      </article>
    </>
  );
};

export default Card;

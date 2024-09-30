import { Link } from "react-router-dom";
import "../styles/CatCard.css";

const CatCard = ({ title, image, to }) => {
  return (
    <>
      <Link class="category-card" to={to}>
        <div class="image-container">
          <div class="image-wrapper scale-down">
            <img
              alt={title}
              loading="lazy"
              width="178"
              height="178"
              class="category-image"
              src={image}
            />
          </div>
          <div class="image-wrapper scale-up">
            <img
              alt={title}
              loading="lazy"
              width="178"
              height="178"
              class="category-image"
              src={image}
            />
          </div>
        </div>
        <h3 class="category-title">{title}</h3>
      </Link>
    </>
  );
};
export default CatCard;

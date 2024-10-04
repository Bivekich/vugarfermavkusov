import { Link } from "react-router-dom";

const Card = ({ id, title, price, image, per, onClick }) => {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg cursor-pointer transition-all duration-300 shadow-lg max-w-[200px] lg:w-[200px] bg-white">
      <div className="relative flex-shrink-0">
        <div className="w-full h-[200px] transition-transform duration-200 relative">
          <img
            alt={title}
            className="object-cover w-full h-full absolute top-0 left-0"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={image}
          />
        </div>

        <div className="absolute bottom-0 right-0 p-2 z-2">
          <div className="flex justify-center items-center">
            <button
              onClick={onClick}
              className="flex justify-center items-center w-10 aspect-square bg-brand rounded-full text-white p-0"
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

      <div className="flex flex-col p-4 bg-white">
        <div className="mb-2">
          <span className="font-bold text-lg text-gray-800">{price}₽</span>
        </div>

        <h2 className="text-gray-800 text-base mb-2">{title}</h2>

        <div className="text-gray-600 text-sm">Цена за {per}</div>
      </div>
    </article>
  );
};

export default Card;

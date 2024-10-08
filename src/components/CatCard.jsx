import { Link } from "react-router-dom";

const CatCard = ({ title, image, to }) => {
  return (
    <>
      <Link
        className="group block text-center shrink-0 2xl:px-3.5 mb-12 w-fit"
        to={to} // Можно заменить на переменную или пропс
      >
        <div className="flex max-w-[178px] max-h-[178px] mb-3.5 xl:mb-4 mx-auto rounded-full overflow-hidden bg-[aliceblue]">
          <div className="flex shrink-0 transition-all duration-700 w-full h-full transform scale-50 group-hover:scale-100 -translate-x-full group-hover:translate-x-0">
            <img
              alt={title} // Используем title из первого блока
              loading="lazy"
              width="178"
              height="178"
              decoding="async"
              data-nimg="1"
              className="object-cover rounded-full aspect-square"
              src={image} // Используем image из первого блока
            />
          </div>
          <div className="flex shrink-0 transition-all duration-700 w-full h-full transform scale-100 group-hover:scale-50 -translate-x-full group-hover:translate-x-0">
            <img
              alt={title} // Используем title из первого блока
              loading="lazy"
              width="178"
              height="178"
              decoding="async"
              data-nimg="1"
              className="object-cover rounded-full aspect-square"
              src={image} // Используем image из первого блока
            />
          </div>
        </div>
        <h3 className="text-sm capitalize truncate text-brand-dark sm:text-15px lg:text-base">
          {title} {/* Используем title из первого блока */}
        </h3>
      </Link>
    </>
  );
};

export default CatCard;

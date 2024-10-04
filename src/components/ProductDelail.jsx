import React, { useEffect, useState } from "react";
import { getPost, getPosts } from "../sanityclient";
import {
  addItemToCart,
  updateItemQuantity,
  getCart,
  removeItemFromCart,
} from "../utils/cartUtils";
import Slideshow from "./Slider";
import Card from "./Card";

const ProductDetail = ({ id }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const [samePosts, setSamePosts] = useState([]);
  const [currentId, setCurrentId] = useState(id); // Используем это для управления загрузкой продукта

  // Проверка, находится ли продукт в корзине
  useEffect(() => {
    const cartItems = getCart();
    const existingCartItem = cartItems.find((item) => item.id === currentId);
    if (existingCartItem) {
      setQuantity(existingCartItem.quantity);
      setIsInCart(true);
    } else {
      setQuantity(1); // Сбрасываем количество при смене товара
      setIsInCart(false); // Сбрасываем состояние корзины
    }
  }, [currentId]);

  // Загружаем данные продукта по id
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true); // Устанавливаем загрузку
      try {
        const productData = await getPost(currentId); // Загружаем продукт по текущему id
        setProduct(productData);

        const samePostsData = await getPosts(
          productData.categories[0]._id,
          currentId
        );
        setSamePosts(samePostsData);
      } catch (err) {
        setError("Не удалось загрузить данные о продукте.");
      } finally {
        setLoading(false); // Отключаем загрузку
      }
    };

    fetchProduct();
  }, [currentId]);

  if (loading) {
    return <div className="text-center text-lg text-gray-500">Загрузка...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  if (!product) {
    return (
      <div className="text-center text-lg text-gray-500">
        Продукт не найден.
      </div>
    );
  }

  const handleAddToCart = () => {
    addItemToCart(
      {
        id: product._id,
        image: product.mainImageSrc[0],
        title: product.title,
        price: product.price,
        per: product.per,
      },
      quantity
    );
    setIsInCart(true);
  };

  const handleRemoveFromCart = () => {
    removeItemFromCart(product._id);
    setIsInCart(false);
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    if (isInCart) {
      updateItemQuantity(product._id, newQuantity);
    }
  };

  const handleCardClick = (newId) => {
    setCurrentId(newId); // Обновляем id при клике на карточку
    window.scrollTo(0, 0); // Скроллим страницу вверх
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-100 rounded-lg shadow-md my-10">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <Slideshow slideImages={product.mainImageSrc} />
        </div>
        <div className="w-full md:w-1/2 flex flex-col">
          <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-xl text-brand my-2">
            Цена: <span>{product.price}₽</span> за <span>{product.per}</span>
          </p>
          <div className="flex flex-col gap-4 my-4">
            <div className="flex items-center gap-4 bg-gray-200 p-3 rounded justify-center">
              <button
                className="p-2 bg-gray-300 rounded"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 12H6"
                  />
                </svg>
              </button>
              <span className="text-lg font-bold">{quantity}</span>
              <button
                className="p-2 bg-gray-300 rounded"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              </button>
            </div>

            {isInCart ? (
              <button
                className="bg-red-600 text-white py-2 rounded hover:bg-red-700 transition duration-200"
                onClick={handleRemoveFromCart}
              >
                Удалить из корзины
              </button>
            ) : (
              <button
                className="bg-brand text-white py-2 rounded hover:bg-green-600 transition duration-200"
                onClick={handleAddToCart}
              >
                Добавить в корзину
              </button>
            )}
          </div>

          <h3 className="text-xl font-semibold mt-4">Описание продукта</h3>
          <p className="text-gray-600 mt-2">{product.description}</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold">Похожие товары</h3>
        <div className="flex flex-row flex-wrap gap-3">
          {samePosts.map((similarProduct) => (
            <Card
              key={similarProduct._id}
              title={similarProduct.title}
              price={similarProduct.price}
              image={similarProduct.mainImageSrc}
              per={similarProduct.per}
              id={similarProduct._id}
              onClick={() => handleCardClick(similarProduct._id)} // Передаем новый id
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

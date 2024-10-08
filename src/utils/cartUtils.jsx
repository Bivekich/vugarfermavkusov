// cartUtils.js

// Получение корзины из localStorage
export const getCart = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

// Сохранение корзины в localStorage
export const saveCart = (cartItems) => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
};

// Добавление товара в корзину
export const addItemToCart = (product, quantity = 1) => {
  const cartItems = getCart();
  const existingItemIndex = cartItems.findIndex(
    (item) => item.id === product.id
  );

  if (existingItemIndex >= 0) {
    // Если товар уже есть в корзине, обновляем его количество
    cartItems[existingItemIndex].quantity += quantity;
  } else {
    // Если товара нет в корзине, добавляем его
    cartItems.push({
      id: product.id,
      image: product.image,
      title: product.title,
      price: product.price,
      per: product.per,
      quantity,
    });
  }

  saveCart(cartItems);
};

// Обновление количества товара в корзине
export const updateItemQuantity = (id, newQuantity) => {
  const cartItems = getCart();
  const itemIndex = cartItems.findIndex((item) => item.id === id);

  if (itemIndex >= 0) {
    if (newQuantity > 0) {
      // Обновляем количество товара
      cartItems[itemIndex].quantity = newQuantity;
    } else {
      // Удаляем товар, если количество меньше или равно 0
      cartItems.splice(itemIndex, 1);
    }
  }

  saveCart(cartItems);
};

// Удаление товара из корзины
export const removeItemFromCart = (id) => {
  const cartItems = getCart();
  const updatedCartItems = cartItems.filter((item) => item.id !== id);
  saveCart(updatedCartItems);
};

// Получение конкретного товара из корзины
export const getCartItem = (id) => {
  const cartItems = getCart();
  return cartItems.find((item) => item.id === id) || null;
};

// Очистка всей корзины
export const clearCart = () => {
  saveCart([]);
};

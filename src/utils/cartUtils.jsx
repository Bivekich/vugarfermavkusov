// cartUtils.js
import Cookies from "js-cookie";

export const getCart = () => {
  const cart = Cookies.get("cart");
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cartItems) => {
  Cookies.set("cart", JSON.stringify(cartItems), { expires: 7 });
};

export const addItemToCart = (product, quantity = 1) => {
  const cartItems = getCart();
  const existingItemIndex = cartItems.findIndex(
    (item) => item.id === product.id
  );

  if (existingItemIndex >= 0) {
    cartItems[existingItemIndex].quantity += quantity;
  } else {
    cartItems.push({
      id: product.id,
      image: product.image,
      title: product.title,
      price: product.price,
      quantity,
    });
  }

  saveCart(cartItems);
};

export const updateItemQuantity = (id, newQuantity) => {
  const cartItems = getCart();
  const itemIndex = cartItems.findIndex((item) => item.id === id);

  if (itemIndex >= 0) {
    if (newQuantity > 0) {
      cartItems[itemIndex].quantity = newQuantity;
    } else {
      cartItems.splice(itemIndex, 1); // Remove item if quantity is 0 or less
    }
  }

  saveCart(cartItems);
};

export const removeItemFromCart = (id) => {
  const cartItems = getCart();
  const updatedCartItems = cartItems.filter((item) => item.id !== id);
  saveCart(updatedCartItems);
};
export const getCartItem = (id) => {
  const cartItems = getCart();
  return cartItems.find((item) => item.id === id) || null;
};

export const clearCart = () => {
  saveCart([]);
};

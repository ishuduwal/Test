import React from 'react';
import { AddToCart } from '../function/Cart'; // Adjust the import path as needed

export const Cart = () => {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleRemoveItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.location.reload();
  };

  const handleProceed = async () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!userInfo || !userInfo.email || !userInfo.username) {
      alert('User not logged in. Please log in to proceed.');
      return;
    }

    const itemsWithProductId = cartItems.map(item => ({
      productId: item._id, // Assuming item._id is the productId
      quantity: item.quantity,
      title: item.title,
      description: item.description,
      price: item.price,
      image: item.image
    }));

    const cartData = {
      email: userInfo.email,
      username: userInfo.username,
      items: itemsWithProductId
    };

    try {
      await AddToCart(cartData);
      localStorage.removeItem('cart');
      window.location.reload();
      alert('Cart successfully added to the database!');
    } catch (error) {
      console.error('Error adding cart to the database:', error);
      alert('Failed to add cart to the database.');
    }
  };


  return (
    <div className='cart'>
      <div>
        <p>Shopping Cart</p>
        {cartItems.map((item, index) => (
          <div key={item._id}>
            <div>
              <img src={item.image} alt={item.title} />
            </div>
            <div className='cart-info'>
              <p className='info-title'>{item.title}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
            <div className='remove-button'>
              <button onClick={() => handleRemoveItem(index)}>Remove</button>
            </div>
          </div>
        ))}
        <div className='bottom-cart'>
          <p>Total Price: Rs.{totalPrice}</p>
          <button onClick={handleProceed}>Proceed</button>
        </div>
      </div>
    </div>
  );
};

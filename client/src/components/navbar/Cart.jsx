import React from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as api from '../api/Payment';

export const Cart = () => {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0) * 100; // Convert to cents

  const handleRemoveItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.location.reload();
  };

  const handleProceed = async () => {
    if (!userInfo || !userInfo.email || !userInfo.username) {
      alert('User not logged in. Please log in to proceed.');
      return;
    }

    const itemsWithProductId = cartItems.map(item => ({
      productId: item._id,
      quantity: item.quantity,
      title: item.title,
      description: item.description,
      price: item.price,
      image: item.image,
    }));

    const cartData = {
      email: userInfo.email,
      username: userInfo.username,
      items: itemsWithProductId,
    };

    try {

      await api.AddPayment(cartData);

      const response = await axios.post('http://localhost:5000/payment/verify', {
        email: userInfo.email,
        items: itemsWithProductId,
      });

      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error during payment:', error);
      alert('Failed to proceed with the payment.');
    }
  };

  const generatePDFBill = () => {
    const input = document.getElementById('bill');
    const removeButtons = document.querySelectorAll('.remove-button');
    const proceedButton = document.querySelector('.proceed-button');

    // Hide remove buttons and proceed button before capturing the bill
    removeButtons.forEach(button => {
      button.style.display = 'none';
    });
    proceedButton.style.display = 'none';

    html2canvas(input)
      .then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save('bill.pdf');
        alert('Bill generated!');
      })
      .catch(error => {
        console.error('Error generating PDF:', error);
      })
      .finally(() => {
        // Restore buttons after capturing the bill
        removeButtons.forEach(button => {
          button.style.display = 'block';
        });
        proceedButton.style.display = 'block';
        setTimeout(() => {
          window.location.reload();
        }, 500);
      });
  };

  return (
    <div className='cart'>
      <div id='bill'>
        <h3>Shopping Cart</h3>
        <p className='user-information'>User: {userInfo.username}</p>
        <p className='user-information'>Email: {userInfo.email}</p>
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
          <p>Total Price: Rs.{totalPrice / 100}</p>
          <button className='proceed-button' onClick={handleProceed}>Proceed</button>
        </div>
      </div>
    </div>
  );
};

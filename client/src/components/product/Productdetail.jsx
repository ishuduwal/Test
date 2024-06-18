import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Product.scss';
import { GetProduct } from '../function/Product';

export const Productdetail = () => {
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const productsData = await GetProduct();
        const product = productsData.find(p => p._id === productId);
        setProductDetail(product);
      } catch (error) {
        console.error('Failed to fetch product details:', error);
      }
    };
    fetchProductDetail();
  }, [productId]);

  const handleQuantityChange = (change) => {
    setQuantity(prevQuantity => Math.max(prevQuantity + change, 1));
  };

  const handleAddToCart = () => {
    const cartItem = { ...productDetail, quantity };
    const existingCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    localStorage.setItem('cart', JSON.stringify([...existingCartItems, cartItem]));
  };

  if (!productDetail) {
    return <div>Loading...</div>;
  }
  const imagePath = `/${productDetail.image}`;
  console.log('Image Path:', imagePath);

  return (
    <div className='product-detail'>
      <div className='left-container'>
        <img src={imagePath} alt={productDetail.title} />
      </div>
      <div className='right-container'>
        <p className='product-title'>{productDetail.title}</p>
        <p className='product-description'>{productDetail.description}</p>
        <p className='product-price'>{productDetail.price}</p>
        <div className='quantity-cart'>
          <div className='quantity'>
            <button onClick={() => handleQuantityChange(-1)}>-</button>
            <p>{quantity}</p>
            <button onClick={() => handleQuantityChange(1)}>+</button>
          </div>
          <div className='btn-add-to-cart'>
            <button onClick={handleAddToCart}>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

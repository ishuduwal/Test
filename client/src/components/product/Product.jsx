import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Product.scss';
import { GetProduct } from '../function/Product';

export const Product = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await GetProduct();
        setProducts(res);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };
  return (
    <div className='product'>
      {products.map((product) => {
        const imagePath = `/${product.image}`;
        console.log('Image Path:', imagePath);

        return (
          <div key={product._id} className='product-item' onClick={() => handleProductClick(product._id)}>
            <div>
              <img src={imagePath} />
              <p>{product.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

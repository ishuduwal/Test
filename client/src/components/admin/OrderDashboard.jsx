import React, { useState, useEffect } from 'react';
import { GetAllCart } from '../function/Cart'; // Adjust the import path as needed

export const OrderDashboard = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const cartsData = await GetAllCart();
        setCarts(cartsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching carts:', error);
        setLoading(false);
      }
    };

    fetchCarts();
  }, []);

  return (
    <>
      <div className='dashboard-table'>
        <h2>Orders Dashboard</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>S.N</th>
                <th>Username</th>
                <th>Email</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {carts.map((cart, index) => (
                <tr key={cart._id}>
                  <td>{index + 1}</td>
                  <td>{cart.username}</td>
                  <td>{cart.email}</td>
                  <td>
                    {cart.items.map((item) => (
                      <p key={item.productId}>
                        {item.title} - Quantity: {item.quantity} - Price:{item.price}
                      </p>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

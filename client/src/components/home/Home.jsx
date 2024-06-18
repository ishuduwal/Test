import React, { useState, useEffect } from 'react';
import './Home.scss';
import img1 from '../../assets/images/items/one.png';
import img2 from '../../assets/images/items/two.png';
import img3 from '../../assets/images/items/three.png';
import img4 from '../../assets/images/items/four.png';
import img5 from '../../assets/images/items/five.png';

export const Home = () => {
  const images = [img1, img2, img3, img4, img5];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className='home'>
        <div className='watch-container'>
          <p>Royals Bakery, <br></br> every bite is a delight!</p>
          <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} />
        </div>
      </div>
    </>
  );
};

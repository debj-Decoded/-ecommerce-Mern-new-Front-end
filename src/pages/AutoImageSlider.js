import React, { useEffect, useState } from 'react';
import './AutoImageSlider.css'; // Import the CSS file

const images = [
require('../img/Gemini_Generated_Image_7kfnl37kfnl37kfn.png'),
require('../img/Sales.png'),
require('../img/img2.png'),
require('../img/img3.png'),
require('../img/img1.png'),

require('../img/Gemini_Generated_Image_7kfnl37kfnl37kfn.png'),
require('../img/Gemini_Generated_Image_7kfnl37kfnl37kfn.png'),


//   'https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp',

//   'https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp',

//   'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
];

const AutoImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-container"z>
      <div
        className="slider-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Slide ${index}`} className="slide-image" />
        ))}
      </div>
    </div>
  );
};

export default AutoImageSlider;
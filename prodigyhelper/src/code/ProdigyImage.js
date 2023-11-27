import React, { useState, useEffect, useRef } from 'react';
import randomColor from 'randomcolor';
import './css/Test.css';
import Icons from './Icons';
import image from './images/sample.jpeg';

const ProdigyImage = () => {
  const [categories] = useState(['COMPANY', 'LOCATION']);
  const [selectedCategory, setSelectedCategory] = useState('COMPANY');
  const [categoryColors, setCategoryColors] = useState({});
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };


  useEffect(() => {
    const colors = {};
    categories.forEach((category) => {
      colors[category] = randomColor({
        luminosity: 'light',
      });
    });
    setCategoryColors(colors);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const img = new Image();
    img.src = image;
    img.onload = () => {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, []);

  return (
    <div className='content'>
      <div className='testContent'>
        <div className='categoryContent'>
          {categories.map((category) => (
            <span key={category}>
              <input
                type='button'
                name='category'
                value={category}
                className='categoryButton'
                defaultChecked={selectedCategory === category}
                onClick={() => handleCategoryChange(category)}
                style={{
                  backgroundColor: selectedCategory === category ? '#fff' : 'transparent',
                  color: selectedCategory === category ? '#077ea4' : '#fff',
                  border: selectedCategory === category ? '1px solid #583FC' : '1px solid #fff',
                }}
              />
            </span>
          ))}
        </div>
        <div className='testImageContent'>
          <canvas ref={canvasRef} width={300} height={300} onMouseDown={() => {

          }} onMouseUp={() => {

          }} />
        </div>
      </div>
      {/* <Icons callHandleSubmit={handleSubmit} /> */}
    </div>
  );
};

export default ProdigyImage;
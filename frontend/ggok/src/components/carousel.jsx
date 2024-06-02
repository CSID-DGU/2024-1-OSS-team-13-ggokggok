import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CarouselContainer = styled.div`
  width: auto;
  height: 20px; 
  margin: 0 auto;
  overflow: hidden;
  position: relative;
`;

const CarouselInner = styled.div`
  display: flex;
  flex-direction: column;
  transition: transform 0.5s ease-in-out;
  transform: ${({ translateY }) => `translateY(-${translateY}%)`};
`;

const CarouselItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  font-size: 20px;
  font-family: 'Arial, sans-serif';
  padding: 0;
  height: 20px; 
  white-space: nowrap;
`;

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <CarouselContainer>
      <CarouselInner translateY={currentIndex * 30}>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            {item}
          </CarouselItem>
        ))}
      </CarouselInner>
    </CarouselContainer>
  );
};

export default Carousel;

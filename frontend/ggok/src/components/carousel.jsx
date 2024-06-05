import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { it } from 'date-fns/locale';

const Container = styled.div`
  width: 200px;
  display: flex;
  justify-content: flex-end;
  margin-left: 60px;
`;

const CarouselContainer = styled.div`
  width: 150px;
  height: 40px; 
  overflow: hidden;
  margin-left: auto;
`;

const CarouselInner = styled.div`
  display: flex;
  flex-direction: column;
  transition: transform 0.5s ease-in-out;
  transform: ${({ translateY }) => `translateY(-${translateY}px)`}; 
`;

const CarouselItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
 /* font-size: ${({ fontSize }) => fontSize}px;*/
  height: 40px; 
  white-space: nowrap;
  overflow: hidden; 
`;

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  useEffect(() => {
    console.log(items);
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [items]);

  const handleText = (text) => {
    if (text.length > 10) {
      return text.substring(0, 10) + '...'; 
    }
    return text;
  };


  return (
    <Container>
      <CarouselContainer>
        <CarouselInner translateY={ currentIndex * 45}> 
          {items.length > 0 ?
            items.map((item, index) => (
              <Link to={`/total-info/${item.address}`} key={index}>
                <CarouselItem fontSize={item.name.length > 5 ? 8 : 10}>
                  {handleText(`${index + 1}. ${item.name}`)}
                </CarouselItem>
              </Link>
            ))
            :
            <></>
          }
        </CarouselInner>
      </CarouselContainer>
    </Container>
  );
};

export default Carousel;

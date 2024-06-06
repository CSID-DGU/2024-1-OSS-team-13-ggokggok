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
  height: 20px; /* CarouselItem의 높이와 일치시킴 */
  overflow: hidden;
  margin-left: auto;
`;

const CarouselInner = styled.div`
  display: flex;
  flex-direction: column;
  transition: transform 0.5s ease-in-out;
  transform: ${({ translateY }) => `translateY(-${translateY}px)`}; /* translateY 값을 px 단위로 변경 */
`;

const CarouselItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  font-size: ${({ fontSize }) => fontSize}px;
  padding: 10x;
  height: 20px; /* CarouselContainer의 높이와 일치시킴 */
  white-space: nowrap;
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
    if (text.length > 5) {
      return text.substring(0, 5) + '...'; // 글자 수가 5글자를 넘으면 앞에서부터 5글자만 보여주고 나머지는 "..."으로 대체합니다.
    }
    return text;
  };


  return (
    <Container>
      <CarouselContainer>
        <CarouselInner translateY={currentIndex * 30}> {/* translateY 값을 px 단위로 변경 */}
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

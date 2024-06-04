import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
  width: 200px;
  display: flex;
  justify-content: flex-end;
  margin-left: 60px;
`;

const CarouselContainer = styled.div`
  width: 150px;
  height: 30px; /* CarouselItem의 높이와 일치시킴 */
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
  font-size: 20px;
  padding: 10px;
  height: 20px; /* CarouselContainer의 높이와 일치시킴 */
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

  const [getData, setGetData] = useState([]);

  const region1 = sessionStorage.getItem('user')?.region1;
  const region2 = sessionStorage.getItem('user')?.region2;

  async function fetchData() {
    try {
      const response = await axios.get(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/place/word/`);
      setGetData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => { fetchData(); }, []);

  return (
    <Container>
      <CarouselContainer>
        <CarouselInner translateY={currentIndex * 30}> {/* translateY 값을 px 단위로 변경 */}
          {items.length > 0 ?
            items.map((item, index) => (
              <Link to={`/total-info/${item.address}`} key={index}>
                <CarouselItem>
                  {`${index + 1}. ${item}`}
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

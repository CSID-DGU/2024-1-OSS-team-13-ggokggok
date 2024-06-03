import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
    console.log(currentIndex);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);


  const [getData, setGetData] = useState([]);


    const region1 = sessionStorage.getItem('user').region1;
    const region2 = sessionStorage.getItem('user').region2;

    async function fetchData() {
        try {
          const response = await axios.get(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/place/?address=${region1}`);
          setGetData(response.data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {fetchData();}, []);


  return (
    <CarouselContainer>
      <CarouselInner translateY={currentIndex * 30}>
        {items.map((item, index) => (
          <Link to = {`/total-info/${item.address}`}>
          <CarouselItem key={index}>
            {`${index+1}. ${item}`}
          </CarouselItem>
          </Link>
        ))}
      </CarouselInner>
    </CarouselContainer>
  );
};

export default Carousel;

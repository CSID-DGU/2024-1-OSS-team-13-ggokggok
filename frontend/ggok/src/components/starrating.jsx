// StarRating.js
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;  
  p {
    padding: 3px 0 0 10px;
    font-size: 20px;
  }
`;


const StarRating = ({ totalStars, selectedStars, onStarClick }) => {



  return (
    <Container>
       <div>
      {[...Array(totalStars)].map((_, index) => (
        <Star
          key={index}
          selected={selectedStars > index}
          onClick={() => onStarClick(index + 1)}
        />
      ))}
     
    </div>
    <p>{selectedStars} / {totalStars}</p>

    </Container>
   
  );
};

const Star = ({ selected = false, onClick = () => {} }) => (
  <span
    style={{ cursor: 'pointer', color: selected ? 'orange' : 'gray' , fontSize: '30px'}}
    onClick={onClick}
  >
    ★
  </span>
);

export default StarRating;

// StarRating.js
import React from 'react';

const StarRating = ({ totalStars, selectedStars, onStarClick }) => {
  return (
    <div>
      {[...Array(totalStars)].map((_, index) => (
        <Star
          key={index}
          selected={selectedStars > index}
          onClick={() => onStarClick(index + 1)}
        />
      ))}
      <p>{selectedStars} / {totalStars}</p>
    </div>
  );
};

const Star = ({ selected = false, onClick = () => {} }) => (
  <span
    style={{ cursor: 'pointer', color: selected ? 'orange' : 'gray' }}
    onClick={onClick}
  >
    ★
  </span>
);

export default StarRating;

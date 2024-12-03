import React from 'react';

const starStyle = {
  fontSize: '1.5rem',
  color: '#FFD700', 
};

const emptyStarStyle = {
  fontSize: '1.5rem',
  color: '#D3D3D3', 
};

const StarRating = ({ rating }) => {
  const totalStars = 5;

  const filledStars = Math.floor(rating); 
  const halfStar = rating % 1 !== 0; 

  return (
    <div>
      {[...Array(totalStars)].map((_, index) => {
        if (index < filledStars) {
          return (
            <span key={index} style={starStyle}>
              ★
            </span>
          );
        }
        if (index === filledStars && halfStar) {
          return (
            <span key={index} style={starStyle}>
              ☆
            </span>
          );
        }
        return (
          <span key={index} style={emptyStarStyle}>
            ☆
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
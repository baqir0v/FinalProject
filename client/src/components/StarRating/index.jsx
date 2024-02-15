import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating, color = '#ffd700', onRatingChange }) => {
    const maxStars = 5;
    const starElements = [];

    const handleRatingClick = (clickedRating) => {
        if (onRatingChange) {
            onRatingChange(clickedRating);
        }
    };

    for (let i = 0; i < maxStars; i++) {
        let star;
        if (i < Math.floor(rating)) {
            star = <FaStar key={i} style={{ color }} onClick={() => handleRatingClick(i + 1)} />;
        } else if (i === Math.floor(rating) && rating % 1 !== 0) {
            star = <FaStarHalfAlt key={i} style={{ color }} onClick={() => handleRatingClick(i + 0.5)} />;
        } else {
            star = <FaRegStar key={i} style={{ color }} onClick={() => handleRatingClick(i + 1)} />;
        }
        starElements.push(star);
    }

    return <div className="star-rating">{starElements}</div>;
};

export default StarRating;
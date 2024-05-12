// StarRating.jsx

import React from 'react';

const StarRating = ({ rating }) => {
    // Round the rating to the nearest integer
    const roundedRating = Math.round(rating);

    // Create an array of star elements based on the rounded rating
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < roundedRating) {
            // Render filled star with the 'filled' class
            stars.push(<span key={i} className="star filled">&#9733;</span>);
        } else {
            // Render empty star with the 'empty' class
            stars.push(<span key={i} className="star empty">&#9733;</span>);
        }
    }

    return (
        <div className="star-rating">
            {stars}
        </div>
    );
}

export default StarRating;

import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const CheckingDetails = ({ feedback }) => {
  return (
    <div className="feedback-details">
      <p>
        <strong style={{ color: 'var(--text)' }}>{feedback.username}</strong>
      </p>
      <p>{feedback.content}</p>
      <p>
        <strong> rating: </strong>
        {feedback.rating} stars
      </p>
      <p>{formatDistanceToNow(new Date(feedback.createdAt), { addSuffix: true })}</p>
    </div>
  );
};

export default CheckingDetails;

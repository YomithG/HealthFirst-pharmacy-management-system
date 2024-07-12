import React, { useEffect, useState } from "react";
import { UseFeedbackContext } from "../../hooks/UseFeedbacksContext";
import FeedbackDetails from "../../Components/Feedback/FeedbackDetails";
import FeedbackForm from "../../Components/Feedback/FeedbakForm";
import StarRating from "../../Components/Feedback/StarRating";
import { Link } from 'react-router-dom';
import './HomeFeedback.css';

import HorizontalScrollingBar from "../../Components/Feedback/HorizontalScrollingBar";

const HomeFeedback = () => {
  const { feedbacks, dispatch } = UseFeedbackContext();
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch("http://localhost:8070/api/feedbacks");
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_FEEDBACKS", payload: json });

          if (json.length > 0) {
            const totalRating = json.reduce((acc, feedback) => acc + feedback.rating, 0);
            const avgRating = totalRating / json.length;
            setAverageRating(avgRating);
          }
        }
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, [dispatch]);

  const handleUpdateFeedback = (updatedFeedback) => {
    const index = feedbacks.findIndex((fb) => fb._id === updatedFeedback._id);
    const updatedFeedbacks = [...feedbacks];
    updatedFeedbacks[index] = updatedFeedback;
    dispatch({ type: 'SET_FEEDBACKS', payload: updatedFeedbacks });
  };

  return (
    <div className="home-feedback-container">
      <br /><br /><br />
      <HorizontalScrollingBar feedbacks={feedbacks} />

      <div className="feedback-section">
        <br></br>
        <div className="feedback-form">
          <br></br><br></br>
          <FeedbackForm />
        </div>

        <div className="feedbacks">
          <div className="average-rating">
            <h2 style={{ textAlign:'left', color:'#164A41',fontSize:'25px' }}><b>Average Rating</b></h2>
            <StarRating rating={averageRating} />
            <p style={{ textAlign:'left', color:'#4D774E' }}>{averageRating.toFixed(2)} / 5</p>
          </div>
          {feedbacks &&
            feedbacks.map((feedback) => (
              <FeedbackDetails
                key={feedback._id}
                feedback={feedback}
                onUpdateFeedback={handleUpdateFeedback}
              />
            ))}
        </div>
      </div>
      <Link to="/check-feedback">Check All Feedbacks</Link>
    </div>
  );
};

export default HomeFeedback;

import React, { useEffect, useState } from "react";
import { UseFeedbackContext } from "../../hooks/UseFeedbacksContext";
import FeedbackDetails from "../../Components/Feedback/FeedbackDetails";
import FeedbackForm from "../../Components/Feedback/FeedbakForm";
import StarRating from "../../Components/Feedback/StarRating"; // Import StarRating component
import { Link } from 'react-router-dom';
import './HomeFeedback.css'

const HomeFeedback = () => {
  const { feedbacks, dispatch } = UseFeedbackContext();
  const [averageRating, setAverageRating] = useState(0); // State to hold average rating

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const response = await fetch("http://localhost:8070/api/feedbacks");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_FEEDBACKS", payload: json });

        // Calculate average rating
        if (json.length > 0) {
          const totalRating = json.reduce((acc, feedback) => acc + feedback.rating, 0);
          const avgRating = totalRating / json.length;
          setAverageRating(avgRating);
        }
      }
    };

    fetchFeedbacks();
  }, [dispatch]);

   // Function to update feedback in parent component
   const handleUpdateFeedback = (updatedFeedback) => {
    // Find the index of the updated feedback in the array
    const index = feedbacks.findIndex((fb) => fb._id === updatedFeedback._id);
    // Create a new array with the updated feedback
    const updatedFeedbacks = [...feedbacks];
    updatedFeedbacks[index] = updatedFeedback;
    // Update the state with the new array
    dispatch({ type: 'SET_FEEDBACKS', payload: updatedFeedbacks });
  };

  return (
    <div className="">
      <div className="feedbacks">
        <div className="average-rating">
          <h3>Average Rating</h3>
          {/* Render average rating using StarRating component */}
          <StarRating rating={averageRating} />
          {/* Optionally display the average rating value */}
          <p>{averageRating.toFixed(2)} / 5</p>
        </div>
        {feedbacks &&
          feedbacks.map((feedback) => (
            <FeedbackDetails 
              key={feedback._id} 
              feedback={feedback} 
              onUpdateFeedback={handleUpdateFeedback} // Pass the function to update feedback
            />
          ))}
      </div>
      <FeedbackForm />
      <Link to="/check-feedback">Check All Feedbacks</Link>
    </div>
  );
};

export default HomeFeedback;

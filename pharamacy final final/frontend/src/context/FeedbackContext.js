import { createContext, useReducer, useEffect } from "react";

export const FeedbacksContext = createContext();

export const feedbacksReducer = (state, action) => {
  switch (action.type) {
    case "SET_FEEDBACKS":
      return {
        ...state,
        feedbacks: action.payload,
      };
    case "CREATE_FEEDBACK":
      const newFeedbacks = state.feedbacks
        ? [action.payload, ...state.feedbacks]
        : [action.payload];
      return {
        ...state,
        feedbacks: newFeedbacks,
        averageRating: calculateAverageRating(newFeedbacks),
      };
    case "DELETE_FEEDBACK":
      return {
        ...state,
        feedbacks: state.feedbacks.filter(
          (feedback) => feedback._id !== action.payload._id
        ),
        averageRating: calculateAverageRating(
          state.feedbacks.filter((feedback) => feedback._id !== action.payload._id)
        ),
      };
    case "UPDATE_FEEDBACK":
      const updatedFeedbacks = state.feedbacks.map((fb) =>
        fb._id === action.payload._id ? action.payload : fb
      );
      return {
        ...state,
        feedbacks: updatedFeedbacks,
        averageRating: calculateAverageRating(updatedFeedbacks),
      };
    default:
      return state;
  }
};

const calculateAverageRating = (feedbacks) => {
  if (feedbacks.length > 0) {
    const totalRating = feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0);
    return totalRating / feedbacks.length;
  } else {
    return 0;
  }
};
export const FeedbacksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(feedbacksReducer, { 
    feedbacks: [], // Change null to an empty array
    averageRating: 0 
  });

  useEffect(() => {
    // Calculate average rating when feedbacks change
    if (state.feedbacks && state.feedbacks.length > 0) {
      const totalRating = state.feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0);
      const avgRating = totalRating / state.feedbacks.length;
      dispatch({ type: 'SET_AVERAGE_RATING', payload: avgRating });
    } else {
      dispatch({ type: 'SET_AVERAGE_RATING', payload: 0 });
    }
  }, [state.feedbacks]);

  return (
    <FeedbacksContext.Provider value={{ ...state, dispatch }}>
      { children }
    </FeedbacksContext.Provider>
  )
}

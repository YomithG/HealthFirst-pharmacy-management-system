import React, { useState } from 'react';
import { UseFeedbackContext } from '../../hooks/UseFeedbacksContext';

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const FeedbackDetails = ({ feedback, onUpdateFeedback }) => {
    const { dispatch } = UseFeedbackContext();
    const [editing, setEditing] = useState(false);
    const [editedFeedback, setEditedFeedback] = useState({ ...feedback });

    const handleClick = async () => {
        const response = await fetch('http://localhost:8070/api/feedbacks/' + feedback._id, {
          method: 'DELETE'
        })
        const json = await response.json()
    
        if (response.ok) {
          dispatch({type: 'DELETE_FEEDBACK', payload: json})
        }
    }

    const handleEdit = () => {
        setEditing(true);
    };

    const handleCancelEdit = () => {
        setEditing(false);
        setEditedFeedback({ ...feedback });
    };

    const handleSaveEdit = () => {
        // Dispatch action to update feedback
        dispatch({ type: 'UPDATE_FEEDBACK', payload: editedFeedback });
        setEditing(false);
        // Update the editedFeedback state with the new edited feedback data
        setEditedFeedback({ ...editedFeedback });
        // Call the callback function to update the feedback in the parent component
        onUpdateFeedback(editedFeedback);
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        // Validate rating to ensure it falls within the range of 1 to 5
        if (name === "rating") {
            // Convert value to a number
            const rating = parseInt(value);
            // Check if the rating is within the valid range
            if (!isNaN(rating) && rating >= 1 && rating <= 5) {
                setEditedFeedback((prevFeedback) => ({
                    ...prevFeedback,
                    [name]: rating,
                }));
            }
            // If the rating is not within the valid range, do nothing (don't update state)
            return;
        }
    
        // For other input fields, update state normally
        setEditedFeedback((prevFeedback) => ({
            ...prevFeedback,
            [name]: value,
        }));
    };
    

    return (
        <div className="feedback-details">
            {editing ? (
                <div>
                    <input
                        type="text"
                        name="username"
                        value={editedFeedback.username}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="content"
                        value={editedFeedback.content}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="rating"
                        value={editedFeedback.rating}
                        onChange={handleChange}
                    />
                 {/*  <button  className='edit_more' onClick={handleSaveEdit}>Save</button>
                    <button   className='edit_more'  onClick={handleCancelEdit}>Cancel</button>


                    */} 
                    
                </div>
            ) : (
                <div>
                    <p>
                        <strong style={{ color: '#0A5C36', fontWeight:'bold'  }}>
                          <b>  {feedback.username}
</b>                        </strong>
                    </p>
                    <br ></br>
                    <p style={{ fontWeight:'600' }}>{feedback.content}</p>
                    <p style={{fontWeight:'600'}}>
                        <strong> rating: </strong>
                        {feedback.rating} stars
                    </p>
                    <br></br>
                    <p style={{ fontSize: '0.75rem' }}>
                    {formatDistanceToNow(new Date(feedback.createdAt), { addSuffix: true })}
                </p>
     
                    <div className="action-buttons">
                     
                               {/*  <button onClick={handleClick}>delete</button>
                                
                                <button onClick={handleEdit}>Edit</button>  */}
                        
                   
                       
                    </div>
                   
                </div>
            )}
        </div>
    );
};

export default FeedbackDetails;

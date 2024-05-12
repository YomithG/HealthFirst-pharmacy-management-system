import { useState } from 'react';
import { UseFeedbackContext } from '../../hooks/UseFeedbacksContext';

const FeedbackForm = () => {
  const { dispatch } = UseFeedbackContext();
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedback = { username, content, rating: selectedRating };

    const response = await fetch('http://localhost:8070/api/feedbacks', {
      method: 'POST',
      body: JSON.stringify(feedback),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setUsername('');
      setContent('');
      setSelectedRating(0);
      console.log('New feedback added:', json);
      dispatch({ type: 'CREATE_FEEDBACK', payload: json });

      // Alert for successful submission
      alert('Feedback added successfully!');
    }
  };

  const handleRatingChange = (selectedRating) => {
    setSelectedRating(selectedRating);
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add your feedback</h3>

      <label>Name:</label>
      <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} />

      <label>Feedback:</label>
      <input type="text" onChange={(e) => setContent(e.target.value)} value={content} />

      <label>Rate Us:</label>
      <div className="rating-buttons">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            className={value === selectedRating ? 'selected' : ''}
            onClick={() => handleRatingChange(value)}
            type="button"
          >
            {value}
          </button>
        ))}
      </div>
      <br />
      <button type="submit">Submit</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default FeedbackForm;

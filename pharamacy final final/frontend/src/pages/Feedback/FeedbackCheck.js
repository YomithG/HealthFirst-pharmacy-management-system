import React, { useEffect, useState } from 'react';
import CheckingDetails from '../../Components/Feedback/CheckingDetails';
import FeedbackReport from '../../Components/Feedback/FeedbackReport';

const CheckFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const response = await fetch('http://localhost:8070/api/feedbacks');
      const json = await response.json();

      if (response.ok) {
        setFeedbacks(json);
      } else {
        console.error('Failed to fetch feedbacks:', json);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleGenerateReport = () => {
    setShowReport(true);
  };

  return (
    <div className="check-feedback">
      <h2>All Feedbacks</h2>
      {feedbacks.map((feedback) => (
        <CheckingDetails key={feedback._id} feedback={feedback} />
      ))}

<button style={{ backgroundColor: '#164A41', color: '#FFFFFF', padding: '10px', border: 'none', borderRadius: '5px', margin: '10px', cursor: 'pointer' }} onClick={() => window.history.back()}>Go Back</button>
      <button style={{ backgroundColor: '#4D774E', color: '#FFFFFF', padding: '10px', border: 'none', borderRadius: '5px', margin: '10px', cursor: 'pointer' }} onClick={handleGenerateReport}>Generate Report</button>
      {showReport && <FeedbackReport feedbacks={feedbacks} />}
    </div>
  );
};

export default CheckFeedback;

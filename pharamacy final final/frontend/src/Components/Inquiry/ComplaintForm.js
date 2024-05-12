import { useState } from 'react';
import { useComplaintsContext } from '../../hooks/useComplaintsContext';

const ComplaintForm = () => {
  const { dispatch } = useComplaintsContext();

  // Properties of the complaint form
  const [name, setName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [compContent, setCompContent] = useState('');
  const [error, setError] = useState(null);

  const validatePhoneNumber = (phoneNumber) => {
    // Regular expression to match the format XXX-XXX-XXXX
    const phoneNumberPattern = /^\d{3}-\d{3}-\d{4}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number format
    if (!validatePhoneNumber(telephone)) {
      setError('Please enter a valid phone number in the format XXX-XXX-XXXX.');
      return;
    }

    // Object containing complaint data
    const complaint = { name, telephone, email, comp_content: compContent };

    // Sending a POST request to the complaints API endpoint
    const response = await fetch('http://localhost:8070/api/complaints', {
      method: 'POST',
      body: JSON.stringify(complaint),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Parsing the response
    const json = await response.json();

    // Handling errors
    if (!response.ok) {
      setError(json.error);
    }

    // Clearing form fields and updating context if successful
    if (response.ok) {
      setError(null);
      setName('');
      setTelephone('');
      setEmail('');
      setCompContent('');
      console.log('New complaint added:', json);
      dispatch({ type: 'CREATE_COMPLAINT', payload: json });

      // Alert for successful submission
      alert('Complaint added successfully!');
    }
  };

  // Form template
  return (
    <form className="create" onSubmit={handleSubmit}>
      <p style={{ color: 'var(--primary)', marginBottom: '10px', fontSize: '0.9em' }}>Please complete this form and one of our agents will reply to you by email or phone you as soon as possible.</p>

      <label>Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <label>Telephone:<p style={{ color: 'var(--primary)', fontSize: '0.9em' }}>(input in the correct format. ex: XXX-XXX-XXXX)</p></label>
      <input
        type="tel"
        onChange={(e) => setTelephone(e.target.value)}
        value={telephone}
      />

      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Complaint Content:</label>
      <textarea
        onChange={(e) => setCompContent(e.target.value)}
        value={compContent}
        rows={3}
        style={{ width: '100%', maxWidth: '100%', padding: '10px', border: '1px solid var(--secondary)', borderRadius: '4px', boxSizing: 'border-box' }}
      />
      <br />
      <button>Submit Complaint</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ComplaintForm;
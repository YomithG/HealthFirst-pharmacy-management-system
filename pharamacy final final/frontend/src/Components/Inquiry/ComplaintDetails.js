import { useComplaintsContext } from '../../hooks/useComplaintsContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const ComplaintDetails = ({ complaint }) => {
  const { dispatch } = useComplaintsContext();

  const handleClick = async () => {
    // Display prompt box for confirmation
    const shouldDelete = window.confirm('Are you sure you want to delete this complaint?');

    if (shouldDelete) {
      const response = await fetch('http://localhost:8070/api/complaints/' + complaint._id, {
        method: 'DELETE',
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'DELETE_COMPLAINT', payload: json });
      }
    }
  };

  return (<div className="complaint-details">
  <h4 style={{ color: '#333' }}>{complaint.name}</h4>
  <p>
  <strong style={{ color: '#333' }}>Telephone: </strong>
    <br />
    <span style={{ color: '#333' }}>{complaint.telephone}</span>
  </p>
  <p>
  <strong style={{ color: '#333' }}>Email: </strong>
    <br />
    <span style={{ color: '#333' }}>{complaint.email}</span>
  </p>
  <p>
  <strong style={{ color: '#333' }}>Complaint Content: </strong>
    <br />
    <span style={{ color: '#333' }}>{complaint.comp_content}</span>
  </p>
  <br />
  <p style={{ color: '#333' }}>{formatDistanceToNow(new Date(complaint.createdAt), { addSuffix: true })}</p>
  <br />
  <button className="del_button" onClick={handleClick}>
    Delete
  </button>
</div>

  );
};

export default ComplaintDetails;
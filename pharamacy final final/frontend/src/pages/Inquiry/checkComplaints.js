import { useState, useEffect } from 'react';
import { useComplaintsContext } from "../../hooks/useComplaintsContext";
import ComplaintDetails from "../../Components/Inquiry/ComplaintDetails";
import { Link } from "react-router-dom";
import jsPDF from 'jspdf';

const CheckComplaints = () => {
  const { complaints, dispatch } = useComplaintsContext(); // Define dispatch here
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredComplaints, setFilteredComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch('http://localhost:8070/api/complaints');
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: 'SET_COMPLAINTS', payload: json });
          setFilteredComplaints(json); // Initialize filtered complaints with all complaints
        } else {
          console.error('Failed to fetch complaints:', json);
        }
      } catch (error) {
        console.error('Error fetching complaints:', error.message);
      }
    };

    fetchComplaints();
  }, [dispatch]);

  const handleSearch = () => {
    const filtered = complaints.filter(complaint => complaint.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredComplaints(filtered);
  };

  const generatePDFReport = () => {
    setLoading(true);
  
    // Get current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
  
    // Filter complaints for the current month
    const monthlyComplaints = complaints.filter(complaint => {
      const complaintDate = new Date(complaint.createdAt);
      return complaintDate.getMonth() === currentMonth && complaintDate.getFullYear() === currentYear;
    });
  
    // Create a new jsPDF instance
    const pdf = new jsPDF();
  
    // Set properties of the PDF document
    pdf.setFontSize(12);
    pdf.text(20, 20, `Complaints Report - ${currentMonth + 1}/${currentYear}`); // Month is zero-based index
  
    // Loop through monthly complaints data and add it to the PDF
    let yPos = 30;
    monthlyComplaints.forEach((complaint, index) => {
      const complaintText = `Name: ${complaint.name}\nTelephone: ${complaint.telephone}\nEmail: ${complaint.email}\nContent: ${complaint.comp_content}\n\n`;
      pdf.text(20, yPos, complaintText);
      yPos += 50; // Increase Y position for next complaint
    });
  
    // Save the PDF with a filename
    pdf.save('monthly_complaints_report.pdf');
  
    setLoading(false);
  };
  
  return (
    <div className="complaints">
      <div>
  <input 
    type="text" 
    placeholder="Search by name..." 
    value={searchTerm} 
    onChange={(e) => setSearchTerm(e.target.value)} 
  />
  <button 
    className="search-button" // Add a class name for styling
    onClick={handleSearch}
  >
   🔍 Search
  </button>
</div>

      <br></br>
 
      {filteredComplaints.map(complaint => (
        <ComplaintDetails complaint={complaint} key={complaint._id} />
      ))}
      <div>
        <button
          className="pdf-button"
          onClick={generatePDFReport}
          disabled={loading}
        >
          {loading ? 'Generating PDF...' : 'Generate PDF Report'}
        </button>
        <br></br>
        <Link className=".button_link" to="/">Back</Link>
      </div>
    </div>
  );
};

export default CheckComplaints;

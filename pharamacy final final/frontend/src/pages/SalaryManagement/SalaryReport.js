import React, { useEffect, useState } from 'react';
import './SalaryManagement.css';
import SalaryDetails from '../../Components/SalaryManagement/SalaryDetails';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';


const SalaryReport = () => {
    const [salariesReport, setSalariesReport] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSalariesReport = async () => {
            try {
                const response = await fetch('http://localhost:8070/api/salary/report');
                const data = await response.json();
                setSalariesReport(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching salaries report:', error);
                setError('Error fetching salaries report');
                setLoading(false);
            }
        };

        fetchSalariesReport();
    }, []);

    const handleDownloadPDF = (name, salaryDetails, format) => {
        if (format === 'table') {
            // Generate table-based PDF
        } else if (format === 'line') {
            const doc = new jsPDF();
            let yPos = 20; // Initial y position
            const marginLeft = 20;
            const marginRight = doc.internal.pageSize.width - 20;
    
            // Header
            doc.setTextColor(33, 33, 33); // Set text color to black
            doc.setFontSize(20);
            doc.text(`Salary Receipt for ${name}`, doc.internal.pageSize.width / 2, yPos, { align: 'center' });
            yPos += 10;
            doc.setDrawColor(33, 33, 33); // Set draw color to black
            doc.line(marginLeft, yPos, marginRight, yPos); // Horizontal line under the header
            yPos += 20;
    
            // Employee details
            doc.setFontSize(12);
            salaryDetails.forEach((salary, index) => {
                if (index % 2 === 0) {
                    doc.setFillColor(240, 240, 240); // Set background color for alternating rows
                    doc.rect(marginLeft, yPos - 5, marginRight - marginLeft, 30, 'F');
                }
                doc.setTextColor(33, 33, 33); // Set text color to black
                doc.text(`Employee ID: ${salary._id}`, marginLeft, yPos);
                doc.text(`Month: ${salary.month} ${salary.year}`, marginRight, yPos, { align: 'right' });
                yPos += 10;
                doc.text(`Basic Salary: $${salary.basic.toFixed(2)}`, marginLeft, yPos);
                doc.text(`Leaves: ${salary.leaves}`, marginRight, yPos, { align: 'right' });
                yPos += 10;
                doc.text(`Overtime Hours: ${salary.oThours}`, marginLeft, yPos);
                doc.text(`Net Salary: $${salary.net.toFixed(2)}`, marginRight, yPos, { align: 'right' });
                yPos += 20;
            });
    
            // Footer
            doc.setTextColor(33, 33, 33); // Set text color to black
            doc.setDrawColor(33, 33, 33); // Set draw color to black
            doc.line(marginLeft, yPos, marginRight, yPos); // Horizontal line above footer
            yPos += 10;
            doc.text('Thank you for your hard work!', doc.internal.pageSize.width / 2, yPos, { align: 'center' });
    
            doc.save(`${name}_Salary_Receipt.pdf`);
        }
    };                 

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error}</div>;
        }

        if (typeof salariesReport !== 'object') {
            return <div>Error: Unexpected data format</div>;
        }

        return (
            <div className="salary-report">
                <h1 className="page-title">Salary Report</h1>
                {Object.entries(salariesReport).map(([name, salaryDetails]) => (
                    <div key={name}>
                        <h2>{name}</h2>
                        {salaryDetails.map((salary) => (
                            <div key={salary._id}>
                                <SalaryDetails salary={salary} />
                            </div>
                        ))}
                        <button onClick={() => handleDownloadPDF(name, salaryDetails, 'line')}>Download Report</button>
                </div>
            ))}
        </div>
    );
};

export default SalaryReport;
import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './index.css';

const SalaryReportPDF = ({ name, salaryDetails }) => {
    const generateTabularPDF = () => {
        const doc = new jsPDF();
        doc.text(`Tabular Salary Report for ${name}`, 10, 10);
        doc.autoTable({
            head: [['ID', 'Basic', 'Leaves', 'OT Hours', 'Month', 'Year']],
            body: salaryDetails.map(salary => [salary._id, salary.basic, salary.leaves, salary.oThours, salary.month, salary.year])
        });
        doc.save(`${name}_Tabular_Salary_Report.pdf`);
    };

    const generateLineByLinePDF = () => {
        const doc = new jsPDF();
        if (name) {
            doc.text(`Salary Report for ${name}`, 10, 10); // Title with employee name
        }
        salaryDetails.forEach((salary, index) => {
            const yOffset = 10 + index * 80; // Adjust the vertical spacing
            doc.text(`ID: ${salary._id}`, 10, 20 + yOffset);
            doc.text(`Basic: ${salary.basic}`, 10, 30 + yOffset);
            doc.text(`Leaves: ${salary.leaves}`, 10, 40 + yOffset);
            doc.text(`OT Hours: ${salary.oThours}`, 10, 50 + yOffset);
            doc.text(`Net: ${salary.net}`, 10, 70 + yOffset);
            doc.text(`Month: ${salary.month}`, 10, 80 + yOffset);
            doc.text(`Year: ${salary.year}`, 10, 90 + yOffset);
            if (index < salaryDetails.length - 1) {
                doc.addPage();
            }
        });
        
        doc.save(`${name ? name : 'Employee'}_Line_By_Line_Salary_Report.pdf`);
    };

    return (
        <div>
            <button className="salary-report-button" onClick={generateTabularPDF}>Download Tabular PDF</button>
            <button className="salary-report-button" onClick={generateLineByLinePDF}>Download Report</button>
        </div>
    );
};

export default SalaryReportPDF;

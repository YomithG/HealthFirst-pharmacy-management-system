import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './Salary.css'
const SalaryReportPDF = ({ name, salaryDetails }) => {
    const generateTabularPDF = () => {
        const doc = new jsPDF();
        doc.text(`Tabular Salary Report for ${name}`, 10, 10);
        doc.autoTable({
            head: [['ID', 'Basic', 'Leaves', 'OT Hours', 'Net', 'Month', 'Year']],
            body: salaryDetails.map(salary => [salary._id, salary.basic, salary.leaves, salary.oThours, salary.net, salary.month, salary.year])
        });
        doc.save(`${name}_Tabular_Salary_Report.pdf`);
    };

    const generateLineByLinePDF = () => {
        const doc = new jsPDF();
        if (name) {
            doc.text(`Salary Report for ${name}`, 10, 10); // Title with employee name
        }
        salaryDetails.forEach((salary, index) => {
            doc.text(`${index + 1}. ID: ${salary._id}, Basic: ${salary.basic}, Leaves: ${salary.leaves}, OT Hours: ${salary.oThours}, Net: ${salary.net}, Month: ${salary.month}, Year: ${salary.year}`, 10, 20 + index * 10);
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

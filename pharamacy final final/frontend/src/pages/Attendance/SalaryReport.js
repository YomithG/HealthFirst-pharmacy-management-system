import React, { useEffect, useState } from 'react';
import SalaryDetails from '../components/SalaryDetails';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const SalaryReport = () => {
    const [salariesReport, setSalariesReport] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSalariesReport = async () => {
            try {
                const response = await fetch('/api/salary/report');
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
            const doc = new jsPDF();
            doc.text(`Salary Report for ${name}`, doc.internal.pageSize.width / 2, 10, { align: 'center' });
            doc.autoTable({
                head: [['ID', 'Basic', 'Leaves', 'OT Hours', 'Net', 'Month', 'Year']], // Add 'Bonus' column header
                body: salaryDetails.map(salary => [salary._id, salary.basic, salary.leaves, salary.oThours, salary.bonus, salary.net, salary.month, salary.year]) // Include bonus in the data
            });
            doc.save(`${name}_Salary_Report_Table.pdf`);
        } else if (format === 'line') {
            const doc = new jsPDF();
            doc.text(`Salary Report for ${name}`, doc.internal.pageSize.width / 2, 10, { align: 'center' }); // Add title for line-by-line report
            salaryDetails.forEach(salary => {
                doc.text(`ID: ${salary._id}`, 10, doc.autoTable.previous.finalY + 10);
                doc.text(`Basic: ${salary.basic}`, 10, doc.autoTable.previous.finalY + 20);
                doc.text(`Leaves: ${salary.leaves}`, 10, doc.autoTable.previous.finalY + 30);
                doc.text(`OT Hours: ${salary.oThours}`, 10, doc.autoTable.previous.finalY + 40);
                doc.text(`Net: ${salary.net}`, 10, doc.autoTable.previous.finalY + 60);
                doc.text(`Month: ${salary.month}`, 10, doc.autoTable.previous.finalY + 70);
                doc.text(`Year: ${salary.year}`, 10, doc.autoTable.previous.finalY + 80);
                doc.addPage();
            });
            doc.save(`${name}_Salary_Report_Line.pdf`);
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
                    <button onClick={() => handleDownloadPDF(name, salaryDetails, 'table')}>Download PDF (Table)</button>
                    <button onClick={() => handleDownloadPDF(name, salaryDetails, 'line')}>Download Report</button>
                </div>
            ))}
        </div>
    );
};

export default SalaryReport;
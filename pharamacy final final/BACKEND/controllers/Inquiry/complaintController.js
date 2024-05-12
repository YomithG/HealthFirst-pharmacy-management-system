const Complaint = require('../../Models/Inquiry/complaintModel');
const mongoose = require('mongoose');

// Get all complaints
const getComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({}).sort({ createdAt: -1 });
        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single complaint
const getComplaint = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such complaint' });
    }

    try {
        const complaint = await Complaint.findById(id);
        if (!complaint) {
            return res.status(404).json({ error: 'No such complaint' });
        }
        res.status(200).json(complaint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new complaint
const createComplaint = async (req, res) => {
    const { name, telephone, email, comp_content } = req.body;

    try {
        const newComplaint = await Complaint.create({ name, telephone, email, comp_content });
        res.status(200).json(newComplaint);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a complaint
const deleteComplaint = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such complaint' });
    }

    try {
        const complaint = await Complaint.findOneAndDelete({ _id: id });
        if (!complaint) {
            return res.status(404).json({ error: 'No such complaint' });
        }
        res.status(200).json(complaint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a complaint
const updateComplaint = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such complaint' });
    }

    try {
        const complaint = await Complaint.findByIdAndUpdate(id, req.body, { new: true });
        if (!complaint) {
            return res.status(404).json({ error: 'No such complaint' });
        }
        res.status(200).json(complaint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Generate report
const generateReport = async (req, res) => {
    try {
        const complaints = await Complaint.find({});
        
        // Format complaints data into CSV format
        const csvData = complaints.map(complaint => {
            return `${complaint.name},${complaint.telephone},${complaint.email},${complaint.comp_content},${complaint.createdAt}`;
        }).join('\n');

        // Set response headers
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=complaints_report.csv');

        // Send CSV data as response
        res.send(csvData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getComplaint,
    getComplaints,
    createComplaint,
    deleteComplaint,
    updateComplaint,
    generateReport
};



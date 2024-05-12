const express = require('express');
const {
    createComplaint,
    getComplaint,
    getComplaints,
    deleteComplaint,
    updateComplaint,
    generateReport
} = require('../../controllers/Inquiry/complaintController');

const router = express.Router();

// Get all complaints
router.get('/', getComplaints);

// Get a single complaint
router.get('/:id', getComplaint);

// Post a new complaint
router.post('/', createComplaint);

// Delete a complaint
router.delete('/:id', deleteComplaint);

// Update a complaint
router.patch('/:id', updateComplaint);
// Generate report
router.post('/report', generateReport);

module.exports = router;

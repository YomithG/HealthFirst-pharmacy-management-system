const express = require('express')
const {
    createSalary,
    getSalaries,
    getSalary,
    deleteSalary,
    updateSalary,
    getSalariesReport
} = require('../../controllers/Attendance/salaryController')

const router = express.Router()

//GET all salaries
router.get('/', getSalaries)

// GET salary report
router.get('/report', getSalariesReport)

//GET a single salary
router.get('/:id', getSalary)

//POST a new salary
router.post('/', createSalary)

//DELETE a salary
router.delete('/:id', deleteSalary)

//UPDATE a new salary
router.patch('/:id', updateSalary)

module.exports = router
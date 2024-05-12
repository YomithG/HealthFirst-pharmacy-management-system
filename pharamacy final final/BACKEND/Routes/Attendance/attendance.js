const express = require('express')
const {
    createAttendance,
    getAttendances,
    getAttendance,
    updateAttendance,
    deleteAttendance
} = require('../../controllers/Attendance/attendanceController')

const router = express.Router()

//GET all attendances
router.get('/', getAttendances)

//GET a single attendance
router.get('/:id', getAttendance)

//POST a new attendance
router.post('/', createAttendance )

//DELETE a attendance
router.delete('/:id', deleteAttendance)

//UPDATE a new attendance
router.patch('/:id', updateAttendance)

module.exports = router
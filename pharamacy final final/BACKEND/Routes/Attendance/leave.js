const express = require('express')
const {
    createLeave,
    getLeaves,
    getLeave,
    updateLeave,
    deleteLeave
} = require('../../controllers/Attendance/leavesController')

const router = express.Router()

//GET all leaves
router.get('/', getLeaves)

//GET a single leave
router.get('/:id', getLeave)

//POST a new leave
router.post('/', createLeave )

//DELETE a leave
router.delete('/:id', deleteLeave)

//UPDATE a new leave
router.patch('/:id', updateLeave)

module.exports = router
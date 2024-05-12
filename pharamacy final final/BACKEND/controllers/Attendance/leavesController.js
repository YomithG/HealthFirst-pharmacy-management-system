const Leave = require('../../Models/Attendance/LeavesModel')
const mongoose = require('mongoose')

// get all leave
const getLeaves = async (req, res) => {
    const leave = await Leave.find({}).sort({createdAt: -1})
    res.status(200).json(leave)
}

// get a single leave
const getLeave = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such leave"})
    }

    const leave = await Leave.findById(id)

    if (!leave) {
        return res.status(404).json({error: 'No such leave'})
    }

    res.status(200).json(leave)
}

// create new leave
const createLeave = async (req, res) => {
    const { name, date, outTime} = req.body;

    try {
        const leave = await Leave.create({ name, date, outTime }); 
        res.status(201).json(leave);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// delete an leave
const deleteLeave = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such leave" })
    }

    const leave = await Leave.findOneAndDelete({ _id: id })

    if (!leave) {
        return res.status(404).json({ error: 'No such leave' })
    }

    res.status(200).json(leave)
}

// update an leave
const updateLeave = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such leave" })
    }

    const leave = await Leave.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!leave) {
        return res.status(404).json({ error: 'No such leave' })
    }

    res.status(200).json(leave)
}

module.exports = {
    getLeaves,
    getLeave,
    updateLeave,
    deleteLeave,
    createLeave
}
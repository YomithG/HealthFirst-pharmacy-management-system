const Attendance = require('../../Models/SalaryManagement/AttendanceModel')
const mongoose = require('mongoose')

// get all attendances
const getAttendances = async (req, res) => {
    const attendances = await Attendance.find({}).sort({createdAt: -1})
    res.status(200).json(attendances)
}

// get a single attendance
const getAttendance = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such attendance"})
    }

    const attendance = await Attendance.findById(id)

    if (!attendance) {
        return res.status(404).json({error: 'No such attendance'})
    }

    res.status(200).json(attendance)
}

// create new attendance
const createAttendance = async (req, res) => {
    const { name, date, inTime, outTime, status } = req.body;

    try {
        const attendance = await Attendance.create({ name, date, inTime, outTime, status }); // Include 'outTime' field
        res.status(201).json(attendance);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// delete an attendance
const deleteAttendance = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such attendance" })
    }

    const attendance = await Attendance.findOneAndDelete({ _id: id })

    if (!attendance) {
        return res.status(404).json({ error: 'No such attendance' })
    }

    res.status(200).json(attendance)
}

// update an attendance
const updateAttendance = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such attendance" })
    }

    const attendance = await Attendance.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!attendance) {
        return res.status(404).json({ error: 'No such attendance' })
    }

    res.status(200).json(attendance)
}

module.exports = {
    getAttendances,
    getAttendance,
    updateAttendance,
    deleteAttendance,
    createAttendance
}
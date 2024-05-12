const Salary = require('../../Models/SalaryManagement/SalaryModel')
const mongoose = require('mongoose')

// get all salaries
const getSalariesReport = async (req, res) => {
    try {
        const salaries = await Salary.find({});
        const salariesReport = {};

        salaries.forEach((salary) => {
            if (!salariesReport.hasOwnProperty(salary.name)) {
                salariesReport[salary.name] = [];
            }
            salariesReport[salary.name].push(salary);
        });

        res.status(200).json(salariesReport);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// get all salaries
const getSalaries = async (req, res) => {
    const salary = await Salary.find({}).sort({createdAt: -1})

    res.status(200).json(salary)
}

// get a single salary
const getSalary = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such salary'})
    }

    const salary = await Salary.findById(id)

    if(!salary) {
        return res.status(404).json({error: "No such salary"})
    }

    res.status(200).json(salary)
}


// create new salary
const createSalary = async (req, res) => {
    const {name, basic, leaves, oThours, month, year} = req.body

    // Calculate net salary
    const net = Number(basic) + (300 * Number(oThours)) - (200 * Number(leaves)); // Calculate net

    let emptyFields = []

    if(!name) {
        emptyFields.push('name')
    }
    if(!basic) {
        emptyFields.push('basic')
    }
    if(!leaves) {
        emptyFields.push('leaves')
    }
    if(!oThours) {
        emptyFields.push('oThours')
    }
    if(!month) {
        emptyFields.push('month')
    }
    if(!year) {
        emptyFields.push('year')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
    }

    // add doc to db
    try {
        const salary = await Salary.create({name, basic, leaves, oThours, net, month, year})
        res.status(200).json(salary)
    }catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete a salary
const deleteSalary = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such salary'})
    }

    const salary = await Salary.findOneAndDelete({_id: id})

    if(!salary) {
        return res.status(404).json({error: "No such salary"})
    }

    res.status(200).json(salary)
}

//update a salary
const updateSalary = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such salary'})
    }

    const salary = await Salary.findByIdAndUpdate({_id: id},{
        ...req.body
    })

    if(!salary) {
        return res.status(404).json({error: "No such salary"})
    }

    res.status(200).json(salary)
}

module.exports = {
    getSalary,
    getSalaries,
    createSalary,
    deleteSalary,
    updateSalary,
    getSalariesReport
}
const Bonus = require('../../Models/Attendance/BonusModel')
const mongoose = require('mongoose')

// get all bonuses
const getBonuses = async (req, res) => {
    const bonus = await Bonus.find({}).sort({createdAt: -1})
    res.status(200).json(bonus)
}

// get a single bonus
const getBonus= async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such bonus"})
    }

    const bonus = await Bonus.findById(id)

    if (!bonus) {
        return res.status(404).json({error: 'No such bonus'})
    }

    res.status(200).json(bonus)
}

// create new bonus
const createBonus = async (req, res) => {
    const { bonusID, month, year, bonusAmount} = req.body;

    try {
        const bonus = await Bonus.create({ bonusID, month, year, bonusAmount }); 
        res.status(201).json(bonus);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// delete an bonus
const deleteBonus = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such bonus" })
    }

    const bonus = await Bonus.findOneAndDelete({ _id: id })

    if (!bonus) {
        return res.status(404).json({ error: 'No such bonus' })
    }

    res.status(200).json(bonus)
}

// update an bonus
const updateBonus = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such bonus" })
    }

    const bonus = await Bonus.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!bonus) {
        return res.status(404).json({ error: 'No such bonus' })
    }

    res.status(200).json(bonus)
}

module.exports = {
    getBonuses,
    getBonus,
    updateBonus,
    deleteBonus,
    createBonus
}
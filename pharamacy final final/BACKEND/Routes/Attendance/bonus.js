const express = require('express')
const {
    createBonus,
    getBonuses,
    getBonus,
    updateBonus,
    deleteBonus
} = require('../../controllers/Attendance/bonusController')

const router = express.Router()

//GET all bonues
router.get('/', getBonuses)

//GET a single bonus
router.get('/:id', getBonus)

//POST a new bonus
router.post('/', createBonus )

//DELETE a bonus
router.delete('/:id', deleteBonus)

//UPDATE a new bonus
router.patch('/:id', updateBonus)

module.exports = router
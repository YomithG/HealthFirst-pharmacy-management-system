const express = require('express')
const { 
    createFeedback,
    getFeedbacks,
    getFeedback,
    deleteFeedback,
    updateFeedback

}= require('../../controllers/Feedback/feedbackController')

const router = express.Router()

// GET all feedbacks
//will fire the function after the forward slash(/)
router.get('/', getFeedbacks)

// GET a single feedback
router.get('/:id',getFeedback)

// POST a new feedback
router.post('/', createFeedback)


// DELETE a feedback
router.delete('/:id', deleteFeedback)

// UPDATE a feedback
router.patch('/:id', updateFeedback)

module.exports = router
const Feedback = require('../../Models/Feedback/feedbackModel');
const mongoose = require('mongoose');

const getFeedbacks = async (req, res) => {
  const feedbacks = await Feedback.find({}).sort({ createdAt: -1 });
  res.status(200).json(feedbacks);
};

const getFeedback = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such feedback' });
  }

  const feedback = await Feedback.findById(id);

  if (!feedback) {
    return res.status(404).json({ error: 'No such feedback' });
  }

  res.status(200).json(feedback);
};

const createFeedback = async (req, res) => {
  const { username, content, rating } = req.body;

  try {
    const newFeedback = await Feedback.create({ username, content, rating });
    res.status(200).json(newFeedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteFeedback = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such feedback' });
  }

  const feedback = await Feedback.findOneAndDelete({ _id: id });

  if (!feedback) {
    return res.status(400).json({ error: 'No such feedback' });
  }

  res.status(200).json(feedback);
};

const updateFeedback = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such feedback' });
  }

  const feedback = await Feedback.findByIdAndUpdate(id, req.body, { new: true });

  if (!feedback) {
    return res.status(400).json({ error: 'No such feedback' });
  }

  res.status(200).json(feedback);
};

module.exports = {
  getFeedbacks,
  getFeedback,
  createFeedback,
  deleteFeedback,
  updateFeedback
};


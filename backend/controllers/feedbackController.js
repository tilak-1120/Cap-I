const Feedback = require("../models/feedbackSchema");

exports.submitFeedback = async (req, res) => {
  try {
    const newFeedback = new Feedback({
      name: req.body.username,
      subject: req.body.subject,
      message: req.body.message,
    });

    await newFeedback.save();
    res.status(200).json("Feedback Saved");
  } catch (err) {
    res.status(500).json("Feedback submission failed");
  }
};

const router = require("express").Router();
const { submitFeedback } = require("../controllers/feedbackController");

// Submitting Feedback
router.post("/feedback", submitFeedback);

module.exports = router;

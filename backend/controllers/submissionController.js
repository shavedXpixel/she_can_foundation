const Submission = require('../models/Submission');

// Create submission
exports.createSubmission = async (req, res) => {
  try {
    const submission = new Submission(req.body);
    await submission.save();
    res.status(201).json({ message: 'Form Submitted Successfully', submission });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit form', details: error.message });
  }
};

// Get all submissions
exports.getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ createdAt: -1 });
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch submissions', details: error.message });
  }
};

// Delete submission
exports.deleteSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    await Submission.findByIdAndDelete(id);
    res.status(200).json({ message: 'Submission deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete submission', details: error.message });
  }
};

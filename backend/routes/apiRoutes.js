const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');

// Auth Route
router.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
    res.status(200).json({ message: 'Login successful', token: 'fake-jwt-token-for-demo' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Submission Routes
router.post('/submissions', submissionController.createSubmission);
router.get('/submissions', submissionController.getSubmissions);
router.delete('/submissions/:id', submissionController.deleteSubmission);

module.exports = router;

const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  areaOfInterest: { type: String, required: true },
  volunteerReason: { type: String },
  message: { type: String },
  newsletter: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);

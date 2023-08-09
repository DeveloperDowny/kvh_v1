const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  suspectAccountType: {
    type: String,
    required: true,
  },
  suspectAccountLink: {
    type: String,
    required: true,
  },
  suspectWalletAddress: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  otherDetails: {
    type: String,
    required: true,
  },
});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;

const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    image: {type: String, required: true}
});

const Board = mongoose.model('board', boardSchema);

module.exports = Board;
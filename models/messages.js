const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
	username: String,
	message: String,
	date: Date,
});

module.exports = mongoose.model("messages", MessageSchema);

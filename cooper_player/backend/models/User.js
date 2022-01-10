const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,

	},
	playlist: [{
		type: mongoose.Schema.ObjectId,
		ref: "Playlist",
	}],
	status: {
		type: Boolean,
		required: true
	},
	queries: [{
		type: mongoose.Schema.ObjectId,
		ref: "Queries"
	}]
});
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});


userSchema.methods = {
	authenticate: async function (password) {
		return await bcrypt.compare(password, this.password);
	},

	getSignedJwtToken: function () {
		return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRE,
		});
	}
};

module.exports = mongoose.model("User", userSchema);

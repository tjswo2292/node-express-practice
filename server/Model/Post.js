const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
	{
		title: String,
		content: String,
		postNum: Number,
	},
	{ collaction: "posts" }
);

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };

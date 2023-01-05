const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema(
	{
		name: String,
		postNum: Number,
	},
	{ collection: "counter" }
);

const Counter = mongoose.model("Counter", counterSchema);

module.exports = { Counter };

// 포스트 마다 고유의 숫자를 부여하기 위해서

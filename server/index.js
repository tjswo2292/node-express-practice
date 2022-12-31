const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const port = 5000;

// mongodb+srv://tjswo2292:20180411zZ!@cluster0.anbkxn8.mongodb.net/?retryWrites=true&w=majority

app.use(express.static(path.join(__dirname, "../client/build")));
// 밑의 2가지 구문을 추가 해주면 client에서 보내는 데이터인 body를 파싱한다.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Post } = require("./Model/Post.js");

app.listen(port, () => {
	mongoose
		.connect(
			"mongodb+srv://tjswo2292:20180411zZ!@cluster0.anbkxn8.mongodb.net/Community?retryWrites=true&w=majority"
		)
		.then(() => {
			console.log(`Example app listening on port ${port}`);
			console.log("Connecting MongoDB...");
		})
		.catch((err) => {
			console.log(`${err}`);
		});
});

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.post("/api/post/submit", (req, res) => {
	let temp = req.body;
	const CommunityPost = new Post(temp);
	CommunityPost.save()
		.then(() => {
			res.status(200).json({ success: true });
		})
		.catch((err) => {
			res.status(400).json({ success: false });
		});
});

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
const { Counter } = require("./Model/Counter.js");

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

// 포스트 제출
app.post("/api/post/submit", (req, res) => {
	let temp = req.body;
	Counter.findOne({ name: "counter" })
		.exec()
		.then((counter) => {
			// counter는 document이다 즉, Counter collection에 있는 model
			temp.postNum = counter.postNum;
			const CommunityPost = new Post(temp);
			CommunityPost.save().then(() => {
				Counter.updateOne({ name: "counter" }, { $inc: { postNum: 1 } }).then(
					() => {
						res.status(200).json({ success: true });
					}
				);
			});
		})
		.catch((err) => {
			res.status(400).json({ success: false });
		});
});

app.post("/api/post/list", (req, res) => {
	Post.find() // DB에서 데이터 보내줌
		.exec()
		.then((doc) => {
			res.status(200).json({ success: true, postList: doc });
		})
		.catch((err) => {
			res.status(400).json({ success: false });
		});
});

app.post("/api/post/detail", (req, res) => {
	Post.findOne({ postNum: Number(req.body.postNum) })
		.exex()
		.then((doc) => {
			console.log(doc);
			res.status(200).json({ success: true, post: doc });
		})
		.catch((err) => {
			console.log("error");
		});
});

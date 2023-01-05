import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Detail = () => {
	let params = useParams();

	useEffect(() => {
		let body = {
			postNum: params.postNum,
		};
		axios
			.post("/api/post/detail", body)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log("에러");
			});
	}, []);

	return <div>hello</div>;
};

export default Detail;

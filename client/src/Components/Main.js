import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Main = () => {
	const [todoList, setTodoList] = useState([]);

	useEffect(() => {
		axios
			.post("/api/post/list")
			.then((response) => {
				setTodoList([...response.data.postList]);
			})
			.catch((err) => {
				console.log("에러임");
			});
	}, []);

	return todoList.map((element, index) => (
		<Link to={`/post/${element.postNum}`} key={index}>
			<div>{element.content}</div>
		</Link>
	));
};

export default Main;
